# Deck Workshop

Standalone review workspace for two separate game systems. The preserved Deck Collection source archive is at [archive/sites-deck-collection-2026-11-17](https://github.com/ibloud/ibloud.github.io/tree/archive/sites-deck-collection-2026-11-17). This folder does not modify that archive or production.

- Veiled Dominion: canonical rules/engine in Loptr-Lab/veiled-dominion-engine.
- Violet's Revenge: separate horror game in ibloud/violets-revenge; card-game proposal remains incomplete.
- Violet's Revenge Edition in the Deck Collection is a visual edition of the legacy Veiled Dominion Sealed Deck, not Violet's card-game canon.
- Float Cards is separate and not reused.
- Review notes are stored in two independent local browser storage keys and exported manually.
- No Railway, Discord, Roomy, API or multiplayer backend is connected.

No custom domain, DNS, GitHub Pages or production hosting change. Do not modify/delete/deploy the archive branch.

## Accessible interaction layer

The two system selectors on the workshop and card-lab pages use UI SDK Web Components Tabs, pinned to `@ui-sdk/web` **0.1.0-beta.13** via the versioned CDN URL. The SDK supplies tab keyboard/focus behavior; Loptr Lab keeps its own markup, styling, local-only review stores, card data and game boundaries. This is a beta dependency, not a rules engine or shared game runtime. Do not replace the pinned version with a floating `@0` URL without review.

## UI SDK validation

See [UI SDK validation and remaining review](UI-SDK-VALIDATION.md) for the pinned tabs entry, network-failure fallback, automated checks, and the browser/device acceptance checklist.
