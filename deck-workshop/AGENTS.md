# Deck Workshop instructions

- Keep this folder independent of portfolio root and production.
- Never modify, delete, rename or deploy the preserved archive branch.
- Veiled Dominion and Violet's Revenge retain separate rules, data, state and bots.
- The Violet-themed Sealed Deck is a legacy Veiled Dominion visual variant, not Violet's Revenge game canon.
- Float Cards is separate; do not use it as a substitute engine.
- Workshop notes are local-only. Do not send to APIs, Railway, Discord, Roomy or analytics.
- Run review checks before claiming validation. No DNS, domain, Pages, merge or production change without separate approval.

## UI SDK usage

The workshop and card-lab system selectors use the UI SDK Web Components `Tabs` pattern via the exact pinned CDN release `web@0.1.0-beta.14`. Reference: https://ui-sdk.dev/docs/web-components/components/tabs and https://ui-sdk.dev/docs/web-components/installation. The UI SDK is beta; do not float the CDN version or expand its use into game rules/state without a separate review. Keep the two game systems, their data, registries, rules adapters, fixtures and provenance isolated. Keep all workshop records local-only. The SDK is an interaction layer, not a source of game canon.
