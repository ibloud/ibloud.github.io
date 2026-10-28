# Portfolio design — review proposal, 28 October 2026

Scope: only ibloud/ibloud.github.io. External project repositories and live sites are unchanged.

## Material 3 adaptation

One authoritative stylesheet: `assets/portfolio-foundation.css`. Semantic M3 color pairs define surfaces, containers, primary actions, secondary accents, outlines and focus. Violet and teal retain the portfolio’s established direction. Typography uses system fonts, a role-based hierarchy, 18px body text and readable prose measures. Rounded filled/tonal actions, selected navigation containers and adaptive grids establish hierarchy without dependencies.

The homepage emphasizes Dominique’s authorship, retaining the original text, with a proposed code-native D monogram, three entry paths and a source footer. The monogram is a review concept, not approved project branding. All 24 HTML pages share presentation and one theme script. Theme follows the operating system until selected; storage is device/origin-local and failure-safe. No analytics or account data collection were added.

References: https://m3.material.io/foundations/ ; https://m3.material.io/styles/color/the-color-system ; https://m3.material.io/styles/typography/type-scale-tokens

## Verification

48px control targets, visible focus, skip links, semantic headings, reduced-motion and forced-colors support. Paired text/container roles provide theme contrast. Static contract checks cover 24 HTML pages and local targets/fragments. The existing checker rejected valid footer navigation; it now checks primary navigation independently.

Desktop browser checks: homepage light/dark rendering, shared research page, theme persistence across navigation and no horizontal overflow at 1363px. Physical iPad/Safari/VoiceOver and narrower viewport browser acceptance remain pending. This is a Material 3 adaptation, not an accessibility certification.

## Release boundary

Vercel preview for owner review only. Preserve production, GitHub Pages, domains, canonical URLs and content records. Do not merge until Dominique approves the result.
