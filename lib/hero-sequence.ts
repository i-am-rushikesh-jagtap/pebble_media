export const HERO_FRAME_COUNT = 241;

export function heroFrameUrl(frame: number): string {
  return `/sequence/img_${frame.toString().padStart(5, "0")}.jpg`;
}
