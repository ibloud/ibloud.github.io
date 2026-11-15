# Loptr Lab reusable title — review only

Six-second, silent original panel assembly; no Marvel assets, wordmark treatment,
page-flipping sequence or proprietary sequence copied. Existing project marks stay
intact and contained rather than cropped, recolored or morphed. The 9:16 composition
reflows the panels into three rows; it is not a destructive center crop of 16:9.
Both outputs keep identity text within an 8% horizontal safe margin.

## Sources and approval limits

Read before implementation: portfolio README.md, MISSION.md,
docs/PORTFOLIO_DESIGN.md, docs/ECOSYSTEM_ARCHITECTURE.md,
docs/PORTFOLIO_CONTINUITY_AUDIT_2026-10-26.md; 50 Ways AGENTS.md and
brand-guidelines.md; Violet pitch/index.html; DUET public/index.html and README.md.
No AGENTS.md found in portfolio, Violet or DUET checkouts. No matching title-sequence
PR found in accessible GitHub searches; unrelated open PRs were not repurposed.
This review branch continues the requested assignment in the existing portfolio.

See inventory.json for copied artwork, original sources and integrity hashes.
PIXIE provenance is explicitly documented in 50 Ways brand-guidelines.md (source
Git blob 2f2f88570d7e2c9bca15d7fe649c6ed4b41b3a49). Violet’s existing feather/scalpel
identity comes from its current pitch, not the unidentified hooded concept figure.
50 Ways uses its existing Audio Masterclass cover unchanged. Mayhem uses the
existing legal sigil, clearly attributed to that role, not a replacement character.
DUET uses its existing Obsidian Realm nested diamonds. SVG geometry is extracted
unchanged; source CSS colors are resolved so standalone images render correctly.

**Studio sigil:** an exact existing source was located at
Loptr-Lab/duet-solo-hackathon commit 5acdffa1fcb56eefe026918ad4a62afdb1ee3c00,
public/index.html, lines 1038–1048, `.sigil-loptr-lab`. It contains a circle,
triangular frame, three diamond nodes/spokes and diamond core. Source CSS at lines
694–695 cites DESIGN_BIBLE.md, absent from that checkout. Missing: the cited brand
bible or another owner approval record confirming this studio mark and its master
colors. This preview deliberately withholds the sigil reveal until confirmed.
The text title demonstrates timing; it is not a replacement logo. D monogram,
PIXIE sigil, Mayhem scales and DUET diamond must never substitute for the studio mark.

Existing public use supports identity verification, not proof of commercial reuse
clearance. Confirm creator/artist credits, source agreements and permissions for
music-video distribution. Audio: “Rapid Fire Regret,” Suno track by IBLoud_IVXX,
will be supplied separately. The attached screen-recording WAV is not assumed to
be that track or used as instruction authority. No audio was embedded or uploaded.
Suno plan/version, composition, recording, samples and synchronization rights
remain separate owner/professional review questions.

## Playback and reuse

Serve repository root with `python3 -m http.server 4173`, open `/cinematic/`.
No runtime dependencies, accounts, telemetry or third-party asset requests.
`title.js` exports deterministic `render(milliseconds)` for future frame capture.
Project sources/labels live in one `projects` registry; duration is 6000 ms.
0–2.9s: staggered panel assembly; 2.9–4.4s: quiet settlement and text reveal;
4.4–6s: held title. No flashing, automatic loops or automatic audio.

The default is a static frame, including with reduced motion. Motion requires an
explicit Play action. Pause/resume, static frame, format and export controls are
keyboard operable. A text equivalent describes the canvas; a native HTML/image
static title remains available without JavaScript or if images fail to load.
Static PNG downloads use the same final frame. Physical iPad Safari/VoiceOver
acceptance is pending; automated Chromium checks do not certify it.

## Video workflow

Select 16:9 (1920×1080) or 9:16 (1080×1920), then Export silent video. Uses built-in
Canvas captureStream/MediaRecorder at 30fps and 12 Mbps; chooses a supported VP9,
VP8 or MP4 encoder. Keep the tab visible for all six seconds. Download the resulting
video using the offered link. No new library or paid service is needed. Export
is a real-time browser capture, so timing/frame pacing is browser-dependent.
Unsupported browsers retain static PNG export; an interrupted export is discarded.

If FFmpeg is already installed, convert a browser WebM without adding a dependency:

```sh
ffmpeg -i loptr-lab-wide.webm -an -c:v libx264 -pix_fmt yuv420p -movflags +faststart loptr-lab-wide.mp4
```

Add the separately supplied authorized music only after owner review. No fabricated
soundtrack, new AI imagery, Intangible credits, new repository, production hosting
change or production Vercel deployment. GitHub Pages remains production; do not
merge or push to main until preview review and explicit approval. The sigil
approval/source and audio remain completion gates, not passed requirements.
