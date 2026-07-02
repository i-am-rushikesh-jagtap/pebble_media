export const HERO_READY_EVENT = "pebble:hero-ready";
export const PRELOADER_DONE_EVENT = "pebble:preloader-done";

const MIN_PRELOADER_MS = 900;
const MAX_PRELOADER_MS = 5200;

type WindowWithPebble = Window & {
  __pebbleHeroReady?: boolean;
  __pebblePreloaderDone?: boolean;
};

export function isHeroReady(): boolean {
  if (typeof window === "undefined") return false;
  return Boolean((window as WindowWithPebble).__pebbleHeroReady);
}

export function isPreloaderDone(): boolean {
  if (typeof window === "undefined") return false;
  return Boolean((window as WindowWithPebble).__pebblePreloaderDone);
}

export function markHeroReady(): void {
  if (typeof window === "undefined") return;
  const win = window as WindowWithPebble;
  if (win.__pebbleHeroReady) return;
  win.__pebbleHeroReady = true;
  window.dispatchEvent(new CustomEvent(HERO_READY_EVENT));
}

export function dispatchPreloaderDone(): void {
  if (typeof window === "undefined") return;
  const win = window as WindowWithPebble;
  if (win.__pebblePreloaderDone) return;
  win.__pebblePreloaderDone = true;
  window.dispatchEvent(new CustomEvent(PRELOADER_DONE_EVENT));
}

function waitForWindowLoad(): Promise<void> {
  if (document.readyState === "complete") return Promise.resolve();
  return new Promise((resolve) => {
    window.addEventListener("load", () => resolve(), { once: true });
  });
}

function waitForFonts(): Promise<void> {
  if (!document.fonts?.ready) return Promise.resolve();
  return document.fonts.ready.then(() => undefined);
}

function waitForHeroFrame(): Promise<void> {
  if (isHeroReady()) return Promise.resolve();
  return new Promise((resolve) => {
    window.addEventListener(HERO_READY_EVENT, () => resolve(), { once: true });
  });
}

function wait(ms: number): Promise<void> {
  return new Promise((resolve) => window.setTimeout(resolve, ms));
}

/** Resolves when critical UI can appear without a jarring flash. */
export async function waitForAppReady(needsHeroFrame: boolean): Promise<void> {
  const started = performance.now();

  const readiness = Promise.all([
    waitForWindowLoad(),
    waitForFonts(),
    needsHeroFrame ? waitForHeroFrame() : Promise.resolve(),
  ]);

  await Promise.race([readiness, wait(MAX_PRELOADER_MS)]);

  const elapsed = performance.now() - started;
  if (elapsed < MIN_PRELOADER_MS) {
    await wait(MIN_PRELOADER_MS - elapsed);
  }
}

export function setPreloading(active: boolean): void {
  document.documentElement.classList.toggle("app-preloading", active);
}

export function getMaxPreloaderMs(): number {
  return MAX_PRELOADER_MS;
}
