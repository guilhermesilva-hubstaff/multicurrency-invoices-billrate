/* =============================================================
   Design Annotations — right-side panel for prototype pages
   Usage:
     DesignAnnotations.init({
       page: 'Page name',
       required:    [ 'item', { text: 'item', sub: ['a','b'], target: '.selector' } ],
       suggestions: [ ... ]
     });
   Right-click anywhere on the page to toggle the panel.
   Hover a bullet that has a target to highlight that element.
   ============================================================= */

(function () {
  'use strict';

  /* ── CSS ─────────────────────────────────────────────────── */
  var CSS = [
    /* panel */
    '.da-panel {',
    '  position: fixed;',
    '  top: 52px;',
    '  right: 0;',
    '  bottom: 0;',
    '  width: 320px;',
    '  background: #fff;',
    '  border-left: 1px solid #e5e7eb;',
    '  box-shadow: -6px 0 24px rgba(0,0,0,.09);',
    '  z-index: 1100;',
    '  display: flex;',
    '  flex-direction: column;',
    '  transform: translateX(105%);',
    '  transition: transform 240ms cubic-bezier(.4,0,.2,1);',
    '  font-family: \'Roboto\', sans-serif;',
    '  overflow: hidden;',
    '}',
    '.da-panel.is-open { transform: translateX(0); }',

    /* header */
    '.da-hd {',
    '  display: flex;',
    '  align-items: center;',
    '  gap: 10px;',
    '  padding: 14px 14px 12px;',
    '  border-bottom: 1px solid #f3f4f6;',
    '  flex-shrink: 0;',
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
    '.da-hd-title { font-size: 13px; font-weight: 600; color: #111827; line-height: 1.3; }',
    '.da-hd-sub {',
    '  font-size: 11px; color: #6b7280; margin-top: 2px;',
    '  overflow: hidden; text-overflow: ellipsis; white-space: nowrap;',
    '}',
    '.da-close {',
    '  border: none; background: transparent; cursor: pointer;',
    '  padding: 4px; color: #9ca3af; border-radius: 5px;',
    '  display: flex; align-items: center;',
    '  transition: background 100ms, color 100ms;',
    '}',
    '.da-close:hover { background: #f3f4f6; color: #374151; }',
    '.da-close .material-symbols-rounded { font-size: 18px; }',

    /* scrollable body */
    '.da-body {',
    '  padding: 14px;',
    '  display: flex;',
    '  flex-direction: column;',
    '  gap: 16px;',
    '  overflow-y: auto;',
    '  flex: 1;',
    '}',

    /* section */
    '.da-section-hd { display: flex; align-items: center; gap: 6px; margin-bottom: 9px; }',
    '.da-section-label { font-size: 10px; font-weight: 700; letter-spacing: .08em; text-transform: uppercase; }',
    '.da-section--req .da-section-label { color: #92400e; }',
    '.da-section--sug .da-section-label { color: #5b21b6; }',
    '.da-badge { font-size: 10px; font-weight: 700; padding: 1px 7px; border-radius: 99px; line-height: 1.5; }',
    '.da-section--req .da-badge { background: #fef3c7; color: #92400e; }',
    '.da-section--sug .da-badge { background: #ede9fe; color: #6d28d9; }',

    /* items */
    '.da-items { display: flex; flex-direction: column; gap: 5px; }',
    '.da-item {',
    '  display: flex; gap: 8px;',
    '  font-size: 13px; color: #374151; line-height: 1.5;',
    '  border-radius: 5px; margin: 0 -5px; padding: 2px 5px;',
    '}',
    '.da-item--targetable { cursor: crosshair; }',
    '.da-item--targetable:hover { background: rgba(245,158,11,.10); }',
    '.da-item--targetable:hover .da-dot { background: #f59e0b !important; transform: scale(1.4); }',
    '.da-dot {',
    '  width: 5px; height: 5px; border-radius: 50%;',
    '  margin-top: 7px; flex-shrink: 0;',
    '  transition: transform 100ms ease;',
    '}',
    '.da-section--req .da-dot { background: #f59e0b; }',
    '.da-section--sug .da-dot { background: #8b5cf6; }',

    /* sub-items */
    '.da-sub { margin-top: 4px; display: flex; flex-direction: column; gap: 2px; }',
    '.da-sub-item { display: flex; gap: 6px; font-size: 12px; color: #6b7280; line-height: 1.45; padding-left: 2px; }',
    '.da-sub-dash { flex-shrink: 0; color: #d1d5db; margin-top: 1px; }',

    /* empty */
    '.da-none { font-size: 12px; color: #9ca3af; font-style: italic; }',

    /* divider */
    '.da-divider { height: 1px; background: #f3f4f6; }',

    /* footer */
    '.da-ft {',
    '  padding: 9px 14px;',
    '  border-top: 1px solid #f3f4f6;',
    '  display: flex; align-items: center; gap: 5px;',
    '  font-size: 11px; color: #9ca3af;',
    '  flex-shrink: 0;',
    '}',
    '.da-ft .material-symbols-rounded { font-size: 13px; }',
    '.da-ft-pill {',
    '  margin-left: auto;',
    '  font-size: 10px; font-weight: 600; letter-spacing: .04em;',
    '  padding: 2px 7px; border-radius: 99px;',
    '  background: #f0fdf4; color: #15803d;',
    '}',

    /* push content area when panel is open */
    '#shell-content { transition: margin-right 240ms cubic-bezier(.4,0,.2,1); }',

    /* page element highlight */
    '.da-highlight {',
    '  background-color: rgba(254,243,199,.85) !important;',
    '  box-shadow: 0 0 0 2px #f59e0b, 0 0 12px rgba(245,158,11,.25) !important;',
    '  border-radius: 4px;',
    '  position: relative;',
    '  z-index: 5;',
    '}',
  ].join('\n');

  /* ── state ───────────────────────────────────────────────── */
  var panel   = null;
  var cfg     = null;
  var baseCfg = null;
  var open    = false;

  /* ── helpers ─────────────────────────────────────────────── */
  function injectCSS() {
    if (document.getElementById('da-css')) return;
    var s = document.createElement('style');
    s.id = 'da-css';
    s.textContent = CSS;
    document.head.appendChild(s);
  }

  function escHtml(str) {
    return String(str)
      .replace(/&/g, '&amp;').replace(/</g, '&lt;')
      .replace(/>/g, '&gt;').replace(/"/g, '&quot;');
  }

  function itemsHTML(list) {
    if (!list || !list.length) {
      return '<span class="da-none">None for this page.</span>';
    }
    return list.map(function (item) {
      var text   = typeof item === 'string' ? item : item.text;
      var sub    = typeof item === 'object' && item.sub    ? item.sub    : null;
      var target = typeof item === 'object' && item.target ? item.target : null;
      var subHtml = sub && sub.length
        ? '<div class="da-sub">' +
          sub.map(function (s) {
            return '<div class="da-sub-item"><span class="da-sub-dash">–</span><span>' + s + '</span></div>';
          }).join('') +
          '</div>'
        : '';
      var cls     = 'da-item' + (target ? ' da-item--targetable' : '');
      var dataAttr = target ? ' data-target="' + escHtml(target) + '"' : '';
      return (
        '<div class="' + cls + '"' + dataAttr + '>' +
          '<span class="da-dot"></span>' +
          '<span>' + text + subHtml + '</span>' +
        '</div>'
      );
    }).join('');
  }

  function bodyHTML() {
    var reqCount = cfg.required    && cfg.required.length    ? cfg.required.length    : 0;
    var sugCount = cfg.suggestions && cfg.suggestions.length ? cfg.suggestions.length : 0;
    var html =
      '<div class="da-body" id="da-body">' +
        '<div class="da-section da-section--req">' +
          '<div class="da-section-hd">' +
            '<span class="da-section-label">Required changes</span>' +
            (reqCount ? '<span class="da-badge">' + reqCount + '</span>' : '') +
          '</div>' +
          '<div class="da-items">' + itemsHTML(cfg.required) + '</div>' +
        '</div>';
    if (sugCount) {
      html +=
        '<div class="da-divider"></div>' +
        '<div class="da-section da-section--sug">' +
          '<div class="da-section-hd">' +
            '<span class="da-section-label">Suggestions</span>' +
            '<span class="da-badge">' + sugCount + '</span>' +
          '</div>' +
          '<div class="da-items">' + itemsHTML(cfg.suggestions) + '</div>' +
        '</div>';
    }
    html += '</div>';
    return html;
  }

  /* ── highlight ───────────────────────────────────────────── */
  function removeHighlights() {
    document.querySelectorAll('.da-highlight').forEach(function (el) {
      el.classList.remove('da-highlight');
    });
  }

  function wireHoverHighlights() {
    if (!panel) return;
    panel.querySelectorAll('.da-item--targetable').forEach(function (item) {
      item.addEventListener('mouseenter', function () {
        removeHighlights();
        var sel = this.getAttribute('data-target');
        if (sel) {
          document.querySelectorAll(sel).forEach(function (t) {
            t.classList.add('da-highlight');
          });
        }
      });
      item.addEventListener('mouseleave', removeHighlights);
    });
  }

  /* ── panel build / update ────────────────────────────────── */
  function buildPanel() {
    injectCSS();
    var el = document.createElement('div');
    el.className = 'da-panel';
    el.setAttribute('role', 'complementary');
    el.setAttribute('aria-label', 'Design annotations');

    el.innerHTML =
      '<div class="da-hd">' +
        '<div class="da-hd-icon"><span class="material-symbols-rounded">edit_note</span></div>' +
        '<div class="da-hd-meta">' +
          '<div class="da-hd-title">Design Annotations</div>' +
          '<div class="da-hd-sub" id="da-sub">' + escHtml(cfg.page) + '</div>' +
        '</div>' +
        '<button class="da-close" aria-label="Close annotations panel">' +
          '<span class="material-symbols-rounded">close</span>' +
        '</button>' +
      '</div>' +
      bodyHTML() +
      '<div class="da-ft">' +
        '<span class="material-symbols-rounded">mouse</span>' +
        'Right-click anywhere to toggle' +
        '<span class="da-ft-pill">Multi-currency</span>' +
      '</div>';

    document.body.appendChild(el);
    panel = el;

    el.querySelector('.da-close').addEventListener('click', closePanel);
    el.addEventListener('contextmenu', function (e) { e.stopPropagation(); });
    wireHoverHighlights();
  }

  function updateContent() {
    if (!panel) return;
    panel.querySelector('#da-sub').textContent = cfg.page;
    var oldBody = panel.querySelector('#da-body');
    var tmp = document.createElement('div');
    tmp.innerHTML = bodyHTML();
    oldBody.parentNode.replaceChild(tmp.firstElementChild, oldBody);
    wireHoverHighlights();
  }

  /* ── open / close ────────────────────────────────────────── */
  var PANEL_WIDTH = '320px';

  function pushContent(on) {
    var shell = document.getElementById('shell-content');
    if (shell) shell.style.marginRight = on ? PANEL_WIDTH : '';
  }

  function openPanel() {
    if (!panel) buildPanel();
    requestAnimationFrame(function () {
      panel.classList.add('is-open');
      pushContent(true);
      open = true;
    });
  }

  function closePanel() {
    removeHighlights();
    if (panel) panel.classList.remove('is-open');
    pushContent(false);
    open = false;
  }

  function togglePanel() {
    if (open) closePanel();
    else openPanel();
  }

  /* ── event handlers ──────────────────────────────────────── */
  function onContextMenu(e) {
    if (panel && panel.contains(e.target)) return;
    e.preventDefault();
    togglePanel();
  }

  function onKeydown(e) {
    if (e.key === 'Escape' && open) closePanel();
  }

  /* ── public API ──────────────────────────────────────────── */
  window.DesignAnnotations = {
    init: function (config) {
      baseCfg = config;
      cfg     = config;
      injectCSS();
      buildPanel();
      document.addEventListener('contextmenu', onContextMenu);
      document.addEventListener('keydown',     onKeydown);
    },

    /* Call when a dialog/modal opens */
    setContext: function (config) {
      cfg = config;
      updateContent();
      if (!open) openPanel();
    },

    /* Call when dialog/modal closes — restores page context */
    clearContext: function () {
      cfg = baseCfg;
      updateContent();
    }
  };

}());
