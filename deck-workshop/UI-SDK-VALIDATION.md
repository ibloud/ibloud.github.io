# UI SDK validation and remaining review

## Integration

- The Deck Workshop and Card Lab use the UI SDK Web Components Tabs composition: `ui-tabs`, `ui-tabs-list`, `ui-tabs-tab`, and `ui-tabs-panel`.
- The browser loads only the Tabs component from the exact pinned URL: `https://ui-sdk.dev/web@0.1.0-beta.13/tabs.js`. The per-component URL form and composition follow the official [installation guide](https://ui-sdk.dev/docs/web-components/installation) and [Tabs guide](https://ui-sdk.dev/docs/web-components/components/tabs).
- The SDK owns tab selection, keyboard/focus behavior and ARIA wiring when it loads. Loptr Lab owns visual styling, game-specific content and local review records.
- If the module request fails, the page installs a small native fallback for click, Left/Right Arrow, Home/End, selected state and panel visibility. This fallback protects against a CDN/network failure; it is not a substitute for testing the SDK path.
- The integration is beta. Keep the exact version pinned and review release notes before upgrading. Do not float `@0` or use the UI SDK as a game rules/state layer.

## Verified in repository

- Static HTML contract checks validate the SDK URL, the named tab list, native button children, matching tab/panel values, separate game systems and unique IDs.
- The same checks cover the network-error fallback in both pages.
- Existing checks continue to validate the 52 unique legacy Sealed Deck card records, its local-only handling controls, and the explicit Violet’s Revenge source boundary.
- GitHub Actions `workshop-contract` runs on pull requests touching `deck-workshop/**` and pushes to `feat/deck-workshop-*` branches.
- These checks inspect source structure. They do not execute a browser, download the SDK, prove runtime behavior, or test assistive technology.

## Remaining acceptance checklist

- [ ] Open the deployed preview and confirm the pinned Tabs module returns successfully (no module/CORS/console errors).
- [ ] Confirm each tab switches to the correct panel on pointer/touch activation.
- [ ] Keyboard: Tab enters at the selected tab; Left/Right Arrow moves and selects; Home/End selects first/last; Tab moves into panel content; Shift+Tab returns to the tab list.
- [ ] Confirm selected styling, focus-visible outline, hidden-panel behavior and no duplicate focus stops.
- [ ] Test narrow mobile widths (320, 375 and 390 CSS px), tablet widths, desktop layout, zoom/reflow and reduced-motion settings.
- [ ] Test on iPad Safari with touch and external keyboard.
- [ ] Test VoiceOver on iOS/iPadOS and macOS; verify announced tab names, selected state, tablist and panel relationships.
- [ ] Block the SDK request in browser devtools and confirm the native fallback remains operable and accessible.
- [ ] Repeat checks on both `index.html` and `card-lab.html`.

## Current status

The repository-side changes and static checks are implemented. The browser/device checklist remains **not run** until a Vercel preview or equivalent hosted review URL is available. Do not mark the integration accepted, merge it, or deploy it solely because static CI passes. Production and the preserved archive remain unchanged.
