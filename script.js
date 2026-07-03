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

  /* ================= TIENDA + CARRITO ================= */
  var WA = '573156501085';
  var PRODUCTS = window.SIRIIUS_PRODUCTS || [];
  function money(n) { return '$' + Number(n).toLocaleString('es-CO'); }
  function prod(id) { for (var i = 0; i < PRODUCTS.length; i++) { if (PRODUCTS[i].id === id) return PRODUCTS[i]; } return null; }

  /* ---------- Render del grid de productos ---------- */
  var grid = document.getElementById('shopGrid');
  function badgeHTML(p) {
    if (p.compare) { var d = Math.round((1 - p.price / p.compare) * 100); return '<span class="pcard-badge is-sale">-' + d + '%</span>'; }
    if (p.badge === 'nuevo') return '<span class="pcard-badge">Nuevo</span>';
    if (p.badge === 'tendencia') return '<span class="pcard-badge">Tendencia</span>';
    if (p.badge === 'outlet') return '<span class="pcard-badge">Outlet</span>';
    return '';
  }
  function cardHTML(p, i) {
    var tokens = (p.cats || []).slice();
    if (p.compare) tokens.push('ofertas');
    if (p.badge === 'nuevo') tokens.push('nuevo');
    var colors = p.colors ? '<span class="pcard-colors">' + p.colors + (p.colors > 1 ? ' colores' : ' color') + '</span>' : '';
    var price = p.compare
      ? '<span class="was">' + money(p.compare) + '</span><span class="now">' + money(p.price) + '</span>'
      : '<span class="now">' + money(p.price) + '</span>';
    return '<article class="pcard" data-cats="' + tokens.join(' ') + '">' +
      '<div class="pcard-media" data-idx="' + i + '">' +
        '<img src="' + p.img + '" alt="' + p.name + '" loading="lazy" />' +
        badgeHTML(p) + colors +
        '<button class="pcard-add" data-id="' + p.id + '" aria-label="Agregar ' + p.name + ' al carrito">' +
          '<svg viewBox="0 0 24 24" fill="none" aria-hidden="true"><path d="M12 5v14M5 12h14" stroke="currentColor" stroke-width="2" stroke-linecap="round"/></svg>' +
        '</button>' +
      '</div>' +
      '<div class="pcard-info"><h3 class="pcard-name">' + p.name + '</h3><div class="pcard-price">' + price + '</div></div>' +
    '</article>';
  }
  /* ---------- Filtros + paginación (6 por página) ---------- */
  var filters = document.getElementById('shopFilters');
  var shopEmpty = document.getElementById('shopEmpty');
  var shopPages = document.getElementById('shopPages');
  var PER_PAGE = 6;
  var curFilter = 'all';
  var curPage = 1;

  function filtered() {
    return PRODUCTS.filter(function (p) {
      if (curFilter === 'all') return true;
      var t = (p.cats || []).slice();
      if (p.compare) t.push('ofertas');
      if (p.badge === 'nuevo') t.push('nuevo');
      return t.indexOf(curFilter) >= 0;
    });
  }
  function renderPages(pages) {
    if (!shopPages) return;
    if (pages <= 1) { shopPages.innerHTML = ''; return; }
    var h = '<button class="page-btn page-arrow" data-page="prev"' + (curPage === 1 ? ' disabled' : '') + ' aria-label="Anterior">&#8249;</button>';
    for (var i = 1; i <= pages; i++) h += '<button class="page-btn' + (i === curPage ? ' is-active' : '') + '" data-page="' + i + '">' + i + '</button>';
    h += '<button class="page-btn page-arrow" data-page="next"' + (curPage === pages ? ' disabled' : '') + ' aria-label="Siguiente">&#8250;</button>';
    shopPages.innerHTML = h;
  }
  function renderShop() {
    if (!grid) return;
    var list = filtered();
    var pages = Math.max(1, Math.ceil(list.length / PER_PAGE));
    if (curPage > pages) curPage = 1;
    var start = (curPage - 1) * PER_PAGE;
    var pageItems = list.slice(start, start + PER_PAGE);
    grid.innerHTML = pageItems.map(function (p) { return cardHTML(p, PRODUCTS.indexOf(p)); }).join('');
    if (shopEmpty) shopEmpty.hidden = list.length > 0;
    renderPages(pages);
  }

  if (grid && PRODUCTS.length) {
    renderShop();
    grid.addEventListener('click', function (e) {
      var add = e.target.closest('.pcard-add');
      if (add) { addToCart(parseInt(add.getAttribute('data-id'), 10)); add.classList.remove('added'); void add.offsetWidth; add.classList.add('added'); return; }
      var media = e.target.closest('.pcard-media');
      if (media) openLb(parseInt(media.getAttribute('data-idx'), 10));
    });
  }
  if (filters) {
    filters.addEventListener('click', function (e) {
      var chip = e.target.closest('.chip'); if (!chip) return;
      filters.querySelectorAll('.chip').forEach(function (c) { c.classList.remove('is-active'); });
      chip.classList.add('is-active');
      curFilter = chip.getAttribute('data-filter'); curPage = 1; renderShop();
    });
  }
  if (shopPages) {
    shopPages.addEventListener('click', function (e) {
      var b = e.target.closest('.page-btn'); if (!b || b.disabled) return;
      var pages = Math.max(1, Math.ceil(filtered().length / PER_PAGE));
      var p = b.getAttribute('data-page');
      if (p === 'prev') curPage = Math.max(1, curPage - 1);
      else if (p === 'next') curPage = Math.min(pages, curPage + 1);
      else curPage = parseInt(p, 10);
      renderShop();
      var sec = document.getElementById('marcos');
      if (sec) window.scrollTo({ top: sec.getBoundingClientRect().top + window.pageYOffset - 70, behavior: reduce ? 'auto' : 'smooth' });
    });
  }

  /* ---------- Estado del carrito (localStorage) ---------- */
  var CART_KEY = 'siriius_cart';
  var cartState = {};
  try { cartState = JSON.parse(localStorage.getItem(CART_KEY)) || {}; } catch (e) { cartState = {}; }
  function saveCart() { try { localStorage.setItem(CART_KEY, JSON.stringify(cartState)); } catch (e) {} }

  var cartDrawer = document.getElementById('cart');
  var cartOverlay = document.getElementById('cartOverlay');
  var cartItemsEl = document.getElementById('cartItems');
  var cartFoot = document.getElementById('cartFoot');
  var cartTotalEl = document.getElementById('cartTotal');
  var cartCountEl = document.getElementById('cartCount');

  function addToCart(id) { cartState[id] = (cartState[id] || 0) + 1; saveCart(); renderCart(); openCart(); }
  function setQty(id, q) { if (q <= 0) delete cartState[id]; else cartState[id] = q; saveCart(); renderCart(); }

  function renderCart() {
    var ids = Object.keys(cartState);
    var count = ids.reduce(function (s, id) { return s + cartState[id]; }, 0);
    if (cartCountEl) { cartCountEl.textContent = count; cartCountEl.hidden = count === 0; }
    if (!cartItemsEl) return;
    if (!ids.length) {
      cartItemsEl.innerHTML = '<p class="cart-empty">Tu carrito está vacío.</p>';
      if (cartFoot) cartFoot.style.display = 'none';
      if (cartTotalEl) cartTotalEl.textContent = money(0);
      return;
    }
    if (cartFoot) cartFoot.style.display = '';
    var total = 0;
    cartItemsEl.innerHTML = ids.map(function (id) {
      var p = prod(parseInt(id, 10)); if (!p) return ''; var q = cartState[id]; total += p.price * q;
      return '<div class="cart-row">' +
        '<img class="cart-row-img" src="' + p.img + '" alt="' + p.name + '" />' +
        '<div><div class="cart-row-name">' + p.name + '</div><div class="cart-row-price">' + money(p.price) + '</div>' +
          '<div class="cart-qty"><button data-act="dec" data-id="' + id + '" aria-label="Quitar uno">&minus;</button><span>' + q + '</span><button data-act="inc" data-id="' + id + '" aria-label="Agregar uno">+</button></div>' +
        '</div>' +
        '<div class="cart-row-right"><b>' + money(p.price * q) + '</b><button class="cart-row-remove" data-act="rem" data-id="' + id + '">Quitar</button></div>' +
      '</div>';
    }).join('');
    if (cartTotalEl) cartTotalEl.textContent = money(total);
  }
  if (cartItemsEl) {
    cartItemsEl.addEventListener('click', function (e) {
      var b = e.target.closest('button[data-act]'); if (!b) return;
      var id = parseInt(b.getAttribute('data-id'), 10), act = b.getAttribute('data-act');
      if (act === 'inc') setQty(id, cartState[id] + 1);
      else if (act === 'dec') setQty(id, cartState[id] - 1);
      else if (act === 'rem') setQty(id, 0);
    });
  }

  function openCart() { if (!cartDrawer) return; if (cartOverlay) cartOverlay.hidden = false; cartDrawer.classList.add('open'); cartDrawer.setAttribute('aria-hidden', 'false'); requestAnimationFrame(function () { if (cartOverlay) cartOverlay.classList.add('open'); }); document.body.style.overflow = 'hidden'; }
  function closeCart() { if (!cartDrawer) return; cartDrawer.classList.remove('open'); cartDrawer.setAttribute('aria-hidden', 'true'); if (cartOverlay) cartOverlay.classList.remove('open'); document.body.style.overflow = ''; window.setTimeout(function () { if (cartOverlay) cartOverlay.hidden = true; }, 420); }
  var cartBtn = document.getElementById('cartBtn');
  var cartClose = document.getElementById('cartClose');
  if (cartBtn) cartBtn.addEventListener('click', function () { renderCart(); openCart(); });
  if (cartClose) cartClose.addEventListener('click', closeCart);
  if (cartOverlay) cartOverlay.addEventListener('click', closeCart);

  var cartCheckout = document.getElementById('cartCheckout');
  if (cartCheckout) {
    cartCheckout.addEventListener('click', function () {
      var ids = Object.keys(cartState); if (!ids.length) return;
      var total = 0;
      var lines = ids.map(function (id) { var p = prod(parseInt(id, 10)); if (!p) return ''; total += p.price * cartState[id]; return '• ' + p.name + ' x' + cartState[id] + ' — ' + money(p.price * cartState[id]); }).filter(Boolean);
      var text = 'Hola Siriius, quiero hacer este pedido:\n' + lines.join('\n') + '\n\nTotal: ' + money(total);
      window.open('https://wa.me/' + WA + '?text=' + encodeURIComponent(text), '_blank');
    });
  }
  renderCart();

  /* ---------- LIGHTBOX (usa las fotos de los productos) ---------- */
  var lb = document.getElementById('lightbox');
  var lbImg = document.getElementById('lbImg');
  var cur = 0;
  function showLb(i) {
    if (!PRODUCTS.length) return;
    cur = (i + PRODUCTS.length) % PRODUCTS.length;
    lbImg.setAttribute('src', PRODUCTS[cur].img);
    lbImg.setAttribute('alt', PRODUCTS[cur].name);
  }
  function openLb(i) { if (!lb) return; showLb(i); lb.classList.add('open'); lb.setAttribute('aria-hidden', 'false'); document.body.style.overflow = 'hidden'; }
  function closeLb() { if (!lb) return; lb.classList.remove('open'); lb.setAttribute('aria-hidden', 'true'); document.body.style.overflow = ''; }
  if (lb) {
    var lbClose = document.getElementById('lbClose');
    var lbPrev = document.getElementById('lbPrev');
    var lbNext = document.getElementById('lbNext');
    if (lbClose) lbClose.addEventListener('click', closeLb);
    if (lbPrev) lbPrev.addEventListener('click', function () { showLb(cur - 1); });
    if (lbNext) lbNext.addEventListener('click', function () { showLb(cur + 1); });
    lb.addEventListener('click', function (e) { if (e.target === lb) closeLb(); });
  }
  document.addEventListener('keydown', function (e) {
    if (lb && lb.classList.contains('open')) {
      if (e.key === 'Escape') closeLb();
      else if (e.key === 'ArrowLeft') showLb(cur - 1);
      else if (e.key === 'ArrowRight') showLb(cur + 1);
    } else if (cartDrawer && cartDrawer.classList.contains('open') && e.key === 'Escape') {
      closeCart();
    }
  });

  /* ---------- 6 · AÑO EN EL FOOTER ---------- */
  var yearEl = document.getElementById('year');
  if (yearEl) yearEl.textContent = new Date().getFullYear();
})();
