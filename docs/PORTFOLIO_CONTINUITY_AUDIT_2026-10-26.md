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

## Compliance reconciliation — 26 October 2026, local review only

### Source and preservation record

The existing review branch `review/portfolio-continuity-audit-2026-10-26` was
read at `5ecd1c71aefa2e69bf235fb15d67a6e0421d3299`. GitHub comparison reports
91 commits ahead of main, zero behind; main/merge base is
`7e87894067975477af4f9aecf6d4f76781652b33`. The continuity audit and foundation
stylesheet already exist on the review branch; the audit was not retrieved from
main. This is not evidence of loss. No duplicate guide or CSS architecture was added.

Public Git transport from this executor failed to connect to its proxy. It was
not retried. Connected GitHub reads supplied the pinned text sources for an
isolated local review snapshot. The snapshot is not the repository's full history;
its local Git commits must not replace or be pushed over the upstream branch.
Apply only the bounded correction patch to the reviewed upstream revision after
owner approval and a fresh branch comparison. No existing Companion or guide
checkout, archive, checkpoint, Sites source or Tangled ref was changed.

### Phase A — findings and correction boundary

| Repository / application | Authority and implementation | Confirmed finding / standard | Severity | Smallest correction / tests | Unverified or blocked |
| --- | --- | --- | --- | --- | --- |
| Portfolio, `ibloud/ibloud.github.io` | Existing review branch, 24 HTML pages and `assets/portfolio-foundation.css` | Malformed `@scope` blocks, duplicate legacy CSS, competing theme/type/width rules and Tailwind runtime styling contradict one authoritative cascade | High | Repair foundation; replace presentation utilities with shared components; validate every page, CSS loading, contrast, zoom/reflow and keyboard | Exact-source Vercel, physical iPad/Safari and screen reader acceptance |
| Portfolio navigation | Same source | Story-process page retained a different primary menu; accountability case study had only a breadcrumb; some pages lacked a usable shared skip target | High | One five-destination header, current-page state and working skip-to-main on all pages | External destinations' complete journeys not exercised |
| Portfolio collaboration | Existing page and Training workflow | Text said GitHub records accepted work and ended with email intake as the general contribution route | Medium | Separate submission from acceptance; point open contributions through Training/PIXIE; retain email for private commissions | Maintainer acceptance and independent onboarding |
| PIXIE installed guidance | Connected installed skill plus repository skill | Installed skill lacks the review branch's Mandatory clean-change section | High | Prepare existing repository guidance for a separately authorized plugin release; do not claim repository changes update installed guidance | Plugin search did not return an exact editable PIXIE ID/release; no guarded release update possible here |
| Companion backend | Existing Sites source; complete backend GitHub authority unresolved | An explicit source dependency, not an absent application or a development task | High dependency | Record boundary; preserve current sources and checkpoints | No source reconstruction, authentication retry or migration authorized |
| Public PIXIE guide | `Loptr-Lab/pixie-ecosystem-guide` | Existing hosting notes describe both setup blocker and deployed status; dated records need reconciliation | Medium | Mark superseded observations after current route evidence; retain guide's existing role | No fresh live hosting acceptance; unchanged |
| Training | `Loptr-Lab/training`, with a second publication inside engine repository | Two instructional publications declare different canonical URLs | Medium | Owner-reviewed publication responsibility and route equivalence before any redirect | No redirect or repository change performed |
| Made-Sick | `ibloud/made-sick`; shared stylesheet and resource contract | Existing resource owner already reused by Companion; demo loader and visible link use different published aliases | Medium routing | Verify one existing destination before changing both references; retain direct link fallback | Alias failure not established; no page/runtime changes |
| 50 Ways | `ibloud/50-ways-to-leave-another`; existing assets/site.css and preservation rules | Separate creative/rights-learning role is legitimate; multiple CSS files warrant scoped migration inspection, not replacement | Investigate | Preserve approved artwork/type/palette; use existing generation checks for any later document edit | No identity/CSS changes or legal-clearance claim |
| Creator OS / Holdings / Device Stewardship | Their respective existing repositories | Distinct local preparation, synthetic game and stewardship research; shared PIXIE name is not duplicate implementation | Keep | Clarify destination labels where needed; retain current boundaries and local privacy controls | Physical-device/service acceptance remains separate |
| Duet / engine / other creative works | Owning repositories and local canon policies | Review/play routes and descriptions are dated; no evidence warrants merging games or story canon | Investigate routes / Keep identities | Confirm current play route and stage before redirecting; preserve original histories | No fresh gameplay or external hosting acceptance |

Fresh source checks included Made-Sick AGENTS/styles, guide README, Training README,
50 Ways AGENTS/README, Device Stewardship CONTRIBUTING, Creator OS README,
Holdings README and Duet README. These are source evidence, not new live acceptance.
The prior brand and consolidation audits remain supporting assessments; their
unapproved recommendations were not silently promoted into policy.

### Phase B — bounded local corrections

Root cause: moving legacy declarations into one file without a valid, simplified
cascade left themes and layout authorities competing. Tailwind's network-generated
styles remained a second presentation authority. Fixing isolated margins would
retain that cause.

