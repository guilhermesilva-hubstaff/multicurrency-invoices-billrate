/**
 * hubstaff-shell.js — Hubstaff app chrome: topbar + sidebar
 *
 * USAGE:
 *   <script src="hubstaff-shell.js"></script>
 *   <script>HubstaffShell.init({ activeItem: 'dashboard' });</script>
 *
 * REQUIRES: <div id="shell-content"> wrapping all page content.
 */

(function (global) {
  'use strict';

  // ── Logo SVGs ─────────────────────────────────────────────────────
  // Mark only (collapsed sidebar, 24×24)
  const MARK_SVG = `<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 114 114.116" aria-hidden="true">
    <path fill="#294DFF" d="M13.732 98.915l25.416 14.743c1.44.836 3.248.461 4.31-.823 3.199-3.87 8.029-6.342 13.444-6.342 5.419 0 10.252 2.476 13.453 6.352 1.061 1.285 2.865 1.661 4.308.826l25.546-14.795c1.693-.981 2.172-3.186 1.08-4.809a53.652 53.652 0 0 0-4.043-5.269c-3.847-4.421-8.493-8.078-13.563-11.019l-3.403-1.975-.213-.112c-.2-.096-.4-.19-.603-.284a2.678 2.678 0 0 0-3.101.633c-4.817 5.283-11.749 8.604-19.462 8.604-7.694 0-14.609-3.303-19.426-8.563a2.648 2.648 0 0 0-3.078-.616l-.02.009-3.977 2.306c-6.392 3.701-12.095 8.55-16.466 14.501-.457.622-.9 1.254-1.33 1.896-1.07 1.596-.534 3.772 1.128 4.737"/>
    <path fill="#1F95FF" d="M17.867 15.078a3.346 3.346 0 0 0-1.467 4.083c1.766 4.727 1.485 10.173-1.248 14.877-2.732 4.7-7.348 7.638-12.331 8.446A3.34 3.34 0 0 0 0 45.778L.002 75.05c0 1.919 1.612 3.47 3.528 3.347a53.107 53.107 0 0 0 21.457-6.063l3.111-1.78a50.666 50.666 0 0 0 2.492-1.637 2.68 2.68 0 0 0 1.038-2.982c-2.061-6.762-1.423-14.326 2.41-20.919 3.851-6.626 10.149-10.935 17.086-12.471 1.113-.246 1.968-1.165 2.075-2.299.128-1.342.207-2.698.232-4.067l.002-2.066a53.129 53.129 0 0 0-5.311-22.264C47.283.12 45.129-.508 43.461.445L17.867 15.078z"/>
    <path fill="#5FBBFF" d="M98.652 34.039c-2.734-4.704-3.015-10.15-1.248-14.877a3.346 3.346 0 0 0-1.467-4.083L70.341.446C68.673-.508 66.518.12 65.68 1.85a53.154 53.154 0 0 0-5.312 22.266l.002 2.062a53.61 53.61 0 0 0 .233 4.069c.108 1.134.963 2.052 2.075 2.299 6.937 1.535 13.234 5.845 17.086 12.471 3.832 6.594 4.472 14.157 2.41 20.919a2.68 2.68 0 0 0 1.038 2.983 55.932 55.932 0 0 0 2.491 1.637l3.113 1.779a53.107 53.107 0 0 0 21.458 6.063c1.915.123 3.526-1.427 3.526-3.347l.001-29.273a3.336 3.336 0 0 0-2.819-3.293c-4.984-.809-9.598-3.747-12.33-8.446"/>
  </svg>`;

  // Full logo: mark + "Hubstaff" wordmark (expanded sidebar)
  const FULL_LOGO_SVG = `<svg xmlns="http://www.w3.org/2000/svg" width="108" height="23" viewBox="0 0 535.766 114.116" aria-hidden="true">
    <path fill="#253F53" d="M185.377 24.986h14.62v64.943h-14.62V62.378h-24.553v27.551h-14.618V24.986h14.618V49.82h24.553zm70.754 63.257c-2.375.687-5.436 1.327-9.185 1.921-3.748.593-7.685.891-11.809.891-4.185 0-7.669-.563-10.447-1.687-2.781-1.125-4.983-2.703-6.607-4.733-1.625-2.03-2.781-4.452-3.468-7.263-.688-2.813-1.03-5.903-1.03-9.278V40.637h13.963v25.771c0 4.498.593 7.748 1.781 9.746 1.185 2 3.404 2.999 6.653 2.999.999 0 2.062-.047 3.187-.14a51.238 51.238 0 0 0 2.998-.329V40.637h13.964v47.606zm58.944-22.961c0 3.937-.578 7.498-1.734 10.684-1.157 3.187-2.827 5.904-5.014 8.152-2.188 2.25-4.872 3.984-8.06 5.202-3.186 1.218-6.81 1.828-10.871 1.828a62.81 62.81 0 0 1-5.294-.235 101.29 101.29 0 0 1-5.435-.609 74.948 74.948 0 0 1-5.108-.89 53.14 53.14 0 0 1-4.311-1.078V25.123l13.963-2.249v18.887a26.173 26.173 0 0 1 4.874-1.594c1.686-.374 3.498-.562 5.435-.562 3.498 0 6.59.609 9.277 1.828 2.686 1.218 4.935 2.952 6.748 5.2 1.812 2.25 3.186 4.953 4.123 8.107.937 3.156 1.407 6.669 1.407 10.542m-14.245-.374c0-8.997-3.313-13.495-9.934-13.495-1.438 0-2.858.188-4.264.562-1.406.375-2.546.843-3.421 1.406v25.396c.687.127 1.561.234 2.624.329 1.062.093 2.217.14 3.468.14 3.81 0 6.685-1.313 8.622-3.937 1.935-2.622 2.905-6.09 2.905-10.401m39.172 14.994c2.561 0 4.372-.249 5.436-.75 1.062-.499 1.592-1.468 1.592-2.905 0-1.124-.687-2.108-2.062-2.951-1.374-.844-3.467-1.796-6.278-2.858-2.187-.812-4.17-1.654-5.95-2.53-1.781-.874-3.297-1.922-4.546-3.14-1.251-1.219-2.219-2.671-2.905-4.357-.688-1.688-1.03-3.717-1.03-6.091 0-4.623 1.717-8.278 5.154-10.965 3.436-2.686 8.153-4.03 14.15-4.03 2.999 0 5.872.267 8.621.797 2.749.532 4.936 1.11 6.561 1.734l-2.437 10.87a51.525 51.525 0 0 0-5.295-1.499c-1.906-.436-4.046-.656-6.419-.656-4.373 0-6.561 1.219-6.561 3.655 0 .562.094 1.063.281 1.499.188.438.563.86 1.125 1.265.563.406 1.326.847 2.295 1.317.968.474 2.204.992 3.703 1.559 3.06 1.135 5.589 2.253 7.59 3.354 1.999 1.104 3.576 2.293 4.733 3.571 1.154 1.278 1.967 2.697 2.436 4.255s.703 3.366.703 5.422c0 4.863-1.828 8.541-5.481 11.035-3.655 2.491-8.826 3.74-15.511 3.74-4.373 0-8.013-.375-10.917-1.125-2.905-.749-4.92-1.373-6.045-1.874l2.343-11.339a45.811 45.811 0 0 0 7.31 2.201c2.499.531 4.967.796 7.404.796m30.829-54.778l13.965-2.25v17.763h16.773v11.62h-16.773v17.337c0 2.938.515 5.279 1.545 7.028 1.031 1.75 3.107 2.624 6.232 2.624 1.499 0 3.045-.141 4.639-.422s3.046-.671 4.357-1.171l1.969 10.87c-1.687.688-3.561 1.281-5.624 1.781-2.062.499-4.592.75-7.591.75-3.81 0-6.967-.517-9.465-1.547-2.499-1.031-4.498-2.468-5.997-4.311-1.5-1.843-2.547-4.077-3.139-6.701-.595-2.624-.892-5.528-.892-8.716V25.124zm57.914 14.2c4.123 0 7.56.469 10.309 1.406s4.951 2.282 6.607 4.029c1.654 1.751 2.826 3.875 3.515 6.373.686 2.5 1.03 5.28 1.03 8.34v29.052c-2 .437-4.779.952-8.341 1.546-3.561.593-7.872.89-12.932.89-3.187 0-6.077-.281-8.668-.843-2.594-.563-4.827-1.484-6.701-2.765a12.622 12.622 0 0 1-4.311-5.015c-1-2.061-1.5-4.591-1.5-7.59 0-2.874.577-5.31 1.733-7.31 1.155-1.999 2.701-3.593 4.64-4.78 1.936-1.186 4.153-2.045 6.653-2.576a37.39 37.39 0 0 1 7.778-.797c1.811 0 3.42.079 4.826.234 1.406.156 2.545.36 3.421.608v-1.311c0-2.375-.719-4.279-2.156-5.717-1.437-1.437-3.936-2.156-7.497-2.156-2.375 0-4.718.173-7.027.515-2.313.345-4.313.829-5.998 1.453l-1.781-11.245c.812-.25 1.828-.515 3.046-.797 1.218-.28 2.545-.53 3.982-.75a87.741 87.741 0 0 1 4.546-.562 50.454 50.454 0 0 1 4.826-.232m1.125 40.859c1.374 0 2.686-.03 3.937-.094 1.249-.061 2.249-.156 2.999-.281V69.219c-.563-.125-1.406-.249-2.53-.375a28.425 28.425 0 0 0-3.093-.187c-1.313 0-2.547.078-3.702.233-1.156.156-2.171.453-3.046.891-.876.438-1.563 1.03-2.061 1.78-.502.75-.75 1.688-.75 2.811 0 2.188.732 3.703 2.202 4.546 1.467.844 3.482 1.265 6.044 1.265m54.354-57.071c2.624 0 5.029.267 7.216.797 2.187.531 3.873 1.046 5.061 1.545l-2.719 11.153a18.348 18.348 0 0 0-4.075-1.266c-1.469-.281-2.827-.421-4.076-.421-1.688 0-3.109.234-4.265.703-1.155.468-2.062 1.11-2.717 1.921-.657.812-1.125 1.78-1.407 2.905-.28 1.125-.421 2.343-.421 3.655v2.436h17.243v11.621H476.82V89.93h-13.963V43.917c0-6.373 1.795-11.433 5.389-15.182 3.592-3.748 8.917-5.623 15.978-5.623m39.265 0c2.624 0 5.028.267 7.217.797 2.186.531 3.873 1.046 5.06 1.545l-2.717 11.153a18.348 18.348 0 0 0-4.077-1.266c-1.468-.281-2.827-.421-4.077-.421-1.687 0-3.107.234-4.263.703-1.157.468-2.063 1.11-2.718 1.921-.655.812-1.125 1.78-1.406 2.905-.28 1.125-.422 2.343-.422 3.655v2.436h17.244v11.621h-17.244V89.93h-13.963V43.917c0-6.373 1.796-11.433 5.388-15.182 3.592-3.748 8.918-5.623 15.978-5.623"/>
    <path fill="#294DFF" d="M13.732 98.915l25.416 14.743c1.44.836 3.248.461 4.31-.823 3.199-3.87 8.029-6.342 13.444-6.342 5.419 0 10.252 2.476 13.453 6.352 1.061 1.285 2.865 1.661 4.308.826l25.546-14.795c1.693-.981 2.172-3.186 1.08-4.809a53.652 53.652 0 0 0-4.043-5.269c-3.847-4.421-8.493-8.078-13.563-11.019l-3.403-1.975-.213-.112c-.2-.096-.4-.19-.603-.284a2.678 2.678 0 0 0-3.101.633c-4.817 5.283-11.749 8.604-19.462 8.604-7.694 0-14.609-3.303-19.426-8.563a2.648 2.648 0 0 0-3.078-.616l-.02.009-3.977 2.306c-6.392 3.701-12.095 8.55-16.466 14.501-.457.622-.9 1.254-1.33 1.896-1.07 1.596-.534 3.772 1.128 4.737"/>
    <path fill="#1F95FF" d="M17.867 15.078a3.346 3.346 0 0 0-1.467 4.083c1.766 4.727 1.485 10.173-1.248 14.877-2.732 4.7-7.348 7.638-12.331 8.446A3.34 3.34 0 0 0 0 45.778L.002 75.05c0 1.919 1.612 3.47 3.528 3.347a53.107 53.107 0 0 0 21.457-6.063l3.111-1.78a50.666 50.666 0 0 0 2.492-1.637 2.68 2.68 0 0 0 1.038-2.982c-2.061-6.762-1.423-14.326 2.41-20.919 3.851-6.626 10.149-10.935 17.086-12.471 1.113-.246 1.968-1.165 2.075-2.299.128-1.342.207-2.698.232-4.067l.002-2.066a53.129 53.129 0 0 0-5.311-22.264C47.283.12 45.129-.508 43.461.445L17.867 15.078z"/>
    <path fill="#5FBBFF" d="M98.652 34.039c-2.734-4.704-3.015-10.15-1.248-14.877a3.346 3.346 0 0 0-1.467-4.083L70.341.446C68.673-.508 66.518.12 65.68 1.85a53.154 53.154 0 0 0-5.312 22.266l.002 2.062a53.61 53.61 0 0 0 .233 4.069c.108 1.134.963 2.052 2.075 2.299 6.937 1.535 13.234 5.845 17.086 12.471 3.832 6.594 4.472 14.157 2.41 20.919a2.68 2.68 0 0 0 1.038 2.983 55.932 55.932 0 0 0 2.491 1.637l3.113 1.779a53.107 53.107 0 0 0 21.458 6.063c1.915.123 3.526-1.427 3.526-3.347l.001-29.273a3.336 3.336 0 0 0-2.819-3.293c-4.984-.809-9.598-3.747-12.33-8.446"/>
  </svg>`;

  // ── Nav items ─────────────────────────────────────────────────────
  const NAV_ITEMS = [
    { key: 'dashboard',           icon: 'dashboard',             title: 'Dashboard' },
    { key: 'timesheets',          icon: 'schedule',              title: 'Timesheets',
      subs: ['View & Edit', 'Approvals'] },
    { key: 'activity',            icon: 'bar_chart',             title: 'Activity',
      subs: ['Screenshots', 'Apps', 'URLs'] },
    { key: 'insights',            icon: 'lightbulb',             title: 'Insights',
      subs: ['Highlights', 'Performance', 'Timeline', 'Unusual activity'] },
    { key: 'smart_notifications', icon: 'notifications',         title: 'Smart notifications',
      subs: ['Output', 'Locations'] },
    { key: 'locations',           icon: 'location_on',           title: 'Locations',
      subs: ['Map', 'Job sites'] },
    { key: 'project_management',  icon: 'check_box',             title: 'Project management',
      subs: [{ label: 'Project', href: 'projects.html' }, 'To-do', { label: 'Clients', href: 'clients.html' }, 'Work orders'] },
    { key: 'calendar',            icon: 'calendar_today',        title: 'Calendar',
      subs: ['Schedules', 'Time off requests'] },
    { key: 'reports',             icon: 'insert_chart_outlined', title: 'Reports',
      subs: ['Time activity', 'Daily totals', 'Amounts owed', 'Payments', 'All reports', 'Customized reports'] },
    { key: 'people',              icon: 'group',                 title: 'People',
      subs: [{ label: 'Members', href: 'members.html' }, 'Teams'] },
    { key: 'financials',          icon: 'payments',              title: 'Financials',
      sections: [{ header: 'Payroll', items: ['Manage', 'Overview', 'Create payments', 'Payment records', 'Payroll adjustments', { label: 'Invoices', href: 'invoices.html' }, 'Expenses'] }] },
    { key: 'silent_app',          icon: 'computer',              title: 'Silent app',
      subs: ['Setup', 'Computers'] },
    { key: 'settings',            icon: 'settings',              title: 'Settings',  href: 'settings.html',
      subs: [{ label: 'All settings', href: 'settings.html' }, 'Activity and tracking', 'Integrations', 'Billings'] },
  ];

  // ── CSS ───────────────────────────────────────────────────────────
  const CSS = `
    :root { color-scheme: light; }
    body { background: #fff; }
    [hidden] { display: none !important; }

    /* ── Topbar ── */
    #hs-topbar {
      position: fixed; top: 0; left: 0; right: 0; height: 48px;
      background: #fff; border-bottom: 1px solid #D6DBE6;
      display: flex; align-items: center; justify-content: space-between;
      padding: 0 16px 0 80px; z-index: 100;
      font-family: 'Roboto', sans-serif;
      transition: padding-left 240ms ease;
    }
    body.hs-expanded #hs-topbar { padding-left: 256px; }
    #hs-topbar .hs-topbar-left { display: flex; align-items: center; height: 100%; }
    #hs-topbar .hs-timer {
      display: flex; align-items: center; gap: 8px;
      padding: 6px 12px 6px 10px;
      background: #fff; border: 1px solid #d1d5db;
      border-radius: 44px; cursor: pointer;
    }
    #hs-topbar .hs-timer:hover { background: #f9fafb; }
    #hs-topbar .hs-timer-icon {
      font-family: 'Material Symbols Rounded', sans-serif;
      font-variation-settings: 'FILL' 0, 'wght' 400, 'GRAD' 0, 'opsz' 18;
      font-size: 18px; line-height: 1; color: #374151; flex-shrink: 0;
    }
    #hs-topbar .hs-timer-text {
      font-size: 14px; font-weight: 400; color: #2aa7ff; line-height: 1.4; white-space: nowrap;
    }
    #hs-topbar .hs-timer-arrow {
      font-family: 'Material Symbols Rounded', sans-serif;
      font-variation-settings: 'FILL' 0, 'wght' 400, 'GRAD' 0, 'opsz' 14;
      font-size: 14px; line-height: 1; color: #2aa7ff; flex-shrink: 0;
    }
    #hs-topbar .hs-topbar-right { display: flex; align-items: center; gap: 4px; }
    #hs-topbar .hs-icon-btn {
      position: relative; width: 32px; height: 32px;
      display: flex; align-items: center; justify-content: center;
      border-radius: 6px; cursor: pointer; color: #6B7280;
      font-family: 'Material Symbols Rounded', sans-serif;
      font-variation-settings: 'FILL' 0, 'wght' 400, 'GRAD' 0, 'opsz' 20;
      font-size: 20px; line-height: 1;
    }
    #hs-topbar .hs-icon-btn:hover { background: #F3F4F6; }
    #hs-topbar .hs-badge {
      position: absolute; top: 1px; right: 1px;
      background: #EF4444; color: #fff; font-size: 9px; font-weight: 700;
      font-family: 'Roboto', sans-serif; min-width: 15px; height: 15px;
      border-radius: 8px; display: flex; align-items: center; justify-content: center;
      padding: 0 3px; pointer-events: none; line-height: 1;
    }

    /* ── Generic topbar popover ── */
    .hs-topbar-popover {
      display: none; position: fixed; top: 52px;
      background: #fff; border: 1px solid #E5E7EB; border-radius: 10px;
      box-shadow: 0 8px 24px rgba(0,0,0,.12); z-index: 300; overflow: hidden;
    }
    .hs-topbar-popover.is-open { display: block; }

    /* ── Apps popover ── */
    #hs-apps-menu { width: 320px; padding: 8px 0; }
    .hs-app-item {
      display: flex; align-items: flex-start; gap: 14px;
      padding: 14px 20px; cursor: pointer; text-decoration: none;
    }
    .hs-app-item:hover { background: #F9FAFB; }
    .hs-app-item__logo { width: 36px; height: 36px; flex-shrink: 0; }
    .hs-app-item__name {
      font-size: 15px; font-weight: 700; color: #111827;
      font-family: 'Roboto', sans-serif; margin-bottom: 3px; line-height: 1.3;
    }
    .hs-app-item__name span { font-weight: 300; }
    .hs-app-item__desc { font-size: 13px; color: #6B7280; font-family: 'Roboto', sans-serif; }

    /* ── Notifications popover ── */
    #hs-notif-menu { width: 380px; }
    .hs-notif-header {
      padding: 16px 20px; font-size: 16px; font-weight: 600;
      color: #111827; font-family: 'Roboto', sans-serif;
      border-bottom: 1px solid #E5E7EB; text-align: center;
    }
    .hs-notif-item {
      padding: 14px 20px; border-bottom: 1px solid #F3F4F6;
      font-size: 14px; color: #374151; font-family: 'Roboto', sans-serif; line-height: 1.5;
    }
    .hs-notif-item a { color: #2aa7ff; text-decoration: none; }
    .hs-notif-item a:hover { text-decoration: underline; }
    .hs-notif-footer {
      display: block; padding: 14px 20px; text-align: center;
      font-size: 14px; color: #2aa7ff; font-family: 'Roboto', sans-serif;
      cursor: pointer; text-decoration: none;
    }
    .hs-notif-footer:hover { background: #F9FAFB; }

    /* ── Phone popover ── */
    #hs-phone-menu { width: 340px; }
    .hs-phone-header {
      padding: 16px 20px; font-size: 16px; font-weight: 600;
      color: #111827; font-family: 'Roboto', sans-serif;
      border-bottom: 1px solid #E5E7EB; text-align: center;
    }
    .hs-phone-row {
      display: flex; align-items: center; gap: 12px;
      padding: 16px 20px; border-bottom: 1px solid #F3F4F6;
      font-family: 'Roboto', sans-serif;
    }
    .hs-phone-row:last-child { border-bottom: none; }
    .hs-phone-flag { font-size: 22px; flex-shrink: 0; }
    .hs-phone-number { font-size: 14px; font-weight: 500; color: #111827; }
    .hs-phone-hours { font-size: 12px; color: #9CA3AF; margin-left: auto; white-space: nowrap; }

    /* ── What's new drawer ── */
    #hs-wn-backdrop {
      display: none; position: fixed; inset: 0; background: rgba(0,0,0,.25); z-index: 400;
    }
    #hs-wn-backdrop.is-open { display: block; }
    #hs-wn-drawer {
      position: fixed; top: 0; right: -460px; bottom: 0; width: 440px;
      background: #fff; box-shadow: -4px 0 24px rgba(0,0,0,.12); z-index: 401;
      display: flex; flex-direction: column; transition: right 240ms ease;
    }
    #hs-wn-drawer.is-open { right: 0; }
    .hs-wn-header {
      display: flex; align-items: center; justify-content: space-between;
      padding: 20px 24px 16px; border-bottom: 1px solid #F3F4F6; flex-shrink: 0;
    }
    .hs-wn-title { font-size: 20px; font-weight: 700; color: #111827; font-family: 'Roboto', sans-serif; }
    .hs-wn-close {
      width: 28px; height: 28px; display: flex; align-items: center; justify-content: center;
      cursor: pointer; color: #6B7280; border-radius: 6px;
      font-family: 'Material Symbols Rounded', sans-serif;
      font-variation-settings: 'FILL' 0,'wght' 400,'GRAD' 0,'opsz' 20;
      font-size: 20px; line-height: 1;
    }
    .hs-wn-close:hover { background: #F3F4F6; color: #111827; }
    .hs-wn-body { overflow-y: auto; flex: 1; }
    .hs-wn-item {
      display: grid; grid-template-columns: 36px 1fr auto;
      gap: 4px 12px; padding: 20px 24px; border-bottom: 1px solid #F3F4F6;
    }
    .hs-wn-icon {
      grid-column: 1; grid-row: 1 / 4; width: 32px; height: 32px;
      border-radius: 6px; display: flex; align-items: center; justify-content: center;
      font-family: 'Material Symbols Rounded', sans-serif;
      font-variation-settings: 'FILL' 0,'wght' 400,'GRAD' 0,'opsz' 18;
      font-size: 18px; line-height: 1; margin-top: 2px; align-self: start;
    }
    .hs-wn-item-title {
      grid-column: 2; grid-row: 1; font-size: 14px; font-weight: 600;
      color: #111827; font-family: 'Roboto', sans-serif; line-height: 1.4;
    }
    .hs-wn-item-date {
      grid-column: 3; grid-row: 1; font-size: 12px; color: #9CA3AF;
      font-family: 'Roboto', sans-serif; white-space: nowrap; padding-top: 2px;
    }
    .hs-wn-item-body {
      grid-column: 2 / 4; grid-row: 2; font-size: 13px; color: #374151;
      font-family: 'Roboto', sans-serif; line-height: 1.5; margin-top: 4px;
    }
    .hs-wn-item-link {
      grid-column: 2 / 4; grid-row: 3; font-size: 13px; color: #2aa7ff;
      text-decoration: none; font-family: 'Roboto', sans-serif;
      margin-top: 8px; display: inline-block;
    }
    .hs-wn-item-link:hover { text-decoration: underline; }

    /* ── Help modal ── */
    #hs-help-backdrop {
      display: none; position: fixed; inset: 0; background: rgba(0,0,0,.4); z-index: 500;
    }
    #hs-help-backdrop.is-open { display: flex; align-items: flex-start; justify-content: center; padding: 48px 16px; }
    #hs-help-dialog {
      background: #fff; border-radius: 12px; width: 100%; max-width: 600px;
      max-height: calc(100vh - 96px); display: flex; flex-direction: column;
      box-shadow: 0 20px 60px rgba(0,0,0,.2); overflow: hidden;
    }
    .hs-help-header {
      display: flex; align-items: flex-start; justify-content: space-between;
      padding: 24px 28px 16px; flex-shrink: 0;
    }
    .hs-help-title { font-size: 20px; font-weight: 700; color: #111827; font-family: 'Roboto', sans-serif; }
    .hs-help-close {
      width: 28px; height: 28px; display: flex; align-items: center; justify-content: center;
      cursor: pointer; color: #6B7280; border-radius: 6px; flex-shrink: 0;
      font-family: 'Material Symbols Rounded', sans-serif;
      font-variation-settings: 'FILL' 0,'wght' 400,'GRAD' 0,'opsz' 20; font-size: 20px; line-height: 1;
    }
    .hs-help-close:hover { background: #F3F4F6; color: #111827; }
    .hs-help-body { overflow-y: auto; flex: 1; padding: 0 28px 24px; }
    .hs-help-intro { font-size: 14px; color: #374151; font-family: 'Roboto', sans-serif; line-height: 1.6; margin-bottom: 20px; }
    .hs-help-divider { border: none; border-top: 1px solid #E5E7EB; margin: 0 0 20px; }
    .hs-help-section-title { font-size: 16px; font-weight: 700; color: #111827; font-family: 'Roboto', sans-serif; margin: 0 0 14px; }
    .hs-help-articles { display: flex; flex-wrap: wrap; gap: 10px; margin-bottom: 28px; }
    .hs-help-article {
      display: inline-flex; align-items: center; gap: 6px;
      border: 1px solid #D6DBE6; border-radius: 6px; padding: 8px 12px;
      font-size: 13px; color: #0168DD; font-family: 'Roboto', sans-serif;
      text-decoration: none; cursor: pointer; background: #fff;
    }
    .hs-help-article:hover { background: #EFF6FF; border-color: #93C5FD; }
    .hs-help-article .material-symbols-rounded {
      font-size: 16px; font-variation-settings: 'FILL' 0,'wght' 400,'GRAD' 0,'opsz' 16; line-height: 1;
    }
    .hs-help-video-label { font-size: 13px; color: #374151; font-family: 'Roboto', sans-serif; margin-bottom: 8px; }
    .hs-help-video-thumb {
      width: 100%; max-width: 460px; aspect-ratio: 16/9; border-radius: 6px; overflow: hidden;
      background: linear-gradient(135deg, #1a1a2e 0%, #16213e 60%, #0f3460 100%);
      display: flex; flex-direction: column; align-items: center; justify-content: center;
      position: relative; margin-bottom: 20px; cursor: pointer;
    }
    .hs-help-video-thumb:hover .hs-yt-play { transform: scale(1.1); }
    .hs-yt-play {
      width: 56px; height: 40px; background: #FF0000; border-radius: 10px;
      display: flex; align-items: center; justify-content: center;
      transition: transform 120ms ease; margin-bottom: 10px;
    }
    .hs-yt-play::after { content: ''; border: 12px solid transparent; border-left: 20px solid #fff; margin-left: 4px; }
    .hs-help-video-title { color: #fff; font-size: 13px; font-weight: 600; font-family: 'Roboto', sans-serif; text-align: center; padding: 0 16px; }
    .hs-help-video-channel { color: rgba(255,255,255,.7); font-size: 12px; font-family: 'Roboto', sans-serif; margin-top: 2px; }
    .hs-help-question { font-size: 14px; color: #374151; font-family: 'Roboto', sans-serif; margin: 8px 0 0; }
    .hs-help-question a { color: #2aa7ff; text-decoration: none; }
    .hs-help-question a:hover { text-decoration: underline; }
    .hs-help-footer {
      display: flex; align-items: center; justify-content: flex-end; gap: 10px;
      padding: 16px 28px; border-top: 1px solid #E5E7EB; flex-shrink: 0;
    }
    .hs-help-btn {
      height: 36px; padding: 0 18px; border-radius: 6px; font-size: 14px;
      font-family: 'Roboto', sans-serif; cursor: pointer; font-weight: 400;
    }
    .hs-help-btn--ghost { background: #fff; border: 1px solid #D1D5DB; color: #374151; }
    .hs-help-btn--ghost:hover { background: #F9FAFB; }
    .hs-help-btn--primary { background: #2aa7ff; border: 1px solid #2aa7ff; color: #fff; }
    .hs-help-btn--primary:hover { background: #1f95eb; }
    #hs-topbar .hs-topbar-divider { width: 1px; height: 24px; background: #E5E7EB; margin: 0 8px; flex-shrink: 0; }
    #hs-topbar .hs-user-avatar {
      width: 28px; height: 28px; border-radius: 50%;
      overflow: hidden; flex-shrink: 0; cursor: pointer;
      border: 2px solid #fff;
    }
    #hs-topbar .hs-user-avatar img {
      width: 100%; height: 100%; object-fit: cover; display: block;
    }
    /* ── Avatar popover ── */
    #hs-avatar-menu {
      display: none; position: fixed; top: 48px; right: 48px;
      background: #fff; border: 1px solid #E5E7EB; border-radius: 10px;
      box-shadow: 0 8px 24px rgba(0,0,0,.12); z-index: 300; min-width: 240px;
      overflow: hidden;
    }
    #hs-avatar-menu.is-open { display: block; }
    .hs-avatar-menu__group { padding: 6px 0; }
    .hs-avatar-menu__group + .hs-avatar-menu__group { border-top: 1px solid #F3F4F6; }
    .hs-avatar-menu__item {
      display: flex; align-items: center; gap: 8px;
      padding: 10px 20px; font-size: 14px; font-weight: 400;
      color: #111827; cursor: pointer; white-space: nowrap;
      font-family: 'Roboto', sans-serif; text-decoration: none;
    }
    .hs-avatar-menu__item:hover { background: #F9FAFB; }
    .hs-gift-badge {
      display: inline-flex; align-items: center; gap: 4px;
      background: #EDE9FE; color: #6D28D9;
      font-size: 12px; font-weight: 500; padding: 3px 10px;
      border-radius: 20px; margin-left: 4px;
      font-family: 'Roboto', sans-serif;
    }
    .hs-gift-badge .material-symbols-rounded {
      font-size: 14px; font-variation-settings: 'FILL' 0,'wght' 400,'GRAD' 0,'opsz' 14;
    }

    #hs-topbar .hs-org-badge {
      width: 28px; height: 28px; border-radius: 50%; background: #31c48d;
      display: flex; align-items: center; justify-content: center;
      color: #fff; font-size: 12px; font-weight: 600;
      font-family: 'Roboto', sans-serif; flex-shrink: 0; cursor: pointer;
      transition: background 0.2s; margin-left: 4px;
    }
    #hs-topbar .hs-org-badge:hover { background: #27a87a; }

    /* ── Org switcher popover ── */
    #hs-org-menu { width: 300px; padding: 8px 0 0; }
    .hs-org-item {
      display: flex; align-items: center; gap: 12px;
      padding: 10px 16px; cursor: pointer; text-decoration: none;
    }
    .hs-org-item:hover { background: #F9FAFB; }
    .hs-org-avatar {
      width: 36px; height: 36px; border-radius: 50%; flex-shrink: 0;
      display: flex; align-items: center; justify-content: center;
      font-size: 14px; font-weight: 600; color: #fff;
      font-family: 'Roboto', sans-serif; overflow: hidden;
    }
    .hs-org-name {
      font-size: 14px; color: #111827; font-family: 'Roboto', sans-serif;
      flex: 1; min-width: 0; white-space: nowrap; overflow: hidden; text-overflow: ellipsis;
    }
    .hs-org-suspended {
      font-size: 11px; font-weight: 500; color: #D97706;
      background: #FEF3C7; border-radius: 20px; padding: 2px 8px;
      font-family: 'Roboto', sans-serif; flex-shrink: 0;
    }
    .hs-org-footer {
      display: flex; align-items: center; gap: 4px;
      padding: 12px 16px; border-top: 1px solid #F3F4F6; margin-top: 4px;
      font-size: 14px; color: #2aa7ff; font-family: 'Roboto', sans-serif;
      cursor: pointer; text-decoration: none;
    }
    .hs-org-footer:hover { background: #F9FAFB; }
    .hs-org-footer .material-symbols-rounded {
      font-size: 16px; font-variation-settings: 'FILL' 0,'wght' 400,'GRAD' 0,'opsz' 16; line-height: 1;
    }

    /* ── Sidebar ── */
    #hs-sidebar {
      width: 64px; background: #F3F4F6; border-right: 1px solid #D6DBE6;
      display: flex; flex-direction: column; align-items: center; flex-shrink: 0;
      position: fixed; top: 0; left: 0; bottom: 0; z-index: 200;
      overflow-y: auto; overflow-x: hidden;
      transition: width 240ms ease;
      scrollbar-width: none;
    }
    #hs-sidebar::-webkit-scrollbar { display: none; }
    body.hs-expanded #hs-sidebar { width: 240px; align-items: stretch; }

    /* ── Logo ── */
    #hs-sidebar .hs-sidebar-logo {
      width: 100%; height: 48px; min-height: 48px;
      display: flex; align-items: center; justify-content: center;
      flex-shrink: 0; border-bottom: 1px solid #D6DBE6;
      cursor: pointer; text-decoration: none; padding: 0 20px;
    }
    body.hs-expanded #hs-sidebar .hs-sidebar-logo { justify-content: flex-start; }
    #hs-sidebar .hs-sidebar-logo:hover { background: #e9eaec; }
    #hs-sidebar .hs-logo-mark { display: flex; align-items: center; flex-shrink: 0; }
    #hs-sidebar .hs-logo-full { display: none; align-items: center; flex-shrink: 0; }
    body.hs-expanded #hs-sidebar .hs-logo-mark { display: none; }
    body.hs-expanded #hs-sidebar .hs-logo-full { display: flex; }

    /* ── Favorites ── */
    #hs-sidebar .hs-favorites {
      display: none; flex-direction: column; gap: 12px;
      width: 100%; padding: 8px 8px 10px; flex-shrink: 0;
      border-bottom: 1px solid #E5E7EB;
    }
    body.hs-expanded #hs-sidebar .hs-favorites { display: flex; }
    #hs-sidebar .hs-fav-header {
      display: flex; align-items: center; gap: 10px;
      height: 26px; padding: 0 4px;
      font-family: 'Roboto', sans-serif; font-size: 14px;
      font-weight: 400; color: #111827; cursor: default;
    }
    #hs-sidebar .hs-fav-icon {
      font-family: 'Material Symbols Rounded', sans-serif;
      font-variation-settings: 'FILL' 0, 'wght' 400, 'GRAD' 0, 'opsz' 18;
      font-size: 18px; line-height: 1; flex-shrink: 0; color: #6B7280;
    }
    #hs-sidebar .hs-fav-empty {
      border: 1px solid #E5E7EB; border-radius: 6px;
      padding: 10px; margin-left: 30px; margin-right: 16px;
      font-family: 'Roboto', sans-serif; font-size: 12px;
      line-height: 1.3; color: #6B7280;
    }
    #hs-sidebar .hs-fav-empty .hs-fav-star {
      font-family: 'Material Symbols Rounded', sans-serif;
      font-variation-settings: 'FILL' 1, 'wght' 400, 'GRAD' 0, 'opsz' 12;
      font-size: 12px; line-height: 1; vertical-align: middle; color: #2aa7ff;
    }

    /* ── Nav ── */
    #hs-sidebar .hs-sidebar-nav {
      display: flex; flex-direction: column; align-items: center;
      gap: 8px; width: 100%; padding: 8px 0; flex: 1;
    }
    body.hs-expanded #hs-sidebar .hs-sidebar-nav { align-items: stretch; padding: 8px 8px 8px 0; gap: 8px; }

    #hs-sidebar .hs-nav-group { width: 100%; display: flex; flex-direction: column; align-items: center; }
    body.hs-expanded #hs-sidebar .hs-nav-group { align-items: stretch; }

    #hs-sidebar .hs-nav-item {
      width: 100%; height: 38px;
      display: flex; align-items: center; justify-content: center;
      border-radius: 8px; cursor: pointer; color: #6B7280; position: relative;
      font-family: 'Roboto', sans-serif; font-size: 14px;
      font-weight: 400; line-height: 1; gap: 10px;
      background: transparent; border: none; flex-shrink: 0;
      text-decoration: none;
    }
    body.hs-expanded #hs-sidebar .hs-nav-item {
      width: 100%; height: 40px; justify-content: flex-start; padding: 0 12px;
    }
    #hs-sidebar .hs-nav-item:hover { background: #E5E7EB; }
    #hs-sidebar .hs-nav-icon {
      font-family: 'Material Symbols Rounded', sans-serif;
      font-variation-settings: 'FILL' 0, 'wght' 400, 'GRAD' 0, 'opsz' 18;
      font-size: 18px; line-height: 1; flex-shrink: 0;
    }
    #hs-sidebar .hs-nav-label { display: none; white-space: nowrap; flex: 1; text-align: left; }
    body.hs-expanded #hs-sidebar .hs-nav-label { display: inline; }

    /* Active state: left blue bar + blue text */
    #hs-sidebar .hs-nav-item.active { color: #0168DD; font-weight: 500; }
    #hs-sidebar .hs-nav-item.active::before {
      content: ''; position: absolute; left: 0; top: 0; bottom: 0;
      width: 3px; background: #0168DD; border-radius: 0 2px 2px 0;
    }
    body.hs-expanded #hs-sidebar .hs-nav-item.active { background: transparent; }

    /* Chevron — only visible when expanded */
    #hs-sidebar .hs-nav-chevron {
      display: none; margin-left: auto; flex-shrink: 0;
      font-family: 'Material Symbols Rounded', sans-serif;
      font-variation-settings: 'FILL' 0, 'wght' 400, 'GRAD' 0, 'opsz' 18;
      font-size: 16px; line-height: 1; color: #9CA3AF;
      transition: transform 240ms ease;
    }
    body.hs-expanded #hs-sidebar .hs-nav-chevron { display: inline; }
    #hs-sidebar .hs-nav-group.is-open > .hs-nav-item .hs-nav-chevron {
      transform: rotate(90deg);
    }

    /* Submenu: hidden until group is-open AND sidebar is expanded */
    #hs-sidebar .hs-nav-submenu {
      display: none; flex-direction: column; gap: 0;
    }
    body.hs-expanded #hs-sidebar .hs-nav-group.is-open .hs-nav-submenu {
      display: flex; flex-direction: column; gap: 12px; padding-top: 12px;
    }

    /* Section header pill (e.g. "Payroll" inside Financials) */
    #hs-sidebar .hs-sub-header {
      height: 26px; display: flex; align-items: center; padding: 0 12px 0 50px;
    }
    #hs-sidebar .hs-sub-header-pill {
      font-family: 'Roboto', sans-serif; font-size: 11px;
      font-weight: 500; color: #6B7280; line-height: 1.3;
      text-transform: uppercase; letter-spacing: 0.04em;
    }

    /* Submenu item */
    #hs-sidebar .hs-sub-item {
      height: 26px; display: flex; align-items: center;
      padding: 0 12px 0 58px;
      font-family: 'Roboto', sans-serif; font-size: 12px;
      font-weight: 400; color: #0168DD; line-height: 1;
      cursor: pointer; border-radius: 6px; text-decoration: none;
    }
    #hs-sidebar .hs-sub-item:hover { background: #E5E7EB; }
    #hs-sidebar .hs-sub-item.active { color: #0168DD; font-weight: 600; }

    /* ── Collapse/expand toggle ── */
    #hs-sidebar-toggle {
      position: fixed; top: 32px; left: 50px;
      width: 28px; height: 28px; border-radius: 50%;
      background: #fff; border: 1px solid #D6DBE6;
      box-shadow: 0 2px 6px rgba(17,25,40,0.06);
      display: flex; align-items: center; justify-content: center;
      cursor: pointer; padding: 0; z-index: 250;
      transition: left 240ms ease, background 120ms ease;
    }
    body.hs-expanded #hs-sidebar-toggle { left: 226px; }
    #hs-sidebar-toggle:hover { background: #f9fafb; }
    #hs-sidebar-toggle svg {
      width: 16px; height: 16px; color: #1f2937;
      transition: transform 240ms ease;
    }
    body:not(.hs-expanded) #hs-sidebar-toggle svg { transform: scaleX(-1); }

    /* ── Content offset ── */
    #shell-content { margin-top: 48px; margin-left: 64px; transition: margin-left 240ms ease; }
    body.hs-expanded #shell-content { margin-left: 240px; }
  `;

  // ── Build topbar ──────────────────────────────────────────────────
  function buildTopbar() {
    return `
    <header id="hs-topbar" class="hs-shell">
      <div class="hs-topbar-left">
        <div class="hs-timer">
          <span class="hs-timer-icon">timer</span>
          <span class="hs-timer-text">00:00:00</span>
          <span class="hs-timer-arrow">arrow_outward</span>
        </div>
      </div>
      <div class="hs-topbar-right">
        <div class="hs-icon-btn" id="hs-btn-call" title="Call" role="button">call</div>
        <div class="hs-icon-btn" id="hs-btn-help" title="Help" role="button">help_outline</div>
        <div class="hs-icon-btn" id="hs-btn-notif" title="Notifications" role="button">notifications_none<span class="hs-badge">24</span></div>
        <div class="hs-icon-btn" id="hs-btn-gifts" title="What's new" role="button">card_giftcard<span class="hs-badge">3</span></div>
        <div class="hs-icon-btn" id="hs-btn-apps" title="Apps" role="button">apps</div>
        <div class="hs-topbar-divider"></div>
        <div class="hs-user-avatar" id="hs-avatar-btn" title="Profile" role="button"><img src="https://i.pravatar.cc/56?img=47" alt="Profile" /></div>
        <div class="hs-org-badge" id="hs-org-badge" title="Organisation">P</div>
      </div>
    </header>`;
  }

  // ── Build nav item ────────────────────────────────────────────────
  function buildNavItem(item, activeKey, activeSubHref) {
    const isActive = item.key === activeKey ? ' active' : '';
    const hasSubs = (item.subs && item.subs.length) || (item.sections && item.sections.length);
    const chevron = hasSubs ? `<span class="hs-nav-chevron">chevron_right</span>` : '';

    let submenuHTML = '';
    if (hasSubs) {
      let rows = '';
      if (item.subs) {
        rows = item.subs.map(s => {
          if (typeof s === 'object') {
            const subActive = (activeSubHref && s.href === activeSubHref) ? ' active' : '';
            return `<a class="hs-sub-item${subActive}" href="${s.href}">${s.label}</a>`;
          }
          return `<a class="hs-sub-item" href="#">${s}</a>`;
        }).join('');
      } else if (item.sections) {
        rows = item.sections.map(sec => {
          const items = sec.items.map(s =>
            typeof s === 'object'
              ? `<a class="hs-sub-item${(activeSubHref && s.href === activeSubHref) ? ' active' : ''}" href="${s.href}">${s.label}</a>`
              : `<a class="hs-sub-item" href="#">${s}</a>`
          ).join('');
          return `<div class="hs-sub-header"><span class="hs-sub-header-pill">${sec.header}</span></div>${items}`;
        }).join('');
      }
      submenuHTML = `<div class="hs-nav-submenu">${rows}</div>`;
    }

    const navEl = item.href
      ? `<a class="hs-nav-item${isActive}" title="${item.title}" data-key="${item.key}" href="${item.href}">
          <span class="hs-nav-icon">${item.icon}</span>
          <span class="hs-nav-label">${item.title}</span>
          ${chevron}
        </a>`
      : `<button class="hs-nav-item${isActive}" title="${item.title}" data-key="${item.key}" type="button">
          <span class="hs-nav-icon">${item.icon}</span>
          <span class="hs-nav-label">${item.title}</span>
          ${chevron}
        </button>`;

    return `
    <div class="hs-nav-group${isActive ? ' is-open' : ''}">
      ${navEl}
      ${submenuHTML}
    </div>`;
  }

  // ── Build sidebar ─────────────────────────────────────────────────
  function buildSidebar(opts) {
    const navHTML = NAV_ITEMS.map(i => buildNavItem(i, opts.activeItem, opts.activeSubHref)).join('');
    return `
    <nav id="hs-sidebar" class="hs-shell">
      <a class="hs-sidebar-logo" href="${opts.logoHref || '#'}" title="Home">
        <span class="hs-logo-mark">${MARK_SVG}</span>
        <span class="hs-logo-full">${FULL_LOGO_SVG}</span>
      </a>
      <div class="hs-favorites">
        <div class="hs-fav-header">
          <span class="hs-fav-icon">star</span>
          Favorites
        </div>
        <div class="hs-fav-empty">
          Use the <span class="hs-fav-star">star</span> to add pages to your favorites section
        </div>
      </div>
      <div class="hs-sidebar-nav">${navHTML}</div>
    </nav>`;
  }

  // ── Build toggle button ───────────────────────────────────────────
  function buildToggleBtn() {
    return `
    <button id="hs-sidebar-toggle" class="hs-shell" type="button" title="Toggle sidebar" aria-label="Toggle sidebar">
      <svg viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
        <rect x="1.25" y="2.25" width="13.5" height="11.5" rx="2" stroke="currentColor" stroke-width="1.5"/>
        <line x1="5.5" y1="2.5" x2="5.5" y2="13.5" stroke="currentColor" stroke-width="1.5"/>
        <path d="M10.5 6L8.5 8L10.5 10" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
      </svg>
    </button>`;
  }

  // ── Org switcher menu ────────────────────────────────────────────
  function buildOrgMenu() {
    const orgs = [
      { name: 'Acme Corp Ltd',      color: '#6B7280', initials: 'A' },
      { name: 'Dante upd',          color: '#22C55E', initials: 'D' },
      { name: 'Desig...',           color: '#22C55E', initials: 'D', suspended: true },
      { name: 'Epicii',             color: '#6366F1', initials: 'E' },
      { name: "Gui's ...",          color: '#0D9488', initials: 'G', suspended: true },
      { name: 'Hubstaff',           logo: true },
      { name: 'Hundred member...',  color: '#B45309', initials: 'H' },
    ];
    return `<div id="hs-org-menu" class="hs-topbar-popover">
      ${orgs.map(o => `<a class="hs-org-item" href="#">
        <div class="hs-org-avatar" style="background:${o.logo ? 'transparent' : o.color}">
          ${o.logo ? coloredMark('#294DFF','#1F95FF','#5FBBFF').replace('width="36"','width="32"').replace('height="36"','height="32"') : o.initials}
        </div>
        <span class="hs-org-name">${o.name}</span>
        ${o.suspended ? '<span class="hs-org-suspended">Suspended</span>' : ''}
      </a>`).join('')}
      <a class="hs-org-footer" href="#">Organizations menu <span class="material-symbols-rounded">chevron_right</span></a>
    </div>`;
  }

  // ── Help modal ───────────────────────────────────────────────────
  function buildHelpModal() {
    const articles = ['Permissions','Set up Billing','Enable / Disable tracking','Inviting members','Quick Start Guide'];
    const videos = [
      { label: 'Organizations Intro',    title: 'Organizations – Walkthrough' },
      { label: 'Organization Settings',  title: 'Organization Settings – Walkthrough' },
      { label: 'Payroll Intro',          title: 'Automatic Payroll – Walkthrough' },
      { label: 'Scheduling Intro',       title: 'Attendance Scheduling – Walkthrough' },
    ];
    return `<div id="hs-help-backdrop">
      <div id="hs-help-dialog">
        <div class="hs-help-header">
          <span class="hs-help-title">Help for organizations</span>
          <span class="hs-help-close" id="hs-help-close">close</span>
        </div>
        <div class="hs-help-body">
          <p class="hs-help-intro">This is where you manage your organizations, add and remove team members, manage settings, and more.</p>
          <hr class="hs-help-divider" />
          <h3 class="hs-help-section-title">Relevant articles</h3>
          <div class="hs-help-articles">
            ${articles.map(a => `<a class="hs-help-article" href="#"><span class="material-symbols-rounded">description</span>${a}</a>`).join('')}
          </div>
          <h3 class="hs-help-section-title">Video walkthroughs</h3>
          ${videos.map(v => `
            <p class="hs-help-video-label">${v.label}</p>
            <div class="hs-help-video-thumb">
              <div class="hs-yt-play"></div>
              <div class="hs-help-video-title">${v.title}</div>
              <div class="hs-help-video-channel">Hubstaff</div>
            </div>`).join('')}
          <p class="hs-help-question">Have a question? <a href="#">Email support</a></p>
        </div>
        <div class="hs-help-footer">
          <button class="hs-help-btn hs-help-btn--ghost" id="hs-help-close-btn">Close</button>
          <button class="hs-help-btn hs-help-btn--primary">Visit this topic page in the Help Center</button>
        </div>
      </div>
    </div>`;
  }

  // ── Coloured mark helper ──────────────────────────────────────────
  function coloredMark(c1, c2, c3) {
    return MARK_SVG
      .replace('width="24"', 'width="36"').replace('height="24"', 'height="36"')
      .replace('#294DFF', c1).replace('#1F95FF', c2).replace('#5FBBFF', c3);
  }

  // ── Apps menu ─────────────────────────────────────────────────────
  function buildAppsMenu() {
    const apps = [
      { logo: coloredMark('#294DFF','#1F95FF','#5FBBFF'), name: 'Hubstaff', suffix: '',       desc: 'Time tracking, screenshots and reporting' },
      { logo: coloredMark('#15803D','#22C55E','#6EE7B7'), name: 'Hubstaff', suffix: ' Tasks', desc: 'Agile, visual project management' },
      { logo: coloredMark('#B45309','#D97706','#FCD34D'), name: 'Hubstaff', suffix: ' Talent',desc: 'Find remote talent across the world' },
    ];
    return `<div id="hs-apps-menu" class="hs-topbar-popover">
      ${apps.map(a => `<a class="hs-app-item" href="#">
        <div class="hs-app-item__logo">${a.logo}</div>
        <div><div class="hs-app-item__name">${a.name}<span>${a.suffix}</span></div>
        <div class="hs-app-item__desc">${a.desc}</div></div>
      </a>`).join('')}
    </div>`;
  }

  // ── Notifications menu ────────────────────────────────────────────
  function buildNotifMenu() {
    return `<div id="hs-notif-menu" class="hs-topbar-popover">
      <div class="hs-notif-header">Notifications (24)</div>
      <div class="hs-notif-item">It is time to <a href="#">submit your timesheet</a>.</div>
      <div class="hs-notif-item">It is time to <a href="#">submit your timesheet</a>.</div>
      <div class="hs-notif-item">It is time to <a href="#">submit your timesheet</a>.</div>
      <a class="hs-notif-footer" href="#">See all notifications</a>
    </div>`;
  }

  // ── Phone menu ────────────────────────────────────────────────────
  function buildPhoneMenu() {
    return `<div id="hs-phone-menu" class="hs-topbar-popover">
      <div class="hs-phone-header">Call our success team</div>
      <div class="hs-phone-row">
        <span class="hs-phone-flag">🇺🇸</span>
        <span class="hs-phone-number">+1 317-483-0743</span>
        <span class="hs-phone-hours">7am – 12am EST Mon–Fri</span>
      </div>
      <div class="hs-phone-row">
        <span class="hs-phone-flag">🇬🇧</span>
        <span class="hs-phone-number">+44 7458 159105</span>
        <span class="hs-phone-hours">7am – 5pm CET Mon–Fri</span>
      </div>
    </div>`;
  }

  // ── What's new drawer ─────────────────────────────────────────────
  function buildWhatsNew() {
    const items = [
      { icon: 'article',  iconBg: '#E0F2F1', iconColor: '#0D9488',
        title: 'Reminder: Switch to the new Time &amp; Activity Report', date: 'Tue, Apr 21, 2026',
        body: "We've released a new version of the Time &amp; Activity report with faster performance and more flexible filtering. The legacy report will be retired in September 2026, switch now to avoid disruption.",
        link: 'Fill out the feedback form' },
      { icon: 'payments', iconBg: '#FFF7ED', iconColor: '#D97706',
        title: 'Payroll Adjustments just got a new home.', date: 'Wed, Apr 8, 2026',
        body: 'Easier to find, easier to use.', link: 'Take me there' },
      { icon: 'payments', iconBg: '#FFF7ED', iconColor: '#EF4444',
        title: 'Payroll with Hubstaff? It just got smarter.', date: 'Wed, Apr 8, 2026',
        body: "With Payroll Adjustments, managing pay changes for your entire team takes minutes, not hours. And there's plenty more to explore.",
        link: 'Learn more' },
      { icon: 'payments', iconBg: '#FFF7ED', iconColor: '#D97706',
        title: '[Action required] Payments restored: Authorization needed', date: 'Thu, Mar 26, 2026',
        body: 'Wise payments have been restored. However, to remain compliant with the Strong Customer Authentication (SCA) regulation, manual payments now require authorization. Please check your email for important details and next steps.',
        link: '' },
      { icon: 'payments', iconBg: '#FFF7ED', iconColor: '#D97706',
        title: 'Temporary disruption to Wise payments', date: 'Tue, Mar 24, 2026',
        body: 'Due to an issue on Wise\'s end, payments via Wise are currently paused for a small number of UK and EU-based accounts.',
        link: '' },
    ];
    return `<div id="hs-wn-backdrop"></div>
    <div id="hs-wn-drawer">
      <div class="hs-wn-header">
        <span class="hs-wn-title">What's new?</span>
        <span class="hs-wn-close" id="hs-wn-close">close</span>
      </div>
      <div class="hs-wn-body">
        ${items.map(i => `<div class="hs-wn-item">
          <div class="hs-wn-icon" style="background:${i.iconBg};color:${i.iconColor}">${i.icon}</div>
          <div class="hs-wn-item-title">${i.title}</div>
          <div class="hs-wn-item-date">${i.date}</div>
          <div class="hs-wn-item-body">${i.body}</div>
          ${i.link ? `<a class="hs-wn-item-link" href="#">${i.link}</a>` : ''}
        </div>`).join('')}
      </div>
    </div>`;
  }

  // ── Avatar menu ───────────────────────────────────────────────────
  function buildAvatarMenu() {
    return `<div id="hs-avatar-menu">
      <div class="hs-avatar-menu__group">
        <a class="hs-avatar-menu__item" href="#">My account</a>
        <a class="hs-avatar-menu__item" href="#">User settings &amp; billing</a>
        <a class="hs-avatar-menu__item" href="#">Earn a sign-up bonus</a>
      </div>
      <div class="hs-avatar-menu__group">
        <a class="hs-avatar-menu__item" href="#">Payment accounts</a>
        <a class="hs-avatar-menu__item" href="#">Integrations</a>
      </div>
      <div class="hs-avatar-menu__group">
        <a class="hs-avatar-menu__item" href="#">Support</a>
        <a class="hs-avatar-menu__item" href="#">Download the app</a>
        <a class="hs-avatar-menu__item" href="#">Developer API</a>
        <a class="hs-avatar-menu__item" href="#">Write G2 review <span class="hs-gift-badge"><span class="material-symbols-rounded">card_giftcard</span>Get a gift</span></a>
      </div>
      <div class="hs-avatar-menu__group">
        <a class="hs-avatar-menu__item" href="#">Sign out</a>
      </div>
    </div>`;
  }

  // ── Public API ────────────────────────────────────────────────────
  const HubstaffShell = {
    init(opts) {
      opts = Object.assign({ activeItem: 'dashboard', logoHref: '#', expanded: false }, opts || {});

      // Auto-detect active sub-item from current URL (skip if caller already provided one)
      if (!opts.activeSubHref) {
        const _page = window.location.pathname.split('/').pop() || '';
        if (_page) {
          outer: for (const item of NAV_ITEMS) {
            const allSubs = [];
            if (item.subs) allSubs.push(...item.subs);
            if (item.sections) item.sections.forEach(sec => allSubs.push(...sec.items));
            for (const sub of allSubs) {
              if (typeof sub === 'object' && sub.href === _page) {
                opts.activeSubHref = sub.href;
                opts.activeItem    = item.key;
                break outer;
              }
            }
          }
        }
      }

      // Inject CSS
      const style = document.createElement('style');
      style.textContent = CSS;
      document.head.appendChild(style);

      if (opts.expanded) document.body.classList.add('hs-expanded');

      // Toggle button
      const toggleWrap = document.createElement('div');
      toggleWrap.innerHTML = buildToggleBtn();
      const toggleBtn = toggleWrap.firstElementChild;
      document.body.appendChild(toggleBtn);
      toggleBtn.addEventListener('click', () => document.body.classList.toggle('hs-expanded'));

      // Topbar
      const topbarWrap = document.createElement('div');
      topbarWrap.innerHTML = buildTopbar();
      document.body.insertBefore(topbarWrap.firstElementChild, document.body.firstChild);

      // Sidebar
      const sidebarWrap = document.createElement('div');
      sidebarWrap.innerHTML = buildSidebar(opts);
      const sidebar = sidebarWrap.firstElementChild;
      document.body.insertBefore(sidebar, document.body.firstChild);

      // Wire submenu toggles
      sidebar.querySelectorAll('.hs-nav-group').forEach(group => {
        const btn = group.querySelector('.hs-nav-item');
        const submenu = group.querySelector('.hs-nav-submenu');
        if (!submenu) return;
        btn.addEventListener('click', e => {
          // If the item is a link (has href), only toggle; navigation happens naturally
          // If it's a button, toggle as before
          if (btn.tagName === 'A') {
            group.classList.toggle('is-open');
          } else {
            group.classList.toggle('is-open');
          }
        });
      });

      // Popover helper — positions a popover flush-right under its button
      function anchorBelow(menu, btn) {
        const r = btn.getBoundingClientRect();
        menu.style.right = Math.max(8, window.innerWidth - r.right) + 'px';
        menu.style.left = 'auto';
      }
      function closeAllPopovers() {
        document.querySelectorAll('.hs-topbar-popover, #hs-avatar-menu').forEach(m => m.classList.remove('is-open'));
      }
      function wirePopover(btnId, menu) {
        const btn = document.getElementById(btnId);
        if (!btn) return;
        btn.addEventListener('click', e => {
          e.stopPropagation();
          const wasOpen = menu.classList.contains('is-open');
          closeAllPopovers();
          if (!wasOpen) { anchorBelow(menu, btn); menu.classList.add('is-open'); }
        });
      }

      // Inject apps, notif, phone menus
      ['buildAppsMenu','buildNotifMenu','buildPhoneMenu'].forEach(fn => {
        const wrap = document.createElement('div');
        // eslint-disable-next-line no-eval
        wrap.innerHTML = { buildAppsMenu, buildNotifMenu, buildPhoneMenu }[fn]();
        document.body.appendChild(wrap.firstElementChild);
      });
      wirePopover('hs-btn-apps',  document.getElementById('hs-apps-menu'));
      wirePopover('hs-btn-notif', document.getElementById('hs-notif-menu'));
      wirePopover('hs-btn-call',  document.getElementById('hs-phone-menu'));

      // What's new drawer
      const wnWrap = document.createElement('div');
      wnWrap.innerHTML = buildWhatsNew();
      while (wnWrap.firstElementChild) document.body.appendChild(wnWrap.firstElementChild);
      const wnBackdrop = document.getElementById('hs-wn-backdrop');
      const wnDrawer   = document.getElementById('hs-wn-drawer');
      function openWn()  { wnBackdrop.classList.add('is-open');    wnDrawer.classList.add('is-open'); }
      function closeWn() { wnBackdrop.classList.remove('is-open'); wnDrawer.classList.remove('is-open'); }
      document.getElementById('hs-btn-gifts').addEventListener('click', e => { e.stopPropagation(); closeAllPopovers(); openWn(); });

      // Help modal
      const helpWrap = document.createElement('div');
      helpWrap.innerHTML = buildHelpModal();
      document.body.appendChild(helpWrap.firstElementChild);
      const helpBackdrop = document.getElementById('hs-help-backdrop');
      function openHelp()  { closeAllPopovers(); helpBackdrop.classList.add('is-open'); }
      function closeHelp() { helpBackdrop.classList.remove('is-open'); }
      document.getElementById('hs-btn-help').addEventListener('click', e => { e.stopPropagation(); openHelp(); });
      document.getElementById('hs-help-close').addEventListener('click', closeHelp);
      document.getElementById('hs-help-close-btn').addEventListener('click', closeHelp);
      helpBackdrop.addEventListener('click', e => { if (e.target === helpBackdrop) closeHelp(); });
      document.addEventListener('keydown', e => { if (e.key === 'Escape') closeHelp(); });
      document.getElementById('hs-wn-close').addEventListener('click', closeWn);
      wnBackdrop.addEventListener('click', closeWn);

      // Avatar menu
      const menuWrap = document.createElement('div');
      menuWrap.innerHTML = buildAvatarMenu();
      document.body.appendChild(menuWrap.firstElementChild);
      const avatarBtn = document.getElementById('hs-avatar-btn');
      const avatarMenu = document.getElementById('hs-avatar-menu');
      avatarBtn.addEventListener('click', e => {
        e.stopPropagation();
        const wasOpen = avatarMenu.classList.contains('is-open');
        closeAllPopovers();
        if (!wasOpen) { anchorBelow(avatarMenu, avatarBtn); avatarMenu.classList.add('is-open'); }
      });
      document.addEventListener('click', closeAllPopovers);

      // Org switcher
      const orgWrap = document.createElement('div');
      orgWrap.innerHTML = buildOrgMenu();
      document.body.appendChild(orgWrap.firstElementChild);
      const orgBadge = document.getElementById('hs-org-badge');
      const orgMenu  = document.getElementById('hs-org-menu');
      orgBadge.addEventListener('click', e => {
        e.stopPropagation();
        const wasOpen = orgMenu.classList.contains('is-open');
        closeAllPopovers();
        if (!wasOpen) { anchorBelow(orgMenu, orgBadge); orgMenu.classList.add('is-open'); }
      });
      if (opts.onOrgBadgeClick) orgBadge.addEventListener('click', opts.onOrgBadgeClick);
    },

    setActiveItem(key) {
      document.querySelectorAll('#hs-sidebar .hs-nav-item').forEach(el => {
        const isActive = el.dataset.key === key;
        el.classList.toggle('active', isActive);
        if (isActive) el.closest('.hs-nav-group').classList.add('is-open');
      });
    },
  };

  global.HubstaffShell = HubstaffShell;

})(window);
