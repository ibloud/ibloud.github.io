# Loptr Lab reusable title — review only

Six-second original panel sequence with optional local soundtrack; no Marvel assets, wordmark treatment,
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
will be supplied separately. The attached screen-recording WAV is not assumed to
be that track or used as instruction authority. No audio was embedded or uploaded.
Suno plan/version, composition, recording, samples and synchronization rights
remain separate owner/professional review questions.

## Playback and local audio

Serve repository root with `python3 -m http.server 4173`, open `/cinematic/`.
No runtime dependencies, accounts, telemetry, recording uploads or cloud conversion.
Select WAV, M4A or MP3 using Local audio file. Decoding and PCM transient analysis
run in this browser's memory through Web Audio; no file request, upload, storage,
external service or repository write occurs. Reload/Remove audio forgets the file.
Codec decoding depends on the browser; unsupported/corrupt files report an error
and preserve the silent preview. Convert unsupported codecs to PCM WAV locally.
Files must contain at least six seconds. Large recordings require device memory.

The waveform shows the full track, selected six-second region and live playhead.
Use the excerpt slider or numeric seconds to select a start. Preview position
scrubs the six-second sequence; Play resumes there. Replay resets both sound and
picture to the selected excerpt start. Pause stops the source and saves the
shared AudioContext clock position; resume creates a source at that exact offset.
Backgrounding or audio interruption pauses preview and discards incomplete exports.
Local AudioContext analysis may resample to the device's context rate.

`audio.mjs` derives 10ms RMS energy/positive flux from decoded PCM. An adaptive
median/deviation threshold and local peak selection detect candidate transients;
350ms minimum spacing bounds rapid cuts. Up to four measured events from
0.45–3.55 seconds drive foreground panel cuts; the strongest detected event in
4.05–4.65 seconds drives the final title reveal. No BPM or beat grid is fabricated.
If none are detected, audio mode uses continuous camera motion and an explicitly
labelled editorial final reveal. Without audio, timing uses the fixed editorial
silent sequence. Analysis counts and measured/editorial reveal status are visible.

The cinematic mode uses intact contained artwork on foreground/background planes,
diagonal camera travel, perspective, controlled parallax and faster late editorial
cuts, then locks into the existing text title and five-project composition.
No flashing, random shaking, logo morphing or character replacements. All source
artwork hashes remain unchanged. `render(milliseconds)` is shared by playback,
stills and browser exports; `transportState()` exposes read-only sync diagnostics.

Static is the initial frame. System reduced motion selects Static title with audio;
Play may audition sound while the picture remains still. A restrained mode limits
movement to slow opacity settlement. Explicitly choosing Cinematic enables the
full treatment. All modes retain keyboard Play/Pause/Replay, Static frame,
format selector and downloads. No-JS retains the original static HTML/images.
Physical iPad Safari/VoiceOver acceptance is pending; tested iPad-sized layout
and WebKit checks must be distinguished from physical device acceptance.

## Local video export and fallback

Choose 16:9 (1920×1080) or 9:16 (1080×1920), then Export silent video or Export video
with audio. Canvas capture and native MediaRecorder encode only locally. Combined
recording adds a Web Audio MediaStreamDestination track to the same canvas stream;
the same AudioContext clock drives animation and sound. Supported MP4/AAC or
WebM/Opus types are selected with MediaRecorder.isTypeSupported. Silent exports
retain the original WebM/MP4 support and **never** route the selected audio into
the recorder or speakers. File extension follows the encoder MIME type.

Keep the tab visible. Export is real-time (30fps requested, browser frame cadence
and initial encoder delay may vary); interruption/error does not offer a partial
file as successful. Download uses a local Blob URL. PNG static frames and a
six-second PCM excerpt WAV are also generated locally. The WAV uses exactly the
selected start and six seconds, with no invented mix or change to rights status.

When combined encoding is unavailable/fails, download the original silent video
and excerpt WAV, then combine **locally** in an editor or existing FFmpeg:

```sh
ffmpeg -i loptr-lab-wide.webm -i loptr-lab-excerpt.wav -map 0:v:0 -map 1:a:0 -t 6 -c:v libx264 -pix_fmt yuv420p -c:a aac -movflags +faststart loptr-lab-wide-audio.mp4
```

If the browser cannot encode any video, use static PNG + WAV as a reduced-motion
fallback with an already installed FFmpeg:

```sh
ffmpeg -loop 1 -i loptr-lab-wide-static.png -i loptr-lab-excerpt.wav -t 6 -c:v libx264 -pix_fmt yuv420p -c:a aac -movflags +faststart loptr-lab-static-audio.mp4
```

No new AI imagery, Intangible credits, Canva/Higgsfield generation or upload,
repository, production hosting change or production Vercel deployment. GitHub
Pages remains production. Continue draft PR #56; do not merge/push to main without
owner approval. Studio sigil authority and commercial audio/artwork rights remain
pending. The attached owner WAV exceeds the tool's 32 MiB executor-transfer limit;
its actual waveform/playback was not tested here. Use the local selector to load
that original recording on the reviewing device. Synthetic codec/sync fixtures
are test evidence only and are never published as the Suno track.
