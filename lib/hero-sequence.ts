export const HERO_FRAME_COUNT = 241;

/** ScrollTrigger range for the pinned hero — keep in sync with typography scrub. */
export const HERO_PIN_SCROLL_END = "+=400%";
export const HERO_PIN_SCRUB = 0.5;

export function heroFrameUrl(frame: number): string {
  return `/sequence/img_${frame.toString().padStart(5, "0")}.jpg`;
}