Changed files: the existing foundation stylesheet, all 24 existing HTML pages,
this audit and the canonical architecture's source-governance boundary. Added
`tools/check_portfolio.py` because no portfolio-wide contract check existed in the
inspected tree. It uses Python's standard library and adds no runtime dependency.

- Removed malformed/repeated scoped rules, runtime Tailwind setup, external font
  stylesheet dependencies and competing page presentation utilities.
- Kept the approved charcoal/plum/lilac direction and original content/routes.
  Shared tokens own body type, line height, gutters, width, section/heading gaps,
  panels, links, navigation, focus and responsive grids. No product palette changed.
- Kept one common header with Meet Dominique, Ecosystem, Research proposal,
  Collaborate, Provenance & AI. Each page has one navigation and main landmark,
  one h1, and a keyboard-focusable main skip destination.
- Retained the historic case-study anchor. Added table column-header semantics
  where a table's first row previously used only data cells.
- Aligned homepage social metadata with its existing founder description.
- Clarified the existing public contribution route without adding intake forms.
- Recorded complete Companion backend GitHub authority as an unresolved dependency,
  not a reconstruction, migration or source-identification assignment.

### Verification performed on this correction

- `python3 tools/check_portfolio.py`: PASS, 24 pages; one shared stylesheet,
  consistent five-link navigation, landmarks, IDs, local files and fragments.
- `git diff --check`: PASS. All original visible prose was compared through DOM
  text extraction: only the two intended collaboration paragraphs changed.
- Local Chromium: 96 page/viewport states, all 24 pages at 1440, 820, 390 and
  320 CSS pixels. No document horizontal overflow, missing rendered images,
  incorrect stylesheet counts or navigation targets below 44px were detected.
- Automated solid-color visible-text contrast scan on all 24 pages: minimum
  6.05:1, with size/weight-dependent WCAG AA thresholds checked. This does not
  certify every non-text, visited-link, platform or assistive-technology state.
- Keyboard Tab/Enter skip focus reached main on every page; no heading-level
  skips or tables without header cells detected. Focus outline is visible.
- Reduced motion computes to non-smooth scrolling. Runtime mutation of the shared
  section token changed actual section padding from 26.4px to 61px.
- Root text enlarged to 200% at a 720px viewport: no document horizontal overflow
  on the 24 pages. This is a text-size/reflow simulation, not native Safari zoom.
- Founder → ecosystem → collaborate navigation exercised locally; contributor CTA
  points at the established Training URL. It was not submitted or used to create
  an issue. External enquiry/checkpoint/game acceptance was not simulated as live.
- Screenshots captured at desktop/tablet/narrow widths; representative founder,
  ecosystem and collaboration full-page renders were visually inspected.

Local browser scripts/results/screenshots are review evidence, not deployment
receipts. Physical iPad Safari/Files, VoiceOver, a desktop screen reader and an
independent contributor remain NOT TESTED. No claim of full WCAG compliance.

### Installed plugin and preview status

Installed PIXIE `list_projects` returned the v0.5, 13-project catalog with separate
website/plugin authentication and no formal membership or synchronized progress.
The installed skill retrieved in this audit does not contain the new clean-change
section present in this review branch. The catalog version does not establish
plugin package version or instruction-release parity. No exact editable PIXIE
plugin/release ID was returned by plugin discovery; no plugin mutation occurred.

The existing Vercel project `ibloud.github.io` was found at
`prj_MEaTGokQ30LUnWnkLUhWlipdkK59`. SSO protects deployments except custom domains;
password-protection configuration is also present. The latest listed READY preview
is `dpl_EEozB8hPc4FL62An3rUZ4dx77ab1`, source
`d78f2cc849830acb78c53ae530ce2ef9352d47d2`, not this correction. READY is not visual
acceptance. No preview build, quota-consuming deployment or authentication retry
was requested. Quota availability was not established and must be checked before
any separately authorized preview.

### Publication gate and rollback

Portfolio: local source checks PASS; publication readiness FAIL/PENDING because
exact-source preview, manual accessibility checks and owner acceptance remain open.
PIXIE plugin: FAIL/PENDING release parity and exact editable release identity.
Other ecosystem projects: unchanged; NOT newly release-certified by this audit.

The correction commit and patch are local review artifacts. Do not push the
snapshot history. After approval, recheck upstream, apply the correction diff on
the existing review branch, run the checks and inspect exact-source preview.
Rollback is reversal of that isolated correction patch/commit, not resetting to
main or deleting earlier review-branch work. Opening a remote PR or pushing the
branch may trigger preview automation and therefore remains a separate authorized
external action. Merge, production, DNS, source migrations and synchronization
remain prohibited without explicit owner approval.

### Connected Companion checks during this audit

The installed `prepare_checkpoint` tool returned a fictional Training checkpoint
as `draft — not submitted`, with the selected project's GitHub issue URL and
explicit public visibility/review requirements. Nothing was submitted. The installed
`resume_checkpoint` read the existing Training issue 42 without an error or comments
warning at `2026-10-26T18:10:51.259Z`; its reported issue update was
`2026-10-18T17:35:58Z`. This verifies those two connected calls, not all participant
access paths, public installation, new skill loading or resolution of earlier
local-workerd source retrieval failures. No issue, comment or message was posted.
