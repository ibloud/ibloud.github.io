Current state: 15-second single-MP4 teaser implementation; actual Suno-recording
render/acceptance BLOCKED on access to the owner’s iCloud source. The earlier
six-second and separate-WAV results below are historical, not final delivery.

# Review validation — 15 November 2026

- Existing portfolio static contract: PASS, 32 pages, links/landmarks/navigation/stylesheets.
- Existing public-record Node tests: PASS, 10/10.
- New Chromium suite: PASS, 320/390/768/1440 reflow and axe WCAG A/AA,
  explicit keyboard Play, pause/resume, reduced-motion static default,
  1920×1080 / 1080×1920 format selection, real MediaRecorder download,
  static PNG download, no-JavaScript fallback and zero page errors.
- 16:9 export verified with ffprobe: VP9, 1920×1080, 30fps, 5.973 seconds
  (nominal six-second timeline; real-time capture has frame-boundary tolerance).
- Desktop wide and portrait static frames visually inspected in Chromium.
- JavaScript syntax and git diff whitespace: PASS.
- CI repeats the existing suites and new cinematic suite using existing browser tooling.

No physical iPad/Safari/VoiceOver acceptance or commercial-rights clearance claimed.
Studio sigil authority and separately supplied authorized audio remain pending.
No claim of final sigil reveal completion. Hosted preview acceptance is tracked
in the draft PR separately from local checks. Main and Pages production unchanged.

## Additional verification

- Existing public-record browser suite: PASS (fixtures, keyboard, light/dark axe
  and reflow at 320/768/1024/1440, 200% text, reduced motion).
- Existing story-pitch browser suite: PASS (canon/source/privacy boundaries,
  keyboard, same viewport/light/dark axe/reflow, 200% text, reduced motion, no-JS).
- Portrait video exported and inspected: VP9, 1080×1920, 5.979 seconds. FFprobe
  reports a 60/1 nominal stream rate for that real-time capture; requested canvas
  capture rate is 30fps, not a guarantee of constant encoded frame cadence.
- Existing automatic Vercel **preview** at implementation commit
  67825a1050e284f8f8d4719a5020b48ab4126bcb is READY, target null (not production).
  Connected Vercel fetch returns HTTP 200 for /cinematic/.
  Direct shell/browser host access is blocked by this executor's CONNECT proxy
  (403); no claim of physical-device or anonymous browser acceptance.
- A temporary direct-access share link was prepared for owner review. It expires
  roughly 23 hours after creation; no project-wide protection setting changed.

Initial CI passed existing unit/static/browser suites but exposed a test timing
race: changing emulated reduced-motion immediately before Play could deliver its
change event after Play, correctly returning the product to a static frame.
The test now sets reduced motion on browser-context creation, so its initial
static-state and explicit-Play assertions run with a settled preference.

# PR #56 owner correction — local soundtrack and stronger motion

The original silent-only study did not integrate locally selected audio and its
motion lacked impact. Amended the same branch/PR: cinematic layered planes,
perspective, parallax, measured-transient cuts, final text lockup, restrained/static
modes; local WAV/M4A/MP3 decode, waveform, excerpt start and scrubber; shared-clock
sound/picture transport; combined native export and six-second PCM WAV fallback.
Silent export, original assets, no-JS/static frame, 16:9/9:16 and keyboard controls
remain. No original artwork files, project identities, sigil gate or rights status
changed. No Canva/Higgsfield upload, generation or expenditure.

New test commands:
- `node --test tests/*.test.mjs`: original 10 tests plus PCM transient/silence/offset
  and exact WAV tests.
- `node tools/test_cinematic.cjs`: original regression suite, updated only to scope
  its canvas locator now that a waveform canvas also exists.
- `node tools/test_cinematic_audio.cjs`: synthetic PCM file selected through the
  actual browser file input; no requests except first-party GETs; detected events,
  exact start/resume/replay offsets, AudioContext/video clock delta under 120ms,
  stable paused position, no automatic audio, static pixels with reduced motion,
  combined audio/video and WAV downloads, silent export isolation, corrupt MP3
  recovery and simulated combined-encoder unavailability.
- iPad-sized Chromium touch layout: 820×1180, 1180×820, 768×1024; axe A/AA and no
  horizontal overflow, plus 320px and 200% root text. Physical iPad/VoiceOver is
  not available and remains unverified.
- Additional local codec tests use FFmpeg-created synthetic MP3 and AAC/M4A via
  CODEC_FIXTURES, not repository media or owner music. Both decode successfully.
- Local combined WebM inspected with ffprobe: VP9 1920×1080 + Opus 48kHz,
  approximately six seconds; first observed container audio timestamp 36ms.
  Decoded synthetic transients match the selected WAV at 10ms envelope resolution
  (0.10/0.70/1.30/2.40/4.60/5.30 seconds; no observed accumulating drift).
  PCM WAV export: six seconds exactly; context resampling to 44.1kHz is expected.
- Original attached owner WAV could not be transferred: exceeds tool's 32 MiB
  limit. Actual Suno recording acceptance is NOT claimed; local selector avoids
  that limit on the user's device. No recording/filename/audio fixture committed.

