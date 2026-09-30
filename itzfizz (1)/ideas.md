# ITZ FIZZ — Design Direction

## Theme Name
**Neon Impact / Quiet Voltage**

A dark, editorial landing page that treats motion as the brand: restrained ink-black surfaces, electric lime accents, and a warm off-white type system. The supplied video is the signature visual, framed like a kinetic poster rather than a conventional media block.

## Reference
The visual and motion ground truth is the requested hero inspiration at https://paraschaturvedi.github.io/car-scroll-animation plus the supplied `public/assets/itz-fizz-scroll.mp4` clip. Preserve the feeling of a scroll-controlled object progressing through a cinematic sequence before the next section opens.

## Design dimensions

- **Movement:** The hero behaves like a locked stage. A scroll progress rail and counter make the sequence legible. The video scrubs to progress, eased by GSAP ticker interpolation, while supporting text stays composed.
- **Core principles:** High contrast, deliberate negative space, editorial alignment, one bright signal color, and motion that responds to the user rather than autoplaying at them.
- **Color philosophy:** Ink black (`#0b0d0d`) anchors the page, chalk (`#f3f0e7`) carries the main type, lime (`#d8f94f`) marks progress and action, and muted moss/gray surfaces separate sections without gradients.
- **Layout paradigm:** Desktop split-stage hero with text on the left, video stage on the right, stats band below; collapses to a stacked mobile experience with the stage first and stats as a clean two-column list.
- **Signature elements:** Vertical `SCROLL TO FIZZ` rail, lime progress line, rounded video window with a thin chalk border, oversized spaced wordmark, and pill-shaped micro labels.
- **Interaction philosophy:** Every interactive element has a clear hover/focus state. Scrolling is the primary gesture, with an explicit “keep scrolling” cue that becomes a completion state after the clip reaches 100%.
- **Animation:** Intro text uses a gentle upward reveal; stats stagger by 100ms; the video progress is scroll-tied and smoothed with an exponential lerp. No layout-affecting animation in the scroll loop.
- **Typography system:** Use `Space Grotesk` for display/UI and `DM Mono` for overlines, numbers, and technical cues. Use large uppercase display text with generous tracking; body text is compact and readable.
- **Brand essence:** Confident, kinetic, bright in a controlled way, and a little irreverent.
- **Brand voice:** Short, direct, and impact-oriented — “Make the moment move.”
- **Wordmark/logo:** A simple custom “F”/spark symbol in a full-bleed lime square for the project icon, with the text wordmark kept separate in the page header.
- **Signature brand color:** Electric lime (`#d8f94f`).
