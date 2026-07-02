/* ================================================================
   ÓPTICAS SIRIIUS — Interacciones
   · Preloader con contador
   · Nav (scroll + menú móvil)
   · Barra de progreso de scroll
   · Reveal al hacer scroll
   · Trazado animado de las gafas (line art)
   · Formulario → WhatsApp
   WhatsApp: 3156501085  →  wa.me/573156501085
================================================================ */
(function () {
  'use strict';
  var reduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

  /* ---------- 1 · PRELOADER ---------- */
  var loader = document.getElementById('loader');
  var loaderNum = document.getElementById('loaderNum');
  function finishLoader() {
    if (!loader) return;
    loader.classList.add('done');
    document.body.style.overflow = '';
    window.setTimeout(function () { if (loader) loader.remove(); }, 900);
  }
  if (loader) {
    document.body.style.overflow = 'hidden';
    if (reduce) {
      if (loaderNum) loaderNum.textContent = '100';
      window.setTimeout(finishLoader, 400);
    } else {
      var n = 0;
      var tick = window.setInterval(function () {
        n += Math.floor(Math.random() * 8) + 3;
        if (n >= 100) { n = 100; window.clearInterval(tick); }
        if (loaderNum) loaderNum.textContent = n < 10 ? '0' + n : String(n);
        if (n === 100) window.setTimeout(finishLoader, 500);
      }, 90);
    }
  }
  // Salvavidas: nunca dejar la pantalla de carga bloqueada
  window.addEventListener('load', function () { window.setTimeout(finishLoader, 2600); });

  /* ---------- 2 · NAV: estado al hacer scroll ---------- */
  var nav = document.getElementById('nav');
  var progress = document.getElementById('scrollProgress');
  function onScroll() {
    var y = window.pageYOffset || document.documentElement.scrollTop;
    if (nav) nav.classList.toggle('scrolled', y > 40);
    if (progress) {
      var h = document.documentElement.scrollHeight - window.innerHeight;
      progress.style.width = (h > 0 ? (y / h) * 100 : 0) + '%';
    }
  }
  window.addEventListener('scroll', onScroll, { passive: true });
  onScroll();

  /* ---------- 2b · MENÚ MÓVIL ---------- */
  var burger = document.getElementById('burger');
  var navLinks = document.getElementById('navLinks');
  function closeMenu() {
    if (!navLinks) return;
    navLinks.classList.remove('open');
    if (burger) { burger.classList.remove('open'); burger.setAttribute('aria-expanded', 'false'); }
  }
  if (burger && navLinks) {
    burger.addEventListener('click', function () {
      var open = navLinks.classList.toggle('open');
      burger.classList.toggle('open', open);
      burger.setAttribute('aria-expanded', open ? 'true' : 'false');
    });
    navLinks.querySelectorAll('a').forEach(function (a) { a.addEventListener('click', closeMenu); });
  }

  /* ---------- 3 · REVEAL AL SCROLL ---------- */
  var revealEls = document.querySelectorAll('[data-reveal]');
  if (reduce || !('IntersectionObserver' in window)) {
    revealEls.forEach(function (el) { el.classList.add('in'); });
  } else {
    var ro = new IntersectionObserver(function (entries) {
      entries.forEach(function (en) {
        if (en.isIntersecting) { en.target.classList.add('in'); ro.unobserve(en.target); }
      });
    }, { threshold: 0.14, rootMargin: '0px 0px -8% 0px' });
    revealEls.forEach(function (el) { ro.observe(el); });
  }

  /* ---------- 4 · TRAZADO ANIMADO DE LAS GAFAS ---------- */
  if (!reduce && 'IntersectionObserver' in window) {
    document.querySelectorAll('.glasses .draw').forEach(function (p) {
      try {
        var len = p.getTotalLength();
        p.style.strokeDasharray = len;
        p.style.strokeDashoffset = len;
        p.style.transition = 'stroke-dashoffset 1.5s cubic-bezier(.22,.61,.36,1)';
      } catch (e) {}
    });
    var go = new IntersectionObserver(function (entries) {
      entries.forEach(function (en) {
        if (!en.isIntersecting) return;
        en.target.querySelectorAll('.draw').forEach(function (p, i) {
          p.style.transitionDelay = (i * 0.11) + 's';
          p.style.strokeDashoffset = '0';
        });
        go.unobserve(en.target);
      });
    }, { threshold: 0.25 });
    document.querySelectorAll('.glasses').forEach(function (g) { go.observe(g); });
  }

  /* ---------- 5 · FORMULARIO → WHATSAPP ---------- */
  var WA_NUMBER = '573156501085'; // 3156501085 con indicativo de Colombia (+57)
  var form = document.getElementById('contactForm');
  if (form) {
    form.addEventListener('submit', function (e) {
      e.preventDefault();
      var nombre = (form.nombre.value || '').trim();
      var tel = (form.telefono.value || '').trim();
      var msg = (form.mensaje.value || '').trim();

      if (!nombre) { form.nombre.focus(); return; }
      if (!tel) { form.telefono.focus(); return; }

      var text = 'Hola Siriius, soy ' + nombre + '. Mi teléfono es ' + tel + '. ';
      text += msg ? msg : 'Quiero agendar un examen visual.';
      window.open('https://wa.me/' + WA_NUMBER + '?text=' + encodeURIComponent(text), '_blank');
    });
  }

  /* ---------- 5b · LIGHTBOX DE LA GALERÍA ---------- */
  var lb = document.getElementById('lightbox');
  var lbImg = document.getElementById('lbImg');
  var items = Array.prototype.slice.call(document.querySelectorAll('#galGrid .gal-item'));
  var sources = items.map(function (b) { var im = b.querySelector('img'); return { src: im.getAttribute('src'), alt: im.getAttribute('alt') }; });
  var cur = 0;
  function showLb(i) {
    if (!sources.length) return;
    cur = (i + sources.length) % sources.length;
    lbImg.setAttribute('src', sources[cur].src);
    lbImg.setAttribute('alt', sources[cur].alt);
  }
  function openLb(i) { if (!lb) return; showLb(i); lb.classList.add('open'); lb.setAttribute('aria-hidden', 'false'); document.body.style.overflow = 'hidden'; }
  function closeLb() { if (!lb) return; lb.classList.remove('open'); lb.setAttribute('aria-hidden', 'true'); document.body.style.overflow = ''; }
  if (lb) {
    items.forEach(function (b, i) { b.addEventListener('click', function () { openLb(i); }); });
    var lbClose = document.getElementById('lbClose');
    var lbPrev = document.getElementById('lbPrev');
    var lbNext = document.getElementById('lbNext');
    if (lbClose) lbClose.addEventListener('click', closeLb);
    if (lbPrev) lbPrev.addEventListener('click', function () { showLb(cur - 1); });
    if (lbNext) lbNext.addEventListener('click', function () { showLb(cur + 1); });
    lb.addEventListener('click', function (e) { if (e.target === lb) closeLb(); });
    document.addEventListener('keydown', function (e) {
      if (!lb.classList.contains('open')) return;
      if (e.key === 'Escape') closeLb();
      else if (e.key === 'ArrowLeft') showLb(cur - 1);
      else if (e.key === 'ArrowRight') showLb(cur + 1);
    });
  }

  /* ---------- 6 · AÑO EN EL FOOTER ---------- */
  var yearEl = document.getElementById('year');
  if (yearEl) yearEl.textContent = new Date().getFullYear();
})();
