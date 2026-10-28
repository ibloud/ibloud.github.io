# Portfolio design — review proposal, 28 October 2026

Scope: only ibloud/ibloud.github.io. External project repositories and live sites are unchanged.

## Material 3 adaptation

One authoritative stylesheet: `assets/portfolio-foundation.css`. Semantic M3 color pairs define surfaces, containers, primary actions, secondary accents, outlines and focus. Violet and teal retain the portfolio’s established direction. Typography uses system fonts, a role-based hierarchy, 18px body text and readable prose measures. Rounded filled/tonal actions, selected navigation containers and adaptive grids establish hierarchy without dependencies.

The homepage emphasizes Dominique’s authorship, retaining the original text, with a proposed code-native D monogram, three entry paths and a source footer. The monogram is a review concept, not approved project branding. All 24 HTML pages share presentation and one theme script. Theme follows the operating system until selected; storage is device/origin-local and failure-safe. No analytics or account data collection were added.

References: https://m3.material.io/foundations/ ; https://m3.material.io/styles/color/the-color-system ; https://m3.material.io/styles/typography/type-scale-tokens

## Verification

48px control targets, visible focus, skip links, semantic headings, reduced-motion and forced-colors support. Paired text/container roles provide theme contrast. Static contract checks cover 24 HTML pages and local targets/fragments. The existing checker rejected valid footer navigation; it now checks primary navigation independently.

Desktop browser checks: homepage light/dark rendering, shared research page, theme persistence across navigation and no horizontal overflow at 1363px. Physical iPad/Safari/VoiceOver checks remain pending; subsequent responsive browser checks are recorded below. This is a Material 3 adaptation, not an accessibility certification.

## Release boundary

Vercel preview for owner review only. Preserve production, GitHub Pages, domains, canonical URLs and content records. Do not merge until Dominique approves the result.

## Owner review corrections — 28 October 2026

Dim light surfaces three approximately five-point lightness steps: background #FAF7FC → #D5CEDB, with coordinated containers and readable role pairs. Remove the blanket -0.035em heading tracking; use normal spacing and 1.25 line height. Reduce interior-page display sizes. Center the full reading container on prose pages instead of leaving a narrow paragraph aligned inside an oversized panel. Let long research-question headings use their available width. Give provenance definitions semantic headings, research metadata separate wrapping chips, and section identifiers a shared label style. Remove card styling from table cells and repeated manual numbering from the collaboration list.

Correction verification: research, collaboration and provenance rendered in browser frames at 390, 768, 1024 and 1366 CSS px. All 12 views had no document-level horizontal overflow; research and collaboration reading columns had equal left/right margins (within 0.02px). Heading tracking computed as normal. Confirmed three separate research metadata items, three semantic provenance definition headings and no card-styled provenance table cells. Desktop light rendering confirmed #D5CEDB background. Twelve light text/surface color pairs passed 4.5:1 (minimum 4.53:1). Static 24-page checks, JS syntax and whitespace checks pass. Browser engine: Chromium; these frame checks do not establish iPad Safari or VoiceOver acceptance.
