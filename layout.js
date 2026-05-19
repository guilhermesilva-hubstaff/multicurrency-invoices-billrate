/* =============================================================
   Starter template — shell boot
   -------------------------------------------------------------
   Initialises the Hubstaff shell. The shell handles all of the
   top bar, sidebar, and collapse/expand behaviour internally.
   Add app-level logic below this init call.
   ============================================================= */

HubstaffShell.init({
  activeItem: 'settings',
  logoHref:   '#',
});

/* Programmatic control of the sidebar, if you ever need it:
 *
 *   document.body.classList.add('hs-expanded');     // expand
 *   document.body.classList.remove('hs-expanded');  // collapse
 *   document.body.classList.toggle('hs-expanded');  // toggle
 *
 * Or change the active sidebar item:
 *
 *   HubstaffShell.setActiveItem('payments');
 */
