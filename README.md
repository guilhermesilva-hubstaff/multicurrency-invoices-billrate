# Hubstaff shell — starter template

A minimal starter that ships only the Hubstaff app chrome:

- Persistent **top bar** (timer, icon buttons, avatar, org badge)
- Persistent **sidebar** with all twelve nav items
- A circular toggle button between the sidebar and the top bar that
  **collapses and expands** the sidebar smoothly
- An empty centre area ready to receive any page or component

No business logic. Drop your content into `#shell-content` and start
building.

## Files

| File                | Purpose                                                                 |
| ------------------- | ----------------------------------------------------------------------- |
| `index.html`        | Markup — loads fonts, the shell, the placeholder content.               |
| `hubstaff-shell.js` | The shell library. Injects the top bar, sidebar, and toggle button.    |
| `styles.css`        | Page-level styles for the placeholder card and a couple of buttons.    |
| `layout.js`         | One-line shell init — change the active sidebar item here.             |

## Getting started

1. Copy the `layout-template/` folder into your project.
2. Open `index.html` in a browser. No build step required.
3. Replace the `.placeholder` block inside `#shell-content` with your page.

## Replacing the content

Everything between the comment markers in `index.html` is yours to swap:

```html
<div id="shell-content">
  <div class="page">
    <!-- ▼ ▼ ▼  Replace from here  ▼ ▼ ▼ -->
    <div class="placeholder">…</div>
    <!--  ▲ ▲ ▲  …to here  ▲ ▲ ▲ -->
  </div>
</div>
```

The shell adds the correct top and left offsets automatically.

## Sidebar API

In `layout.js`, change the highlighted nav item via the `activeItem` option:

```js
HubstaffShell.init({ activeItem: 'payments' });
```

Valid keys: `dashboard`, `time`, `activity`, `reports`, `locations`,
`tasks`, `scheduling`, `members`, `documents`, `payments`,
`integrations`, `settings`.

Or switch it later:

```js
HubstaffShell.setActiveItem('reports');
```

## Sidebar collapse / expand

The circular toggle next to the sidebar handles this. You can also drive
it from your own code:

```js
document.body.classList.toggle('hs-expanded');
```

- Collapsed (default) — 64 px wide, icons only.
- Expanded — 240 px wide, icons plus labels and the *Hubstaff* wordmark.

The top bar and content area animate alongside the sidebar.

## Customising the chrome

Open `hubstaff-shell.js` if you need to:

- Change the nav items (the `NAV_ITEMS` array near the top).
- Swap the brand mark or topbar icons (the `ASSETS` map).
- Adjust colours, spacing, or sizes (the `CSS` template literal).

The file is small and well commented — search by section header.
