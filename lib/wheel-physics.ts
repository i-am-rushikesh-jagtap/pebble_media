/**
 * Wheel physics engine for 3D photo carousels / lucky wheels.
 *
 * Uses vanilla requestAnimationFrame — no GSAP InertiaPlugin or Framer Motion required.
 * GSAP may still be used elsewhere for ambient UI (glow, scroll), but rotation physics
 * live entirely in this module for predictable, frame-rate-independent behaviour.
 */

export interface WheelPhysicsConfig {
  /** Number of equally spaced slots (photos) around the wheel */
  slotCount: number;
  /** Degrees between each slot centre */
  slotStep: number;
  /** Pointer drag: horizontal px → ring rotation degrees */
  dragSensitivity?: number;
  /** Exponential friction coefficient (per ms). Higher = stops faster */
  friction?: number;
  /** |velocity| threshold (deg/ms) to enter snap-to-slot phase */
  snapVelocityThreshold?: number;
  /** Spring factor during snap phase */
  snapSpring?: number;
  /** Per-frame damping during snap (scaled by dt) */
  snapDamping?: number;
}

export const DEFAULT_WHEEL_PHYSICS: Required<
  Omit<WheelPhysicsConfig, "slotCount" | "slotStep">
> = {
  dragSensitivity: 0.42,
  friction: 0.0045,
  snapVelocityThreshold: 0.022,
  snapSpring: 0.00016,
  snapDamping: 0.86,
};

export type WheelNavDirection = 1 | -1 | "shortest";

/** Wrap slot index into [0, count) */
export function wrapIndex(index: number, count: number): number {
  return ((index % count) + count) % count;
}

/** Front-facing strength for a slot at the given ring angle (0–1) */
export function slotFrontness(angle: number, slotIndex: number, step: number): number {
  let offset = angle + slotIndex * step;
  offset = ((offset % 360) + 360) % 360;
  if (offset > 180) offset -= 360;
  const cosine = (Math.cos((offset * Math.PI) / 180) + 1) / 2;
  return Math.pow(cosine, 2.4);
}

/** Index of the slot most face-on to the camera at `angle` */
export function dominantSlotIndex(angle: number, step: number, count: number): number {
  let best = 0;
  let bestScore = -1;
  for (let i = 0; i < count; i++) {
    const score = slotFrontness(angle, i, step);
    if (score > bestScore) {
      bestScore = score;
      best = i;
    }
  }
  return best;
}

/** Slot index from cumulative ring angle (rotateY degrees) */
export function indexFromAngle(angle: number, step: number, count: number): number {
  const raw = Math.round(-angle / step);
  return wrapIndex(raw, count);
}

/**
 * Exact snap angle for `index` nearest to `nearAngle` in cumulative rotation space.
 * Keeps continuous spin (e.g. -360° instead of jumping to 0°).
 */
export function snapAngleForIndex(index: number, nearAngle: number, step: number): number {
  const ideal = -index * step;
  return ideal + Math.round((nearAngle - ideal) / 360) * 360;
}

/**
 * Target angle when navigating programmatically (buttons / dots).
 * `direction: 1` = next (forward), `-1` = prev, `shortest` = minimal arc.
 */
export function getNavTargetAngle(
  current: number,
  index: number,
  direction: WheelNavDirection,
  step: number
): number {
  if (direction === 1) return current - step;
  if (direction === -1) return current + step;

  const ideal = -index * step;
  let target = ideal + Math.round((current - ideal) / 360) * 360;
  const delta = target - current;
  if (delta > 180) target -= 360;
  if (delta < -180) target += 360;
  return target;
}

/**
 * Predict which slot the wheel should land on after friction decay.
 * Uses kinematic limit: Δθ ≈ v₀ / friction for exponential drag.
 */
export function resolveLandingIndex(
  angle: number,
  velocityDegPerMs: number,
  step: number,
  count: number,
  friction: number
): number {
  if (Math.abs(velocityDegPerMs) < 0.004) {
    return indexFromAngle(angle, step, count);
  }

  // Projected travel before velocity nears zero (integral of exponential decay)
  const projectedTravel = velocityDegPerMs / friction;
  // Slight bias in spin direction so flicks feel intentional
  const bias = velocityDegPerMs < 0 ? step * 0.28 : -step * 0.28;
  const projectedAngle = angle + projectedTravel + bias;

  return indexFromAngle(projectedAngle, step, count);
}

