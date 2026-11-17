# Deck portfolio evidence and boundaries

Reviewed 16 November 2026 under portfolio PR #63; Made-Sick resource work continues in PR #77. This extends the existing Death’s Daughter page, not a new store. Current main, both PR heads, root/shared/nested instructions, ecosystem architecture, portfolio design and the Paragon rights/original-character decision were read before selecting material.

| Entry | Source read / supplied | Verified artifact | Still unverified / withheld |
|---|---|---|---|
| First published deck | Owner supplied https://www.makeplayingcards.com/sell/marketplace/jupiter-lenormand.html and a private companion folder | Owner screenshots on 17 November confirm title, creator, 60 cards, specifications, visible product imagery and ordering controls; see dated evidence below | Direct source reads remain blocked. Currency code, matching companion title and included/separate LWB status remain unverified. Original image binary not available to publish. No purchase CTA; private folder not published. |
| Paragon Tarot | Paragon-Reborn main `3ddb52994be4450c11c54ec07d2288372587a375`: `docs/paragon-tarot-research.md`, `docs/paragon-tarot-LWB.pdf`, `docs/ORIGINAL_CONTENT_RIGHTS.md`, `docs/decisions/2026-10-08-original-tarot-direction.md` | Existing research proposes 78 cards; PDF is a two-page, 594×342 pt three-panel guide. Attribution on the artifact reads Tarot design: Loptr Lab and identifies Paragon characters as Epic IP. | No manufactured deck, acquisition entitlement or commercial clearance. Printed card faces and final legibility are not proven by a manuscript. Historical rights restrictions remain; original characters/placeholders are the next runtime direction. |
| PIXIE playing deck / vessel | Owner’s current distinction; existing `assets/pixie-companion-sigil.png` | Guidance symbol reused unchanged; owner supplied four twos and dark/light card-back artwork in chat on 17 November | Asset repository, full playing system/count, final files and manufactured status remain unverified. Displayed guidance symbol is distinct from the actual deck artwork. |
| Death’s Daughter oracle / spirit | Existing manga proof, oracle/Little Red Book direction and scoped AGENTS.md | Sequential development artwork and companion concept | No completed oracle, finalized print specification, manufactured edition or released Little Red Book. Eye-colour discrepancy remains labeled; no artwork recolouring. |

The Little Red Book is distinct from the historical Paragon LWB. Neither is treated as the matching Jupiter Lenormand companion. Owner-identified sources establish what to investigate, not their unread contents or legal clearance.

## Existing artifact rendering

`assets/paragon-lwb-research-spread.png` is a faithful raster rendering of page 1 of the existing historical PDF, produced for contextual research display, not newly generated artwork or a new deck face. Its displayed cover, repeated headings, paired UP/RV interpretation labels and source attribution demonstrate layout/system work. No PDF or Epic asset binaries are repackaged for manufacture, no purchase CTA is supplied, and the project’s original-content policy remains unchanged. The full page is shown proportionately rather than cropping out attribution. This record makes no independent rights-clearance finding.

The render uses `pdftoppm -f 1 -singlefile -scale-to 1200 -png`; the source PDF metadata identifies Loptr Lab as author and reports a September 18, 2026 creation date. Metadata is a file record, not independent authorship certification. The PDF remains in its existing owning repository.

## Cost continuity

PR #63’s November 16 review of PrintNinja’s November 2 examples remains unchanged: 500 Blue Core 54-card decks $1,343; 500 Black Core linen 54-card decks $1,839; 500 32-page comics $1,580, all USD excluding shipping/tax/duties. These are dated benchmarks, not our quote. Minimums remain 500 decks/250 comics. MakePlayingCards remains the standard single-deck/prototype alternative. No new provider-price verification or sales figures are claimed.

Keep historical art costs, future labour, manufacturing and fulfillment separate. No invented retail price, margin, demand or ROI. The first-deck price and LWB bundling must be read from the actual listing/companion before any buying route is added.

