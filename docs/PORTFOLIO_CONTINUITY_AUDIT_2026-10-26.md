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
- Approved galactic charcoal + muted plum + lilac for the person-first, resilient, investigative studio tone; prevent project-specific color bleed.
- Check descriptive link text and actual link destinations; do not send reviewers to source code as the principal preview.
- Verify persona statements against dates and records; label proposals, aspirations and self-reported claims.
- Real Vercel browser review across representative desktop/tablet/mobile pages before a merge or DNS change.


## Binding brand and clean-change protocol · 26 October 2026

This is the operating standard for the Loptr Lab portfolio and PIXIE-assisted proposals. Cross-chat instructions do not replace canonical repository evidence. If a later request conflicts with these rules, explicitly identify the conflict, inspect the existing authority, and obtain owner approval before changing scope or publishing.

### Identity and visual authority

- **Loptr Lab** is the site masthead. **Dominique** is the creator and founder, never presented as PIXIE or an operating system. Meet Dominique concisely covers *why she created the ecosystem, what it represents, and how she directs/uses AI*, citing actual repo evidence.
- Each project retains its brand and canon authority. The shared portfolio uses the owner-approved **galactic charcoal, muted plum and lilac** palette, complementary rather than identical to Made-Sick's own palette.
- One authoritative portfolio stylesheet: \`assets/portfolio-foundation.css\`. Its tokens control type scale, contrast, line height, width, gutters, section and heading spacing, focus, navigation and responsive behavior. Check the actual cascade first; **remove the conflicting rule instead of appending another override or changing per-page CSS**. Page markup must not duplicate navigation or define local global style rules.
- Use Made-Sick's existing \`styles.css\` for design-system discipline (tokens, reset, components, focus treatment), **not as a wholesale color or layout replacement**.
- Readable type (body at least 18px, line height at least 1.5), WCAG AA contrast (4.5:1 normal, 3:1 large), visible keyboard focus, 200% zoom/reflow, reduced motion, and iPad and keyboard acceptance are mandatory. No wasted right-side content column or unbalanced missing-image placeholder.

### Procedure for every ecosystem change (human, AI, or PIXIE)

1. **Recover context first.** Read the latest canonical ecosystem architecture, this standard, the owner's current request, existing project status, prior decisions and GitHub source. Search current repositories, pages, CSS, issues, branches and public destinations before proposing any new artifact. Avoid re-asking settled questions.
2. **Define the problem and source authority.** Name the actual user-facing defect, affected repositories/pages, owners, constraints and current release evidence. Distinguish confirmed facts, proposals and unknowns. Do not infer missing from a 404, a failed search or an authentication blocker.
3. **Prefer the smallest solution.** Reuse an existing page, component, stylesheet, tool, workflow or task. Single responsibility; clear descriptive names; short coherent functions; no magic constants, duplicated logic, needless abstractions, dead code, unexplained flags or unapproved dependency/hosting additions. Preserve privacy and intellectual provenance.
4. **Fix root causes.** Diagnose cascade, routing, data and navigation failures before patches. Never stack \`!important\` rules or page-local CSS as a workaround. Separate content revisions from global design changes when practical. Keep changes scoped and reviewable.
5. **Test what users actually do.** Run existing unit/integration/regression checks; check URLs, missing assets, one navigation and one site-owned CSS reference, HTML semantics, focus order, keyboard/screen-reader, reflow, contrast and physical iPad where possible. Deploy exact source to an existing preview only when warranted. HTTP 200 or Vercel READY **is not visual acceptance**. If preview or connection access fails, stop retrying and report the blocker.
6. **Report before publish.** State exact diff, evidence, unresolved limitations, affected routes and rollback plan. Obtain explicit owner approval before merge, production push, domain change, deleting legacy hosted material or publishing externally. Never say deployed, tested or deleted without evidence.
7. **Leave maintainable evidence.** Record a concise decision, tests, dated checkpoint and owner acceptance in the owning issue/PR/repo. Keep cross-chat continuity anchored in repository records, not an assistant's recollection alone.

### Stop conditions

Do not proceed to publication if the target URL is inaccessible, the owning source cannot be confirmed, a new page duplicates an existing route, a broken image remains, accessible interaction is untested, the CSS cascade is inconsistent, a preview quota/authorization block remains, or owner acceptance is outstanding. Report partial completion without inventing success.

### Reading basis (guidance, not a substitute for tests)

- [Codacy — What Is Clean Code?](https://blog.codacy.com/what-is-clean-code)
- [wojteklu — Summary of Clean Code](https://gist.github.com/wojteklu/73c6914cc446146b8b533c0988cf8d29)
- [freeCodeCamp — How to Write Clean Code](https://www.freecodecamp.org/news/how-to-write-clean-code/)

These resources inform simplicity, clarity, naming, single responsibility, dry/single source of truth, root-cause fixes, maintainable structure and repeatable tests. They are guidelines rather than a claim of formal code certification.
