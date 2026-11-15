// One deterministic renderer shared by playback, stills and native browser export.
const duration = 6000;
const projects = [
  ['PIXIE', 'assets/pixie.png'],
  ['Violet’s Revenge', 'assets/violet.jpeg'],
  ['Gods of Mayhem', 'assets/mayhem.svg'],
  ['Duet', 'assets/duet.svg'],
  ['50 Ways', 'assets/50ways.png']
];
const canvas = document.querySelector('canvas');
const ctx = canvas.getContext('2d');
const stage = document.querySelector('.stage');
const status = document.querySelector('#status');
const play = document.querySelector('#play');
const pause = document.querySelector('#pause');
const format = document.querySelector('#format');
const exportButton = document.querySelector('#export');
const motion = matchMedia('(prefers-reduced-motion: reduce)');
let images, elapsed = duration, started = 0, running = false, raf, recording = false, recorder, downloadURL;
const clamp = v => Math.max(0, Math.min(1, v));
const ease = v => 1 - Math.pow(1 - clamp(v), 3);
const colors = getComputedStyle(document.documentElement);
const token = name => colors.getPropertyValue(name).trim();
function contain(image, x, y, w, h) {
  const scale = Math.min(w / image.naturalWidth, h / image.naturalHeight);
  const iw = image.naturalWidth * scale, ih = image.naturalHeight * scale;
  ctx.drawImage(image, x + (w - iw) / 2, y + (h - ih) / 2, iw, ih);
}
export function render(time = duration) {
  const t = Math.max(0, Math.min(duration, time));
  const w = canvas.width, h = canvas.height, tall = h > w;
  ctx.globalAlpha = 1;
  ctx.fillStyle = token('--md-sys-color-surface');ctx.fillRect(0, 0, w, h);
  // Panel reveals accumulate with quiet gutters. No flashes, spinning or logo morphing.
  const settlement = ease((t - 2900) / 1100);
  const margin = w * .08, gap = w * .012;
  const panelW = tall ? (w - 2 * margin - gap) / 2 : (w - 2 * margin - 4 * gap) / 5;
  const panelH = tall ? h * .13 : h * .36;
  for (let i = 0; i < projects.length; i++) {
    const visible = ease((t - i * 420) / 650);
    const x = tall ? (i === 4 ? (w - panelW) / 2 : margin + (i % 2) * (panelW + gap)) : margin + i * (panelW + gap);
    const targetY = tall ? h * .12 + Math.floor(i / 2) * (panelH + h * .025) : h * (.26 - settlement * .13);
    const y = targetY + (1 - visible) * h * .06;
    ctx.save();ctx.globalAlpha = visible * (1 - settlement * .12);
    ctx.fillStyle = token('--md-sys-color-surface-container');ctx.fillRect(x, y, panelW, panelH);
    contain(images[i], x + panelW * .08, y + panelH * .06, panelW * .84, panelH * .70);
    ctx.fillStyle = token('--md-sys-color-on-surface');ctx.textAlign = 'center';
    ctx.font = `500 ${Math.round(w * (tall ? .022 : .012))}px system-ui`;
    ctx.fillText(projects[i][0], x + panelW / 2, y + panelH * .9, panelW * .94);ctx.restore();
  }
  const reveal = ease((t - 3100) / 1300);
  ctx.globalAlpha = reveal;ctx.textAlign = 'center';ctx.fillStyle = token('--md-sys-color-on-surface');
  ctx.font = `700 ${Math.round(w * (tall ? .092 : .065))}px system-ui`;
  ctx.fillText('Loptr Lab', w / 2, h * (tall ? .72 : .68), w * .84);
  ctx.font = `400 ${Math.round(w * (tall ? .032 : .018))}px system-ui`;
  ctx.fillStyle = token('--md-sys-color-on-surface-variant');
  ctx.fillText('A Loptr Lab production', w / 2, h * (tall ? .77 : .75), w * .84);
  ctx.globalAlpha = 1;
}
function stop() {cancelAnimationFrame(raf);running = false;pause.disabled = true;}
function tick(now) {
  elapsed = Math.min(duration, now - started);render(elapsed);
  if (elapsed < duration) raf = requestAnimationFrame(tick);
  else {stop();if (recording) recorder.stop();else status.textContent = 'Preview complete. Static title frame.';}
}
function start() {stop();started = performance.now() - elapsed;running = true;pause.disabled = recording;raf = requestAnimationFrame(tick);}
function staticFrame() {stop();elapsed = duration;render();status.textContent = 'Static title frame.';}
play.addEventListener('click', () => {
  if (elapsed >= duration) elapsed = 0;
  start();status.textContent = 'Playing six-second preview.';
});
pause.addEventListener('click', () => {stop();status.textContent = 'Paused. Play resumes the preview.';});
document.querySelector('#static').addEventListener('click', staticFrame);
format.addEventListener('change', () => {
  const tall = format.value === 'tall';canvas.width = tall ? 1080 : 1920;canvas.height = tall ? 1920 : 1080;
  stage.classList.toggle('tall', tall);staticFrame();
});
motion.addEventListener('change', () => {if (recording) recorder.stop();else staticFrame();});
document.addEventListener('visibilitychange', () => {
  if (document.hidden && running) {
    if (recording) {recorder.stop();status.textContent = 'Export interrupted because this tab was hidden. Retry with the tab visible.';}
    else {stop();status.textContent = 'Paused while tab is hidden.';}
  }
});
function save(blob, filename) {
  const url = URL.createObjectURL(blob), a = document.createElement('a');a.href = url;a.download = filename;a.click();setTimeout(() => URL.revokeObjectURL(url), 10000);
}
document.querySelector('#poster').addEventListener('click', () => {
  staticFrame();canvas.toBlob(blob => {if (blob) save(blob, `loptr-lab-${format.value}-static.png`);}, 'image/png');
});
function exportSupport() {
  if (!canvas.captureStream || !globalThis.MediaRecorder) return '';
  return ['video/webm;codecs=vp9','video/webm;codecs=vp8','video/mp4'].find(type => MediaRecorder.isTypeSupported(type)) || '';
}
exportButton.addEventListener('click', () => {
  const mimeType = exportSupport();if (!mimeType) return;
  stop();elapsed = 0;render(0);
  const stream = canvas.captureStream(30), chunks = [];
  try {recorder = new MediaRecorder(stream, {mimeType, videoBitsPerSecond: 12000000});}
  catch {stream.getTracks().forEach(track => track.stop());status.textContent = 'Video encoder unavailable. Static PNG export remains available.';return;}
  recording = true;
  const locked = [play, pause, format, document.querySelector('#static'), document.querySelector('#poster'), exportButton];
  locked.forEach(control => control.disabled = true);
  recorder.ondataavailable = event => {if (event.data.size) chunks.push(event.data);};
  recorder.onstop = () => {
    stop();recording = false;stream.getTracks().forEach(track => track.stop());
    locked.forEach(control => control.disabled = false);pause.disabled = true;
    if (downloadURL) URL.revokeObjectURL(downloadURL);
    const link = document.querySelector('#download');
    if (elapsed >= duration) {
      downloadURL = URL.createObjectURL(new Blob(chunks, {type: mimeType}));link.href = downloadURL;
      link.download = `loptr-lab-${format.value}.${mimeType.includes('mp4') ? 'mp4' : 'webm'}`;link.hidden = false;
      status.textContent = 'Silent six-second video ready. Download video to save.';
    } else {link.hidden = true;status.textContent = 'Export interrupted. Retry with the tab visible.';staticFrame();}
  };
  recorder.onerror = () => {status.textContent = 'Video encoding failed. Retry or download a static PNG.';if (recorder.state !== 'inactive') recorder.stop();};
  document.querySelector('#download').hidden = true;
  recorder.start();status.textContent = 'Recording six silent seconds. Keep this tab visible.';start();
});
try {
  images = await Promise.all(projects.map(([,src]) => new Promise((resolve,reject) => {
    const image = new Image();image.onload = () => resolve(image);image.onerror = reject;image.src = src;
  })));
  document.querySelector('.fallback').hidden = true;canvas.hidden = false;
  document.querySelector('.controls').hidden = false;staticFrame();
  if (!exportSupport()) {exportButton.disabled = true;status.textContent = 'Static frame ready. Video export is unavailable in this browser; PNG export is available.';}
} catch {status.textContent = 'Motion assets unavailable. The static HTML title remains available.';}