/** Smooth velocity from recent pointer samples (reduces flick noise) */
export class VelocityTracker {
  private samples: { t: number; x: number }[] = [];
  private readonly maxSamples: number;

  constructor(maxSamples = 6) {
    this.maxSamples = maxSamples;
  }

  reset() {
    this.samples = [];
  }

  push(clientX: number) {
    const t = performance.now();
    this.samples.push({ t, x: clientX });
    if (this.samples.length > this.maxSamples) {
      this.samples.shift();
    }
  }

  /** Horizontal velocity in px/ms (positive = moving right) */
  getVelocity(): number {
    if (this.samples.length < 2) return 0;

    const first = this.samples[0];
    const last = this.samples[this.samples.length - 1];
    const dt = last.t - first.t;
    if (dt <= 0) return 0;

    return (last.x - first.x) / dt;
  }
}

export interface WheelPhysicsCallbacks {
  onUpdate: (angle: number, velocity: number) => void;
  onSettle: (angle: number, index: number) => void;
}

/**
 * Frame-based wheel simulator with:
 * 1. Velocity-driven spin from flick/drag release
 * 2. Exponential friction during free spin
 * 3. Spring snap so the wheel always settles centred on a slot
 */
export class WheelPhysicsEngine {
  private readonly config: Required<WheelPhysicsConfig>;
  private readonly callbacks: WheelPhysicsCallbacks;

  private rafId = 0;
  private lastFrameTime = 0;
  private angle = 0;
  private velocity = 0;
  private snapTarget: number | null = null;
  private phase: "idle" | "free" | "snap" = "idle";

  constructor(config: WheelPhysicsConfig, callbacks: WheelPhysicsCallbacks) {
    this.config = {
      ...DEFAULT_WHEEL_PHYSICS,
      ...config,
    };
    this.callbacks = callbacks;
  }

  get isRunning(): boolean {
    return this.phase !== "idle";
  }

  setAngle(angle: number) {
    this.angle = angle;
  }

  getAngle(): number {
    return this.angle;
  }

  stop() {
    if (this.rafId) {
      cancelAnimationFrame(this.rafId);
      this.rafId = 0;
    }
    this.phase = "idle";
    this.velocity = 0;
    this.snapTarget = null;
  }

  /**
   * Advance one slot forward (1) or backward (-1).
   * Safe for rapid / continuous clicks — each call queues another slot
   * on the existing snap target instead of resetting motion.
   */
  requestNavStep(direction: 1 | -1) {
    const { slotStep } = this.config;
    const stepDelta = direction === 1 ? -slotStep : slotStep;
    const impulseGain = 0.0048;

    if (this.phase === "idle") {
      this.snapTarget = this.angle + stepDelta;
      const delta = this.snapTarget - this.angle;
      this.velocity = delta * impulseGain;
      this.phase = "free";
      this.lastFrameTime = performance.now();
      this.rafId = requestAnimationFrame(this.tick);
      return;
    }

    const anchor = this.snapTarget ?? this.angle;
    this.snapTarget = anchor + stepDelta;

    const toward = this.snapTarget - this.angle;
    const desiredVelocity = toward * impulseGain;
    if (
      Math.abs(toward) > 0.5 &&
      (Math.sign(this.velocity) !== Math.sign(desiredVelocity) ||
        Math.abs(this.velocity) < Math.abs(desiredVelocity))
    ) {
      this.velocity = desiredVelocity;
    }

    if (this.phase === "snap" && Math.abs(toward) > slotStep * 0.15) {
      this.phase = "free";
    }

    if (!this.rafId) {
      this.lastFrameTime = performance.now();
      this.rafId = requestAnimationFrame(this.tick);
    }
  }

