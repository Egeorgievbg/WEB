/* Evgeni Georgiev · Kinetic Motion V2 — GSAP 3.13 + ScrollTrigger
 * Separate animation ownership: reveal > scroll > float > pointer > image.
 * Existing 8B scroll-driven scenes remain untouched; original mockup images
 * receive gentle interior motion, never tweens on their legacy animated parent.
 */
(() => {
  'use strict';
  const base = '/assets/floating/';
  const artwork = [
    ['18_quantum_glass_orb', '#opening .opening__stage', 'hero-orb', '72%', '48%', 'clamp(280px,34vw,530px)', 7.8, 15],
    ['16_mobius_titanium', '#opening .opening__stage', 'hero-mobius', '88%', '19%', 'clamp(100px,17vw,250px)', 8.7, -12],
    ['17_liquid_energy_ribbon', '#opening .opening__stage', 'hero-ribbon', '89%', '77%', 'clamp(110px,23vw,340px)', 9.8, 9],
    ['15_3d_cursor_click', '#opening .opening__stage', 'hero-cursor', '51%', '72%', 'clamp(70px,9vw,145px)', 6.2, -18],
    ['19_tech_crystal_prism', '#opening .opening__stage', 'hero-prism', '53%', '20%', 'clamp(72px,12vw,165px)', 10.8, 10],
    ['01_orbital_digital_ecosystem', '#about', 'about-orbit', '91%', '35%', 'clamp(95px,14vw,225px)', 11.1, 10],
    ['02_code_glass_tile', '#about', 'about-code', '12%', '87%', 'clamp(65px,9vw,135px)', 8.7, -9],
    ['03_layers_glass_tile', '#depths .depths__item:nth-child(1)', 'services-web', '86%', '40%', 'clamp(80px,12vw,155px)', 7.1, 9],
    ['04_ecommerce_cart_tile', '#depths .depths__item:nth-child(2)', 'services-shop', '87%', '31%', 'clamp(80px,11vw,160px)', 8.6, -10],
    ['05_ai_processor_tile', '#depths .depths__item:nth-child(3)', 'services-ai', '85%', '44%', 'clamp(85px,12vw,160px)', 9.1, 8],
    ['08_automation_gear', '#day .day__dial', 'process-gear', '76%', '74%', 'clamp(85px,12vw,160px)', 12.0, 16],
    ['11_3d_browser_window', '#rooms .rooms__row:nth-child(1)', 'solution-web', '89%', '41%', 'clamp(95px,13vw,165px)', 7.9, 7],
    ['13_api_connector', '#rooms .rooms__row:nth-child(2)', 'solution-api', '87%', '45%', 'clamp(95px,13vw,165px)', 8.9, -9],
    ['10_glass_data_cube', '#rooms .rooms__row:nth-child(3)', 'solution-data', '88%', '40%', 'clamp(95px,13vw,165px)', 9.4, 8],
    ['06_ai_neural_brain', '#rooms .rooms__row:nth-child(4)', 'solution-ai', '88%', '45%', 'clamp(95px,13vw,165px)', 8.3, -8],
    ['12_growth_analytics', '#members .members__item:nth-child(1)', 'project-growth', '82%', '26%', 'clamp(65px,9vw,120px)', 8.8, 10],
    ['14_cloud_infrastructure', '#members .members__item:nth-child(3)', 'project-cloud', '83%', '28%', 'clamp(70px,9vw,125px)', 10.2, -10],
    ['07_floating_smartphone', '#plans .plans__item:nth-child(1)', 'offer-mobile', '84%', '23%', 'clamp(70px,9vw,120px)', 9.1, 10],
    ['20_modular_data_core', '#plans .plans__item:nth-child(2)', 'offer-system', '84%', '25%', 'clamp(70px,9vw,125px)', 8.2, -12],
    ['09_digital_orb', '#visit .visit__map', 'contact-orb', '83%', '32%', 'clamp(80px,11vw,155px)', 10.8, 10]
  ];
  function mount() {
    if (document.documentElement.classList.contains('eg-motion-ready')) return;
    const figures = [];
    artwork.forEach(([name, selector, role, left, top, width, period, angle], index) => {
      const host = document.querySelector(selector);
      if (!host) return;
      let layer = host.querySelector(':scope > .eg-motion-layer');
      if (!layer) {
        layer = document.createElement('div');
        layer.className = 'eg-motion-layer';
        layer.setAttribute('aria-hidden', 'true');
        host.append(layer);
      }
      const figure = document.createElement('span');
      figure.className = 'eg-float eg-float--' + role;
      figure.style.setProperty('--eg-left', left);
      figure.style.setProperty('--eg-top', top);
      figure.style.setProperty('--eg-width', width);
      figure.style.setProperty('--eg-angle', angle + 'deg');
      figure.style.setProperty('--eg-index', index);
      const scroll = document.createElement('span');
      scroll.className = 'eg-float__scroll';
      const reveal = document.createElement('span');
      reveal.className = 'eg-float__reveal';
      const drift = document.createElement('span');
      drift.className = 'eg-float__drift';
      const pointer = document.createElement('span');
      pointer.className = 'eg-float__parallax';
      const image = document.createElement('img');
      image.className = 'eg-float__image';
      image.src = base + name + '.webp';
      image.alt = '';
      image.decoding = 'async';
      image.loading = role.startsWith('hero-') ? 'eager' : 'lazy';
      image.setAttribute('draggable', 'false');
      if (role === 'hero-orb') image.setAttribute('fetchpriority', 'high');
      image.addEventListener('error', () => { figure.hidden = true; }, { once: true });
      pointer.append(image);
      drift.append(pointer);
      reveal.append(drift);
      scroll.append(reveal);
      figure.append(scroll);
      layer.append(figure);
      figures.push({ name, role, host, figure, scroll, reveal, drift, pointer, image, period, angle, index, active:false, played:false, tweens:[] });
    });
    if (!figures.length) return;
    document.documentElement.classList.add('eg-motion-ready');
    const reduced = window.matchMedia('(prefers-reduced-motion: reduce)');
    if (reduced.matches || !window.gsap) return;
    const gsap = window.gsap;
    const ScrollTrigger = window.ScrollTrigger;
    if (ScrollTrigger) gsap.registerPlugin(ScrollTrigger);
    document.documentElement.classList.add('eg-gsap-live', 'eg-kinetic-v2');
    const narrow = matchMedia('(max-width: 700px)');
    const intensity = narrow.matches ? .62 : 1;

    function setActive(item, state) {
      item.active = state;
      const run = state && !document.hidden && !reduced.matches;
      item.figure.classList.toggle('eg-is-moving', run);
      for (const tween of item.tweens) run ? tween.resume() : tween.pause();
      if (run && !item.played) {
        item.played = true;
        item.appear.play(0);
      }
    }
    for (const item of figures) {
      const hero = item.role.startsWith('hero-');
      const direction = item.index % 2 ? -1 : 1;
      const speed = Math.max(3.2, Math.min(5.9, item.period * .54));
      const sway = (hero ? 41 : 27) * intensity * (item.role === 'hero-orb' ? .82 : 1);
      const swing = (hero ? 19 : 13) * intensity;
      const tilt = (hero ? 12 : 8) * intensity;
      gsap.set(item.drift, { y: -sway * .46 * direction, x: -swing * .7 * direction });
      const float = gsap.to(item.drift, {
        y: sway * direction, x: swing * direction,
        rotation: direction * tilt,
        duration: speed, ease: 'sine.inOut',
        yoyo: true, repeat: -1, paused: true, force3D: true
      });
      const pulse = gsap.to(item.image, {
        scale: hero ? 1.075 : 1.055,
        rotation: direction * (hero ? 5 : 3),
        duration: speed * 1.28, ease: 'sine.inOut',
        yoyo: true, repeat: -1, paused: true, force3D: true
      });
      item.tweens.push(float, pulse);
      item.appear = gsap.fromTo(item.reveal,
        { autoAlpha: 0, y: hero ? 70 : 48, scale: hero ? .72 : .83, rotation: item.angle * -.32 },
        { autoAlpha: 1, y: 0, scale: 1, rotation: 0,
          duration: hero ? 1.2 : .95, ease: 'power3.out',
          delay: hero ? Math.min(.55, item.index * .10) : 0,
          paused: true, force3D: true
        });
      const trigger = hero ? document.getElementById('opening') : item.host;
      if (ScrollTrigger) {
        ScrollTrigger.create({
          trigger, start: 'top bottom', end: 'bottom top',
          onToggle: self => setActive(item, self.isActive)
        });
        gsap.fromTo(item.scroll,
          { y: (hero ? 45 : 30) * intensity, rotation: -direction * 4 },
          { y: (hero ? -115 : -62) * intensity, rotation: direction * (hero ? 9 : 5),
            ease: 'none', force3D: true,
            scrollTrigger: { trigger, start: 'top bottom', end: 'bottom top', scrub: .65 }
          });
      } else if ('IntersectionObserver' in window) {
        new IntersectionObserver(entries => {
          for (const entry of entries) setActive(item, entry.isIntersecting);
        }, { rootMargin: '65px' }).observe(trigger);
      } else setActive(item, true);
    }

    // Animate the illustration INSIDE legacy frames, not their transform-animated
    // 8B wrapper. This preserves original CSS scroll timelines and their masks.
    const legacyImages = [
      ...document.querySelectorAll(
        '#depths .depths__sheet img, #rooms .rooms__print .m-print__sheet img, ' +
        '#members .members__figure img, #evenings .evenings__print img'
      )
    ];
    const legacy = legacyImages.map((image, index) => {
      const dir = index % 2 ? -1 : 1;
      const tween = gsap.to(image, {
        scale: 1.075, x: dir * 10 * intensity, y: -9 * intensity,
        duration: 4.1 + index % 3, ease:'sine.inOut',
        repeat:-1, yoyo:true, paused:true, force3D:true
      });
      return { image, tween, active:false };
    });
    if (legacy.length) {
      if ('IntersectionObserver' in window) {
        const observer = new IntersectionObserver(entries => {
          for (const entry of entries) {
            const item = legacy.find(record => record.image === entry.target);
            if (!item) continue;
            item.active = entry.isIntersecting;
            if (item.active && !document.hidden) item.tween.resume();
            else item.tween.pause();
          }
        }, { rootMargin:'120px' });
        legacy.forEach(item => observer.observe(item.image));
      } else {
        legacy.forEach(item => { item.active=true; item.tween.resume(); });
      }
    }

    // A single subtle rotation on the decorative plan SVG (its path children
    // retain the original 8B scroll-driven animation).
    const planWells = [...document.querySelectorAll('#plans .plan__well')];
    planWells.forEach((well,index) => {
      const tween = gsap.to(well, {
        rotation:(index%2 ? -1 : 1)*5, transformOrigin:'50% 50%',
        duration:6+index, yoyo:true, repeat:-1,
        ease:'sine.inOut', paused:true, force3D:true
      });
      const record = { image:well, tween, active:false };
      if (ScrollTrigger) {
        ScrollTrigger.create({
          trigger:well.closest('.plans__item'),
          start:'top bottom', end:'bottom top',
          onToggle:self => {
            record.active = self.isActive;
            self.isActive && !document.hidden ? tween.resume() : tween.pause();
          }
        });
      } else if ('IntersectionObserver' in window) {
        new IntersectionObserver(entries => {
          record.active = entries[0].isIntersecting;
          record.active && !document.hidden ? tween.resume() : tween.pause();
        }, {rootMargin:'120px'}).observe(well);
      } else { record.active = true; tween.resume(); }
      legacy.push(record);
    });

    // The pointer controls only the parallax wrapper; continuous movement and
    // scroll remain on different nodes, so no competing transform tweens.
    if (matchMedia('(hover:hover) and (pointer:fine) and (min-width:901px)').matches) {
      const hero = document.querySelector('#opening .opening__stage');
      if (hero) {
        const setters = figures.filter(item => item.role.startsWith('hero-')).map((item,index) => ({
          x: gsap.quickTo(item.pointer,'x',{ duration:.65, ease:'power3.out' }),
          y: gsap.quickTo(item.pointer,'y',{ duration:.65, ease:'power3.out' }),
          strength: index === 0 ? 35 : 18 + index * 2
        }));
        hero.addEventListener('pointermove', event => {
          if (document.hidden || !event.isPrimary) return;
          const rect = hero.getBoundingClientRect();
          if (!rect.width || !rect.height) return;
          const x = Math.max(-1,Math.min(1,((event.clientX-rect.left)/rect.width-.5)*2));
          const y = Math.max(-1,Math.min(1,((event.clientY-rect.top)/rect.height-.5)*2));
          setters.forEach(item => { item.x(x*item.strength); item.y(y*item.strength*.74); });
        }, { passive:true });
        hero.addEventListener('pointerleave', () => setters.forEach(item => { item.x(0); item.y(0); }), { passive:true });
      }
    }


    // Browser compatibility bridge: the 8B motion kit intentionally skips
    // scroll-scenes when CSS animation-timeline:view() is unsupported (e.g.
    // older Firefox). Recreate the essential composition using GSAP ONLY in
    // that case. Native 8B CSS + JS remain sole owners on supporting browsers.
    function legacyScrollBridge() {
      if (document.documentElement.hasAttribute('data-8b-live') || !ScrollTrigger) return;
      document.documentElement.classList.add('eg-legacy-bridge');
      const enter = (node, from, duration=1.0) => {
        if (!node) return;
        gsap.fromTo(node,
          { autoAlpha:0, y:from.y || 0, rotation:from.rotation || 0,
            scale:from.scale || 1 },
          { autoAlpha:1, y:0, rotation:0, scale:1, duration, ease:'power3.out',
            clearProps:'transform,opacity,visibility',
            scrollTrigger:{trigger:node,start:'top 94%',toggleActions:'play none none none'}
          });
      };
      document.querySelectorAll('[data-8b-motion~="rise"]').forEach(node => {
        if (node.closest('#opening')) return;
        enter(node,{y:52},1.12);
      });
      document.querySelectorAll('[data-8b-motion~="hang"]').forEach(node => {
        enter(node,{y:54,rotation:-7,scale:.96},1.26);
      });
      document.querySelectorAll('[data-8b-motion~="ripple"]').forEach(node => {
        enter(node,{y:22,scale:.9},1.25);
      });
      const opening = document.getElementById('opening');
      const openingWell = opening && opening.querySelector('.opening__well');
      if (openingWell) gsap.fromTo(openingWell,
        { y:-24,rotation:-5,scale:.96 },
        { y:66,rotation:5,scale:1.08,ease:'none',
          scrollTrigger:{trigger:opening,start:'top top',end:'bottom top',scrub:.7}
        });
      const openingCopy = opening && opening.querySelector('.opening__copy');
      if (openingCopy) gsap.fromTo(openingCopy,
        {y:0,opacity:1}, {y:-100,opacity:0,ease:'none',
          scrollTrigger:{trigger:opening,start:'top top',end:'top -92%',scrub:.55}
        });
      document.querySelectorAll('#opening .opening__second [data-line]').forEach((node,index) => {
        gsap.fromTo(node,{autoAlpha:0,y:72},{autoAlpha:1,y:0,duration:1.3,
          delay:index*.09,ease:'power3.out',
          scrollTrigger:{trigger:node,start:'top 98%',toggleActions:'play none none none'}
        });
      });
      document.querySelectorAll('#depths .depths__hang').forEach((node,index)=>{
        gsap.fromTo(node,{y:-45,rotation:(index%2?-1:1)*-4},
          {y:0,rotation:0,ease:'none',
            scrollTrigger:{trigger:node,start:'top 105%',end:'top 44%',scrub:.55}
          });
      });
      const dayWell = document.querySelector('#day .day__well');
      const dayList = document.querySelector('#day .day__list');
      if (dayWell && dayList) {
        gsap.fromTo(dayWell,{x:-38,y:20,rotation:-8},{x:40,y:-28,rotation:9,ease:'none',
          scrollTrigger:{trigger:dayList,start:'top 85%',end:'bottom 15%',scrub:.65}
        });
        const rows=[...document.querySelectorAll('#day .day__row')];
        document.getElementById('day')?.setAttribute('data-dialing','');
        ScrollTrigger.create({trigger:dayList,start:'top 68%',end:'bottom 56%',
          onUpdate:self=>{
            const selected=Math.min(rows.length-1,Math.floor(self.progress*rows.length));
            rows.forEach((row,index)=>row.toggleAttribute('data-now',index===selected));
          }
        });
      }
      document.querySelectorAll('#rules .rules__row').forEach(row=>{
        const halves=[...row.querySelectorAll('.rules__half')];
        halves.forEach((half,index)=>gsap.fromTo(half,
          {x:index===0?-45:45,autoAlpha:.62},
          {x:0,autoAlpha:1,ease:'power2.out',
            scrollTrigger:{trigger:row,start:'top 88%',end:'top 42%',scrub:.65}
          }));
      });
      document.querySelectorAll('#rooms .rooms__body').forEach(node=>enter(node,{y:33},.95));
      document.querySelectorAll('#evenings .evenings__row').forEach(node=>enter(node,{y:33},1.0));
      document.querySelectorAll('#plans .plans__body').forEach(node=>enter(node,{y:42},1.1));
    }
    legacyScrollBridge();

    document.addEventListener('visibilitychange', () => {
      figures.forEach(item => {
        const run = item.active && !document.hidden && !reduced.matches;
        item.figure.classList.toggle('eg-is-moving',run);
        item.tweens.forEach(tween => run ? tween.resume() : tween.pause());
      });
      legacy.forEach(item => {
        const run = item.active && !document.hidden && !reduced.matches;
        run ? item.tween.resume() : item.tween.pause();
      });
    });
    if (ScrollTrigger) requestAnimationFrame(() => ScrollTrigger.refresh());
  }
  if (document.readyState === 'loading') document.addEventListener('DOMContentLoaded', mount, {once:true});
  else mount();
})();
