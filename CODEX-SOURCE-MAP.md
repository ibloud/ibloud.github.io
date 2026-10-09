# Codex source reconciliation — 2026-10-08

The Codex catalogue brings decks, game variants and their associated automated characters into one collection. Source records were inspected in Google Drive and the ibloud and Loptr-Lab repositories. Catalogue status describes evidence, not a promise of physical availability or a bot connection.

## Decisions

- Keep PIXIE's 54-card playing deck and 54-card oracle distinct; the existing art is concept art, not 108 finished faces.
- The 52 Cards of War / Sealed Deck has a base court and four documented cultural interpretations: Sufi Tariqah, Kemetic Dynasty, Shinbi Tactics and Fifth Sun.
- The August Court Card Bible supplies Ptah, Seshat and Imhotep for the base Clubs court. An older dueling-systems note still calls these missing. Preserve this discrepancy rather than silently treating every source as synchronized.
- The complete Violet card database and the Drive 52-card PDF contain Clubs 3–9, despite the older dueling-systems note calling them missing.
- Mythic court character associations and the legacy universal J/Q/K/A mechanics are different layers. Do not merge them into a new ruleset.
- Systems Quartet is a documented board model. Conversion into Death's personal deck and arbitration with the Sufi deck remain unresolved.
- Current four-player Veiled Dominion canon remains in its GDD and rulebook. Legacy dice/card/chess rules do not override it.
- Float Cards has source code and historical Violet/Pennywise play modes. The October 4 Roomy transition records the two Discord services shut down; browser reuse is proposed.
- The Rift has match-posting source. Current live posting is unverified in the current Duet README; the older Drive claim of live posting is not repeated as current fact.
- Paragon has a 78-card research/design handoff and an older Drive workbook. Character IP is not presented as cleared for merchandise.
- Drive-only planning documents are summarized for the requested catalogue; private operational details and raw documents are not published.

## Public source anchors

- https://github.com/ibloud/violets-revenge/blob/main/CARD-DESIGN-GUIDE.md
- https://github.com/ibloud/violets-revenge/blob/main/CARD-TEXT-DATABASE.md
- https://github.com/ibloud/violets-revenge/blob/main/docs/ROOMY-TRANSITION.md
- https://github.com/ibloud/sewers-and-shadows-bot/blob/main/bot/float-cards-engine.js
- https://github.com/ibloud/sewers-and-shadows-bot/blob/main/bot/src/index.js
- https://github.com/ibloud/Paragon-Reborn/blob/main/docs/paragon-tarot-research.md
- https://github.com/ibloud/inpatient-corridors-review/blob/main/BREAK-THE-GRID-DECK.md
- https://github.com/Loptr-Lab/duet-solo-hackathon/blob/main/docs/design/dueling-systems.md
- https://github.com/Loptr-Lab/duet-solo-hackathon/blob/main/README.md
- https://github.com/Loptr-Lab/veiled-dominion-engine/blob/main/docs/CANON_AND_CONTINUITY.md
- https://github.com/Loptr-Lab/veiled-dominion-engine/blob/main/docs/variants/VARIANT_REGISTRY.yml

## Drive records read

Sealed Deck — Court Card Bible (Canon); LORE_SEALED_DECK_BIBLE.md; THE SEALED DECK: THE SUFI TARIQAH VARIANT; DLM_SEALED_DECK_DESIGN_REQUIREMENTS.md; The Systems Quartet; SICKBOI.EXE; Back in Derry; The Paracausal Edition; Street Level / Syndicate; Dark Bauhaus / Gallery Edition; Design Variant Pack: The Inpatient Corridors; Proposal: Violet_88; The Rift Engagement Design; Paragon Deck workbook; Deck Design Notes; The Queen's Journey: Design Bible; fifth-suit Space exploration; veiled dominion cards.pdf.

## Original direction update — October 8, 2026, America/Chicago

- Paragon-Reborn #17 is now merged at `3ddb52994be4450c11c54ec07d2288372587a375`; the user's earlier unmerged status is superseded by the observed PR record.
- Veiled Dominion Engine #53 remains draft at `1c4543e886a0977d2d08485c3b584c12ef308387`. Upstream reports typecheck passing and 24 existing exercise failures; no local claim of revalidation.
- Return to the Void now leads with independent original briefs. The old 78-card count is explicitly historical, not a promised new roster size. Historical names appear only in the archive, never as new hero specimens.
- Added the three-layer hero/build/story model, first playable milestone, balance and replay requirements, provenance and rights boundaries. No automatic adoption by PIXIE, Duet, existing Sealed Deck skins or unrelated bots.
- Added Phuture Me as an external design reference only. No code integration, copied art, account, upload or purchase. See PHUTURE-REVIEW.md.