Hosted preview, final commit and CI evidence are recorded in PR #56. No main merge,
production deployment, new repository, new PR or licensing clearance.

A 200%-text regression exposed the original Format select's intrinsic width at
320px. Scoped max-width/min-width rules now keep it inside the controls; the
expanded audio suite passes that reflow check. Final local static/reduced-motion
pixels remain identical during audio playback. WebKit installation was attempted
for an additional engine check but its download hosts returned CONNECT/domain
403; WebKit/Safari engine acceptance is unverified, not represented as passed.
This environment supports combined WebM/Opus, not MP4/AAC; native MP4 remains
capability-gated and the local FFmpeg fallback is documented.

Final format/fallback evidence: expanded audio browser suite also downloads a
9:16 combined recording. ffprobe confirms VP9 1080×1920 + Opus, 5.989s; native
container audio start 50ms (real-time encoder startup varies). The documented
local assembly command was executed successfully: H.264 + AAC MP4, exactly 6.000s.
MP4 native MediaRecorder was unavailable in this Chromium build; local mux is the
verified MP4 fallback. No claim of frame-perfect cross-browser native encoding.

Review deployment dpl_5KJnCzDQGbuquXp6NmgD5SNMKxEr is READY for implementation
f2e4337171f48ef464cd0b7d0352ca4c2133ac19, preview target only. Connected fetch
returns HTTP 200 for HTML, title.js, audio.mjs, title.css and inventory.json;
retrieved JS/modules/CSS/inventory equal source (ignoring terminal whitespace).
Subsequent test/evidence-only commits do not change those runtime artifacts.
Direct physical-device and hosted-browser acceptance remain separate from
connected fetch/local browser tests. Review links and final CI are in PR #56.

# 15-second single-MP4 amendment (same PR #56)

Owner identifies actual supplied audio as iCloud Drive › Downloads ›
ScreenRecording_11-15-2026 05-18-55_1.wav. Workspace/attachments/tmp/mount searches
found no copy. That is a device-local path, not a Linux mount or readable network
URL; available connectors provide no iCloud filesystem. Existing chat attachment
exceeds the download tool's 32 MiB transfer limit. An existing authorized download
link/access to the same original is required to render/certify the actual teaser.
No new upload was requested and no source recording was published. Do not present
any synthetic fixture export as “Rapid Fire Regret.”

Amended implementation:
- Duration is 15s throughout preview/transport/excerpt/analysis; strongest measured
  transients drive cuts through 11.1s and reveal at a measured 12–13s event when
  available. Static, restrained, keyboard transport, 16:9/9:16 and artwork retained.
- Primary export muxes one actual MP4 with selected audio/video. Native choices
  include H.264/AAC and H.264/Opus. Parsed ISO-BMFF ftyp/moov/trak/hdlr must confirm
  both video and audio tracks before download. Renamed WebM, missing tracks and
  native movie-duration drift beyond 150ms are refused. No separate soundtrack or
  silent fallback is supplied as teaser delivery. Original silent title tools are
  separately labelled legacy tools; the standalone WAV download was removed.
- Existing-toolchain local renderer accepts the original file path directly,
  measures timing through the same preview code, renders 450 frames at 30fps and
  directly muxes the 15-second source interval into one H.264/AAC MP4. It checks
  codecs, duration, source/output PCM correlation/lag and standalone native-player
  playback to completion (including audio decoding). Private verification report
  includes source/output SHA-256; the source never receives a public URL/upload.

Verification:
- 16 unit tests pass: existing records, measured timing/offset/silence, WAV helper
  integrity, MP4 missing-track/renamed-container/truncation/overrun rejection.
- 32-page portfolio/link/landmark/style contract passes; JS syntax and diff checks.
- Original cinematic browser regression passes at new duration, including silent
  title tools, static/no-JS, keyboard, reduced motion, formats and PNG.
- Updated audio suite passes local import/no upload, shared clock, pause/resume/
  replay, measured cuts, iPad-sized touch/reflow/axe/200% text, both combined MP4
  formats, corrupt input, silent isolation and encoder refusal without substitute.
  Downloaded MP4 is parsed and played to the end in a separate native video
  element with no editor code; decoded audio bytes and timeline are checked.
- Native MP4 with a synthetic waveform: ffprobe identifies H.264 + Opus; standalone
  playback decodes picture and sound. A concurrent heavy-render stress test produced
  a 17.386s native file: correctly rejected by the new duration guard. Native capture
  is not described as frame-perfect; exact delivery uses the local renderer.
- Deterministic synthetic wide and tall exports: ffprobe H.264 + AAC, 450 video
  frames, 15.000000s. Both play through to 15s in an independent native player.
  Source/output PCM correlation 0.999954; lag 0.000s. These are pipeline fixtures,
  not the supplied Suno recording; no media fixture or export is committed.

Physical iPad/Safari/QuickTime and actual owner-recording acceptance remain pending.
Studio sigil approval, commercial music/artwork rights, Pages production and main
merge restrictions are unchanged. Hosted preview/final CI evidence is in PR #56.
