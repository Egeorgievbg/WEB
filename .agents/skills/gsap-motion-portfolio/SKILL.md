---
name: gsap-motion-portfolio
description: Build and verify responsive GSAP + ScrollTrigger floating 3D artwork inside this static Bulgarian portfolio without breaking the original 8B motion kit.
---
# GSAP Motion Direction · Evgeni Georgiev Portfolio

## Stack and scope
- Static HTML, CSS, JavaScript; public entrypoint `index.html`, Vercel static hosting.
- Existing 8B CSS scroll-driven motion and inline motion-kit must remain intact. Do NOT delete, rename, or replace any `data-8b-*` hooks, existing sections or animation timelines.
- GSAP core and ScrollTrigger, pinned to version `3.13.0` and loaded with defer, are used **only** for assets under `assets/floating` via `assets/motion/eg-motion.js`.
- Source images are the original individually generated transparent PNG files. Production derivatives are optimized transparent WebP, committed as binary Git blobs under `assets/floating/`.
- The 20 art directions: orbital ecosystem, code panel, layers, e-commerce, AI processor, neural brain, mobile device, automation gear, digital orb, data cube, browser, growth, API connector, cloud infra, cursor, titanium Möbius, energy ribbon, quantum orb, crystal prism and modular core.

## Motion design rules
1. Design hierarchy before animation: text first, strong focal visual, supporting motifs subordinated. Keep headings legible.
2. Only transform and opacity. No continuous animation of width/height/top/left, filter/blur, box-shadow, layout or scroll offsets. Transform ownership must be isolated: `.eg-float__scroll` for scrub, `.eg-float__reveal` for arrival, `.eg-float__drift` for perpetual floating, `.eg-float__parallax` for pointer, `.eg-float__image` for pulse. Never tween the same property on the same element from competing timelines.
3. Reveal with transform/opacity, 0.95–1.2 s, `power3.out`. Floats use visible 3.2–5.9 s oscillations, 20–41px vertical displacement, 13–19px horizontal displacement and ±8–12° tilt, with periodic scale/pulse on the innermost image only. Reduce displacement on mobile.
4. Limit cursor parallax to fine-pointer devices and desktop; `quickTo` smoothed movement within ±24 px.
5. Pause/restart continuous tweens on ScrollTrigger enter/leave and when tab hidden. The visibility handler MUST respect the item's in-view state and never resume all tweens globally. No perpetual offscreen GPU work.
6. Respect `(prefers-reduced-motion: reduce)`: display static artwork; no animated opacity fades or endless loops. Preserve all content if GSAP CDN is blocked. If GSAP is missing, CSS fallback floats may run only with no reduced-motion preference.
7. Treat artwork as decorative: `alt=""`, `aria-hidden=true`, `pointer-events:none`. Preserve keyboard focus and links.
8. Guard CLS: explicit aspect-ratio and visual sizing via CSS variables; preload only the Hero orb and lazy-load offscreen assets.
9. Keep total asset weight ~1.1 MB, favor immutable cacheable asset paths and no data-URI base64 in HTML.
10. Ensure narrow 360/390 px devices show only 2–3 Hero elements, with no horizontal scroll.

## Workflow for changes
1. Edit feature branch, never the production branch directly for visual redesigns.
2. Run `node --check assets/motion/eg-motion.js`.
3. Run `python3 scripts/validate_portfolio.py` and `node scripts/validate_motion.mjs` locally if Node is available. No GitHub Actions, billing-dependent CI, or Vercel CLI secrets.
4. Verify real deployed Preview at 390, 768, and 1440 px, test keyboard, reduced-motion, Safari/WebKit and Chromium where available.
5. Merge with an explicit user-requested release; verify the public URL and inspect browser console/performance afterwards.
6. Never invent project metrics, client claims, prices, reviews, or visual proof of results.

## Editing map
- `index.html`: pinned scripts + stylesheet + Hero preload.
- `assets/motion/eg-motion.css`: responsive layers, placement, visibility, pointer safety.
- `assets/motion/eg-motion.js`: the declarative array of 20 artwork placements, appearance + floating + mouse parallax.
- `assets/floating/*.webp`: optimized production assets, with alpha; do not delete original user-provided PNG sources.

## Rollback
Remove `eg-motion.css`, GSAP/ScrollTrigger, and `eg-motion.js` tags from `index.html`. The original SVG-based 8B site keeps working unchanged.

## Browser legacy compatibility and conflict ownership
- 8B's scroll engine is gated by `data-8b-live`, set only when `CSS.supports('animation-timeline: view()')` is true. Firefox before 159 lacks native support; this is NOT an application failure.
- Kinetic V2 therefore implements `legacyScrollBridge()` with GSAP ScrollTrigger only when `data-8b-live` is absent. Never add the bridge on top of working 8B CSS view-timelines.
- Keep native 8B initial animations and scroll effects untouched when supported. For the fallback, compose old SVG/well motion on parent elements; do not tween the same target as the new GSAP floating graphics.
- Original mockup images receive gentle independent interior transforms; the old CSS masks, hanging frames, path animations and `.is-in` hooks retain their original ownership.
- Use a short continuous motion loop that remains active while its section is visible; avoid frozen state after a one-time reveal. Re-check after scrolling away and back, tab hiding and restoring, and toggling reduced-motion.
