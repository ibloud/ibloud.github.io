# Violet development proposal — evidence and review

Prepared with Codex assistance for Dominique Devereaux, 7 November 2026. Editorial consolidation, not funding approval or a canon change.

## Scope

Preserve `https://ibloud.github.io/ecosystem/projects/violets-revenge/` as the authoritative proposal. Update its homepage/ecosystem entry links. Retain navigation, shared typography, theme script and canonical metadata. The foundation gains a reusable `ll-reading` prose layout using the existing reading-page rules; light-theme focus uses the existing purple primary color for visible contrast. No page-local CSS, dependencies, analytics, accounts or forms were added.

The separate Violet PR changes only destination card 04 in `pitch/index.html`. It replaces the Remembrance promotion with a development-proposal link. No Remembrance files, routes, hosting or adventure content are changed. `presentation.js`, all game logic, episode data, bibles and historical archives remain untouched.

Open work was checked before editing: portfolio #10/#21 and Violet #44/#45/#47/#48/#50/#51 are separate proposals. This work starts from main, not their branches. It does not promote experimental mechanics or merge those proposals.

## Source-to-claim record

| Claim | Reviewed source | Boundary |
| --- | --- | --- |
| Narrative design and branching archive | [Battle README](https://github.com/ibloud/battle-the-beast/blob/5c42d6fa22ed0ab2261246e80f9ff537cdc84a8a/README.md), `story/battle-the-beast.ink` | Current adaptation does not independently date the interactive implementation to 2017. Contest context comes from the owner's assignment, not verified contest records. No win/license/canon claim. |
| Power, restraint and collective-action design become explicit mechanics | [Design crosswalk](https://github.com/ibloud/battle-the-beast/blob/5c42d6fa22ed0ab2261246e80f9ff537cdc84a8a/docs/VEILED_DOMINION_LINEAGE.md), [Veiled canon policy](https://github.com/Loptr-Lab/veiled-dominion-engine/blob/ff3d29f97eeaa64792b0e3daa5b1ab132d0febbf/docs/CANON_AND_CONTINUITY.md) and rulebook | Four-player engine incomplete; TypeScript exercise is not canonical implementation. Cross-project design lineage is not shared fictional canon. |
| Existing Violet browser lanes and rules evidence | [Reviewed Violet README](https://github.com/ibloud/violets-revenge/blob/3da6a62f94ffeaf58b90d08b8d23384faa9ef876/README.md), `index.html`, `demo/README.md`, `demo/engine/`, `demo/test/` | Root Canvas and /demo hot-seat proposal are distinct. No full online multiplayer or human balance acceptance. |
| Founder-led authorship and AI-assisted work | [Public process record](https://ibloud.github.io/provenance/ai-assisted-story-development/), [coordination-cost case](https://ibloud.github.io/ecosystem/ai-development-case-study.html), `docs/AI-AGENT-BOUNDARY.md` | Existing process documentation inspected in portfolio main. Creative direction and source material are distinguished from generated interpretation, dialogue and implementation assistance. No claim that every artifact was personally hand-coded. This proposal itself is AI-assisted and awaits owner review. |
| Narrative authority and trauma boundaries | Violet `docs/STORY-BIBLE.md`, `docs/CHARACTER-BIBLE.md`, `docs/SENSITIVE-CONTENT-GUIDE.md` | Public treatment describes survival; roadmap describes death/return. Dominique clarified the transition in this review: dream sequence in purgatory; a candle nearly burned to the wick restores itself; Violet feels drawn to take it and finds herself alive, with memories of what happened repressed. The proposal attributes this to the owner rather than inventing a resolution. It is not yet reflected in the unchanged repository bibles. Lady Violet lineage is historical and its primary inventory remains pending. |
| Participation, consent, rights and clearance | Violet `CONTRIBUTING.md`, `docs/TRAINEE-ONBOARDING.md`, `docs/PLAYTEST-GUIDELINES.md`, `docs/MUSIC-LICENSING.md`; portfolio `MISSION.md`; Battle IP boundaries | Unpaid review is distinct from paid commissions; signed terms before work. No promised employment, credit, revenue share or third-party participation. |
| Concrete professional next action | [Open keyboard audit #24](https://github.com/ibloud/violets-revenge/issues/24) | Read back current issue: open, good-first-issue, files/criteria/verification specified, no assignee. Task scope/reviewer must still be confirmed. Trainee-ready filter was empty. |
| Pilot, audience, schedule and budget | Owner's assignment plus explicitly labeled proposal arithmetic | Hypotheses and unverified planning estimates; 500 × $75 × 1.15 = $43,125. No approved funding, staffing, date or quotation. |

Snapshots: portfolio main `87aa1281e49842811f7f130e0e13868ef0b1831a`; Violet `3da6a62f94ffeaf58b90d08b8d23384faa9ef876`; Battle `5c42d6fa22ed0ab2261246e80f9ff537cdc84a8a`; Veiled `ff3d29f97eeaa64792b0e3daa5b1ab132d0febbf`.

PIXIE's 12 October Violet snapshot was checked through `list_projects` and `get_project_status(refresh=true)`. It reported HEAD changed; current source was then read. The ecosystem architecture was retrieved before editing. No new ecosystem map or product architecture was created.

## Verification

- `python tools/check_portfolio.py`: PASS, 25 pages, both baseline and final. Shared stylesheet, navigation, landmarks, IDs, local links and fragments.
- All proposal GitHub blob-link paths checked against the exact reviewed checkouts: PASS.
- `git diff --check` in both repositories: PASS.
- `node --test demo/test/*.test.js`, Violet source above, Node v24.19.0: 22 passed, 0 failed. Handoff preset: 1,885/2,000 escapes, mean 8.66 rounds. Tuned preset: 1,169/2,000 escapes, mean 8.13 rounds. These are scripted-bot results, not human playtest findings. Earlier reported tuned counts remain discrepancies in the unchanged README; this review does not rewrite them.
- Headless system Chromium/Playwright: 320, 390, 768, 1024 and 1366 CSS pixels in light and dark themes, all disclosures expanded: no horizontal document overflow; 18px body copy.
- Keyboard: skip link → main, native disclosure activation, visible focus rule, theme switching/persistence and reduced-motion behavior: PASS.
- Sampled body, links, eyebrow, heading, theme-button and primary-action text: light contrast 5.23:1 or better, dark 7.28:1 or better. Focus against page: light 5.49:1, dark 13.61:1. This is a sampled contrast check, not a universal WCAG certification.
- Both unchanged local game routes returned HTTP 200 with content and no page errors. This is a smoke check, not a completed playthrough.
- Secondary pitch: exactly one development-proposal destination with the canonical URL; reading settings open, large text applies, Escape closes. Adventure's separate Remembrance reference remains intact.
- Physical iPad, Safari, VoiceOver, human playtest observations and independent accessibility acceptance: pending.
- Direct live GitHub Pages and Pitch My Project requests: blocked by the execution environment's outbound policy (proxy HTTP 403 CONNECT). This is a retrieval limit, not evidence those pages are unavailable. The five-part editorial structure comes from the supplied brief; supporting articles were not reviewed.

## Review decisions

Record Dominique’s purgatory/candle return sequence in Violet’s canon process before narrative implementation. Confirm which prototype lane supports a paid discovery brief, staffing availability, exact pilot acceptance thresholds and rights review. Do not merge, promote a preview or publish to main without Dominique's explicit approval. Merge the authoritative portfolio proposal before the separate Violet promotional-link correction so it does not send readers to the old thin summary.
