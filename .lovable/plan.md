
The user wants the Kaffeine site to feel animated, beautiful, and futuristic — while staying on-brand (dark theme, Playfair + Inter, amber/gold accents). I'll keep the warm intellectual feel but layer in modern motion, depth, and glow effects. No stack changes needed — `framer-motion` is already used, and Tailwind keyframes can be extended.

## Vision

A "warm futurism" feel: deep dark backgrounds with subtle animated gradients, glowing amber accents, soft glassmorphism on cards, smooth scroll-triggered reveals, and tasteful micro-interactions. Premium and intellectual — not gamer/neon.

## Plan

### 1. Design tokens & global polish (`src/index.css`, `tailwind.config.ts`)
- Add glow utilities: `shadow-glow`, `shadow-glow-lg` using amber primary at low opacity.
- Add glass utility: `.glass` (backdrop-blur + translucent card bg + subtle border).
- Add gradient text variants and an animated gradient background utility.
- New keyframes: `float`, `shimmer`, `glow-pulse`, `gradient-shift`, `slide-up-fade`, `scale-in`.
- Smooth scroll + custom amber-tinted scrollbar + selection color.
- Subtle noise/grain overlay option for depth.

### 2. Reusable motion primitives (new files)
- `src/components/motion/AnimatedBackground.tsx` — fixed full-screen layer with slow-moving radial amber gradients + grain.
- `src/components/motion/Reveal.tsx` — wrapper using framer-motion `whileInView` for scroll-triggered fade-up (used across pages).
- `src/components/motion/Spotlight.tsx` — mouse-follow glow for hero sections.
- `src/components/motion/MagneticButton.tsx` — buttons that subtly track the cursor.

### 3. Hero redesign (`src/pages/Index.tsx`)
- Add Spotlight + animated gradient orbs behind the headline.
- Animate headline word-by-word (stagger), with the "Converge" word getting an animated gradient sweep.
- Floating decorative elements (subtle rings/dots).
- CTA buttons become MagneticButtons with glow on hover.

### 4. Header (`src/components/layout/Header.tsx`)
- Animated logo (subtle pulse glow on the K mark).
- Active link gets an animated underline (layoutId for smooth transition between links).
- Header background sharpens (more blur + border glow) on scroll.

### 5. Cards (`EventCard`, `SpeakerCard`, `VenueCard`)
- Glassmorphism style, gradient border on hover, image zoom + tilt on hover, glow shadow.
- Price/date badges get the amber glow treatment.

### 6. Section transitions
- Stats section: animated count-up on scroll into view.
- FAQ: smoother accordion + glow on the active item.
- Upcoming Events grid: staggered Reveal on scroll.
- CTA cards (Share Ideas / Host Event): hover lift + animated icon.

### 7. Page transitions (`src/App.tsx`)
- Wrap routes in framer-motion `AnimatePresence` for fade/slide between pages.

### 8. Sub-pages polish
- `Events`, `Speakers`, `Venues`: animated filter bar, staggered grid reveals.
- `About`, `Terms`, `Privacy`: Reveal-wrapped sections, animated section dividers.
- `Footer`: subtle top gradient line, hover effects on links.

### 9. Loading & feedback
- Replace plain skeletons with shimmer-animated skeletons.
- Toast/sonner: glassy style aligned with new theme.

## Out of scope (to keep this focused)
- No 3D / react-three-fiber (can be a follow-up).
- No content/copy changes.
- No backend or schema changes.
- Respects `prefers-reduced-motion` — heavy animations gated behind the media query.

## Files touched (estimate)
- New: 4 motion primitive components.
- Edited: `index.css`, `tailwind.config.ts`, `App.tsx`, `Header.tsx`, `Footer.tsx`, `Index.tsx`, 3 card components, `Events.tsx`, `Speakers.tsx`, `Venues.tsx`, `About.tsx`, `Terms.tsx`, `Privacy.tsx`, `skeleton.tsx`.
