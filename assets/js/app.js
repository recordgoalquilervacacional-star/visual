/* =========================================================
   Record go · Partner Portal — App shell, router & lógica UI
   ========================================================= */

(function () {
  'use strict';

  /* ---------------- State ---------------- */
  var state = {
    user: null,          // { name }
    lastResults: null,   // array of bookings from last search
    lang: 'es'
  };

  /* ---------------- Icons ---------------- */
  var ICON = {
    user: '<svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><circle cx="12" cy="8" r="4"/><path d="M4 20c0-4.4 3.6-8 8-8s8 3.6 8 8"/></svg>',
    eye: '<svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M1 12s4-7 11-7 11 7 11 7-4 7-11 7-11-7-11-7z"/><circle cx="12" cy="12" r="3"/></svg>',
    eyeOff: '<svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M17.9 17.9A10.9 10.9 0 0 1 12 19c-7 0-11-7-11-7a19.7 19.7 0 0 1 4.2-5.2M9.9 4.2A9.6 9.6 0 0 1 12 4c7 0 11 7 11 7a19.6 19.6 0 0 1-2.2 3.1"/><path d="M14.1 14.1a3 3 0 1 1-4.2-4.2"/><path d="M1 1l22 22"/></svg>',
    pencil: '<svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M12 20h9"/><path d="M16.5 3.5a2.1 2.1 0 0 1 3 3L7 19l-4 1 1-4Z"/></svg>',
    close: '<svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5"><path d="M18 6 6 18M6 6l12 12"/></svg>',
    check: '<svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="3"><path d="M20 6 9 17l-5-5"/></svg>',
    chevron: '<svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="m6 9 6 6 6-6"/></svg>',
    lock: '<svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><rect x="4" y="10" width="16" height="10" rx="2"/><path d="M8 10V7a4 4 0 0 1 8 0v3"/></svg>',
    info: '<svg width="10" height="10" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="3"><line x1="12" y1="16" x2="12" y2="11"/><circle cx="12" cy="8" r="0.5" fill="currentColor" stroke-width="2"/></svg>',
    instagram: '<svg width="17" height="17" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><rect x="3" y="3" width="18" height="18" rx="5"/><circle cx="12" cy="12" r="4"/><circle cx="17.5" cy="6.5" r="1" fill="currentColor" stroke="none"/></svg>',
    facebook: '<svg width="17" height="17" viewBox="0 0 24 24" fill="currentColor"><path d="M14 9h3V5h-3c-2.2 0-4 1.8-4 4v2H7v4h3v7h4v-7h3l1-4h-4V9c0-.6.4-1 1-1z"/></svg>',
    youtube: '<svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><rect x="2" y="5" width="20" height="14" rx="4"/><path d="M10 9.5v5l4.5-2.5z" fill="currentColor" stroke="none"/></svg>',
    linkedin: '<svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor"><rect x="2" y="2" width="20" height="20" rx="3" fill="none" stroke="currentColor" stroke-width="2"/><circle cx="7" cy="8" r="1.4"/><path d="M6.3 11h1.8v7H6.3zM10.3 11h1.7v1c.5-.8 1.3-1.2 2.3-1.2 1.8 0 3 1.2 3 3.4V18h-1.8v-3.4c0-1-.5-1.6-1.4-1.6s-1.6.6-1.6 1.7V18h-1.8z"/></svg>'
  };

  function flagSvg(code) {
    if (code === 'gb') {
      return '<svg viewBox="0 0 60 40" width="100%" height="100%"><rect width="60" height="40" fill="#00247d"/><path d="M0 0 60 40M60 0 0 40" stroke="#fff" stroke-width="8"/><path d="M0 0 60 40M60 0 0 40" stroke="#cf142b" stroke-width="4"/><path d="M30 0V40M0 20H60" stroke="#fff" stroke-width="12"/><path d="M30 0V40M0 20H60" stroke="#cf142b" stroke-width="6"/></svg>';
    }
    return '<svg viewBox="0 0 60 40" width="100%" height="100%"><rect width="60" height="40" fill="#c60b1e"/><rect y="10" width="60" height="20" fill="#ffc400"/></svg>';
  }

  /* ---------------- Helpers ---------------- */
  function qs(sel, ctx) { return (ctx || document).querySelector(sel); }
  function qsa(sel, ctx) { return Array.prototype.slice.call((ctx || document).querySelectorAll(sel)); }
  function el(html) { var d = document.createElement('div'); d.innerHTML = html.trim(); return d.firstElementChild; }
  function escapeHtml(s) { return String(s == null ? '' : s).replace(/[&<>"]/g, function (c) { return { '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;' }[c]; }); }

  function go(hash) { window.location.hash = hash; }

  /* ---------------- Header / Footer ---------------- */
  function renderHeader() {
    var loggedIn = !!state.user;
    var userBlock = loggedIn
      ? '<button class="user-chip" data-action="user-menu">' +
          '<span class="user-avatar">' + ICON.user + '</span>' +
          '<span class="label">' + escapeHtml(state.user.name) + '</span>' +
        '</button>'
      : '<button class="icon-btn" data-action="user-menu" aria-label="Cuenta">' + ICON.user + '</button>';

    return (
      '<header class="site-header">' +
        '<div class="container">' +
          '<button class="logo" data-action="go-home" aria-label="Record go">' +
            '<span class="logo-word">Record<span class="go">go</span></span>' +
            '<span class="logo-sub">MOBILITY</span>' +
          '</button>' +
          '<div class="header-actions">' +
            '<button class="pill-toggle" data-action="open-lang">' +
              '<span class="flag">' + flagSvg(state.lang === 'en' ? 'gb' : 'es') + '</span>' +
              '<span class="label">' + (state.lang === 'en' ? 'English' : 'Español') + '</span>' +
            '</button>' +
            userBlock +
          '</div>' +
        '</div>' +
      '</header>'
    );
  }

  function footerColumn(title, links) {
    var items = links.map(function (l) { return '<li><a href="#" onclick="return false;">' + l + '</a></li>'; }).join('');
    return (
      '<div class="footer-col" data-footer-col>' +
        '<h4 data-action="toggle-footer-col">' + title + ' <span class="footer-chevron">' + ICON.chevron + '</span></h4>' +
        '<ul>' + items + '</ul>' +
      '</div>'
    );
  }

  function renderFooter() {
    return (
      '<footer class="site-footer">' +
        '<div class="container">' +
          '<div class="footer-top">' +
            '<div class="footer-logo">' +
              '<span class="logo-word">Record<span class="go">go</span></span>' +
              '<div class="logo-sub">MOBILITY</div>' +
            '</div>' +
            footerColumn('Record go', ['Quiénes Somos', 'Trabaja en Record go', 'Únete al Club Record go', 'FAQs - Preguntas frecuentes', 'Atención al cliente y reclamaciones']) +
            footerColumn('Contacto', ['Atención al cliente']) +
            footerColumn('Legal', ['Términos y condiciones generales', 'Política de Privacidad y Protección de Datos', 'Cookies', 'Aviso legal']) +
          '</div>' +
          '<div class="footer-badges">' +
            certBadge('AEVAC') + certBadge('AECOVAL') + certBadge('FENEVAL') +
          '</div>' +
          '<div class="footer-mid">' +
            '<span class="pay-badge visa">VISA</span>' +
            '<span class="pay-badge mc">mastercard</span>' +
            '<span class="pay-badge">JCB</span>' +
            '<span class="pay-badge unionpay">UnionPay</span>' +
            '<span class="pay-badge amex">AMEX</span>' +
          '</div>' +
          '<div class="footer-bottom">' +
            '<div class="social-row">' +
              socialBtn(ICON.instagram) + socialBtn(ICON.facebook) + socialBtn(ICON.youtube) + socialBtn(ICON.linkedin) +
            '</div>' +
          '</div>' +
        '</div>' +
      '</footer>'
    );
  }
  function certBadge(name) {
    return '<div class="badge-cert"><span class="ring">' + name.slice(0, 4) + '</span>' + name + '</div>';
  }
  function socialBtn(icon) { return '<a href="#" class="social-btn" onclick="return false;">' + icon + '</a>'; }

  /* ---------------- Screens ---------------- */

  function bannerHtml(title, showBack) {
    return (
      '<div class="page-banner">' +
        '<h1>' + title + '</h1>' +
        (showBack ? '<div class="banner-back"><button class="btn btn-outline btn-sm" data-action="go-search">Volver al buscador</button></div>' : '') +
      '</div>'
    );
  }

  function screenLogin() {
    return (
      '<div class="page">' +
        '<div class="hero-login">' +
          '<svg class="road-car" viewBox="0 0 100 50"><rect x="6" y="24" width="70" height="16" rx="4" fill="#E4212B"/><rect x="14" y="16" width="40" height="14" rx="4" fill="#E4212B"/><circle cx="24" cy="40" r="6" fill="#1c1c1c"/><circle cx="64" cy="40" r="6" fill="#1c1c1c"/><rect x="18" y="19" width="30" height="9" rx="2" fill="#bfe3ff" opacity=".7"/></svg>' +
          '<form class="login-card" id="login-form" novalidate>' +
            '<h2>Acceso exclusivo para partners</h2>' +
            '<div class="field" id="field-email">' +
              '<input type="email" id="input-email" placeholder="Email" autocomplete="username" />' +
              '<div class="field-error">Introduce un email válido.</div>' +
            '</div>' +
            '<div class="field" id="field-password">' +
              '<input type="password" id="input-password" placeholder="Contraseña" autocomplete="current-password" />' +
              '<button type="button" class="field-toggle" data-action="toggle-pass" aria-label="Mostrar contraseña">' + ICON.eye + '</button>' +
              '<div class="field-error">Introduce tu contraseña.</div>' +
            '</div>' +
            '<label class="checkbox-row"><input type="checkbox" checked /> Mantenerme conectado</label>' +
            '<button type="submit" class="btn btn-primary btn-block" id="login-submit">Iniciar sesión</button>' +
            '<button type="button" class="link forgot" data-action="open-forgot">¿Has olvidado la contraseña?</button>' +
          '</form>' +
        '</div>' +
      '</div>'
    );
  }

  function screenSearch() {
    return (
      '<div class="page">' +
        bannerHtml('Partner Portal', false) +
        '<div class="page-body">' +
          '<div class="center-col">' +
            '<form class="card search-card" id="search-form">' +
              '<h2>Número de referencia de la reserva</h2>' +
              '<p>Introduce tu número de referencia para acceder al detalle de la reserva.</p>' +
              '<div class="field" id="field-ref">' +
                '<input type="text" id="input-ref" placeholder="Ej: 8293713-1" />' +
                '<div class="field-error">Introduce un número de referencia.</div>' +
              '</div>' +
              '<button type="submit" class="btn btn-primary btn-block">Consultar reserva</button>' +
            '</form>' +
          '</div>' +
        '</div>' +
      '</div>'
    );
  }

  function screenResults() {
    var rows = state.lastResults || APP_DATA.bookings;
    var trs = rows.map(function (b) {
      return (
        '<tr>' +
          '<td class="ref-link">' + b.referencia + '</td>' +
          '<td class="ref-link">' + b.reservaBroker + '</td>' +
          '<td><span class="badge badge-green">' + b.estado +
            '<span class="badge-info-dot" data-action="show-tooltip" data-msg="La reserva se ha cerrado y se ha abierto el contrato en delegación.">' + ICON.info + '</span>' +
          '</span></td>' +
          '<td>' + escapeHtml(b.cliente) + '</td>' +
          '<td>' + b.recogidaFecha + '</td>' +
          '<td>' + b.devolucionFecha + '</td>' +
          '<td>' + b.delegacionRecogida + '</td>' +
          '<td><button class="btn btn-outline-red" data-action="go-booking" data-id="' + b.id + '">Ver reserva</button></td>' +
        '</tr>'
      );
    }).join('');

    return (
      '<div class="page">' +
        bannerHtml('Partner Portal', true) +
        '<div class="page-body tight">' +
          '<div class="card results-card">' +
            '<div class="table-scroll">' +
              '<table class="data-table">' +
                '<thead><tr>' +
                  '<th>Nº referencia</th><th>Nº reserva</th><th>Estado</th><th>Nombre cliente</th>' +
                  '<th>Fecha y hora de recogida</th><th>Fecha y hora de devolución</th><th>Delegación</th><th></th>' +
                '</tr></thead>' +
                '<tbody>' + trs + '</tbody>' +
              '</table>' +
            '</div>' +
          '</div>' +
          '<div class="results-actions">' +
            '<button class="btn btn-primary" data-action="go-search">Realizar otra búsqueda</button>' +
          '</div>' +
        '</div>' +
      '</div>'
    );
  }

  var TABS = [
    { key: 'reserva', label: 'Detalle de la reserva' },
    { key: 'contrato', label: 'Detalles del contrato' },
    { key: 'cargos', label: 'Cargos y devoluciones' },
    { key: 'facturas', label: 'Ver facturas' },
    { key: 'anexos', label: 'Ver contrato y anexos' }
  ];

  function screenBooking(id, tab) {
    var b = findBooking(id);
    if (!b) {
      return '<div class="page"><div class="page-body"><div class="empty-state">No se ha encontrado la reserva.<br><button class="btn btn-primary" style="margin-top:16px" data-action="go-search">Volver al buscador</button></div></div></div>';
    }
    tab = tab || 'reserva';

    var tabsHtml = TABS.map(function (t) {
      return '<button class="tab-btn' + (t.key === tab ? ' active' : '') + '" data-action="go-tab" data-id="' + id + '" data-tab="' + t.key + '">' + t.label + '</button>';
    }).join('');

    return (
      '<div class="page">' +
        bannerHtml('Partner Portal', true) +
        '<div class="tabs-bar"><div class="tabs-bar-inner">' + tabsHtml + '</div></div>' +
        '<div class="page-body tight">' +
          '<div class="card detail-card">' +
            tabContent(b, tab) +
          '</div>' +
          '<div class="detail-footer-actions">' +
            '<button class="btn btn-primary" data-action="go-search">Realizar otra búsqueda</button>' +
          '</div>' +
        '</div>' +
      '</div>'
    );
  }

  function infoBox(label, value, editable) {
    return (
      '<div class="info-box"><div class="label">' + label + '</div>' +
        '<div class="value"><span>' + value + '</span>' + (editable ? '<span class="pencil">' + ICON.pencil + '</span>' : '') + '</div>' +
      '</div>'
    );
  }

  function tabContent(b, tab) {
    var head = (
      '<div class="detail-head">' +
        '<div><h3>Reserva: ' + b.reservaId + '</h3>' +
          '<div class="sub">Reserva broker: <a href="#" onclick="return false;">' + b.reservaBroker + '</a></div>' +
        '</div>' +
        '<span class="status-pill">' + b.estado + '</span>' +
      '</div>'
    );

    if (tab === 'reserva') {
      return (
        head +
        '<div class="section-title">Información de la reserva</div>' +
        '<div class="info-grid">' +
          infoBox('Nombre del cliente', escapeHtml(b.cliente)) +
          infoBox('ACRISS', b.acriss) +
          infoBox('Sell Code', b.sellCode) +
          infoBox('Delegación de recogida', b.delegacionRecogida) +
          infoBox('Delegación de devolución', b.delegacionDevolucion) +
          infoBox('Fecha y hora de recogida', b.recogidaFecha) +
          infoBox('Fecha y hora de devolución', b.devolucionFecha) +
          infoBox('Nº de vuelo', b.nVuelo, true) +
        '</div>' +
        '<div class="section-title">Cargos</div>' +
        '<div class="charge-box">' +
          '<div class="row-total"><span>Total alquiler + cobertura</span><span class="amount">' + b.totalAlquiler + '</span></div>' +
          '<div class="extra-title">Extras a pagar en mostrador</div>' +
          '<ul>' + b.extras.map(function (e) { return '<li>' + escapeHtml(e) + '</li>'; }).join('') + '</ul>' +
        '</div>' +
        '<div class="terms-note">¿Necesitas revisar las condiciones aplicables a esta tarifa? Consulta los ' +
          '<a href="#" class="link-red" data-action="open-terms">Términos y Condiciones de la reserva</a>.</div>'
      );
    }

    if (tab === 'contrato') {
      var c = b.contrato;
      return (
        head +
        '<div class="section-title">Información del contrato</div>' +
        '<div class="info-grid">' +
          infoBox('Sell Code', c.sellCode || b.sellCode) +
          infoBox('Status del contrato', c.status) +
          infoBox('Delegación de recogida', b.delegacionRecogida) +
          infoBox('Delegación de devolución', b.delegacionDevolucion) +
          infoBox('Fecha y hora prevista de recogida', c.fechaPrevistaRecogida) +
          infoBox('Fecha y hora prevista de devolución', c.fechaPrevistaDevolucion) +
          infoBox('Fecha y hora real de recogida', c.fechaRealRecogida) +
          infoBox('Fecha y hora real de devolución', c.fechaRealDevolucion) +
          infoBox('Nombre del titular', escapeHtml(c.titular)) +
          infoBox('Nombre del conductor adicional', escapeHtml(c.conductorAdicional)) +
        '</div>' +
        '<div class="section-title">Datos del vehículo</div>' +
        '<div class="info-grid">' +
          infoBox('Categoría reservada (ACRISS)', c.categoriaReservada) +
          infoBox('Categoría entregada (ACRISS)', c.categoriaEntregada) +
          infoBox('Matrícula entregada', c.matriculaEntregada) +
          infoBox('Kilometraje (entrega)', c.kmEntrega) +
          infoBox('Kilometraje (devolución)', c.kmDevolucion) +
          infoBox('Depósito de combustible (entrega)', c.depositoEntrega) +
          infoBox('Depósito de combustible (devolución)', c.depositoDevolucion) +
        '</div>' +
        '<div class="section-title">Cargos y pagos</div>' +
        '<div class="charge-box">' +
          '<div class="row-total"><span>Total pagado en mostrador</span><span class="amount">' + c.totalMostrador + '</span></div>' +
          '<ul>' + c.cargosMostrador.map(function (x) { return '<li>' + x.concepto + ': ' + x.importe + '</li>'; }).join('') + '</ul>' +
        '</div>'
      );
    }

    if (tab === 'cargos') {
      return head + chargesBlock('Cargos y bloqueos', b.cargos.cargos, true) + chargesBlock('Devoluciones', b.cargos.devoluciones, true);
    }

    if (tab === 'facturas') {
      var rows = b.facturas.map(function (f) {
        return '<tr><td>' + f.fecha + '</td><td class="ref-link">' + f.factura + '</td><td>' + f.concepto + '</td><td>' + f.importe + '</td>' +
          '<td class="row-actions"><button class="btn btn-ghost btn-sm" data-action="noop">Visualizar</button><button class="btn btn-outline-red btn-sm" data-action="noop">Descargar</button></td></tr>';
      }).join('');
      return (
        head +
        '<div class="subtable-block">' +
          '<div class="subtable-title">Facturación del cliente: ' + b.reservaBroker + '</div>' +
          '<div class="table-scroll"><table class="data-table"><thead><tr><th>Fecha</th><th>Factura</th><th>Concepto</th><th>Importe</th><th></th></tr></thead><tbody>' + rows + '</tbody></table></div>' +
        '</div>'
      );
    }

    if (tab === 'anexos') {
      var rows2 = b.anexos.map(function (a) {
        return '<tr><td>' + a.fecha + '</td><td><strong>' + a.doc + '</strong><br><span style="color:var(--text-muted);font-size:12.5px">' + a.label + '</span></td>' +
          '<td>' + (a.viaVerde ? '<span class="chip">Via verde</span>' : '') + '</td>' +
          '<td class="row-actions"><button class="btn btn-ghost btn-sm" data-action="noop">Visualizar</button><button class="btn btn-outline-red btn-sm" data-action="noop">Descargar</button></td></tr>';
      }).join('');
      return (
        head +
        '<div class="subtable-block">' +
          '<div class="subtable-title">Contrato y anexos: ' + b.reservaBroker + '</div>' +
          '<div class="table-scroll"><table class="data-table"><thead><tr><th>Fecha</th><th>Documento/contrato</th><th></th><th></th></tr></thead><tbody>' + rows2 + '</tbody></table></div>' +
        '</div>'
      );
    }

    return '';
  }

  function chargesBlock(title, list, withRefundIcon) {
    var rows = list.map(function (r) {
      return '<tr><td>' + r.fecha + '</td><td class="ref-link">' + r.payment + '</td><td>' + r.tipo + '</td><td>' + r.importe + '</td>' +
        (withRefundIcon ? '<td><span class="icon-refund">€</span></td>' : '') + '</tr>';
    }).join('');
    return (
      '<div class="subtable-block">' +
        '<div class="subtable-title">' + title + '</div>' +
        '<div class="table-scroll"><table class="data-table"><thead><tr><th>Date</th><th>Payment</th><th>Payment Type</th><th>Total Amount</th><th></th></tr></thead><tbody>' + rows + '</tbody></table></div>' +
      '</div>'
    );
  }

  /* ---------------- Router ---------------- */
  var routes = {
    '': screenLogin,
    'login': screenLogin,
    'search': screenSearch,
    'results': screenResults
  };

  function render() {
    qs('#header-root').innerHTML = renderHeader();
    qs('#footer-root').innerHTML = renderFooter();

    var hash = window.location.hash.replace(/^#\/?/, '');
    var parts = hash.split('/').filter(Boolean);

    var html;
    if (parts[0] === 'booking' && parts[1]) {
      html = screenBooking(parts[1], parts[2]);
    } else {
      var key = parts[0] || '';
      // Guard: results/booking require being logged in conceptually, but per demo allow direct access
      var fn = routes[key] || screenLogin;
      html = fn();
    }
    qs('#app').innerHTML = html;
    bindFooterAccordion();
    window.scrollTo(0, 0);
  }

  /* ---------------- Modals ---------------- */
  function openOverlay(innerHtml, extraClass) {
    var root = qs('#overlay-root');
    root.innerHTML = '<div class="overlay" data-action="overlay-bg">' + innerHtml + '</div>';
  }
  function closeOverlay() { qs('#overlay-root').innerHTML = ''; }

  function openForgotModal() {
    openOverlay(
      '<div class="modal" role="dialog">' +
        '<button class="modal-close" data-action="close-modal">' + ICON.close + '</button>' +
        '<div class="modal-icon">' + ICON.lock + '</div>' +
        '<h3>¿Has olvidado la contraseña?</h3>' +
        '<p>Para recuperar el acceso a tu cuenta de partner, envíanos un correo electrónico indicando tus datos a:</p>' +
        '<div class="highlight-box">' + APP_DATA.supportEmail + '</div>' +
      '</div>'
    );
  }

  function openLangModal() {
    var options = APP_DATA.languages.map(function (l) {
      var active = state.lang === l.code;
      return (
        '<button class="lang-option' + (active ? ' active' : '') + '" data-action="set-lang" data-code="' + l.code + '">' +
          '<span class="flag">' + flagSvg(l.flag) + '</span>' + l.label +
          (active ? '<span class="check">' + ICON.check + '</span>' : '') +
        '</button>'
      );
    }).join('');
    openOverlay(
      '<div class="modal modal-lang" role="dialog">' +
        '<div class="modal-lang-header"><h4>Selecciona tu idioma</h4><button class="modal-close" style="position:static" data-action="close-modal">' + ICON.close + '</button></div>' +
        options +
      '</div>'
    );
  }

  function openTermsModal() {
    openOverlay(
      '<div class="modal modal-terms" role="dialog">' +
        '<div class="terms-head">Términos y condiciones generales' +
          '<button class="modal-close" data-action="close-modal">' + ICON.close + '</button>' +
        '</div>' +
        '<div class="terms-body">' + APP_DATA.termsAndConditions + '</div>' +
        '<div class="terms-foot"><button class="btn btn-primary" data-action="close-modal">Volver</button></div>' +
      '</div>'
    );
  }

  function showToast(msg, x, y) {
    var t = el('<div class="toast">' + escapeHtml(msg) + '</div>');
    document.body.appendChild(t);
    var top = Math.max(10, y - 10);
    var left = Math.min(window.innerWidth - t.offsetWidth - 16, x + 16);
    t.style.top = top + 'px';
    t.style.left = Math.max(10, left) + 'px';
    setTimeout(function () {
      t.style.transition = 'opacity .2s ease';
      t.style.opacity = '0';
      setTimeout(function () { t.remove(); }, 200);
    }, 3200);
    function dismiss(ev) {
      if (!t.contains(ev.target)) { t.remove(); document.removeEventListener('click', dismiss); }
    }
    setTimeout(function () { document.addEventListener('click', dismiss); }, 0);
  }

  /* ---------------- Footer accordion (mobile) ---------------- */
  function bindFooterAccordion() {
    qsa('[data-footer-col]').forEach(function (col) {
      var header = qs('[data-action="toggle-footer-col"]', col);
      if (!header) return;
      header.onclick = function () {
        if (window.innerWidth > 768) return;
        col.classList.toggle('open');
      };
    });
  }

  /* ---------------- Field validation helpers ---------------- */
  function setFieldError(fieldEl, hasError) {
    fieldEl.classList.toggle('error', hasError);
    var input = qs('input', fieldEl);
    if (input) input.classList.toggle('has-error', hasError);
  }

  /* ---------------- Global click delegation ---------------- */
  document.addEventListener('click', function (e) {
    var t = e.target.closest('[data-action]');
    if (!t) {
      // close any open tooltip when clicking elsewhere
      qsa('.tooltip-bubble.open').forEach(function (tt) { tt.remove(); });
      return;
    }
    var action = t.getAttribute('data-action');

    switch (action) {
      case 'go-home':
        go(state.user ? '#/search' : '#/login');
        break;
      case 'open-forgot':
        openForgotModal();
        break;
      case 'open-lang':
        openLangModal();
        break;
      case 'set-lang':
        state.lang = t.getAttribute('data-code');
        closeOverlay();
        render();
        break;
      case 'close-modal':
        closeOverlay();
        break;
      case 'overlay-bg':
        if (e.target === t) closeOverlay();
        break;
      case 'toggle-pass': {
        var input = qs('#input-password');
        var showing = input.type === 'text';
        input.type = showing ? 'password' : 'text';
        t.innerHTML = showing ? ICON.eye : ICON.eyeOff;
        break;
      }
      case 'user-menu':
        if (!state.user) { go('#/login'); }
        break;
      case 'go-search':
        go('#/search');
        break;
      case 'go-booking':
        go('#/booking/' + t.getAttribute('data-id') + '/reserva');
        break;
      case 'go-tab':
        go('#/booking/' + t.getAttribute('data-id') + '/' + t.getAttribute('data-tab'));
        break;
      case 'open-terms':
        e.preventDefault();
        openTermsModal();
        break;
      case 'show-tooltip': {
        e.stopPropagation();
        qsa('.tooltip-bubble.open').forEach(function (tt) { tt.remove(); });
        var rect = t.getBoundingClientRect();
        showToast(t.getAttribute('data-msg'), rect.left, rect.bottom + window.scrollY);
        break;
      }
      case 'noop':
        break;
    }
  });

  /* ---------------- Form submit delegation ---------------- */
  document.addEventListener('submit', function (e) {
    if (e.target.id === 'login-form') {
      e.preventDefault();
      var emailField = qs('#field-email', e.target);
      var passField = qs('#field-password', e.target);
      var email = qs('#input-email', e.target).value.trim();
      var pass = qs('#input-password', e.target).value;
      var emailOk = /\S+@\S+\.\S+/.test(email);
      var passOk = pass.length > 0;
      setFieldError(emailField, !emailOk);
      setFieldError(passField, !passOk);
      if (!emailOk || !passOk) return;

      var btn = qs('#login-submit', e.target);
      btn.disabled = true;
      btn.innerHTML = '<span class="spinner"></span> Iniciando…';
      setTimeout(function () {
        state.user = { name: APP_DATA.currentUser.name };
        go('#/search');
      }, 700);
    }

    if (e.target.id === 'search-form') {
      e.preventDefault();
      var refField = qs('#field-ref', e.target);
      var ref = qs('#input-ref', e.target).value.trim();
      var ok = ref.length > 0;
      setFieldError(refField, !ok);
      if (!ok) return;
      state.lastResults = APP_DATA.bookings;
      go('#/results');
    }
  });

  /* ---------------- Boot ---------------- */
  window.addEventListener('hashchange', render);
  window.addEventListener('DOMContentLoaded', function () {
    if (!window.location.hash) window.location.hash = '#/login';
    render();
  });
})();
