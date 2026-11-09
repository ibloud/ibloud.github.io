# IBLoud serialized-fiction pitch — review record, 9 November 2026

## Existing work and source authority

Implementation home: `ibloud/ibloud.github.io`, branch `feat/wattpad-story-pitch`,
from `main` at `be53b9d13b033cd84817b78ca0b822bdb3055f15`. The existing Pages API
identifies `main` / root at `https://ibloud.github.io/`, no CNAME. The existing
Vercel integration supplies PR previews. No routing, hosting or Wattpad publication
change is included. PR #51's public testing feature is already in this base;
its later unmerged branch work was not copied into this task.

Read before implementation: `docs/ECOSYSTEM_ARCHITECTURE.md`,
`docs/HISTORICAL_TIMELINE.md`, `docs/IP_AND_RIGHTS_MATRIX.md`, root README,
`docs/PORTFOLIO_CONTINUITY_AUDIT_2026-10-26.md`, Story Lab and Violet portfolio
entries, shared foundation/theme, established 50 Ways pitch CSS and current
portfolio checker. No AGENTS.md exists in this repository/worktree. Existing
open PRs #10, #21 and #41 cover other work; no matching story-pitch PR was found.
Local and connected GitHub searches found no checked-in `deaths_daughter_manga.html`.
The existing artifact was located in Drive; unretrieved local source was not
called lost. A new pitch page is needed because no existing proposed-series
pitch was found. Existing route, navigation, source boundaries and assets are reused.

The six-step editorial structure follows the user's supplied Pitch My Project
reference summary: elevator pitch, original visuals, creator/studio introduction,
concise presentation, testing method and reader/development questions. The
external reference itself was not supplied/retrieved; no independent review of
its articles is claimed.

## Manuscript sources actually retrieved

Connected Drive reads retrieved the exact three documents named in the brief:

- **At a Glance: The Diary of Death's Daughter Manga** — metadata created and
  modified 6 May 2026. Source of the five origin chapters and mythic premise.
- **The Daughter's Curriculum** — metadata created and modified 29 June 2026.
  Source of the five separate lessons and existing first-person diary voice.
- **Death's Daughter — Full Story Arc & Continuity Map** — metadata created and
  modified 24 July 2026. Distinguishes origin myth, curriculum, contemporary
  telling and standalone film.
- **deaths_daughter_manga.html** — the original HTML artifact was retrieved in
  Drive. Metadata reports creation 3 May and modification 22 April 2026. These
  differing metadata dates are not promoted into a verified authorship chronology.
  The file contains inline SVG drawings and no external image elements.

The supplied exact Drive links were used internally. Retrieved permission metadata
lists owner permissions only, without a public/anyone grant. Sharing was not
changed. The public pitch does not link to or embed those private documents,
copy the full manga, or publish private correspondence/agreements. Only the
selected cover SVG and two short diary passages requested by the brief are used
for the review. Their rights/credit remain subject to owner review; Drive ownership
and file dates do not establish sole authorship or completed chain of title.

## Preserved narrative and rights boundaries

The five origin chapters remain Satan's Fury; The Serpent of Old; Death's Daughter
is Born; The Flaming Sword; The Journey of the Flame. The five curriculum lessons
remain a separate structure, not a forced chapter-by-lesson mapping. The two
quotes are verbatim selections from entries 2 and 4, labeled as existing development
excerpts. New elevator/pitch prose is AI-assisted editorial proposal for Dominique,
not new accepted canon, a chapter publication or a verified market result.

The continuity map's descriptions of “actual” game mechanics and “proven” structure
are not promoted into current implementation/market evidence. Veiled Dominion's
own sources retain rules authority. The film stays a standalone reimagining,
not an accepted manga sequel. Thematic links do not create literal crossovers.

The canonical rights matrix's distinctions remain intact: claimed original
materials, transformative fan archives, third-party inspiration, proposed
adaptations, accepted canon and unresolved clearance. It does not yet classify
this proposed serial separately; this page follows the owner's proposed-original
brief without silently adding a rights determination to the matrix. No franchise
art, music, recordings, lyrics or performer likeness is imported. Violet and
50 Ways pitch files/styles are unchanged. Succession planning is an objective,
not an executed legal arrangement. Creator accounts about Lady Violet and the
Ren-inspired adaptation are labeled uncorroborated; no approval, private statements,
motives, endorsement or shared IP is claimed.

## Historical evidence and link validation

