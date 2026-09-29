# AT Protocol: Ecosystem Interoperability Review

**Status:** Gap-filling architecture proposal for human comment and review.  
**Date:** 2026-09-29  
**Authority:** Supplements [the ecosystem map](ECOSYSTEM_ARCHITECTURE.md); destination repositories retain implementation and canon authority.

This note makes missing boundaries explicit in the existing ecosystem. It creates no implementation commitment, release requirement, hosting service, or claim that an integration is already working. PIXIE can steward an experience while a person retains a portable identity and public records outside PIXIE.

## Where this fits

| Existing ecosystem surface | Gap this proposal addresses | Proposed boundary |
|---|---|---|
| PIXIE publishing, device stewardship, and Creator OS | Distinguish commentary, private application state, and portable public records | Publishing remains commentary; stewardship may consume selected public records. Release 1 gains no AT dependency |
| Made Sick | Explain voluntary public discovery and resource attribution | Opt-in directory/resource references; confidential support and health information stay private |
| Germ Network | Explain the external messaging relationship | Germ is an independently operated encrypted messaging service with AT identity integration, not a Loptr-owned app or PDS |
| DUET / Veiled Dominion | Separate identity and published artifacts from game authority | Optional future public identity, achievements, attribution, or lore references; core gameplay remains independent |
| Loptr Lab / Urban Alien Adventures | Connect distributed discovery with ownership and provenance | Public artifact references may be portable; repository rights and canon processes remain authoritative |

A **Loptr-hosted PDS** is a distinct future feasibility proposal. Calling it a “Germ PDS” would imply ownership or partnership that has not been established. Any proposed Germ integration must respect its documented capabilities and receive separate review; we do not assume a messaging API, message export, or PIXIE access to private chats.

## Component responsibilities

| Component | Technical role | Proposed ecosystem use |
|---|---|---|
| Existing AT identity and PDS provider | Identity/account management and signed repository hosting | First candidate for a later, scoped portability test |
| AT OAuth | Application authentication and authorization | Explicit user authorization; review permissions before selecting any SDK or scope |
| Lexicon | Schema for records and APIs | Prefer a compatible existing schema; create a versioned custom schema only for a demonstrated gap |
| Tap | Repository backfill, verification, filtering, and live synchronization | Later bounded experiment using an explicit DID/collection allowlist |
| Loptr index | Application interpretation of selected records | Derived discovery view, not canonical user data or automatic PIXIE memory |
| Self-hosted PDS | Account/repository hosting with operational responsibilities | Later feasibility review, initially isolated test accounts |
| Relay | Forward repository events across the network | No present requirement to operate one; use existing infrastructure |
| AppView | Application-specific aggregation and presentation | Reconsider only when measured product requirements justify it |

Tap is a synchronization tool; building a derived index still creates application responsibilities. “No full AppView deployment” does not mean that indexing, moderation, deletion, or operating costs disappear. Public repository signatures establish protocol integrity, not truth, authorship rights, consent, or human qualification.

## Data placement before schema design

| Record candidate | Default placement | Review needed |
|---|---|---|
| Public creator metadata, artifact links, provenance references, resource listings | Candidate public portable record | Purpose, rights, compatible schema, and explicit publication choice |
| Public achievements or lore contributions | Candidate only | Voluntary publication; no private telemetry; destination canon approval |
| Participation and playtest evidence | Private by default | Publish only a separately chosen minimal public artifact; avoid exposing health/community affiliation |
| Consent receipts and human-review evidence | Access-controlled governance storage | Do not publish identity-linked consent trails merely for portability |
| Private conversations, therapy/health material, benefits/financial records, credentials, sensitive relationships | Private storage appropriate to the service | Excluded from public repositories and Tap ingestion |
| Device-local story state, reminders, recovery data, unpublished drafts | Local/private by default | Export and recovery remain local product concerns |

A PDS can also support service-private state; this proposal concerns **public synchronized repository records**, not a promise that everything stored by a PDS is public or that it provides private health storage.

Self-hosting does not make public repository records confidential. Consent to use PIXIE or Made Sick does not authorize publication. Authentication does not imply permission to access Germ conversations.

Updates/deletions must propagate to Loptr-controlled indexes and caches under a documented policy. Withdrawal can stop our ingestion and remove our derived copies; it cannot guarantee erasure of independently retained public copies. Publication explanations and review evidence must state that limit.

