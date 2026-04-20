
## Goal
Add a beautiful animated splash/loading screen that appears once when users first enter the Kaffeine site, then gracefully fades away to reveal the app.

## Approach
A full-screen overlay mounted at the app root (in `App.tsx`) that auto-dismisses after a short duration (≈1.8s) or as soon as fonts/initial render are ready. Uses framer-motion (already installed) and the existing amber/glow design tokens — no new dependencies.

Shown only on the first visit per session (sessionStorage flag) so it doesn't interrupt every navigation.

## What to build

### 1. New component: `src/components/SplashScreen.tsx`
A fixed full-screen layer with:
- **Background**: Deep `bg-background` with drifting amber radial gradients (reuse `animate-orb-drift` keyframe).
- **Center mark**: Animated "K" logo mark in a circle with `animate-glow-pulse`, surrounded by a rotating conic-gradient ring (amber → transparent).
- **Wordmark**: "Kaffeine" in Playfair Display, letters revealed with a staggered fade+rise (framer-motion).
- **Tagline**: "Where minds converge" fading in below after the wordmark.
- **Progress bar**: Thin amber gradient bar at the bottom that fills 0→100% over the splash duration (shimmer effect).
- **Exit**: After ~1.8s, the whole layer fades + scales out (0.6s) using `AnimatePresence`.
- Respects `prefers-reduced-motion` — skips the heavy animation, shows a quick fade.

### 2. Wire it into `src/App.tsx`
- Add `useState` for `loading`, default `true` only if `sessionStorage.getItem("kaffeine_splash_seen")` is null.
- Render `<AnimatePresence>` wrapping `<SplashScreen onDone={...} />` above the `BrowserRouter`.
- On done: set `sessionStorage` flag and flip `loading` to false.

## Out of scope
- No route-level loading spinners (separate concern).
- No skeleton changes — those already shimmer.
- No backend / asset preloading logic — purely a visual splash.

## Files touched
- **New**: `src/components/SplashScreen.tsx`
- **Edited**: `src/App.tsx`