The supplied brief reports screenshots dated 9 November 2026 showing IBLoud /
I.B. Loud, member since 5 April 2016, 11 works, 18 followers and two reading lists.
The screenshots themselves are not attached to this task. The page explicitly
labels the figures as supplied historical observations, not independently
inspected screenshots or current statistics.

The exact existing Wattpad profile URL comes from the brief. One HTTPS request
was blocked by the environment's outbound proxy (CONNECT 403); it is an access
limit, not evidence that the account is missing. No individual catalog title or
story destination was independently verified, so the titles appear as supplied
catalog examples without individual links. No fictitious Wattpad serial URL exists.
The secondary action is the real `#series` section, labeled Series in development.

Local destinations and fragments pass the portfolio checker. Story Lab, Violet
and Veiled Dominion reuse existing portfolio entries. Urban Alien Adventures
links to the canonical architecture's existing Discovery architecture section.
The timeline, rights and process sources exist in the owning repository; live
external-page acceptance is not inferred from source retrieval.

The separate Story Finder retrieval of older `ibloud.xyz` posts remains pending.
The `#historical-posts` section is ready for later verified source links without
rebuilding this page. No social URL, quotation or publication date is invented;
this is not an exhaustive archive. Retrieval does not block this review PR.

## Design, verification and release

The new page uses the existing `/ecosystem/projects/` architecture, shared
navigation/theme, `.ll-panel`, `.grid.two`, `.card`, `.ll-actions` and
`.ll-primary-link` patterns. Scoped `.story-pitch` rules extend only the shared
foundation. The existing licensed local Fraunces font is reused; no font network
request, dependency stack, separate design system, database, tracker or signup.
The cover SVG is extracted from the existing artifact, with accessible title/desc
added. External fonts, embedded source scripts, animation and manga page CSS are
not imported. The selected image is described in HTML and remains readable on
both palettes. Existing Violet project-specific styling is preserved.

Checks:

- `python3 tools/check_portfolio.py`: 31 pages pass navigation, shared stylesheets,
  landmarks, IDs, local destinations and fragments.
- `node --test tests/public-records.test.mjs`: existing ten unit tests pass.
- `NODE_PATH=<isolated-tools>/node_modules node tools/test_story_pitch.cjs`:
  Chromium content/source-boundary checks, loaded local cover, no external
  requests, theme control, keyboard skip/Tab/Enter/focus and no-JavaScript content
  pass. Axe WCAG A/AA and reflow pass at 320/768/1024/1440 CSS pixels in both
  themes; 200% text at 320px and reduced motion pass. Desktop/mobile screenshots
  inspected. These are automated Chromium checks, not physical iPad Safari or
  VoiceOver acceptance.
- Existing `tools/test_public_records_browser.cjs` regression suite passes
  against the same checkout. No public-reader or OAuth code is changed.
- `git diff --check` and JavaScript syntax check pass. This site publishes static
  source directly; no application build or runtime package installation is needed.
- The existing PR workflow now runs the pitch checks as well as public-reader
  checks. Tests use isolated, already pinned Playwright/axe tools, not website
  runtime dependencies. Current-head CI and preview evidence belong in the PR.

Reproduce browser tests by serving this checkout on port 4174 with Python's
static server. Set `TEST_BASE` for another port/origin and `CHROMIUM_PATH` for
another installed Chromium. `NODE_PATH` points to the isolated test packages.

No automatic main merge or production release, Wattpad login/chapter publication,
Google Drive sharing, DNS change or new recurring paid service. The preview is
for owner review under the brief's explicit authorization. Remaining review:
voice/canon/selected-source permissions, screenshot and catalog corroboration,
physical iPad Safari/VoiceOver and preview browser acceptance. Historical post
recovery is an independent evidence follow-up. No new hosting costs proposed;
normal existing CI/preview quotas apply.

## Exact files

- `ecosystem/projects/deaths-daughter/index.html` — editorial pitch and source/status boundaries.
- `assets/deaths-daughter-cover.svg` — selected existing source cover, accessible metadata added.
- `assets/portfolio-foundation.css` — scoped editorial styling using existing tokens/font.
- `ecosystem/index.html` — one relevant creative-work entry link.
- `sitemap.xml` — proposed project's existing-domain route.
- `tools/test_story_pitch.cjs` — content, keyboard, reflow and accessibility checks.
- `.github/workflows/public-records.yml` — run pitch checks in the existing workflow.
- `docs/WATTPAD_STORY_PITCH_REVIEW.md` — this source and verification record.
