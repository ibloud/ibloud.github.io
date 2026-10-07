# Project discovery review — 7 October 2026

The central directory is /ecosystem/. Each listed project has a /ecosystem/projects/<slug>/ discovery page. Existing creative lineage and community credit are retained.

## Demonstrated integrations

- Made Sick Story Finder: live handle resolution and public author-feed retrieval; 101 posts loaded and PIXIE word filtering produced nine matches. Source implements local date/phrase filters and selected reference-ledger export; export-to-Files / assistive-technology testing remain open.
- Pixie Public Discovery: live searchPosts query for atproto returned ten candidates; public source links and per-candidate dismissal are present. The application remains pre-alpha and has not passed its stable-release or independent governance gates.

Only these two narrowly described read-only tools are eligible for experimental-tool directory submissions in this review. No OAuth, private data access, PDS writes, automated introductions or publishing was demonstrated for the other projects.

Status labels on creative/archive pages describe their public surface, not a runtime audit. No dedicated repository was identified for Daddy’s Little Mortis or Tumblr. Veiled Dominion has no supplied live demo.

Directory acceptance belongs to maintainers; a submission is not an accepted listing.

## Submission status

The overview and 17 discovery pages are live following PR #15 and successful GitHub Pages deployment.

BskyInfo accepted both submissions for review on 7 October 2026:
- Story Finder receipt: https://www.bskyinfo.com/submit/success/?toolId=cmuy9a6zj000511n25omcjg59&isSubmit=true
- Pixie Public Discovery receipt: https://www.bskyinfo.com/submit/success/?toolId=cmuy9bfax000611n251ngegkp&isSubmit=true

Both are pending review, not accepted listings. No paid placement was purchased.

ATStore: the owner approved the account-access grant. Made Sick Story Finder and Pixie Public Discovery were both submitted successfully on 7 October 2026; both show Pending review at https://atstore.fyi/products/manage . Both are categorized as Built on App → Bluesky → Tool. Each includes a 1600×900 illustrative workflow hero and a square icon; Story Finder uses the supplied Made Sick icon. Artwork source files and a reproducible PNG export script are stored in assets/project-directory/ and tools/make-directory-assets.py. Bluesky Directory showed a site-served security verification in this cloud browser; no submission was made there. The legacy official ecosystem showcase route redirected to app-integration documentation without a directory submission form.

## Made Sick account hosting — 7 October 2026

The @made-sick.org account is hosted on Eurosky; account, website, participant PDS and AppView boundaries are recorded in the [canonical ecosystem hosting note](https://github.com/ibloud/ibloud.github.io/blob/main/docs/ECOSYSTEM_ARCHITECTURE.md#made-sick-account-hosting--7-october-2026), including PLC evidence and the dated policy baseline.



## Outreach and hosting follow-up — 7 October 2026

- Hosting documentation is merged: ecosystem #18, canonical-link cleanup #19, Made Sick #47 and PIXIE Device Stewardship #22.
- atmosphere.loptrlab.com passed GitHub Pages DNS validation after the custom domain was re-added to restart certificate provisioning. Enforce HTTPS is enabled. The guide rendered over HTTPS with both the galaxy image and owner-supplied Made Sick icon loaded.
- Post-migration sign-in was attempted from the live Made Sick join page. It stopped before the provider login with: “Failed to resolve OAuth server metadata for resource: https://eurosky.social/”. No authenticated participant read, create, update or withdrawal was verified; no participant record was written by this check. The owner reports migration is still underway; authenticated testing is paused until it settles. This observation does not establish a permanent application defect.
- Eurosky protected-resource and authorization-server metadata and Made Sick client metadata returned HTTP 200. Eurosky advertised transition scopes; Made Sick requests a collection-specific participant scope. Compatibility remains unverified; do not broaden requested permissions to bypass the failed check.
- A directory-eligibility inquiry for Story Finder and Pixie Public Discovery was prepared in Eurosky's official contact form, including the central overview, individual discovery pages, live demos and repositories. It describes public AppView reads and explicitly excludes verified Eurosky authentication/writes. Submission was blocked by a CAPTCHA requirement; the inquiry has NOT been sent and no Eurosky listing request or acceptance is claimed.
- Next checks: resume secure OAuth validation after migration; verify participant read/create/update/withdrawal using an explicitly approved test record; obtain CAPTCHA authorization or owner completion before sending the prepared inquiry.
