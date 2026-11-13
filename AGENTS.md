# AGENTS.md: coworking website template

Website for a coworking space or members' workspace, with day passes and memberships. One file, `index.html`, with inline CSS and scripts, no JavaScript libraries: the scroll motion is CSS scroll-driven animations plus a small inline motion kit; no build step, and none is needed for copy, colour or photo edits. A GSAP build of the same page is `index.gsap.html` (GSAP 3.13.0, ScrollTrigger, SplitText, Lenis 1.3.27 from jsDelivr): edit one of the two, not both.

## Files
Edit these files, not a page fetched by URL (that arrives as a summary).
```bash
curl -LO https://raw.githubusercontent.com/8bsite/coworking-website-template/main/index.html
curl -LO https://raw.githubusercontent.com/8bsite/coworking-website-template/main/AGENTS.md
curl -LO https://raw.githubusercontent.com/8bsite/coworking-website-template/main/LICENSE
curl -LO https://raw.githubusercontent.com/8bsite/coworking-website-template/main/CREDITS.md
```
Upload `index.html`, LICENSE and CREDITS.md; not this file, README.md or `previews/`.

## Keep
- Every `id`, `data-8b-section`, `data-8b-motion` and `data-8b-part` (`section:<id>` styles, `scene:<id>` animation).
- The motion parts `motion-gate` (head: sets `data-8b-live` on `<html>` only with scroll-driven animation support and no reduced motion), `motion-kit` and `motion`, and every other `data-8b-*` attribute (`data-8b-items` groups, `data-8b-off`, `data-8b-enter`): the CSS and the kit read them. Items ordered by `--i` follow their group; counts the CSS fixes are listed under Known limits (`data-8b-fixed` marks such a group).
- Selectors the scripts use:
  - `section-script:navigation`: `.nav__menu` `.nav__close` `.nav__overlay`
  - `section-script:visit`: `.visit__form` `.visit__status` `data-sent` `data-missing`
  - `scene-script:opening-fall`: `.opening__stage` `.opening__well` `.m-well__band` `.opening__figure`
  - `scene-script:day-dial`: `.day__list` `.day__row`
  - `scene-script:rules-dig`: `.rules__row`
- `style="--len:N"` = characters in that display line, spaces included: `Isoline` is 7.
- The colour fields, posters, dial, rules well and contour map are SVG and CSS, not images: the three depth colours (orange, blue, violet) come from the :root colour variables, so recolour them there.
- The scene scripts read `.opening__stage`, `.opening__well`, `.m-well__band` and `.opening__figure` (opening), `.day__list` and `.day__row` (day) and `.rules__row` (rules): keep these classes.
- Person photos are printed with multiply onto the fields: use photos on a white or very light ground, or the background will show as a box.
- Colours and fonts are variables in `:root` (`data-8b-part="tokens"`): `--color-1` #eceeef (page background), `--color-2` #14171b (text, buttons, print clips, footer), `--color-3` #4a5059 (secondary text), `--color-4` #fbfcfc (members and plans grounds, prints, badges), `--color-5` #d3d6d9 (grey gradient ground behind the three hanging posters), `--color-6` #93d9e4 (aqua rim of blue fields, hover rings), `--color-7` #155386 (deep blue Flow fields, second hero screen, event rows), `--color-8` #f6d88c (pale yellow rim of orange fields), `--color-9` #e2580e (orange core of Shallow fields), `--color-10` #cdbef2 (lilac rim of Deep fields), `--color-11` #8b3887 (plum core of Deep fields, fading to lilac); body text needs 4.5:1 contrast.
- With reduced motion the page must read in full.
- Keep the header comment and `<meta name="generator">`. Keep the "Design: 8B" footer link unless the site owner asks to remove it.

