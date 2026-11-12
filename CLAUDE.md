# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Commands

```bash
npm run dev       # Vite dev server with HMR
npm run build     # tsc -b (type-check) then vite build → dist/
npm run lint      # ESLint (flat config, eslint.config.js)
npm run preview   # serve the built dist/
npx tsc -b        # type-check only
```

There is no test suite. Playwright is a devDependency but has no config or tests. Check changes visually in a browser. Local screenshots go in `screenshot/`, which is gitignored. `README.md` is still the unmodified Vite template.

## Stack

React 19, Vite 8, TypeScript 6 and Tailwind CSS v4. Tailwind is wired in through `@tailwindcss/vite`, so there is no `tailwind.config`; all custom CSS lives in `src/index.css`. All animation uses **framer-motion**, and smooth scrolling uses **Lenis**. `gsap` and `@gsap/react` are installed but not imported anywhere. `src/App.css` and `src/assets/*` are leftovers from the template and aren't used.

The TS config sets `verbatimModuleSyntax` (type-only imports must use `import type`), `erasableSyntaxOnly` (no enums, namespaces or parameter properties) and `noUnusedLocals`/`noUnusedParameters`. ESLint uses the recommended rules from `eslint-plugin-react-hooks` v7, which flag setState called synchronously inside effects.

## Architecture

This is a single-page portfolio with no router. `src/App.tsx` stacks the sections in order: Intro curtain → Nav → Hero → Marquee band → About → Academia → Music → Photography → Contact. Navigation uses section `id`s (`#top`, `#about`, `#academia`, `#music`, `#photography`, `#contact`). The `links` array in `Nav.tsx` and its IntersectionObserver for the active link both depend on these ids, so renaming or adding a section means updating Nav as well.

### Load sequence
`Intro` shows a full-screen curtain and stops Lenis while it is up. It calls `onDone` as the curtain *starts* lifting, which sets `ready` in App. `Hero` gets `ready` and passes `show={ready}` to its reveal components, so the hero animation overlaps the curtain exit instead of waiting on in-view detection. When the user prefers reduced motion, Intro skips straight to `done`.

### Scroll layering (sticky hero)
`Hero` is `sticky top-0 z-0 h-svh`. **Every later section must use the `.section` class** (`position: relative; z-index: 10; background: var(--bg)`) so it slides over the pinned hero. A section without it, or with a transparent background, will show the hero through it. Hero's scale, opacity and parallax are framer-motion `useTransform`s on `scrollY`. Its vertical fit depends on `.hero-title` / `.hero-strip` in `index.css`: the headline font is clamped against both `vw` and `vh`, and the photo strip is hidden below 820px viewport height.

### Lenis
`components/SmoothScroll.tsx` owns the one Lenis instance. It sets `history.scrollRestoration = 'manual'` and scrolls to the top so the intro always plays. `src/lib/lenis.ts` is a small `useSyncExternalStore` store, and any component reads the instance with `useLenis()` (no context provider). Lenis still fires native scroll events, so framer-motion's `useScroll`/`useInView` work unchanged. Code that locks scrolling calls `lenis.stop()` and must restore it in effect cleanup. The Nav mobile menu only ever *stops* Lenis while open, so it never overrides the Intro's lock. Programmatic navigation uses `lenis.scrollTo(href, …)`; plain anchor links are smoothed by Lenis's `anchors` option.

### Music horizontal timeline
`HorizontalTimeline` in `Music.tsx` is a scroll-pinned section. The outer div's height is `100vh + distance * SCROLL_LENGTH`, where `distance` is the track's `scrollWidth` minus the viewport width. Distance is measured in `useLayoutEffect`, on resize, and again after `document.fonts.ready` because the display font changes the widths. Vertical `scrollYProgress` drives the track's `x` through an `easeInOut` transform. To change the scroll speed, tune `SCROLL_LENGTH`.

### Motion system
- `src/lib/motion.ts` holds the shared bezier curves (`EASE_OUT_EXPO`, `EASE_OUT`, `EASE_IN_OUT_SOFT`, `EASE_IN_OUT`) and staggers. In CSS, `--ease-expo` mirrors `EASE_OUT_EXPO`. Use these rather than inline curves. The motion language copies the OFF+BRAND style used on landonorris.com.
- `src/components/motion/` holds the reusable primitives. `RevealLines`, `RevealChars` and `RevealImage` follow one pattern: an optional `show` prop gives external control, and without it they reveal once on `useInView`. `RevealLines` and `RevealImage` wipe a solid "highlighter" bar off the content. On a non-default background, pass a matching `bar` color, e.g. `bar="var(--bg-alt)"` in the Photography section.
- `RollText` is pure CSS. It animates when a `.group` ancestor (or the element itself with `roll-hover`) is hovered, so wrap it in an element with `group`. `ArrowSwap` (in `ui/Button.tsx`) works the same way.
- Every animated component checks `useReducedMotion()` and renders plain static markup when it is set. `index.css` also has a `prefers-reduced-motion` block for the CSS animations. New animations should keep both paths.

