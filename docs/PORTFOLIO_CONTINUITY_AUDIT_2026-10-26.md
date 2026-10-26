# Portfolio continuity and professional-evidence audit
_Date: 2026-10-26 · Review branch · Not a verified résumé_

## Documented source chronology

| Dated evidence | Supports | Does not establish |
| --- | --- | --- |
| 2021-08-21, Google Drive “My 1-minute Storytime - The Journey,” written as a public career narrative | Established interest in personal agency, community, career reinvention and choosing meaningful work | A complete employment timeline or independently verified titles |
| 2026-08-03, Google Drive “Training Track: Toward the 4-Player Engine & Playable Characters” | A staged skill-building and contributor pathway: TypeScript, Git, reviewed PRs, accessible UI work, engine development | Completion of stages 1–4 or external contributors' milestones |
| 2026-08-09, Google Drive “Duet: Veiled Chess — Comprehensive Localization & Locale-Aware Agent Plan” | Localization planning, adaptive language strategy, UI string-table architecture | A shipped, fully localized Duet product |
| 2026-08-27, Google Drive “Dominique Devone - Dream Job Application Resume (Republic)” | Self-described founder, systems architect, game designer, creative operations lead; stated 2024 start for Loptr Lab and Urban Alien Adventures | External validation of role dates, the security or availability of named services, feature completion, professional licensing |
| 2026-10-01, GitHub MISSION.md | Public owner-approved people-over-profit, accessibility-first and transparent development mission | Revenue, financing or market traction |
| 2026-10-18, GitHub docs/ECOSYSTEM_ARCHITECTURE.md | Owner-confirmed training studio pilot: projects as real exercises and PIXIE as continuity companion | Completed formal training institution or validated commercial demand |
| 2026-10-26, GitHub PR #32 | Implementation of a simplified ecosystem entrance | Unified styling of the entire portfolio, independent accessibility acceptance |

Google Drive documents: https://docs.google.com/document/d/1MTm8M1wg04tU1EWhL_ZlrZHelFMlruyySQRDhDptH2E/edit ; https://docs.google.com/document/d/1Tr9IOTYIMo2QjOmUZUzR3nJ7izXxzDokM2CscMDf9jA/edit ; https://docs.google.com/document/d/1ENhwwk3qtw2YiA8NrW--Hc2EiSM5NA9gum8AAjarFaE/edit ; https://docs.google.com/document/d/1IYsrOvFdxmND-Q9NsLCmvqSN_XPv0DKGJ4VDo_xHXQc/edit .

## Persona hierarchy: avoid blending owner, studio and individual products

1. **Person / founder:** Dominique is the initiator and cross-disciplinary designer of the studio's operating model, research questions, interactive experiences and contributor process. Credit is meaningful only alongside specific work and evidence.
2. **Studio / Loptr Lab:** the public umbrella for multimedia experimentation, accessibility, technical training pilot and creator-owned work; not every prototype is an accepted finished product.
3. **PIXIE:** helps contributors and creators organize tasks and maintain continuity. Not a second portfolio, resource directory, legal service or completed autonomous administrator.
4. **Made-Sick:** the resource directory and evidence-first discovery entrance. Not interchangeable with the founder's personal biography.
5. **Projects:** Duet, story projects and creative experiments retain distinct production status and authorship.

Recommended professional summary (evidence-proportional): “Founder of Loptr Lab, an accessibility-first, open-development studio pilot connecting interactive design, creator resources, project stewardship and practical technical training. Work spans game-system concepts, web prototypes, learning tracks and AI-assisted coordination. Public repositories document what's implemented, under review and still experimental.”

Do **not** use unverified absolutes like “clinical research validated,” “fully accessible,” “deployed multiplayer,” or “AI expert” merely because those phrases appear in a résumé or planning document. LinkedIn profile content was not fetched directly in this pass; the 2021 Storytime is LinkedIn-style narrative and the 2026 résumé is self-reported. Obtain the actual LinkedIn export/profile or independent references for a definitive public employment timeline.

## Site architecture inventory and findings

- `index.html`: portfolio identity, long content and its own Tailwind CDN + inline CSS.
- `ecosystem/index.html`: newly consolidated task-led entrance, inline full-page CSS with teal/amber theme.
- `collaborate/index.html`: independent Tailwind/inline CSS, unequal typography/nav.
- `research/index.html`: independent Tailwind/inline CSS, inconsistent spacing and purpose compared to live studio pilot.
- `provenance/index.html`: independent Tailwind/inline CSS, dense source/provenance explanations.
- `ecosystem/projects/*/index.html`: project details, still in legacy indigo and separate page-level styles; not redundant products but navigation needs a single directory entry.
- `provenance/ai-assisted-story-development/index.html`: additional independent page theme.

### Correct navigation role

Personal portfolio home → **About the founder** (identity + evidenced chronology) / **Ecosystem** (visitor entry) / **Research** (proposal and limitations) / **Collaborate** (contribute) / **Provenance** (audit trail).

Avoid showing every project twice; project detail pages may remain as canonical disclosures and should link to the ecosystem directory, not compete as alternative top-level homepages.

## Consolidation acceptance checklist

- One site-owned stylesheet under `/assets/` for shared tokens, type scale, spacing, focus, reduced motion and components. Unify and remove local CSS incrementally rather than stacking overrides indefinitely.
- Body type at least 18px, line height >=1.5, readable max width, real spacing between navigation controls and interactive targets.
- Check actual WCAG AA contrast: ordinary text >=4.5:1 and large text >=3:1; focus visibility and 200% zoom; physical iPad and keyboard-only acceptance.
- Dark earthy teal + warm cream + restrained amber for the person-first, resilient, investigative studio tone; prevent project-specific color bleed.
- Check descriptive link text and actual link destinations; do not send reviewers to source code as the principal preview.
- Verify persona statements against dates and records; label proposals, aspirations and self-reported claims.
- Real Vercel browser review across representative desktop/tablet/mobile pages before a merge or DNS change.
