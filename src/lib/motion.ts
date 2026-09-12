// Shared easing curves + timings so every animation on the site feels related.
// Modelled on the OFF+BRAND motion language (landonorris.com): expo-out for
// hover/UI, power2 for reveals, a sharp in-out for curtains.
export type Bezier = [number, number, number, number]

/** cubic-bezier(.19, 1, .22, 1) — expo out. Snappy start, long soft landing. */
export const EASE_OUT_EXPO: Bezier = [0.19, 1, 0.22, 1]
/** GSAP power2.out equivalent — used for clip-path text reveals. */
export const EASE_OUT: Bezier = [0.215, 0.61, 0.355, 1]
/** GSAP power2.inOut — used for the highlighter bars that wipe off text. */
export const EASE_IN_OUT_SOFT: Bezier = [0.45, 0, 0.55, 1]
/** Sharp in-out for full-screen curtains / page transitions. */
export const EASE_IN_OUT: Bezier = [0.76, 0, 0.24, 1]

/** Per-character stagger for roll / slide-up text. */
export const CHAR_STAGGER = 0.02
/** Per-line stagger for headline reveals. */
export const LINE_STAGGER = 0.14
