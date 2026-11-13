# Free HTML coworking website template with scroll animations and no libraries

Coworking website template: a one-page site for a coworking space whose floors differ by noise, with a weekday schedule, house rules, member profiles, three priced plans and a tour request form. Nested colour bands, like contour lines, mark each level in orange, blue and violet. Its scroll motion runs on CSS with no libraries, in one file of about 53 KB gzipped that Claude Code, Cursor or Codex can adapt.

[![License: MIT](https://img.shields.io/badge/license-MIT-blue)](LICENSE) ![one HTML file: no build](https://img.shields.io/badge/one%20HTML%20file-no%20build-orange) ![dependencies: none](https://img.shields.io/badge/dependencies-none-brightgreen)

**[Live demo](https://8bsite.github.io/coworking-website-template/)** · **[Use this template](https://github.com/new?template_name=coworking-website-template&template_owner=8bsite)** · **[Download ZIP](https://github.com/8bsite/coworking-website-template/archive/refs/heads/main.zip)** · **[Template page on 8b.com](https://8b.com/templates/isoline/)**

<a href="https://8bsite.github.io/coworking-website-template/"><img src="previews/desktop.png" alt="Coworking website template: first screen on a desktop" width="76.1%"></a> <a href="https://8bsite.github.io/coworking-website-template/"><img src="previews/phone.png" alt="Coworking website template: first screen on a phone" width="21.9%"></a>

<p align="center"><a href="https://8bsite.github.io/coworking-website-template/"><img src="previews/scroll.gif" alt="Coworking website template: scrolling through the first sections" width="40%"></a><br><sub>Scroll animation</sub></p>

## Use it with Claude Code, Cursor or Codex

Download the four files into your project folder (`curl.exe` in Windows PowerShell):

```bash
curl -LO https://raw.githubusercontent.com/8bsite/coworking-website-template/main/index.html
curl -LO https://raw.githubusercontent.com/8bsite/coworking-website-template/main/AGENTS.md
curl -LO https://raw.githubusercontent.com/8bsite/coworking-website-template/main/LICENSE
curl -LO https://raw.githubusercontent.com/8bsite/coworking-website-template/main/CREDITS.md
```

Then fill in the angle brackets and give your agent this prompt:

```text
Read AGENTS.md, then edit index.html. Make it the site for <my workspace: name, city and address, the levels with the sound rule of each, opening hours, day pass and membership prices with currency, weekly events, how people book a tour>. Replace first the brand name, the level names, the four rooms and the plan prices. Motion is CSS scroll-driven animation plus the inline motion kit: keep the gate script in the head, the section ids, the data-8b-section, data-8b-motion, data-8b-split and data-8b-items attributes, m-well__band on every band group; set the footer wordmark's --len to its length; add no animation library. Never invent prices, hours or contacts; ask me.
```

As a coworking website template for Claude Code, Cursor or Codex it suits vibe coding that starts with questions: the agent needs the address, phone and hours, what each plan costs and in which currency, and how many seats, carrels or booths exist. It must invent none of it. The demo shows euro prices beside a Leeds address, so settle on one currency. Rename the brand in any letter case, set the footer wordmark's --len to the new name's length and rewrite the three level rules. Keep the ids, the data-8b-section and data-8b-motion attributes and the classes AGENTS.md lists. A redrawn colour field keeps m-well__band on each band group.

No agent? Click **[Use this template](https://github.com/new?template_name=coworking-website-template&template_owner=8bsite)**, edit `index.html` on GitHub and turn on **Settings > Pages**.

## Sections and motion

- **Navigation**: top bar: wordmark, section links, Book a day button; phone menu overlay.
- **Work at your own depth.**: two screens: headline over a huge colour field with a figure on its edge, then a statement and three anchors on the field's colour. Mouse wheel scrolling is smoothed page-wide. On load the bands unfold and then breathe on a loop; tied to scroll, they swell around the core until deep blue fills the screen, the figure shrinking into the field.
- **Three depths. Pick one each morning.**: three hanging posters, one per zone or level, each with its own colour field, photo and caption (demo: the three floors). Section headings rise line by line throughout. Tied to scroll, the three posters lower on their wires and swing as their bands appear.
- **The building has a day of its own.**: daily schedule beside a sticky colour dial (demo: a weekday from 7:30 to 21:00). As you read the schedule, the sticky dial's bands shift by depth and turn orange, blue, violet, then orange; other rows dim.
- **Rooms, in order of descent.**: list of rooms indented by level, each with a small hanging photo. Each small print swings on its clips and settles with an elastic bounce as it scrolls into view.
- **Three rules, posted at the stairs.**: three short house rules inside a V-shaped cross-section of bands. Tied to scroll, nine coloured bands start joined in the middle and slide apart to the edges, upper rows first, leaving a V-shaped gap around the rules.
- **Who works down here.**: four members with photo, name, job and a quote, each under a small colour field. Each member's small colour field ripples open from its core outward as the portrait scrolls into view.
- **Surfacing, on Thursday evenings.**: list of upcoming events with date, time, title, speaker, place and a Save a seat link (demo: Thursday talks). Each event row shifts from plum to blue to aqua as it crosses the screen, its date drifting up against it.
- **Finished at depth.**: table of works members finished, each with a small stepped colour swatch. The three-bar swatch in each row of finished works steps up bar by bar as it scrolls into view.
- **How deep a membership goes.**: three pricing plans as colour fields whose band count shows how much each includes. Each plan's field fills in band by band as you scroll; the deeper plans gather more bands.
- **Come down for a day.**: contact: address, hours, phone, email, a drawn contour map and a tour request form (placeholders). The contour lines of the drawn map ripple in one after another as the map scrolls into view.
- **Footer**: tagline with address, links, wordmark, copyright and the Design: 8B credit, hours line.

## Design

![#eceeef](https://img.shields.io/badge/-%23eceeef-eceeef?style=flat-square) page background  
![#14171b](https://img.shields.io/badge/-%2314171b-14171b?style=flat-square) text, buttons, print clips, footer  
![#4a5059](https://img.shields.io/badge/-%234a5059-4a5059?style=flat-square) secondary text  
![#fbfcfc](https://img.shields.io/badge/-%23fbfcfc-fbfcfc?style=flat-square) members and plans grounds, prints, badges  
![#d3d6d9](https://img.shields.io/badge/-%23d3d6d9-d3d6d9?style=flat-square) grey gradient ground behind the three hanging posters  
![#93d9e4](https://img.shields.io/badge/-%2393d9e4-93d9e4?style=flat-square) aqua rim of blue fields, hover rings  
![#155386](https://img.shields.io/badge/-%23155386-155386?style=flat-square) deep blue Flow fields, second hero screen, event rows  
![#f6d88c](https://img.shields.io/badge/-%23f6d88c-f6d88c?style=flat-square) pale yellow rim of orange fields  
![#e2580e](https://img.shields.io/badge/-%23e2580e-e2580e?style=flat-square) orange core of Shallow fields  
![#cdbef2](https://img.shields.io/badge/-%23cdbef2-cdbef2?style=flat-square) lilac rim of Deep fields  
![#8b3887](https://img.shields.io/badge/-%238b3887-8b3887?style=flat-square) plum core of Deep fields, fading to lilac

**Funnel Display**: headings, times, prices: large, medium weight, tight. **Host Grotesk**: body, labels, buttons, badges (Google Fonts). Colour fields of nested stepped bands, pale at the rim and dark at the core, carry the page, with cut-out figures on their edges. Photos hang as prints from two black clips on thin wires, and rooms step further right as they go down.

## Questions

**Does the tour request form send anything?**  
No. As shipped, it checks that the name is filled and the email looks like an address, shows a thank-you line, clears the fields and sends nothing. Wire it to Formspree or, on Netlify, to Netlify Forms; with no form service, remove the form and its script and keep the email link. The thank-you line promises a reply within a day, so match it to your real response time.

**Can this coworking website template take payments or bookings?**  
No. There is no checkout, availability calendar or member login. The Book a day button in the bar and the Book a day pass button on the first screen link to the plans section, while the three plan buttons and the Save a seat links go to the visit section. Point each at your booking tool or checkout address.

**Is there a coworking website design prompt I can paste into an AI tool?**  
Yes, a full one sits below on this page. Paste it into Lovable, v0 or Bolt to build from scratch, or into Claude Code, Codex or Cursor; Base44 can take [the demo address as a starting point](https://8b.com/templates/for-base44/). To start from this file instead, put index.html and AGENTS.md in a new folder, open it in the agent and paste the short prompt. Pass the files, not a link.

## Is it the right base?

Choose it when you sell how each floor sounds: a roof for calls, a long room for low voices, sealed booths for silence. This is the light build, with the same look and scroll behaviour, no animation library and no script from a CDN: about 53 KB of code gzipped in one file, against 98 KB and four extra requests for the GSAP version. For a programme-led club, the [members' club](https://8b.com/templates/softlife/) template is closer. Booking is thin: as a coworking space website template it offers a tour request form and buttons you point elsewhere, with no availability calendar, checkout or member login.

## Before you publish

- Replace what is marked `data-8b-placeholder` (social preview image, favicon, phone, email, form) and the invented demo facts; [AGENTS.md](AGENTS.md) lists them.
- The form sends nothing yet: connect it to Formspree or Netlify Forms, or remove it.

## Tech

No JavaScript libraries: CSS scroll-driven animations and a small inline motion script with its own smooth wheel scrolling, 188 KB, no build step. Chrome and Edge 111+, Safari 16.2+, Firefox 113+ (it uses color-mix(), cascade layers). Without scroll-driven animations (Firefox today) the scroll motion and the smooth wheel are off and each section shows its finished layout, while any load-in or looping animation still plays; with "reduce motion" on, the page is complete and nothing moves on its own (hover effects stay).

A GSAP build of the same page is [`index.gsap.html`](index.gsap.html): GSAP 3.13.0, ScrollTrigger, SplitText, Lenis 1.3.27 from jsDelivr, 154 KB; its scroll motion also plays in Firefox. Use one of the two files.

## License

MIT, see [LICENSE](LICENSE). Photos, fonts and libraries keep their own licences: [CREDITS.md](CREDITS.md). More free templates: [8b.com/templates](https://8b.com/templates/) · [github.com/8bsite](https://github.com/8bsite).