### Styling conventions
Design tokens live as CSS variables on `:root` in `index.css` (light values: `--bg #fafaf8`, `--bg-alt #f0efea`, `--ink #0a0a0a`, `--ink-soft`, `--muted #6b6b66`, `--faint`, `--line #e3e2dc`, `--line-strong`, `--accent #ffb800`, `--on-accent`, plus photo/media/shadow tokens). An `@theme inline` block registers them as Tailwind colours, so components write `bg-bg`, `bg-bg-alt`, `text-ink`, `text-muted`, `border-line`, `bg-accent`, `text-on-accent` (opacity modifiers work: `bg-bg/85`). **Never hardcode hex values in components**, because they won't follow the theme. Text or icons on the accent use `--on-accent`, which stays dark in both themes, never `--ink`. The only fixed colours are the always-dark surfaces, the `Intro` curtain and the mobile menu (`#0a0a0a` / `#fafaf8`). `.section` is unlayered CSS, so its `background: var(--bg)` beats Tailwind's layered `bg-*` utilities. That is why Academia and Photography's `bg-bg-alt` currently has no visible effect. Shared classes are defined in `index.css` rather than as components: `.display` (big uppercase headline), `.eyebrow` (small-caps label with an accent dash), `.btn`/`.btn-outline`, `.tag`, `.photo` (placeholder tile, grayscale until hover) and `.media`. Fonts are Inter for body text and Space Grotesk for `.font-display`/`.display`, both loaded through the Google Fonts `@import` at the top of `index.css`.

### Theme (light / dark)
`:root[data-theme='dark']` in `index.css` overrides the tokens with a warm-charcoal palette (`--bg #121211`, `--ink #f2f1ec`; `--muted`/`--faint` swap values; the accent is unchanged). The page bg is lifted off `#0a0a0a` on purpose, so the intro curtain still reads as its own plane. The user's preference (`system` | `light` | `dark`) is stored in `localStorage['theme']`, and a missing key means `system`. An inline script in `index.html` resolves it and sets `data-theme` before first paint. `src/lib/theme.ts` repeats that logic, so keep the two in sync. It is a `useSyncExternalStore` store (`useThemePreference()`, `setThemePreference(pref, origin)`) that follows live OS changes in system mode and syncs across tabs. Switching reveals the new theme as a View Transition circle from the clicked button, with an instant swap under reduced motion or without the API. The circle is a CSS animation on `::view-transition-new(root)`, scoped to `html.theme-reveal` and driven by `--reveal-x/y/r`. Don't start it with `animate()` from `transition.ready`: that can land a frame late and flash the whole new theme. During the reveal, Lenis's glide is stopped in place and wheel/touch input is swallowed, because the old theme is a still snapshot and any scroll tears it from the live page. Don't use `lenis.stop()` for that: it sets `overflow: clip` and reflows the page. CSS transitions are suppressed for the frame where the tokens flip (`.theme-switching`). `components/ThemeToggle.tsx` is the 3-way control in the nav, styled with `currentColor` so it also works on the dark mobile menu.

### Content
- Each section keeps its content as const arrays at the top of its component file, e.g. `projects` in Academia; `releases`, `archive` and `tools` in Music; `photos` in Photography; `skillGroups` in About.
- All external URLs and the email address live in `src/data/links.ts` (`links`, `socials`). Import from there instead of hardcoding URLs.
- Much of the content is still placeholder, marked with `TODO`: YouTube ids like `TODO_*`, `href: '#'` links, an empty Instagram URL, and photo tiles that are gradient `.photo` divs rather than real `<img>`s.
- `MediaEmbed` is a click-to-load facade, so no iframe loads until the user clicks. For YouTube it builds the thumbnail from the video id; SoundCloud takes a full URL.
- `old_resources/` is gitignored. It holds the source material for the site copy: `aboutme.txt`, the old hobby-site URLs and screenshots.
