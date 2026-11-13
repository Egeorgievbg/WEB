# Motion brand implementation

**Goal:** Make Evgeni Georgiev's personal site feel like a premium creative-technology studio, with 20 individually authored floating 3D brand assets.

The page remains static, without React, bundling or GitHub Actions. GSAP 3.13.0 and ScrollTrigger are pinned; original CSS scroll-driven timelines remain intact.

## Asset map
| Group | Images | Position |
| --- | --- | --- |
| Hero | 18 quantum orb, 16 Möbius, 17 energy ribbon, 15 cursor, 19 prism | sticky hero visual field |
| About | 01 digital ecosystem, 02 code tile | section edges |
| Services | 03 layers, 04 cart, 05 AI chip | three service posters |
| Process | 08 automation gear | workflow dial |
| Solutions | 11 browser, 13 API, 10 data cube, 06 AI brain | four solution rows |
| Projects | 12 analytics, 14 cloud | selected project cards |
| Offers | 07 smartphone, 20 modular core | package cards |
| Contact | 09 digital orb | map illustration |

**20/20 assets used.** Each derived WebP is a separate transparent image with its own URL in `assets/floating/`. Original PNG source files were not modified.

## Technical constraints
- Use transform and opacity animations only, avoid scroll-jacking or enormous GPU layers.
- `prefers-reduced-motion` makes artwork static.
- Hero artwork is preloaded. Offscreen images use lazy loading.
- Missing GSAP or asset failure leaves the interface functional.
- Animation visibility is controlled by ScrollTrigger, paused offscreen and in hidden tabs.

## Local tests
```bash
node --check assets/motion/eg-motion.js
node scripts/validate_motion.mjs
python3 scripts/validate_portfolio.py
```

Visual tests require a real browser and should check 390px mobile, 768px tablet and 1440px desktop, plus keyboard and reduced-motion.

GitHub Actions are intentionally not used. A push or merge into the branch configured in Vercel's Git integration triggers its native deployment.
