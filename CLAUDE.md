# Project brief — Hubstaff shell starter

> Drop this zip into a new Claude conversation and say:
> **"Start a new project based on this zip file."**
>
> Everything below is the context Claude needs to make sensible decisions
> without re-reading the codebase from scratch.

---

## What this project is

A minimal, dependency-free HTML/CSS/JS starter that ships a fully interactive
Hubstaff app chrome. It is the **base layout** for prototyping any Hubstaff
page or feature. Nothing business-specific is included.

**What's in the shell:**
- Persistent top bar with a fully interactive icon row
- Persistent sidebar with 13 nav items, expandable submenus, and a Favorites section
- Inline SVG Hubstaff logo — mark-only when collapsed, full wordmark when expanded
- Circular toggle button that collapses (64 px) or expands (240 px) the sidebar
- An empty centre area (`#shell-content`) ready to receive any page or component

**Top bar interactive elements (left → right):**

| Element | ID | Opens |
|---|---|---|
| Timer pill | — | (static) |
| Call / phone | `hs-btn-call` | Phone numbers popover |
| Help / `?` | `hs-btn-help` | "Help for organizations" modal |
| Notifications | `hs-btn-notif` | Notifications popover (badge: 24) |
| What's new / gift | `hs-btn-gifts` | Right-side "What's new?" drawer (badge: 3) |
| Apps grid | `hs-btn-apps` | Hubstaff product switcher popover |
| User avatar | `hs-avatar-btn` | Account menu popover |
| Org badge | `hs-org-badge` | Organisation switcher popover |

All popovers close each other on open, and close on click-outside or Escape.

**What is intentionally not included:**
- No routing, no framework, no build step
- No business logic, no page content, no analytics
- No external data fetching

---

## File map

```
hubstaff-shell/
├─ index.html         ← markup: loads fonts + shell + placeholder
├─ hubstaff-shell.js  ← shell library: ALL chrome (topbar, sidebar, popovers,
│                        modals, drawers). ~900 lines, well-sectioned.
├─ styles.css         ← page-level styles only (placeholder card + buttons)
├─ layout.js          ← one-line shell init
├─ README.md          ← human-facing quick-start
└─ CLAUDE.md          ← this file
```

### Where each thing lives

| Thing | Location |
|---|---|
| Shell CSS (topbar, sidebar, all popovers/drawers/modals) | CSS template literal in `hubstaff-shell.js` — search `// ── CSS` |
| Top bar HTML | `buildTopbar()` in `hubstaff-shell.js` |
| Sidebar nav items + submenus | `NAV_ITEMS` array in `hubstaff-shell.js` |
| Logo SVGs | `MARK_SVG` (collapsed) and `FULL_LOGO_SVG` (expanded) constants |
| Avatar menu content | `buildAvatarMenu()` |
| Apps popover content | `buildAppsMenu()` |
| Notifications popover | `buildNotifMenu()` |
| Phone popover | `buildPhoneMenu()` |
| What's new drawer | `buildWhatsNew()` |
| Help modal | `buildHelpModal()` |
| Org switcher | `buildOrgMenu()` |
| All event wiring | `HubstaffShell.init()` — bottom of file |
| **Page content** | `<div id="shell-content">` in `index.html`, between the `▼▼▼ Replace ▲▲▲` markers |
| Page-level styling | `styles.css` |

---

## The content area — where new work goes

**All new features, pages, and components go inside `#shell-content`.**
Replace the `.placeholder` block in `index.html`:

```html
<div id="shell-content">
  <div class="page">

    <!-- ▼ ▼ ▼  Replace from here  ▼ ▼ ▼ -->
    <div class="placeholder">…</div>
    <!-- ▲ ▲ ▲  …to here  ▲ ▲ ▲ -->

  </div>
</div>
```

The `.page` wrapper gives 32 px padding and left-aligns content.
The shell automatically applies the correct `margin-top` and `margin-left`
offsets so content never slides under the top bar or sidebar.

---

## How the shell works (mental model)

1. `index.html` loads fonts → `hubstaff-shell.js` → `layout.js`.
2. `layout.js` calls `HubstaffShell.init({ activeItem, logoHref })`.
3. At init the shell:
   - Injects its CSS into `<head>`.
   - Builds and inserts the top bar, sidebar, and toggle button.
   - Injects all popover/modal/drawer HTML into `<body>`.
   - Wires all click handlers.
4. The toggle flips `<body>.hs-expanded`. CSS handles all transitions (240 ms).
5. Each top-bar button opens exactly one panel; opening one closes all others.

---

## Active sidebar item

Set on init:
```js
HubstaffShell.init({ activeItem: 'financials' });
```

Set later:
```js
HubstaffShell.setActiveItem('reports');
```

Valid keys: `dashboard`, `timesheets`, `activity`, `insights`,
`smart_notifications`, `locations`, `project_management`, `calendar`,
`reports`, `people`, `financials`, `silent_app`, `settings`.

---

## Conventions to follow

- **CSS prefix `hs-`** for everything the shell owns. Don't use `hs-` on page-level styles.
- **Shell CSS lives inside `hubstaff-shell.js`.** Page CSS lives in `styles.css`.
  New features get their own CSS file (e.g. `payroll.css`).
- **No external JS frameworks.** Vanilla JS only.
- **Material Symbols Rounded** for icons (Google Fonts CDN).
- **Roboto** for typography (already loaded).
- **BEM-ish class names.** State classes: `is-` prefix (`is-open`, `is-active`).
- **Smooth transitions** 240 ms ease on all layout changes.
- **Don't touch `hubstaff-shell.js`** for page work — it is stable infrastructure.
  Modify it only to add new shell-level chrome.

---

## Colour palette

| Token | Hex | Usage |
|---|---|---|
| primary | `#0168DD` | Active items, links |
| accent | `#2AA7FF` | Timer, CTA buttons |
| surface | `#FFFFFF` | Top bar, cards |
| surface-muted | `#F3F4F6` | Sidebar background |
| border | `#D6DBE6` | Dividers |
| text | `#111827` | Body text |
| text-muted | `#6B7280` | Icons, secondary labels |
| success | `#31C48D` | Org badge |
| warning-bg | `#FEF3C7` | Suspended badge background |
| warning-text | `#D97706` | Suspended badge text |

Spacing scale: 8 / 12 / 16 / 24 / 32 px.
Border radii: 6 / 8 / 12 px.

---

## Suggested opening prompts for colleagues

1. *"Build the Financials → Manage payroll page inside `#shell-content`.
   Start with the page header, tabs (Manage / Overview / Create payments), and an empty-state table."*

2. *"Add a Reports page with a date-range filter bar at the top and a
   results table below. Keep the chrome untouched."*

3. *"Build the Members page: a searchable table of team members with
   avatar, name, role, status, and a last-active timestamp."*

4. *"Add a Settings → Activity and tracking page with sections and
   toggle switches."*

5. *"Wire up a reusable modal pattern: backdrop, centred dialog, ESC to
   close, click-outside to close."*

---

## Sanity checklist for Claude

Before changing anything:

- ☐ Am I editing the right layer? (shell infrastructure vs. page content)
- ☐ No build step or external dependency introduced.
- ☐ New page content is inside `#shell-content` only.
- ☐ Sidebar collapse/expand still works.
- ☐ Content margin animates with the sidebar.
- ☐ No layout shift on toggle — transitions are 240 ms ease.
- ☐ New CSS is prefixed (not `hs-`) and doesn't collide with shell selectors.
- ☐ Active sidebar item shows left-bar indicator + blue text.
- ☐ All top-bar buttons still open their respective panels.
