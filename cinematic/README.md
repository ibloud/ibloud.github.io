# Loptr Lab reusable title — review only

15-second original panel sequence with optional local soundtrack; no Marvel assets, wordmark treatment,
page-flipping sequence or proprietary sequence copied. Existing project marks stay
intact and contained rather than cropped, recolored or morphed. The 9:16 final composition
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
was supplied separately and is identified by the owner as the screen-recording WAV
in their iCloud Downloads. Its content is media, not instruction authority. It is
not committed to this repository; workspace access to that original remains blocked.
Suno plan/version, composition, recording, samples and synchronization rights
remain separate owner/professional review questions.

## 15-second teaser and local audio

Amends existing PR #56. The teaser is now 15 seconds, with locally measured
transient cuts through 11.1s and a final text reveal near 12–13s. Original project
imagery, typography, static/reduced-motion alternatives, transport and 16:9/9:16
formats remain. The studio sigil approval gate and commercial-use rights review
remain pending. The earlier six-second WebM/separate-WAV workflow is superseded.

The owner identifies the original as iCloud Drive › Downloads ›
ScreenRecording_11-15-2026 05-18-55_1.wav. That device location is not mounted in
the Linux workspace. The chat attachment reference exists but exceeds the transfer
tool's 32 MiB limit. **Actual Suno-recording rendering/verification is blocked until
that original is accessible.** Synthetic test recordings are not its substitute.

Serve repository root with `python3 -m http.server 4173`, open `/cinematic/`.
Select the existing WAV once from Files/iCloud Downloads. WAV, M4A and MP3 are read
and analyzed in browser memory; there is no upload, storage, remote media service
or recording commit. Set a start with the waveform/slider or numeric seconds;
the selected interval is exactly 15s and must fit within the recording. Play,
pause, resume, replay and position scrub share one Web Audio clock and excerpt.
Export reuses the decoded file: no second selection/upload or soundtrack attachment.

PCM RMS/positive-flux analysis measures transients; no BPM/beat grid is invented.
No usable transient means continuous camera movement and an explicitly editorial
reveal. Full, restrained and static modes remain; reduced motion defaults to a
static picture while audio can still play. Backgrounding or interruption pauses
playback and discards incomplete recordings. No-JS retains static HTML/images.

## One-file MP4 export

**Export 15-second MP4 with audio** muxes the selected audio and canvas video into
one MP4. Prefer H.264/AAC when the browser supports recording it; Chromium here
supports H.264/Opus in MP4 instead. This is an actual ISO-BMFF MP4, not renamed WebM.
Before offering the download, `mp4.mjs` parses its movie tracks and requires both
`vide` and `soun` handlers. Unsupported encoders fail closed: no silent teaser,
separate soundtrack or two-file fallback is presented. The source recording is
not included in the repository. Original silent title tools remain separately
labelled legacy tools, not the teaser delivery path.

Browser recording is real-time; timing/frame cadence and duration vary by encoder
(e.g. approximately 14.96s for a nominal 15s capture). H.264/Opus compatibility is
player-dependent; physical Safari/QuickTime acceptance is unverified. For an exact
15.000s file with broadly supported H.264/AAC, use the existing local toolchain below.

## Exact local MP4 render

`tools/render_cinematic_teaser.cjs` reads the same existing source file directly
from disk and produces **one** MP4. It uses existing Playwright/Chromium + FFmpeg/
ffprobe, no runtime library, service or source upload. No intermediate silent
video or separate soundtrack must be assembled by the user.

```sh
node tools/render_cinematic_teaser.cjs --audio "/existing/path/ScreenRecording_11-15-2026 05-18-55_1.wav" --start 0 --format wide --output "/private/output/rapid-fire-regret-15s.mp4"
```

Use the actual local path to the existing iCloud file; `--format tall` exports
1080×1920, `wide` exports 1920×1080. CHROMIUM_PATH may point to an existing Chromium
executable. The command will not overwrite an existing output or the source.

The renderer imports/analyses the source through the same page locally, renders
450 deterministic frames at 30fps, and directly muxes the selected source interval
with H.264 video + AAC audio into the final MP4. ffprobe checks both streams and
15s duration. Source/output PCM correlation checks audio identity and offset;
a standalone native video element, without editor code, plays the MP4 to the end.
A private `.verification.json` records source/output SHA-256, excerpt, measured
cuts, codec/duration, audio lag/correlation and standalone playback results. That
report is verification, not commercial-rights clearance. Failed verification
removes the incomplete output; no false successful teaser is delivered.

Only fixture-based verification is complete in this workspace: actual recording
acceptance remains blocked on access to the owner's iCloud source. No source
recording, test media or finished teaser is published to GitHub. No new repository,
PR, architecture, imagery, Intangible credits, production deployment or main merge.
GitHub Pages remains production; owner approval is required before any merge.
