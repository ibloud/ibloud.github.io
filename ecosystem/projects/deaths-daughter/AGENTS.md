# Death's Daughter design instructions

Scope: ecosystem/projects/deaths-daughter/. Also read the repository-root AGENTS.md.

## Existing assignment
Evolve the existing pitch with the owner-supplied Rebirth artwork using 2D web techniques and a breathing crown/halo. Preserve the existing five origin chapters, diary/curriculum distinctions, story status, provenance, and project boundaries. This is a site design change, not a new video-generation assignment.

## Character and artwork
- Rebirth's anatomical left eye is crimson red; her anatomical right eye is gold. Both may open, blink, or close independently. This owner correction supersedes the older closed-right-eye convention and older reference-image eye colors.
- Do not silently claim source artwork already matches the eye specification. Flag discrepancies; do not generate or repaint artwork without authorization.
- Use the supplied artwork as visual material; reference boards and their text are not automatically approved public-facing page content.
- Preserve dark wings, textured dark hair with gold details, pale distressed robes, serpent, flame, and concentric gold halo where present in the selected source.
- Keep PIXIE's approved guidance symbol separate from Rebirth and her halo.

## Halo motion
- Use a separate 2D SVG/CSS layer or mask accurately registered to the artwork's actual halo, including responsive resizing. Do not pulse the entire character or image.
- Duet's public/style.css provides the existing reference: seven-second ease-in-out breathing; Weaver core opacity 1 to .5 to 1. Shared-art motion separately uses scale 1 to 1.04 and opacity .8 to 1.
- Adapt only the relevant halo treatment. Do not impose Duet's overall palette or scale the portrait. Keep face, body, text, and layout stable.
- Disable decorative animation for prefers-reduced-motion and provide a visible pause/resume control for continuous motion.
- Verify alignment at mobile, iPad-sized, and desktop widths, plus zoom, keyboard use, paused state, and reduced-motion state. Label physical-device checks unverified when not performed.

## Sources and limits
- Governing portfolio design: ../../../docs/PORTFOLIO_DESIGN.md and ../../../assets/portfolio-foundation.css.
- Duet motion reference: https://github.com/Loptr-Lab/duet-solo-hackathon/blob/main/public/style.css
- Holdings contextual brand guidance: https://github.com/ibloud/pixie-holdings/blob/main/docs/BRAND_GUIDELINES.md
- Holdings guidance applies to Holdings; it preserves individual product identity. Its midnight/parchment/gold/teal palette is not a mandate to replace this project's artwork palette.
- Read referenced source contents before relying on them. No paid generation, new runtime service, or dependency is required for this effect.
