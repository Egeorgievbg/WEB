/* Evgeni Georgiev · Motion identity · GSAP 3.13 / ScrollTrigger
   Works with the original 8B CSS motion system without changing its hooks.
   All sprites are real, locally hosted optimized WebP derivatives of the original PNG artwork. */
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
    const figures = [];
    for (const [name, selector, role, left, top, width, period, angle] of artwork) {
      const host = document.querySelector(selector);
      if (!host) continue;
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
      const reveal = document.createElement('span');
      reveal.className = 'eg-float__reveal';
      const drift = document.createElement('span');
      drift.className = 'eg-float__drift';
      const image = document.createElement('img');
      image.className = 'eg-float__image';
      image.src = base + name + '.webp';
      image.alt = '';
      image.decoding = 'async';
      image.loading = selector.includes('opening__stage') ? 'eager' : 'lazy';
      image.setAttribute('draggable', 'false');
      if (role === 'hero-orb') image.setAttribute('fetchpriority', 'high');
      image.addEventListener('error', () => { figure.hidden = true; }, {once:true});
      drift.append(image);
      reveal.append(drift);
      figure.append(reveal);
      layer.append(figure);
      figures.push({name,role,figure,reveal,drift,image,host,period,angle});
    }
    if (!figures.length) return;
    document.documentElement.classList.add('eg-motion-ready');
    const reduced = window.matchMedia('(prefers-reduced-motion: reduce)');
    const coarse = window.matchMedia('(pointer: coarse)');
    if (reduced.matches || !window.gsap) return;
    const gsap = window.gsap;
    const ScrollTrigger = window.ScrollTrigger;
    if (ScrollTrigger) gsap.registerPlugin(ScrollTrigger);
    const running = new Map();
    function ensureFloat(item) {
      if (running.has(item)) { running.get(item).resume(); return; }
      const duration = item.period;
      const tween = gsap.to(item.image,{
        y: '+=15', x: item.angle < 0 ? -7 : 7,
        rotation: item.angle * .35, duration,
        ease:'sine.inOut', yoyo:true, repeat:-1, paused:false, force3D:true
      });
      running.set(item,tween);
    }
    for (const item of figures) {
      const trigger = item.role.startsWith('hero-') ? document.querySelector('#opening .opening__first') : item.host;
      gsap.set(item.reveal, {autoAlpha:0, y:item.role.startsWith('hero-')?35:45, scale:.86});
      const appear = gsap.to(item.reveal,{
        autoAlpha:1,y:0,scale:1,rotation:item.angle*.12,
        duration:item.role==='hero-orb'?1.65:1.0,
        delay:item.role.startsWith('hero-')?Math.min(1.1,figures.indexOf(item)*.12):0,
        ease:'power3.out', paused:true, force3D:true
      });
      if (ScrollTrigger) {
        ScrollTrigger.create({
          trigger, start:'top 95%', end:'bottom 5%',
          onEnter:()=>{appear.play();ensureFloat(item);},
          onEnterBack:()=>{appear.play();ensureFloat(item);},
          onLeave:()=>{running.get(item)?.pause();},
          onLeaveBack:()=>{running.get(item)?.pause();}
        });
      } else { appear.play(); ensureFloat(item); }
    }
    if (!coarse.matches) {
      const hero = document.querySelector('#opening .opening__stage');
      if (hero) {
        const actors = figures.filter(x=>x.role.startsWith('hero-'));
        const move = actors.map((item,index)=>({
          x:gsap.quickTo(item.drift,'x',{duration:1.25,ease:'power3.out'}),
          y:gsap.quickTo(item.drift,'y',{duration:1.25,ease:'power3.out'}),
          strength:index===0?24:12
        }));
        hero.addEventListener('pointermove', event=>{
          if (!event.isPrimary) return;
          const box=hero.getBoundingClientRect();
          const px=(event.clientX-box.left)/box.width-.5;
          const py=(event.clientY-box.top)/box.height-.5;
          move.forEach(m=>{m.x(px*m.strength);m.y(py*m.strength);});
        },{passive:true});
      }
    }
    document.addEventListener('visibilitychange',()=>{
      for(const t of running.values()) document.hidden?t.pause():t.resume();
    });
    if (ScrollTrigger) requestAnimationFrame(()=>ScrollTrigger.refresh());
  }
  if(document.readyState==='loading') document.addEventListener('DOMContentLoaded', mount,{once:true}); else mount();
})();