Source PDF SHA-256: `cd33dcd85f75f9ae5ff1941dc9e62e33847791505915e37cf1fe56fa9019eeb2`. Render SHA-256: `051cb030e954debb418da505092e8a488e40798ab025e7f665fc6353046e15bb`.

## Validation and remaining acceptance checks

Local checks completed 16 November 2026: `python3 tools/check_portfolio.py` passed for 31 HTML pages; `node --test tests/public-records.test.mjs` and the existing public-records browser suite passed. A local Chromium showcase check passed at 320, 390, 820 and 1440 CSS pixels in both themes, including scoped axe checks, loaded proportionate images, overflow, keyboard navigation, theme controls, 200% enlargement, reduced motion and no-JavaScript content. Made-Sick's existing suite passed 93 tests and its resource generator check passed; home/directory and expanded provider cards were checked at 390, 820 and 1440 pixels. These are simulated browser widths, not physical-device acceptance.

The existing `tools/test_story_pitch.cjs` fails at its first heading assertion: it expects “From Fan Fiction to Original Worlds”, while PR #63 already contains “The Diary of Death’s Daughter”. This pre-existing mismatch was confirmed against the original PR head; later assertions in that test did not run. No test expectation was weakened. Existing PrintNinja table and reference artwork were checked unchanged.

Source access was retried on 17 November 2026 after the environment restarted: MakePlayingCards and the private companion folder still receive proxy CONNECT 403. GitHub API and direct Vercel preview access are also blocked. Local screenshots/tests do not establish exact-head Vercel acceptance.

Before owner acceptance, open the Vercel deployment linked to each PR's final commit and repeat full-section mobile/tablet/desktop review, both themes, keyboard/focus, PIXIE and image loading. Confirm the deployment SHA matches the PR head; a branch alias alone is insufficient. Separately read the owner-supplied listing and companion to verify title, creator, count, availability, price currency, actual imagery and LWB inclusion/separation. Add a buying route only after those facts and the matching companion are established. Keep main unchanged pending owner review.

## Owner screenshot evidence — 17 November 2026

Three owner-supplied Safari screenshots show the MPC listing and marketplace category. They establish the displayed title **Jupiter Lenormand**, creator **I. B. Loud IVXX**, **60 cards**, **2.5 × 2.5 inches / 63.5 × 63.5 mm**, **S30 Standard Smooth**, **shrink-wrapped**, and design reference **161906061051**. The description calls this the creator’s first deck, based on Lenormand with Russian alternates to make a complete playing deck. The listing shows an add-to-cart control and quantity 1, with $18.85 for 1–5 decks; the category also shows $18.85. This is observed screenshot ordering availability, not a completed checkout or guarantee of future stock. No currency code appears in these captures: do not label the amount USD without further evidence. The no-minimum note excludes M30/M32 stock, which requires 1,000 decks.

Actual product imagery is visible in the screenshots (a square equestrian card with a nine-of-spades inset). No original product-image binary was supplied for the site, and the full browser screenshots include seller-management controls, so they are not republished as gallery art. Companion title, matching contents and LWB included/separate status remain unverified. The original instruction to omit a purchase button until both listing and companion are verified still applies. Public access-blocker copy has been removed; the page now presents established product facts and omits unverified price/bundling. The direct MPC URL remains recorded above.

The owner also supplied PIXIE’s four twos and dark/light card-back designs in chat. This establishes existing deck artwork, including skeletal hands/figures and a purple winged symbol; it corrects the earlier inference that only the guidance sigil exists. Original asset repository, complete count, print readiness and manufacturing remain unverified. The page now acknowledges the artwork and explicitly distinguishes the displayed guidance sigil from the deck’s own identity. No card artwork was generated, recoloured or substituted.

Validation for this text-only correction: portfolio structural/link check and diff whitespace check passed. Prior responsive screenshots predate this correction; a fresh exact-head Vercel visual review remains outstanding because direct preview access is blocked.