## Review progression, not a build schedule

| Stage | Gap to resolve | Evidence needed before a separate implementation decision |
|---|---|---|
| 0 — Current documentation review | Shared boundaries and ownership | Human comments on this note, data classification, candidate record purpose, and unresolved risks |
| 1 — Existing-account feasibility | Minimal authorization and portable record | One chosen schema; sign-in/revocation; read/write/update/delete; accessible user-controlled publication; failure handling |
| 2 — Bounded Tap feasibility | Selected discovery without uncontrolled collection | Allowlist; backfill/live ordering; delete and account-status handling; retention; cost ceiling; outage/recovery; no automatic memory |
| 3 — Interoperability pilot | Independence from a single client | A second compatible consumer; departure/revocation; no proprietary dependence for reading the chosen public record |
| 4 — PDS feasibility | Identity hosting and operator exit | Migration, recovery, administrator handoff, costs, shutdown plan, and human governance review |
| 5 — Application infrastructure decision | Whether a dedicated AppView is justified | Actual query, scale, moderation, reliability, and staffing requirements |

No stage is passed by this document. The current action is Stage 0 only. No implementation issue or deployment is requested.

## Portability and operating evidence

Before proposing a hosted PDS for another person, document an exit test that preserves the DID and chosen records after moving between independently operated PDSes. Check records, referenced blobs, handle/domain resolution, authorization behavior, and the derived index. Test migration separately from backups and restoration; a repository export alone is not proof of a complete account migration or identity recovery.

Assign responsibility for signing/rotation keys, recovery access, DNS/domain renewal, security updates, backups, abuse reports, account lifecycle, and service shutdown. Record operating costs and administrator unavailability procedures. Use separate PDS/application domains if both are eventually operated.

Before public community discovery, define reporting, blocking, labeling where applicable, impersonation/harassment response, appeals, and accountable human decisions. External service moderation and Loptr index moderation are different responsibilities.

## Human governance gate: LOCKED

The existing gate remains locked until a **proper, qualified second human administrator has actually been added to the relevant repository**. A discussion participant, Discord DM, GitHub profile, AI-generated recommendation, unaccepted invitation, or comment on this draft does not satisfy that condition.

Qualification must be reviewed by the responsible human against the repository's applicable governance policy, with evidence of account continuity, relevant review contributions, acceptance of the role, appropriate repository access, and ability to challenge decisions and participate in handoff/recovery. A profile is supporting evidence, not sufficient proof of suitability.

Record qualification, accepted access, responsibilities, and the gate decision in the appropriate governance record without publishing private discussion evidence. This note neither grants access nor declares qualification. Meeting the second-admin condition is necessary; it does not automatically approve PDS operations or advance every stage.

## Questions for human comment

1. Which existing object needs portability, and what second application would use it?
2. Which existing Lexicon already covers it? What precise gap warrants a custom one?
3. Which data or inferred affiliations must never be published?
4. Is Tap justified for that use case, or would direct selected reads be sufficient?
5. What does withdrawal remove from our systems, and how will we explain retained public copies?
6. Which migration/recovery failure would prevent a PDS pilot from advancing?
7. Who owns moderation, costs, incident response, and operator handoff?
8. Is any dependency or ownership claim still ambiguous?

Comment on the documentation pull request with the section, proposed correction, reason, and supporting evidence. Comments inform a human decision; silence and automated checks are not approval.

## Sources and proposal boundaries

Technical references checked 2026-09-29:

- [AT Protocol self-hosting](https://atproto.com/guides/self-hosting): PDS, Tap, Relay, AppView, and separate deployment domains.
- [The AT stack](https://atproto.com/guides/the-at-stack): account responsibilities, synchronization, Tap filtering, and migration.
- [AT authentication](https://atproto.com/guides/auth): OAuth guidance.
- [Germ's usage documentation](https://www.germnetwork.com/using-germ-dm): external encrypted messaging and AT identity integration.

The ecosystem placement, data exclusions, staged evidence, and governance conditions above are **Loptr review proposals and existing user constraints**, not requirements imposed by AT Protocol or Germ.

**AI assistance:** This draft was structured and edited with AI assistance from Dominique's instructions and the cited technical references. Qualified human review is pending.
