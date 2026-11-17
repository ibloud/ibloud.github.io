# The Codex — Loptr Lab

Review draft, October 8, 2026. The owner requires review before publication. Save source and versions without deploying; do not publish until explicitly approved.

The existing codex.loptrlab.com hosting project now has a cohesive 16-page design: eleven deck entries, worlds and variants, bots and guides, the PIXIE studio, and provenance. Existing PIXIE illustrations and studio tools are retained. Other deck specimens present recorded card text, not finished illustrations.

Build with `python3 build-codex.py`; validate with `python3 validate-codex.py` and `node --check dist/studio-tools.js`. The generated sitemap includes every HTML route. See CODEX-SOURCE-MAP.md for research decisions and source disagreements.

`source/catalogue.json` is the curated deck inventory; `source/card-sources.json` preserves the inspected public card records; `source/pixie-original.html` preserves the original studio material. `dist/` is the static output. Private Drive documents and operational credentials are not included.

Existing PIXIE tools run locally: collaborator introduction download, budget scenarios and JSON export, reflection prompts. No intake or checkout was added. Cost assumptions remain illustrative. Bot implementation does not establish a live service.

Validation covers source structure, internal links, IDs, image descriptions, sitemap and script syntax. Browser rendering and device interaction require visual review; no deployment is needed to review the standalone HTML copy.

## Archive status — 17 November 2026

Owner authorized archive labeling and publication on this date. Every generated
page links to the current GitHub-backed deck showcase. Historical content, routes,
artwork, hosting identity and public audience are preserved. This is not the
current development source; continue in ibloud/ibloud.github.io.
