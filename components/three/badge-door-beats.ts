// Story beats along the badge door section's scroll progress, shared by the
// lazy-loaded 3D scene and the text overlay (kept apart so the overlay doesn't pull in three).
export const BEATS = {
  badgeIn: [0.05, 0.3],
  granted: 0.38,
  door: [0.55, 0.8],
  dolly: [0.6, 1],
} as const;

// Scroll ranges where each step's text is shown.
export const STEP_RANGES: readonly (readonly [number, number])[] = [
  [0, 0.36],
  [0.36, 0.56],
  [0.56, 1],
];
