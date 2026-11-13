# AGENTS.md — портфолио на Евгени Георгиев

Този branch адаптира 8B Isoline coworking template за персонално българско портфолио на Евгени Георгиев.

## Важни ограничения

- Публичната продукционна версия не се редактира без преглед и съгласуван merge.
- Не измисляйте клиенти, отзиви, резултати, проектни числа, цени и наличности.
- Запазете `LICENSE` и `Design: 8B` кредитите.
- `index.html` е каноничният персонализиран вариант. `index.gsap.html` е оригиналната алтернатива и не е синхронизирана.
- Не пипайте `data-8b-section`, `data-8b-part`, `data-8b-motion`, `data-8b-items`, `data-8b-split`, анимационните hook-ове `.m-well__band` и селекторите на `motion-kit`.
- Запазете оригиналните IDs: `navigation`, `opening`, `depths`, `day`, `rooms`, `rules`, `members`, `evenings`, `made`, `plans`, `visit`, `footer`.
- Поддръжка на кирилица (Manrope и Unbounded), контраст, `prefers-reduced-motion`, мобилни екрани.
- Не добавяйте външни tracker-и или секретни ключове в статичния HTML.

## Контакт

Проверен публичен имейл: `egeorgiev955@gmail.com`; телефон: `+359 89 357 5424`. Сегашната форма само създава `mailto:` чернова — не е backend изпращане. Ако се разработи API endpoint: secret-и само в environment variables, сървърна валидация, anti-spam, rate limiting и тестове.

## Проверки при промени

1. Проверете всички текстове и имена за останало демо съдържание.
2. Валидирайте HTML и всички вътрешни/външни връзки.
3. Проведете визуален тест на 375 и 1440 px и проверете Chrome/Firefox.
4. Проверете функционалността на мобилното меню, CTA и имейл формата.
5. Проверете console и a11y при reduced-motion.
6. Проверете README.md и CREDITS.md при промяна на assets/лицензи.

Оригиналният проект: https://github.com/8bsite/coworking-website-template

## Motion design система (2026-11-13)

- Преди GSAP промени прочетете `MOTION_SYSTEM.md` и официалните skills в `.agents/skills/gsap-*/SKILL.md`.
- Source of truth: `assets/motion/eg-motion.js` / `eg-motion.css` и `assets/floating/`.
- GSAP/ScrollTrigger са прогресивно подобрение, без промяна в оригиналните data-8b motion hooks.
- Никога не използвайте CDN/временни ChatGPT links за PNG файлове; сервирайте ги от `/assets/floating/`.
- Поддържайте адаптивни breakpoints и предпочитанията за намалено движение.
- Не добавяйте GitHub Actions — наличните runners в акаунта са ограничени.
