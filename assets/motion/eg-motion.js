/* EG Motion 01 — progressive enhancement for the vanilla HTML / 8B website.
 * Uses GSAP + ScrollTrigger when available; all artwork remains visible without JS motion.
 * Decorative elements are non-interactive and aria-hidden.
 * Animation channels stay isolated: scroll/entrance/pointer/idle use nested wrappers.
 */
(() => {
  "use strict";
  const BASE = "/assets/floating/";
  const assets = [
    // HERO — central sphere #18 is the existing figure image in index.html.
    { n:16, file:"16_mobius_titanium.png", site:"opening", x:"86%", y:"25%", w:"clamp(150px,18vw,320px)", depth:20, alpha:0.95, mobile:"hide" },
    { n:17, file:"17_liquid_energy_ribbon.png", site:"opening", x:"77%", y:"82%", w:"clamp(240px,34vw,570px)", depth:-15, alpha:0.90 },
    { n:19, file:"19_tech_crystal_prism.png", site:"opening", x:"45%", y:"78%", w:"clamp(115px,12vw,205px)", depth:27, alpha:0.85, mobile:"hide" },

    // ABOUT — technology orchestrated into one coherent delivery.
    { n:1, file:"01_orbital_digital_ecosystem.png", site:"about", x:"9%", y:"68%", w:"clamp(160px,19vw,290px)", depth:14, alpha:0.62, mobile:"hide" },
    { n:20, file:"20_modular_data_core.png", site:"about", x:"93%", y:"29%", w:"clamp(130px,14vw,230px)", depth:-18, alpha:0.76 },

    // SERVICES — craftsmanship, commerce and AI.
    { n:2, file:"02_code_glass_tile.png", site:"depths", x:"8%", y:"22%", w:"clamp(120px,13vw,200px)", depth:15, alpha:0.70 },
    { n:4, file:"04_ecommerce_cart_tile.png", site:"depths", x:"87%", y:"51%", w:"clamp(130px,14vw,200px)", depth:-13, alpha:0.68, mobile:"hide" },
    { n:5, file:"05_ai_processor_tile.png", site:"depths", x:"11%", y:"79%", w:"clamp(115px,12vw,190px)", depth:17, alpha:0.70, mobile:"hide" },

    // DELIVERY PROCESS — decisions + automation.
    { n:6, file:"06_ai_neural_brain.png", site:"day", x:"87%", y:"29%", w:"clamp(150px,19vw,285px)", depth:-19, alpha:0.75 },
    { n:8, file:"08_automation_gear.png", site:"day", x:"10%", y:"74%", w:"clamp(110px,12vw,180px)", depth:14, alpha:0.68, mobile:"hide" },

    // SOLUTIONS — modular UX, device interfaces, code and API.
    { n:3, file:"03_layers_glass_tile.png", site:"rooms", x:"87%", y:"12%", w:"clamp(115px,12vw,180px)", depth:12, alpha:0.62, mobile:"hide" },
    { n:7, file:"07_floating_smartphone.png", site:"rooms", x:"11%", y:"37%", w:"clamp(115px,12vw,195px)", depth:-19, alpha:0.73 },
    { n:11, file:"11_3d_browser_window.png", site:"rooms", x:"88%", y:"64%", w:"clamp(150px,18vw,260px)", depth:17, alpha:0.70, mobile:"hide" },
    { n:13, file:"13_api_connector.png", site:"rooms", x:"11%", y:"89%", w:"clamp(115px,13vw,210px)", depth:-16, alpha:0.68, mobile:"hide" },

    // RELIABILITY — infrastructure and connected data.
    { n:10, file:"10_glass_data_cube.png", site:"rules", x:"88%", y:"31%", w:"clamp(130px,14vw,220px)", depth:20, alpha:0.64, mobile:"hide" },
    { n:14, file:"14_cloud_infrastructure.png", site:"rules", x:"10%", y:"77%", w:"clamp(150px,18vw,260px)", depth:-12, alpha:0.70, mobile:"hide" },

    // CASE STUDIES / TECHNICAL WORK — purposeful focal points.
    { n:12, file:"12_growth_analytics.png", site:"members", x:"91%", y:"78%", w:"clamp(140px,16vw,240px)", depth:15, alpha:0.72 },
    { n:15, file:"15_3d_cursor_click.png", site:"evenings", x:"88%", y:"57%", w:"clamp(120px,13vw,200px)", depth:-14, alpha:0.73 },
    { n:9, file:"09_digital_orb.png", site:"made", x:"89%", y:"50%", w:"clamp(130px,15vw,225px)", depth:18, alpha:0.69 }
  ];
  const entries = [];
  const layerBySite = new Map();

  const getHost = site => {
    if (site === "opening") return document.querySelector("#opening .opening__stage");
    return document.getElementById(site);
  };
  const getLayer = site => {
    if (layerBySite.has(site)) return layerBySite.get(site);
    const host = getHost(site);
    if (!host) return null;
    const layer = document.createElement("div");
    layer.className = "egm-layer" + (site === "opening" ? " egm-layer--hero" : "");
    layer.setAttribute("aria-hidden","true");
    host.appendChild(layer);
    layerBySite.set(site,layer);
    return layer;
  };
  assets.forEach(item => {
    const layer = getLayer(item.site);
    if (!layer) return;
    const place = document.createElement("div");
    place.className = "egm-place egm-place--" + item.n + (item.site === "opening" ? " egm-place--hero" : "");
    place.dataset.egm = String(item.n);
    place.dataset.egmMobile = item.mobile || "show";
    place.style.setProperty("--egm-x", item.x);
    place.style.setProperty("--egm-y", item.y);
    place.style.setProperty("--egm-w", item.w);
    place.style.setProperty("--egm-opacity", String(item.alpha));
    const anchor = document.createElement("span"); anchor.className = "egm-anchor";
    const entrance = document.createElement("span"); entrance.className = "egm-entrance";
    const pointer = document.createElement("span"); pointer.className = "egm-pointer";
    const drift = document.createElement("span"); drift.className = "egm-drift";
    const image = document.createElement("img");
    image.className = "egm-image";
    image.dataset.src = BASE + item.file;
    image.decoding = "async";
    image.loading = "lazy";
    image.alt = "";
    image.draggable = false;
    drift.appendChild(image);
    pointer.appendChild(drift);
    entrance.appendChild(pointer);
    anchor.appendChild(entrance);
    place.appendChild(anchor);
    layer.appendChild(place);
    entries.push({ ...item, place, anchor, entrance, pointer, drift, image, siteEl:getHost(item.site) });
  });

  // Images are loaded only as their sections approach the viewport.
  if ("IntersectionObserver" in window) {
    const loadObserver = new IntersectionObserver(records => {
      records.forEach(record => {
        if (!record.isIntersecting) return;
        const image = record.target;
        image.src = image.dataset.src;
        loadObserver.unobserve(image);
      });
    }, {rootMargin:"750px 0px",threshold:0});
    entries.forEach(entry => loadObserver.observe(entry.image));
    window.addEventListener("pagehide", () => loadObserver.disconnect(), {once:true});
  } else {
    entries.forEach(entry => { entry.image.src = entry.image.dataset.src; });
  }

  const reduceMotion = window.matchMedia && window.matchMedia("(prefers-reduced-motion: reduce)").matches;
  if (!window.gsap || !window.ScrollTrigger || reduceMotion) return;

  const gsap = window.gsap;
  gsap.registerPlugin(window.ScrollTrigger);
  const scroll = window.ScrollTrigger;
  const mm = gsap.matchMedia();
  mm.add({
    desktop:"(min-width: 1000px)",
    tablet:"(min-width: 700px) and (max-width: 999px)",
    mobile:"(max-width: 699px)",
    reduced:"(prefers-reduced-motion: reduce)"
  }, context => {
    const { desktop, tablet, mobile, reduced } = context.conditions;
    if (reduced) return;
    const visible = entries.filter(entry => getComputedStyle(entry.place).display !== "none");
    const driftMap = new Map();
    const idleObserver = "IntersectionObserver" in window ? new IntersectionObserver(records => {
      records.forEach(record => {
        const tween = driftMap.get(record.target);
        if (tween) record.isIntersecting ? tween.play() : tween.pause();
      });
    },{threshold:0.02,rootMargin:"80px 0px"}) : null;

    visible.forEach((entry,index) => {
      // Separate nested transforms prevent scroll, idle, pointer and reveal conflicts.
      gsap.from(entry.entrance, {
        autoAlpha:0, scale:0.82, y:18,
        rotation:index % 2 ? -5 : 5,
        duration:desktop ? 1.18 : 0.85,
        ease:"power3.out",
        immediateRender:false,
        scrollTrigger:{trigger:entry.place,start:"top 96%",once:true}
      });
      gsap.fromTo(entry.anchor,
        { yPercent:entry.depth > 0 ? 10 : -10 },
        { yPercent:entry.depth > 0 ? -20 : 16,
          rotation:desktop ? entry.depth * 0.12 : 0,
          ease:"none",
          scrollTrigger:{
            trigger:entry.siteEl,
            start:"top bottom",
            end:"bottom top",
            scrub:desktop ? 0.8 : 0.35,
            invalidateOnRefresh:true
          }
        });
      if (!mobile) {
        const tween = gsap.to(entry.drift,{
          y:entry.n % 2 ? -12 : 12,
          x:entry.n % 3 ? 5 : -5,
          rotation:entry.n % 2 ? 3.5 : -3.5,
          duration:3.6 + (entry.n % 5) * 0.65,
          repeat:-1,yoyo:true,ease:"sine.inOut",paused:true
        });
        driftMap.set(entry.place,tween);
        if (idleObserver) idleObserver.observe(entry.place);
        else tween.play();
      }
    });

    const orb = document.querySelector("#opening .opening__figure img");
    let heroTween;
    if (orb) {
      heroTween = gsap.to(orb,{
        y:desktop ? -13 : -7,
        rotation:desktop ? 4 : 1.5,
        scale:1.015,
        duration:6.2,
        repeat:-1,yoyo:true,ease:"sine.inOut"
      });
      if (!desktop && !tablet) heroTween.timeScale(.65);
    }

    let pointerHandler;
    if (desktop && window.matchMedia("(pointer:fine)").matches) {
      const movers = visible.filter(entry => entry.site === "opening").map(entry => ({
        x:gsap.quickTo(entry.pointer,"x",{duration:.9,ease:"power3.out"}),
        y:gsap.quickTo(entry.pointer,"y",{duration:.9,ease:"power3.out"}),
        depth:entry.depth
      }));
      pointerHandler = event => {
        if (window.scrollY > window.innerHeight * 1.4) return;
        const nx = (event.clientX / window.innerWidth - 0.5) * 2;
        const ny = (event.clientY / window.innerHeight - 0.5) * 2;
        movers.forEach(m => {m.x(nx * m.depth);m.y(ny * m.depth * 0.55);});
      };
      window.addEventListener("pointermove",pointerHandler,{passive:true});
    }

    // A restrained cinematic reading-progress line; no scroll-jacking or smooth-scroll hijack.
    let progress = document.querySelector(".egm-progress");
    if (!progress) {
      progress = document.createElement("div");
      progress.className = "egm-progress";
      progress.setAttribute("aria-hidden","true");
      document.body.appendChild(progress);
    }
    gsap.to(progress,{
      scaleX:1,ease:"none",
      scrollTrigger:{trigger:document.documentElement,start:"top top",end:"bottom bottom",scrub:0.3}
    });
    return () => {
      if (idleObserver) idleObserver.disconnect();
      if (pointerHandler) window.removeEventListener("pointermove",pointerHandler);
      if (heroTween) heroTween.kill();
    };
  });

  // Re-evaluate motion positions only after the initial layout settles.
  window.addEventListener("load", () => scroll.refresh(), {once:true});
  window.addEventListener("pagehide", () => mm.revert(), {once:true});
})();