## Replace
- `data-8b-placeholder` (og-image, favicon, phone, email, form): real value in, attribute out; no value, remove the row (no image: drop `og:image`, set `twitter:card` to `summary`).
- Book a day (nav) and Book a day pass (opening): now #plans; owner's target: your booking or day-pass URL (or keep #plans).
- Plan buttons (Book a day, Become a member, Ask about a carrel): now #visit; owner's target: the booking, checkout or membership sign-up URL of each plan.
- Save a seat on each evening talk: now #visit; owner's target: the RSVP or ticket URL of each event.
- The form in `#visit` (fields `name`, `email`, `day`, `project`, `level`) sends nothing; `section-script:visit` handles its submit in the page (read it before you connect a service). Formspree: `action="https://formspree.io/f/<id>"` and `fetch` POST `new FormData(form)` first. Netlify: `data-netlify="true"` and a hidden `form-name`. Or delete it and the script.
- The name Isoline (any letter case); the favicon letter and colours in `<link rel="icon">`.
- Photos (13, Unsplash: opening 1, depths 3, rooms 4, members 4, evenings 1): `src`, no `srcset`/`sizes`, `width`/`height` to the ratio, `alt`, CREDITS.md.
- `<title>`, meta description, og tags.

## Ask the owner for
All demo text, never to be invented:
- Address "14 Wren Yard, Leeds LS2 7EW" (visit, the map label, footer) and the company name "Isoline Workrooms Ltd." (footer): invented, the postcode may be real.
- Phone +44 113 000 0000 and email hello@isoline.example (visit, footer "Email us").
- Opening hours: weekdays 7:30 to 21:00, residents every day (visit, footer), and the whole daily schedule 7:30, 9:00, 10:30, 13:30, 15:00, 18:30, 21:00 with booths held for three hours (the day).
- Prices in euros although the address is in the UK: Day pass €24 a day, Member €190 a month, Resident €340 a month, and what each includes: levels, roof lunch, bookable a week ahead, two booth blocks a week, Thursday evenings, own carrel, a key seven days, a locker (plans).
- Capacity and building: three floors, a roof open "from spring to the first frost", forty seats at two oak tables, twenty-two carrels and six sealed booths, lockers on the landing (rooms, depths, rules), "two hundred members" (members).
- People and quotes: Ines Varga, Maren Holt, Teodor Lund, Arun Desai with jobs, quotes and details ("Booth four", "two winters", "At eighty-one", "leave at four") (members, evenings, made); also Pell Okafor and Lise Brandt (made).
- Works listed as finished in the building: The Salt Year, Small Hours (eight tracks), Where the Fox Sleeps, Tidewater Grotesk (four weights), The Collected Letters of R. Anand, Soil Memory (made).
- Events: talks on 16 Oct, 23 Oct, 30 Oct and 6 Nov, Thursdays at 18:30, twenty-minute talks, with titles, speakers and places (evenings, and "on Thursdays" in the day).
- Service promises: a tour "in fifteen minutes" (visit) and "We will write within a day" (the data-sent message on .visit__status).
- Copyright year 2026 (footer).

## Known limits
- Without JavaScript the menu button cannot open the overlay, and the top bar links are hidden below 1000 px wide; only Depths, Rooms, Plans and Visit stay reachable, in the opening and the footer. The day, Rules and Members have no other link: add them to the footer if the page must work without scripts.
- Without scroll-driven animation support (Firefox today) the scroll motion is off and each section shows its finished layout, while the opening still unfolds on load and its bands keep breathing; with reduced motion on, the page is complete and still. In both cases the dial in the day keeps one set of colours and no schedule row is marked as the current one.
- The three posters in depths and the three plans are timed one by one in the motion CSS through :nth-of-type rules, as are the nine bar rows of the rules well and the bands of each colour field, and the three rules sit at the well's three depths: keep three posters, rules and plans, or a new one gets no motion or place of its own until its rules are added.
- The map in visit is a drawing, not a real map: add a link to your map service if visitors need directions.
- Faces that overlap the middle of a colour field take its tint (photos are printed with multiply).

## Check
375 and 1440 px, reduced motion on, a browser without scroll-driven animations (Firefox: the finished static layout), console clean; `data-8b-placeholder` and Isoline left only in class names.
