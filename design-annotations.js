/* =============================================================
   Design Annotations — right-click popover for prototype pages
   Usage:
     DesignAnnotations.init({
       page: 'Page name',
       required:    [ 'item', { text: 'item with sub', sub: ['a', 'b'] } ],
       suggestions: [ ... ]
     });
   ============================================================= */

(function () {
  'use strict';

  /* ── CSS ─────────────────────────────────────────────────── */
  var CSS = [
    '.da-popover {',
    '  position: fixed;',
    '  z-index: 99999;',
    '  width: 360px;',
    '  background: #fff;',
    '  border: 1px solid #e5e7eb;',
    '  border-radius: 12px;',
    '  box-shadow: 0 12px 40px rgba(0,0,0,.14), 0 2px 8px rgba(0,0,0,.07);',
    '  font-family: \'Roboto\', sans-serif;',
    '  overflow: hidden;',
    '  animation: da-in 140ms cubic-bezier(.2,.8,.4,1);',
    '  transform-origin: top left;',
    '}',
    '@keyframes da-in {',
    '  from { opacity:0; transform:scale(.94) translateY(-4px); }',
    '  to   { opacity:1; transform:scale(1)  translateY(0); }',
    '}',

    /* header */
    '.da-hd {',
    '  display: flex;',
    '  align-items: center;',
    '  gap: 10px;',
    '  padding: 13px 14px 11px;',
    '  border-bottom: 1px solid #f3f4f6;',
    '}',
    '.da-hd-icon {',
    '  width: 30px; height: 30px;',
    '  border-radius: 8px;',
    '  background: #eff6ff;',
    '  display: flex; align-items: center; justify-content: center;',
    '  flex-shrink: 0;',
    '}',
    '.da-hd-icon .material-symbols-rounded { font-size: 17px; color: #0168DD; }',
    '.da-hd-meta { flex: 1; min-width: 0; }',
    '.da-hd-title {',
    '  font-size: 13px; font-weight: 600; color: #111827; line-height: 1.3;',
    '}',
    '.da-hd-sub {',
    '  font-size: 11px; color: #6b7280; margin-top: 1px; white-space: nowrap;',
    '  overflow: hidden; text-overflow: ellipsis;',
    '}',
    '.da-close {',
    '  border: none; background: transparent; cursor: pointer;',
    '  padding: 3px; color: #9ca3af; border-radius: 4px;',
    '  display: flex; align-items: center;',
    '  transition: background 100ms, color 100ms;',
    '}',
    '.da-close:hover { background: #f3f4f6; color: #374151; }',
    '.da-close .material-symbols-rounded { font-size: 18px; }',

    /* body */
    '.da-body { padding: 14px; display: flex; flex-direction: column; gap: 14px; max-height: 60vh; overflow-y: auto; }',

    /* section */
    '.da-section-hd {',
    '  display: flex; align-items: center; gap: 6px; margin-bottom: 9px;',
    '}',
    '.da-section-label {',
    '  font-size: 10px; font-weight: 700; letter-spacing: .08em;',
    '  text-transform: uppercase;',
    '}',
    '.da-section--req .da-section-label  { color: #92400e; }',
    '.da-section--sug .da-section-label  { color: #5b21b6; }',
    '.da-badge {',
    '  font-size: 10px; font-weight: 700;',
    '  padding: 1px 7px; border-radius: 99px; line-height: 1.5;',
    '}',
    '.da-section--req .da-badge { background: #fef3c7; color: #92400e; }',
    '.da-section--sug .da-badge { background: #ede9fe; color: #6d28d9; }',

    /* items */
    '.da-items { display: flex; flex-direction: column; gap: 5px; }',
    '.da-item {',
    '  display: flex; gap: 8px;',
    '  font-size: 13px; color: #374151; line-height: 1.5;',
    '}',
    '.da-dot {',
    '  width: 5px; height: 5px; border-radius: 50%;',
    '  margin-top: 7px; flex-shrink: 0;',
    '}',
    '.da-section--req .da-dot { background: #f59e0b; }',
    '.da-section--sug .da-dot { background: #8b5cf6; }',

    /* sub-items */
    '.da-sub { margin-top: 4px; display: flex; flex-direction: column; gap: 2px; }',
    '.da-sub-item {',
    '  display: flex; gap: 6px;',
    '  font-size: 12px; color: #6b7280; line-height: 1.45; padding-left: 2px;',
    '}',
    '.da-sub-dash { flex-shrink: 0; color: #d1d5db; margin-top: 1px; }',

    /* none */
    '.da-none { font-size: 12px; color: #9ca3af; font-style: italic; }',

    /* divider */
    '.da-divider { height: 1px; background: #f3f4f6; margin: 0 -14px; }',

    /* footer */
    '.da-ft {',
    '  padding: 9px 14px;',
    '  border-top: 1px solid #f3f4f6;',
    '  display: flex; align-items: center; gap: 5px;',
    '  font-size: 11px; color: #9ca3af;',
    '}',
    '.da-ft .material-symbols-rounded { font-size: 13px; }',
    '.da-ft-pill {',
    '  margin-left: auto;',
    '  font-size: 10px; font-weight: 600; letter-spacing: .04em;',
    '  padding: 2px 7px; border-radius: 99px;',
    '  background: #f0fdf4; color: #15803d;',
    '}',
  ].join('\n');

  /* ── state ───────────────────────────────────────────────── */
  var popover  = null;
  var cfg      = null;
  var shownAt  = 0;   // timestamp when popover last opened (guards click-outside)

  /* ── helpers ─────────────────────────────────────────────── */
  function injectCSS() {
    if (document.getElementById('da-css')) return;
    var s = document.createElement('style');
    s.id = 'da-css';
    s.textContent = CSS;
    document.head.appendChild(s);
  }

  function itemsHTML(list, sectionClass) {
    if (!list || !list.length) {
      return '<span class="da-none">None for this page.</span>';
    }
    return list.map(function (item) {
      var text  = typeof item === 'string' ? item : item.text;
      var sub   = (typeof item === 'object' && item.sub) ? item.sub : null;
      var subHtml = '';
      if (sub && sub.length) {
        subHtml = '<div class="da-sub">' +
          sub.map(function (s) {
            return '<div class="da-sub-item"><span class="da-sub-dash">–</span><span>' + s + '</span></div>';
          }).join('') +
          '</div>';
      }
      return (
        '<div class="da-item">' +
          '<span class="da-dot"></span>' +
          '<span>' + text + subHtml + '</span>' +
        '</div>'
      );
    }).join('');
  }

  function buildPopover(x, y) {
    close();

    var el = document.createElement('div');
    el.className = 'da-popover';
    el.setAttribute('role', 'dialog');
    el.setAttribute('aria-label', 'Design annotations');

    var reqCount = (cfg.required    && cfg.required.length)    ? cfg.required.length    : 0;
    var sugCount = (cfg.suggestions && cfg.suggestions.length) ? cfg.suggestions.length : 0;

    el.innerHTML =
      /* header */
      '<div class="da-hd">' +
        '<div class="da-hd-icon"><span class="material-symbols-rounded">edit_note</span></div>' +
        '<div class="da-hd-meta">' +
          '<div class="da-hd-title">Design Annotations</div>' +
          '<div class="da-hd-sub">' + escHtml(cfg.page) + '</div>' +
        '</div>' +
        '<button class="da-close" aria-label="Close">' +
          '<span class="material-symbols-rounded">close</span>' +
        '</button>' +
      '</div>' +

      /* body */
      '<div class="da-body">' +

        /* required */
        '<div class="da-section da-section--req">' +
          '<div class="da-section-hd">' +
            '<span class="da-section-label">Required changes</span>' +
            (reqCount ? '<span class="da-badge">' + reqCount + '</span>' : '') +
          '</div>' +
          '<div class="da-items">' + itemsHTML(cfg.required, 'da-section--req') + '</div>' +
        '</div>' +

        (sugCount ?
          '<div class="da-divider"></div>' +
          '<div class="da-section da-section--sug">' +
            '<div class="da-section-hd">' +
              '<span class="da-section-label">Suggestions</span>' +
              '<span class="da-badge">' + sugCount + '</span>' +
            '</div>' +
            '<div class="da-items">' + itemsHTML(cfg.suggestions, 'da-section--sug') + '</div>' +
          '</div>'
        : '') +

      '</div>' +

      /* footer */
      '<div class="da-ft">' +
        '<span class="material-symbols-rounded">info</span>' +
        'Right-click anywhere to toggle' +
        '<span class="da-ft-pill">Multi-currency</span>' +
      '</div>';

    document.body.appendChild(el);
    popover  = el;
    shownAt  = Date.now();

    /* smart position */
    requestAnimationFrame(function () {
      var vw = window.innerWidth;
      var vh = window.innerHeight;
      var pw = el.offsetWidth  || 360;
      var ph = el.offsetHeight || 340;
      var left = x + 6;
      var top  = y + 6;
      if (left + pw > vw - 12) left = x - pw - 6;
      if (top  + ph > vh - 12) top  = vh - ph - 12;
      if (left < 12) left = 12;
      if (top  < 12) top  = 12;
      el.style.left = left + 'px';
      el.style.top  = top  + 'px';
    });

    /* close button */
    el.querySelector('.da-close').addEventListener('click', close);

    /* stop right-click inside popover reopening it */
    el.addEventListener('contextmenu', function (e) { e.stopPropagation(); });
  }

  function close() {
    if (popover) { popover.remove(); popover = null; }
  }

  function escHtml(str) {
    return String(str)
      .replace(/&/g, '&amp;').replace(/</g, '&lt;')
      .replace(/>/g, '&gt;').replace(/"/g, '&quot;');
  }

  /* ── event handlers ──────────────────────────────────────── */
  function onContextMenu(e) {
    if (popover && popover.contains(e.target)) return;
    e.preventDefault();
    buildPopover(e.clientX, e.clientY);
  }

  function onKeydown(e) {
    if (e.key === 'Escape') close();
  }

  function onClickOutside(e) {
    if (Date.now() - shownAt < 320) return; // ignore clicks within 320 ms of opening
    if (popover && !popover.contains(e.target)) close();
  }

  /* ── public API ──────────────────────────────────────────── */
  var baseCfg = null;   // set by init — the page-level config
  var ctxCfg  = null;   // set by setContext — overrides while a modal is open

  window.DesignAnnotations = {
    init: function (config) {
      baseCfg = config;
      cfg     = config;
      injectCSS();
      document.addEventListener('contextmenu', onContextMenu);
      document.addEventListener('keydown',     onKeydown);
      document.addEventListener('click',       onClickOutside);
    },

    /* Call when a dialog/modal opens — overrides the page-level annotations */
    setContext: function (config) {
      ctxCfg = config;
      cfg    = config;
      close(); // dismiss any open popover so next right-click shows fresh context
    },

    /* Call when the dialog/modal closes — restores the page-level annotations */
    clearContext: function () {
      ctxCfg = null;
      cfg    = baseCfg;
      close();
    }
  };

}());
