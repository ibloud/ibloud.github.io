# Public interoperability test — 9 November 2026

## Source and routing checked before editing

- Existing `https://ecosystem.loptrlab.com/` returned HTTP 301 to
  `https://ibloud.github.io/ecosystem/`. The redirect target is blocked by this
  executor's outbound policy, not demonstrated unavailable to visitors.
- GitHub repository and Pages APIs identify `ibloud/ibloud.github.io`, public
  Pages at `https://ibloud.github.io/`, HTTPS enforced, `main` branch, root path,
  legacy build. No CNAME is configured there. Source base: `ae0bf507ae3822ff3d039c1c28c8722873fd0951`.
- Existing open portfolio PRs #10, #21 and #41 were inspected by title/scope;
  no matching HappyProto/HappyView implementation PR or issue was found.
  #21 is explicitly a reference-only earlier routing proposal; it is not merged.
- Read the current [canonical architecture](ECOSYSTEM_ARCHITECTURE.md),
  [existing release protocol](https://github.com/ibloud/ibloud.github.io/blob/review/portfolio-continuity-audit-2026-10-26/docs/PORTFOLIO_CONTINUITY_AUDIT_2026-10-26.md),
  root README, ecosystem page, foundation/theme, portfolio checker, and existing
  50 Ways PIXIE launcher. No local AGENTS.md exists in this owning repository.
- Read PIXIE [OAuth PR #12](https://github.com/Loptr-Lab/pixie-ecosystem-guide/pull/12)
  and its discussion: disabled candidate `0410caf39b17537cbae368071288f50b2bed0764`;
  independent security/policy review, callback/client verification, state/key
  initialization, backup/restore and approved rollout/live acceptance remain held.
  Its 96 passing candidate tests are prior evidence, not tests rerun by this work.
- Read Made-Sick's `PRIVACY.md`, `docs/ATPROTO_JOIN.md`, `docs/STORY_SHARING.md`,
  `docs/story-finder-retrieval.md` and existing PIXIE launcher. Public reading is
  separate from directory enrollment, story-feature permission, private contact,
  OAuth and record publishing. No Made-Sick, Companion or Tangled source changed.
- Searched the available guide, Companion, portfolio and Made-Sick source for
  HappyProto/HappyView configuration; none was found. Environment status reports
  no configured secrets or runtime variables. This does not establish that the
  owner has no installation elsewhere.

## Reused surface and precise addition

Extend the existing ecosystem page at `/ecosystem/#public-test`: an opt-in,
read-only public-record test and feedback reader. No new page, domain, runtime,
database, schema, identity service or production dependency. The persistent
PIXIE link reuses the existing portfolio launcher class, sigil and destination;
contextual guidance uses native details/summary. All styling stays in the shared
foundation and is scoped to this page/test. Violet and 50 Ways pitch source/CSS
remain unchanged.

The source account is `did:plc:o6kuv3yieti2vqrb7ckmd5vg`. On each requested page,
resolve its PLC document and require its PDS service to match the reviewed
`https://eurosky.social` endpoint. Then call the standard public
[`com.atproto.repo.listRecords`](https://github.com/bluesky-social/atproto/blob/main/lexicons/com/atproto/repo/listRecords.json)
query for `app.bsky.feed.post`, five records per page, newest record keys first.
DID, record URI, collection, CID, author timestamp and original post link are
preserved. The text is not a directory feature, an endorsement or evidence that
any separate index agrees. No media/embeds or quoted authors' records are loaded.

[Issue #50](https://github.com/ibloud/ibloud.github.io/issues/50) is the canonical
public implementation/feedback thread. Explicit visitor action loads its
published comments through GitHub's documented public issue-comments REST API.
External submission happens on GitHub under the visitor's account; there is no
local comment form or credential collection. Bodies render as plain text,
without HTML, Markdown, images or automatically activated links. Original comment
links and abuse-report instructions remain available. Private vulnerability
reporting is disabled on this repository; use its existing maintainer contact
route to arrange a private channel before sharing sensitive details.

Reads omit credentials, referrers and persistent caching, time out after 12
seconds, and reject redirects. Pagination is bounded to ten pages, deduplicates
URIs, detects repeated cursors and validates record/comment shape. Reload replaces
previous pages so edits and deletion can be reflected; failures clear previous
results. Five-minute warnings mark snapshots stale without background requests.
No content is saved in browser storage or on a server. Providers still receive
ordinary connection data; the existing optional theme preference is unaffected.

## HappyView connection: pending

The HappyProto/HappyView domains are blocked by the environment's outbound policy.
The public [HappyView repository](https://github.com/gamesgamesgamesgamesgames/happyview)
was retrieved at `9f084f5cfbeebf1f2364f169bf7c0511351c658c`. Its
`packages/docs/content/docs/getting-started/authentication.md` requires registered
client identification for XRPC queries. `getting-started/quickstart.md` describes
instance-specific query lexicons/scripts, not a universal public records API.

No service URL, query schema, public-client registration, origin/CORS acceptance
or successful live provider response is verified. No invented endpoint or
fixture is represented as HappyView. Selecting and registering an existing
instance, if one exists, requires its actual configuration and review. Creating
new paid infrastructure is outside this change. HappyProto authentication,
experimental private Spaces and PIXIE OAuth retain separate verification gates.

## Verification

- `node --test tests/public-records.test.mjs`: 10/10 passing. Attribution,
  malformed records/JSON/cursors, wrong-author/unsafe URLs, deduplication,
  GET/credential/referrer/cache boundaries, provider/rate errors, pinned PDS,
  pagination, validated comments and explicitly pending HappyView.
- `NODE_PATH=<isolated-test-tools>/node_modules node tools/test_public_records_browser.cjs`:
  passing Chromium fixture tests for user-triggered fetches, plain-text injection
  handling, pagination/repeated cursor, deletion, failures, stale warning,
  keyboard Tab/Enter and PIXIE navigation. Fixtures are test evidence only.
- Same browser run: axe WCAG A/AA checks and no horizontal overflow at 320, 768,
  1024 and 1440 CSS pixels, both light and dark themes (eight checks); 200% text
  at 320px and reduced-motion checks pass. Screenshots visually inspected at
  320px and 1440px. This is Chromium, not Safari/VoiceOver or physical iPad testing.
- Local Chromium with the environment's supplied proxy CA explicitly trusted:
  `NODE_PATH=<isolated-test-tools>/node_modules node tools/test_public_records_live.cjs`
  verified real PLC resolution, five live Eurosky records and a second page; GitHub issue #50
  comments endpoint returned a valid empty list. This is a local page with live
  services, not a public deployed integration or live HappyView verification.
- `python3 tools/check_portfolio.py`: 30/30 pages pass. Baseline incorrectly
  rejected the established second stylesheet on three 50 Ways pitch pages.
  The checker now permits precisely those three existing foundation + pitch
  stylesheet sequences, while retaining strict checks elsewhere. No pitch file
  was modified to satisfy the checker.
- `node --check assets/public-records.mjs` and `git diff --check`: pass.
- Added read-only PR CI for unit, portfolio and browser/accessibility tests.
  Test dependencies are isolated, version-pinned Playwright 1.65.0 and
  @axe-core/playwright 4.14.0; they are not website dependencies. No bundler/build
  is needed: this repository publishes the checked static source directly.

Reproduce browser checks by serving this repository with
`python3 -m http.server 4173 --bind 127.0.0.1`, installing the two test packages
in a separate user-owned test directory, and setting `NODE_PATH` accordingly.
`CHROMIUM_PATH` optionally selects the test executable (default `/usr/bin/chromium`).
CI installs its own Chromium. Public network fixtures are intercepted only in
fixture tests; live observations above used actual services.

## Release boundary and remaining acceptance

No merge, production deployment, DNS/domain/PDS changes, provider registration,
paid service, plugin release, mirror activation or private record integration.
No recurring paid operational cost proposed; existing GitHub Actions quota and
public-provider limits apply. The existing Pages destination remains unchanged.

The source-linked release protocol says: “Do not proceed to publication if the
target URL is inaccessible” and “Obtain explicit owner approval before merge,
production push”. Therefore leave the isolated, deployable PR for review until
outbound access permits exact-source preview/target checks and owner acceptance.
This hold is specific to publication; it does not depend on HappyProto auth,
private Spaces or OAuth PR #12 being completed.

Public preview: none verified. Production target after accepted release:
`https://ibloud.github.io/ecosystem/#public-test` (existing domain redirect also
preserved). This target is not a claim that this change is deployed. Remaining:
exact-source preview, live public module/CORS/source/feedback checks, independent
physical iPad Safari/VoiceOver acceptance and owner release review. Branch
protection/Actions permission administration could not be read with this app
connection; no settings were changed.

Rollback after an authorized release: revert this isolated implementation commit
through the existing review/Pages process. No data migration or provider rollback
is necessary because the feature writes no participant records.
