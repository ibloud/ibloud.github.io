# Deck Collection source reconciliation · 2026-11-22

Preserved archive: `archive/sites-deck-collection-2026-11-17`, commit `853245c926fe470c9e27786cba49b541edae9e8a`; unchanged.

The archived catalogue presented the Violet-themed 52-card deck as if it were a separate Violet's Revenge card game. Current sources resolve this:
- `CARD-TEXT-DATABASE.md` identifies itself as the Veiled Dominion card-text database.
- `CARD-DESIGN-GUIDE.md` is a Veiled Dominion card-design guide with a Violet's Revenge edition.
- `docs/VIOLETS-REVENGE-CARD-DEMO-SCOPE.md` says Violet's Revenge card-game work has its own source and must not import the Veiled Dominion database.
- The current Canvas Morgue prototype is a separate horror game.

The themed deck is therefore a **legacy Veiled Dominion Sealed Deck visual variant**, not Violet's Revenge card-game canon. Its full 52-card text belongs only on the Sealed Deck legacy reference. The separate Violet card-game rules, turn flow and terminal conditions remain unresolved pending approval.

Existing PRs #44, #47, #48 and #50 in Violet's Revenge, and Veiled Dominion Engine PR #57, remain untouched. Railway services are retired/offline; no Railway changes are made. No hosting, DNS, merge or production deployment is included.
