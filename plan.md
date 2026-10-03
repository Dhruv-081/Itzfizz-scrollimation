# ITZ FIZZ Website Plan

## Product outcome
Build a responsive, public one-page landing experience inspired by the supplied reference. The hero is the product moment: a letter-spaced `W E L C O M E I T Z F I Z Z` headline, percentage impact metrics, premium entrance motion, and a 10-second supplied video scrubbed by scroll. The hero reserves the first viewport and the later site content is revealed only after the scroll sequence completes.

## Architecture and project structure

- `package.json` — lightweight Vite-based static frontend with GSAP.
- `index.html` — crawler-visible home content, metadata, and app entry.
- `src/main.js` — semantic page markup, GSAP intro, scroll-progress state, accessible navigation, and video scrubbing loop.
- `src/styles.css` — responsive layout, design tokens, motion-safe fallbacks, and visual states.
- `public/assets/itz-fizz-scroll.mp4` — supplied 10-second hero video.
- `public/assets/itz-fizz-logo.png` — project-specific favicon/brand icon.
- `public/d-routes.json` — route manifest for `/`.
- `ideas.md` — accepted design direction.

## Interaction logic

1. Render meaningful home content in initial HTML for SEO and no-JS resilience.
2. Intro timeline reveals the eyebrow, headline words, copy, and stat cards with staggered opacity/translate motion.
3. The hero uses `position: sticky` inside a 10-second-height scroll track. Scroll progress is computed from the track bounds, then smoothed in a `requestAnimationFrame` loop so the video `currentTime` and visual transforms never require layout updates.
4. A completion threshold of 98.5% flips a `data-complete` state, updates the progress rail, and unblocks the “impact system” sections after the hero. Before completion, the next content is visually and interactionally gated by a translucent cover and copy cue; keyboard users can use the completion button to jump the hero to the end.
5. `prefers-reduced-motion` skips intro movement and sets a poster-like first frame while keeping the content and completion control usable.

## Delivery architecture

Use static frontend delivery because the page has no private data, server actions, or dynamic APIs. The build command is `pnpm install --frozen-lockfile && pnpm build`; output is `dist` containing `index.html`, JS/CSS, media, and the logo. Public versioned assets are cacheable for a long lifetime; the stable HTML is left revalidatable by the platform. The current route set is `/`, with `/d-routes.json` as a system manifest asset.

## Verification

- Run the project's build and `node --check` on the authored JavaScript.
- Start the configured preview server and verify `/`, `/d-routes.json`, and the video asset return successfully.
- Review the implementation for semantic structure, responsive CSS, reduced-motion behavior, scroll interpolation, and no per-scroll layout/reflow work.
- Save a canonical checkpoint before publication, then publish the latest checkpoint and report only the confirmed live URL.
