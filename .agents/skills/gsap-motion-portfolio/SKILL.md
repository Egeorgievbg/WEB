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
2. Only transform and opacity. No continuous animation of width/height/top/left, filter/blur, box-shadow, layout or scroll offsets.
3. Reveal with transform/opacity, 0.9–1.65 s, `power3.out`; floats use 6–12 s gentle `sine.inOut`, yoyo/repeat.
4. Limit cursor parallax to fine-pointer devices and desktop; `quickTo` smoothed movement within ±24 px.
5. Pause/restart continuous tweens on ScrollTrigger enter/leave and when tab hidden. No perpetual offscreen GPU work.
6. Respect `(prefers-reduced-motion: reduce)`: display static artwork; no animated opacity fades or endless loops. Preserve all content if GSAP CDN is blocked.
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