  /**
   * Jump to a specific slot (dots). Retargets mid-animation when already spinning.
   */
  retargetToIndex(index: number) {
    const { slotStep } = this.config;
    const target = getNavTargetAngle(this.angle, index, "shortest", slotStep);
    const impulseGain = 0.0048;

    if (this.phase === "idle") {
      const delta = target - this.angle;
      if (Math.abs(delta) < 0.05) return;

      this.snapTarget = target;
      this.velocity = delta * impulseGain;
      this.phase = "free";
      this.lastFrameTime = performance.now();
      this.rafId = requestAnimationFrame(this.tick);
      return;
    }

    this.snapTarget = target;
    const toward = target - this.angle;
    const desiredVelocity = toward * impulseGain;
    if (Math.abs(toward) > 0.5) {
      this.velocity = desiredVelocity;
    }
    if (this.phase === "snap" && Math.abs(toward) > slotStep * 0.1) {
      this.phase = "free";
    }
    if (!this.rafId) {
      this.lastFrameTime = performance.now();
      this.rafId = requestAnimationFrame(this.tick);
    }
  }

  /**
   * Begin inertial spin after pointer release.
   * @param velocityPxPerMs horizontal pointer velocity (px/ms)
   */
  release(velocityPxPerMs: number) {
    this.stop();
    const { dragSensitivity } = this.config;
    // Dragging right → positive px velocity → ring should rotate backward (prev)
    this.velocity = velocityPxPerMs * dragSensitivity;
    this.phase = "free";
    this.snapTarget = null;
    this.lastFrameTime = performance.now();
    this.rafId = requestAnimationFrame(this.tick);
  }

  /**
   * Programmatic spin (nav buttons / auto-advance) with moderate impulse
   * that still uses friction + snap for a natural feel.
   */
  impulseToIndex(index: number, direction: WheelNavDirection) {
    if (direction === 1 || direction === -1) {
      this.requestNavStep(direction);
      return;
    }
    this.retargetToIndex(index);
  }

  /** Gentle snap when user releases without meaningful flick */
  settleFromDrag() {
    this.stop();
    const { slotStep, slotCount } = this.config;
    const landingIndex = indexFromAngle(this.angle, slotStep, slotCount);
    this.snapTarget = snapAngleForIndex(landingIndex, this.angle, slotStep);
    this.velocity = 0;
    this.phase = "snap";
    this.lastFrameTime = performance.now();
    this.rafId = requestAnimationFrame(this.tick);
  }

  /** Immediate snap (reduced motion / init) */
  settleImmediate(index: number) {
    this.stop();
    const target = snapAngleForIndex(index, this.angle, this.config.slotStep);
    this.angle = target;
    this.callbacks.onUpdate(this.angle, 0);
    this.callbacks.onSettle(this.angle, index);
  }

  private enterSnapPhase() {
    const { slotStep, slotCount, friction } = this.config;

    if (this.snapTarget === null) {
      const landingIndex = resolveLandingIndex(
        this.angle,
        this.velocity,
        slotStep,
        slotCount,
        friction
      );
      this.snapTarget = snapAngleForIndex(landingIndex, this.angle, slotStep);
    }

    this.phase = "snap";
  }

  private tick = (now: number) => {
    const dt = Math.min(48, Math.max(1, now - this.lastFrameTime));
    this.lastFrameTime = now;

    const { friction, snapVelocityThreshold, snapSpring, snapDamping, slotStep, slotCount } =
      this.config;

    if (this.phase === "free") {
      // Exponential friction: v *= e^(-friction * dt)
      const decay = Math.exp(-friction * dt);
      this.velocity *= decay;
      this.angle += this.velocity * dt;

      if (Math.abs(this.velocity) < snapVelocityThreshold) {
        this.enterSnapPhase();
      }
    }

    if (this.phase === "snap") {
      const target = this.snapTarget!;
      const error = target - this.angle;

      // Critically-damped spring — merges remaining motion into exact slot centre
      const dampFactor = Math.pow(snapDamping, dt / 16.67);
      this.velocity = this.velocity * dampFactor + error * snapSpring * dt;
      this.angle += this.velocity * dt;

      const settled =
        Math.abs(error) < 0.06 &&
        Math.abs(this.velocity) < 0.0006;

      if (settled) {
        this.angle = target;
        this.velocity = 0;
        const index = indexFromAngle(target, slotStep, slotCount);
        this.phase = "idle";
        this.rafId = 0;
        this.snapTarget = null;
        this.callbacks.onUpdate(this.angle, 0);
        this.callbacks.onSettle(this.angle, index);
        return;
      }
    }

    this.callbacks.onUpdate(this.angle, this.velocity);
    this.rafId = requestAnimationFrame(this.tick);
  };
}
