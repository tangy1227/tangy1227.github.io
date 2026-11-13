import { useSyncExternalStore } from 'react'
import { flushSync } from 'react-dom'
import { holdScroll } from './lenis'

/**
 * Colour theme. The user picks a preference: 'system' follows the OS / browser
 * (`prefers-color-scheme`), 'light' and 'dark' override it. The resolved theme
 * lives on <html data-theme="light|dark">; index.css swaps tokens on it.
 *
 * The inline script in index.html applies the same logic before first paint so
 * there's no flash of the wrong theme. Keep the two in sync (storage key and
 * values).
 */
export type ThemePreference = 'system' | 'light' | 'dark'
type Theme = 'light' | 'dark'

const STORAGE_KEY = 'theme'
const media = window.matchMedia('(prefers-color-scheme: dark)')
const listeners = new Set<() => void>()

function readStored(): ThemePreference {
  try {
    const v = localStorage.getItem(STORAGE_KEY)
    if (v === 'light' || v === 'dark') return v
  } catch {
    // Storage blocked (private mode, sandboxed iframe): fall back to system.
  }
  return 'system'
}

let preference: ThemePreference = readStored()

const resolve = (p: ThemePreference): Theme => (p === 'system' ? (media.matches ? 'dark' : 'light') : p)

function apply() {
  const theme = resolve(preference)
  const root = document.documentElement
  if (root.dataset.theme === theme) return
  // Flip with CSS transitions off. Otherwise elements with `transition-colors`
  // (nav links, buttons) fade from the old palette for 500ms while the
  // background has already switched.
  root.classList.add('theme-switching')
  root.dataset.theme = theme
  root.style.colorScheme = theme
  void document.body.offsetHeight // flush styles while transitions are off
  requestAnimationFrame(() => root.classList.remove('theme-switching'))
}

function emit() {
  listeners.forEach(l => l())
}

// OS theme flipped while on 'system'.
media.addEventListener('change', () => {
  if (preference === 'system') apply()
})
// Preference changed in another tab.
window.addEventListener('storage', e => {
  if (e.key !== STORAGE_KEY && e.key !== null) return
  preference = readStored()
  apply()
  emit()
})

apply()

let revealId = 0

/**
 * Set the preference. When the visible theme actually changes, the new theme
 * spreads as a circle from `origin` (the control that was clicked) using the
 * View Transition API, in the same spirit as the mobile menu's clip reveal.
 * Falls back to an instant swap without the API or under reduced motion.
 *
 * The circle is a CSS animation on `::view-transition-new(root)` (index.css,
 * `.theme-reveal`), not one started from `transition.ready`: the pseudo-element
 * then starts clipped on the very first frame. Starting it from JS can land a
 * frame late, which shows the whole new theme for one frame (a flash).
 *
 * The old theme is a still snapshot for the whole reveal, so scrolling is held
 * until it ends: if the page kept gliding underneath (Lenis, trackpad
 * momentum), the two halves would tear apart along the circle's edge.
 */
export function setThemePreference(next: ThemePreference, origin?: { x: number; y: number }) {
  if (next === preference) return
  const changesTheme = resolve(next) !== resolve(preference)

  preference = next
  try {
    if (next === 'system') localStorage.removeItem(STORAGE_KEY)
    else localStorage.setItem(STORAGE_KEY, next)
  } catch {
    // Not persisted; still applies for this visit.
  }

  const commit = () => {
    apply()
    flushSync(emit)
  }

  const reduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches
  if (!changesTheme || reduce || !('startViewTransition' in document)) {
    commit()
    return
  }

  const { x, y } = origin ?? { x: window.innerWidth / 2, y: 0 }
  const radius = Math.hypot(Math.max(x, window.innerWidth - x), Math.max(y, window.innerHeight - y))
  const root = document.documentElement
  const id = ++revealId

  const releaseScroll = holdScroll()
  root.style.setProperty('--reveal-x', `${x}px`)
  root.style.setProperty('--reveal-y', `${y}px`)
  root.style.setProperty('--reveal-r', `${Math.ceil(radius)}px`)
  root.classList.add('theme-reveal')

  const done = () => {
    releaseScroll()
    // A newer switch skipped this one and now owns the reveal state.
    if (id !== revealId) return
    root.classList.remove('theme-reveal')
    root.style.removeProperty('--reveal-x')
    root.style.removeProperty('--reveal-y')
    root.style.removeProperty('--reveal-r')
  }
  // `finished` settles even when the transition is skipped.
  document.startViewTransition(commit).finished.then(done, done)
}

function subscribe(cb: () => void) {
  listeners.add(cb)
  return () => {
    listeners.delete(cb)
  }
}

/** The user's stored preference ('system' unless they picked one). */
export function useThemePreference(): ThemePreference {
  return useSyncExternalStore(subscribe, () => preference, () => 'system')
}
