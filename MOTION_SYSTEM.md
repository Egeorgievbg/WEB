# Motion system — Evgeni Georgiev Portfolio

## Технологии

- Статична HTML/CSS страница (`index.html`), с оригиналните 8B CSS scroll-driven animations
- GSAP 3.13.0 Core и ScrollTrigger, зареждани с `defer` през jsDelivr
- Собствен `assets/motion/eg-motion.js` (19 декоративни елемента + hero asset №18)
- `assets/motion/eg-motion.css` (layout, композиция, breakpoints)
- 20 PNG файла (RGBA, първостепенни assets) в `assets/floating/`
- Копия на официалните GreenSock агентски умения в `.agents/skills/`

## Разпределение

| Секция | Арт елементи | Концепция |
|---|---|---|
| `#opening` | 16,17,18,19 | Визуална идентичност, течен motion, orb |
| `#about` | 01,20 | Единен технологичен екосистемен подход |
| `#depths` | 02,04,05 | Уеб + e-commerce + AI |
| `#day` | 06,08 | Интелигентни процеси и автоматизации |
| `#rooms` | 03,07,11,13 | UI, responsive, web, API |
| `#rules` | 10,14 | Надеждни данни и инфраструктура |
| `#members` | 12 | Бизнес растеж |
| `#evenings` | 15 | Интерактивност и проектни примери |
| `#made` | 09 | Дигитална система |

Секциите `#plans` и `#visit` остават по-изчистени за четимост и conversion.

## Motion choreography

1. **Hero**: оригиналната CSS сцена остава, но SVG визията е заменена с real PNG. Останалите 3 hero елемента са на отделен overlay layer.
2. **Entrance**: scale/y/rotation/opacity stagger само при влизане във viewport.
3. **Depth**: ScrollTrigger parallax с малка амплитуда, без pinning и без промяна на scroll поведението.
4. **Idle**: y/rotation sine-in-out, спрени извън viewport с IntersectionObserver.
5. **Pointer**: ограничено mouse parallax само на Hero и само за fine pointer на desktop.
6. **Reading progress**: 3px линия по горния ръб, скрол синхронизация.
7. **Fallback**: ако GSAP не зареди, изображенията остават видими без ефекти.
8. **Accessibility**: `prefers-reduced-motion` спира всички GSAP ефекти; декоративните обекти са `aria-hidden`, с празен alt.
9. **Performance**: първостепенен приоритет има hero 18, останалите са lazy-loaded и са с first-party URLs; няма layout-changing tweens.

## Skills

Инсталирани са следните официални умения от `greensock/gsap-skills`, MIT:
- `.agents/skills/gsap-core/SKILL.md`
- `.agents/skills/gsap-scrolltrigger/SKILL.md`
- `.agents/skills/gsap-timeline/SKILL.md`
- `.agents/skills/gsap-performance/SKILL.md`

При следваща работа: прочети `AGENTS.md` и съответния SKILL.md преди промяна на motion кода.

## QA / Release gate

- Проверете във Vercel 375px / 768px / 1440px; Chrome + Firefox.
- Проверете console грешки, мобилна навигация, клавиатура, CTA, mailto форма.
- Проверете Vercel за 200 на `/assets/floating/18_quantum_glass_orb.png`, `/assets/motion/eg-motion.js`, `/assets/motion/eg-motion.css`.
- Проверете `prefers-reduced-motion` и че всички 20 файла имат успешен отговор.
- Проверете FPS/performance и ограничете ефекти при нужда, преди production.
- GitHub Actions е изключен поради ограничение на акаунта; не въвеждайте Actions workflow.

## Изходни лицензи

Първоначален HTML дизайн — 8B, MIT: виж `CREDITS.md` и `LICENSE`.
GSAP skills — GreenSock MIT. GSAP runtime — по официалния GSAP лиценз.
Генерираните PNG assets са създадени за този проект.
