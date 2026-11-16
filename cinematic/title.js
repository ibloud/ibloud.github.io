import {SECONDS, analyzePCM, excerptTiming} from './audio.mjs';
import {requireAudioVideoMP4} from './mp4.mjs';
const duration = SECONDS * 1000;
const projects = [['PIXIE','assets/pixie.png'],['Violet’s Revenge','assets/violet.jpeg'],['Gods of Mayhem','assets/mayhem.svg'],['Duet','assets/duet.svg'],['50 Ways','assets/50ways.png']];
const $ = id => document.getElementById(id);
const canvas = document.querySelector('.stage canvas'), ctx = canvas.getContext('2d');
const stage = document.querySelector('.stage'), status = $('status');
const play = $('play'), pause = $('pause'), format = $('format'), fileInput = $('audio-file');
const motionPreference = matchMedia('(prefers-reduced-motion: reduce)');
const wave = $('waveform'), waveContext = wave.getContext('2d');
let images, elapsed = duration, running = false, recording = false, raf, clockStart = 0;
let audioContext, buffer, source, analysis, recordingDestination, recorder, downloadURL;
let excerptStart = 0, loadVersion = 0, decoding = false, exportingAudio = false, failedExport = false;
let timing = excerptTiming();
const clamp = n => Math.max(0,Math.min(1,n));
const ease = n => 1 - Math.pow(1-clamp(n),3);
const css = getComputedStyle(document.documentElement);
const token = name => css.getPropertyValue(name).trim();
const color = {bg:token('--md-sys-color-surface'),panel:token('--md-sys-color-surface-container'),text:token('--md-sys-color-on-surface'),muted:token('--md-sys-color-on-surface-variant'),line:token('--md-sys-color-outline'),accent:token('--md-sys-color-primary-container')};
function contain(image,x,y,w,h) {
  const scale = Math.min(w/image.naturalWidth,h/image.naturalHeight);
  const iw = image.naturalWidth*scale, ih=image.naturalHeight*scale;
  ctx.drawImage(image,x+(w-iw)/2,y+(h-ih)/2,iw,ih);
}
function panel(i,x,y,w,h,alpha=1,tilt=0,skew=0) {
  ctx.save();ctx.globalAlpha=alpha;ctx.translate(x+w/2,y+h/2);ctx.rotate(tilt);ctx.transform(1,0,skew,1,0,0);
  ctx.shadowColor='#000';ctx.shadowBlur=w*.08;ctx.shadowOffsetY=h*.04;
  ctx.fillStyle=color.panel;ctx.fillRect(-w/2,-h/2,w,h);ctx.shadowBlur=0;ctx.shadowOffsetY=0;
  ctx.strokeStyle=color.line;ctx.lineWidth=1;ctx.strokeRect(-w/2,-h/2,w,h);
  contain(images[i],-w*.43,-h*.43,w*.86,h*.72);
  ctx.fillStyle=color.text;ctx.textAlign='center';ctx.font=`500 ${Math.round(w*.047)}px system-ui`;
  ctx.fillText(projects[i][0],0,h*.4,w*.9);ctx.restore();
}
function title(alpha,w,h,tall,settle=1) {
  ctx.save();ctx.globalAlpha=alpha;ctx.translate(w/2,h*(tall?.73:.69));
  const scale=1+(1-settle)*.11;ctx.scale(scale,scale);
  ctx.fillStyle=color.text;ctx.textAlign='center';ctx.font=`700 ${Math.round(w*(tall?.10:.075))}px system-ui`;
  ctx.fillText('Loptr Lab',0,0,w*.84);
  ctx.fillStyle=color.muted;ctx.font=`400 ${Math.round(w*(tall?.032:.018))}px system-ui`;
  ctx.fillText('A Loptr Lab production',0,h*.075,w*.84);ctx.restore();
}
function finalComposition(w,h,tall,alpha=1) {
  const gap=w*.012, margin=w*.08, pw=tall?(w-2*margin-gap)/2:(w-2*margin-4*gap)/5, ph=tall?h*.13:h*.32;
  for(let i=0;i<5;i++) {
    const x=tall?(i===4?(w-pw)/2:margin+(i%2)*(pw+gap)):margin+i*(pw+gap);
    const y=tall?h*.11+Math.floor(i/2)*(ph+h*.025):h*.13;
    panel(i,x,y,pw,ph,alpha);
  }
}
export function render(milliseconds=duration) {
  const seconds=Math.max(0,Math.min(SECONDS,milliseconds/1000)),w=canvas.width,h=canvas.height,tall=h>w;
  ctx.globalAlpha=1;ctx.fillStyle=color.bg;ctx.fillRect(0,0,w,h);
  const mode=$('motion').value;
  if(mode==='static'||seconds>=SECONDS) {finalComposition(w,h,tall);title(1,w,h,tall);return;}
  const reveal=timing.reveal;
  if(mode==='restrained') {
    finalComposition(w,h,tall,.72+.28*ease(seconds/2));title(ease((seconds-reveal)/.5),w,h,tall);return;
  }
  // Panels are camera planes: depth, diagonal travel and counter-moving background.
  // Artwork stays contained and unchanged; no white flashes or luminance pulses.
  const lock=ease((seconds-reveal)/.55), active=timing.cuts.filter(time=>seconds>=time).length;
  const cutStart=active===0?0:timing.cuts[active-1], next=timing.cuts[active]||reveal;
  const progress=clamp((seconds-cutStart)/Math.max(.35,next-cutStart));
  const focus=active%projects.length, speed=ease(progress);
  ctx.save();ctx.globalAlpha=(1-lock)*.25;ctx.strokeStyle=color.line;ctx.lineWidth=1;
  for(let i=-2;i<8;i++) {const x=w*(i*.22-seconds*.025);ctx.beginPath();ctx.moveTo(x,0);ctx.lineTo(x+w*.35,h);ctx.stroke();}
  ctx.restore();
  // Background project planes move more slowly than the foreground plane.
  for(let layer=4;layer>=1;layer--) {
    const i=(focus+layer)%5, pw=w*(tall?.48:.3),ph=h*(tall?.25:.51);
    const direction=layer%2?1:-1;
    panel(i,w*.5-pw/2+direction*w*(.25+layer*.045-speed*.035),h*.32-ph/2+(layer-2)*h*.055,pw,ph,(1-lock)*(.32-layer*.035),direction*.08,direction*.09);
  }
  const push=1+progress*.05;
  const pw=w*(tall?.80:.53)*push,ph=h*(tall?.48:.76)*push;
  const dx=(focus%2?1:-1)*(1-speed)*w*.07;
  panel(focus,(w-pw)/2+dx,h*(tall?.36:.43)-ph/2,pw,ph,1-lock,(focus%2?1:-1)*(.045-progress*.03),(1-speed)*.08);
  if(lock>0) {finalComposition(w,h,tall,lock);title(lock,w,h,tall,lock);}
  ctx.globalAlpha=1;
}
function context() {
  if(!audioContext) {
    const AudioContext=window.AudioContext||window.webkitAudioContext;
    if(!AudioContext) throw Error('Local audio playback is unavailable in this browser. Silent preview remains available.');
    audioContext=new AudioContext();
    audioContext.addEventListener('statechange',()=> {
      if(running&&audioContext.state!=='running') interrupt('Audio was interrupted. Press Play to resume.');
    });
  }
  return audioContext;
}
function stopSource() {if(source) {try{source.stop();}catch{}source.disconnect();source=null;}}
function stop() {cancelAnimationFrame(raf);running=false;pause.disabled=true;stopSource();}
function currentPosition() {return Math.min(duration,Math.max(0,(audioContext.currentTime-clockStart)*1000));}
function timeline() {
  $('position').value=(elapsed/1000).toFixed(2);$('position-time').value=`${(elapsed/1000).toFixed(2)} / ${SECONDS.toFixed(2)} seconds`;
  $('position').setAttribute('aria-valuetext',`${(elapsed/1000).toFixed(2)} of ${SECONDS} seconds`);
  waveContext.clearRect(0,0,wave.width,wave.height);waveContext.fillStyle=color.bg;waveContext.fillRect(0,0,wave.width,wave.height);
  if(!buffer||!analysis) return;
  const scale=wave.width/buffer.duration;
  waveContext.fillStyle=color.accent;waveContext.fillRect(excerptStart*scale,0,SECONDS*scale,wave.height);
  const max=analysis.peak;
  waveContext.strokeStyle=color.muted;waveContext.beginPath();
  for(let x=0;x<wave.width;x++) {
    const a=Math.floor(x/wave.width*analysis.envelope.length),b=Math.max(a+1,Math.floor((x+1)/wave.width*analysis.envelope.length));
    let peak=0;for(let j=a;j<b;j++) peak=Math.max(peak,analysis.envelope[j]||0);
    const amp=peak/max*wave.height*.43;waveContext.moveTo(x,wave.height/2-amp);waveContext.lineTo(x,wave.height/2+amp);
  }
  waveContext.stroke();waveContext.strokeStyle=color.line;waveContext.lineWidth=1;
  for(const event of timing.measured) {const x=(excerptStart+event.time)*scale;waveContext.beginPath();waveContext.moveTo(x,0);waveContext.lineTo(x,wave.height*.22);waveContext.stroke();}
  waveContext.strokeStyle=color.text;waveContext.lineWidth=2;
  const cursor=(excerptStart+elapsed/1000)*scale;waveContext.beginPath();waveContext.moveTo(cursor,0);waveContext.lineTo(cursor,wave.height);waveContext.stroke();
}
function tick() {
  elapsed=currentPosition();render(elapsed);timeline();
  if(elapsed<duration) raf=requestAnimationFrame(tick);
  else {stop();if(recording) recorder.stop();else status.textContent='Preview complete. Static title frame.';}
}
async function start(withAudio=true) {
  const ac=context();await ac.resume();
  if(ac.state!=='running') throw Error('Audio playback is blocked. Try Play again.');
  stop();clockStart=ac.currentTime-elapsed/1000;
  if(buffer&&withAudio) {
    source=ac.createBufferSource();source.buffer=buffer;source.connect(ac.destination);
    if(recordingDestination) source.connect(recordingDestination);
    source.start(0,excerptStart+elapsed/1000,Math.max(.001,SECONDS-elapsed/1000));
  }
  running=true;pause.disabled=recording;raf=requestAnimationFrame(tick);
}
function staticFrame(message='Static title frame.') {stop();elapsed=duration;render();timeline();status.textContent=message;}
function interrupt(message) {
  if(running) elapsed=currentPosition();
  stop();if(recording) {failedExport=true;if(recorder.state!=='inactive') recorder.stop();}
  status.textContent=message;
}
function updateTiming() {
  timing=excerptTiming(analysis?.events||[],excerptStart,Boolean(buffer));
  $('analysis').textContent=buffer?`${timing.measured.length} measured transients in this excerpt; ${timing.cuts.length} used for panel cuts. ${timing.cuts.length?'':'No usable cut transients: continuous camera motion. '}Final reveal at ${timing.reveal.toFixed(2)} seconds (${timing.measured.some(e=>e.time===timing.reveal)?'measured transient':'editorial hold'}). No BPM is assumed.`:'No audio selected. Silent timing uses fixed editorial cuts.';
  $('excerpt-summary').textContent=`15-second excerpt: ${excerptStart.toFixed(2)}–${(excerptStart+SECONDS).toFixed(2)} seconds.`;
  $('excerpt').setAttribute('aria-valuetext',`${excerptStart.toFixed(2)} seconds; 15-second excerpt`);
  timeline();
}
function combinedSupport() {
  if(!canvas.captureStream||!globalThis.MediaRecorder||!window.MediaStream) return '';
  return ['video/mp4;codecs=avc1.42E01E,mp4a.40.2','video/mp4;codecs=avc1.420028,opus','video/mp4;codecs=avc1,opus','video/mp4'].find(type=>MediaRecorder.isTypeSupported(type))||'';
}
function silentSupport() {
  if(!canvas.captureStream||!globalThis.MediaRecorder) return '';
  return ['video/webm;codecs=vp9','video/webm;codecs=vp8','video/mp4'].find(type=>MediaRecorder.isTypeSupported(type))||'';
}
function controls() {
  const busy=recording||decoding;
  for(const id of ['play','replay','static','poster','format','audio-file','motion','position']) $(id).disabled=busy;
  for(const id of ['excerpt','excerpt-number','clear-audio']) $(id).disabled=busy||!buffer;
  $('export').disabled=busy||!silentSupport();$('export-audio').disabled=busy||!buffer||!combinedSupport();
  $('export-help').textContent=combinedSupport()?'Teaser export produces one MP4 with the selected recording embedded. Import once; no second upload or separate soundtrack is required.':'This browser cannot encode combined MP4. Use a browser with MP4 recording support; this page will not substitute a silent teaser or separate soundtrack.';
  pause.disabled=!running||recording;
}
play.addEventListener('click',async()=> {
  if(elapsed>=duration) elapsed=0;
  try{await start();status.textContent=buffer?'Playing selected audio excerpt and synchronized panels.':'Playing 15-second silent preview.';}
  catch(error){stop();status.textContent=error.message;}
});
$('replay').addEventListener('click',async()=> {
  stop();elapsed=0;
  try{await start();status.textContent='Replaying from the selected excerpt start.';}catch(error){stop();status.textContent=error.message;}
});
pause.addEventListener('click',()=>{elapsed=currentPosition();stop();timeline();status.textContent='Paused. Play resumes audio and animation together.';});
$('static').addEventListener('click',()=>staticFrame());
$('position').addEventListener('input',()=>{stop();elapsed=Number($('position').value)*1000;render(elapsed);timeline();status.textContent='Paused at selected preview position. Play resumes here.';});
format.addEventListener('change',()=>{const tall=format.value==='tall';canvas.width=tall?1080:1920;canvas.height=tall?1920:1080;stage.classList.toggle('tall',tall);staticFrame();});
$('motion').value=motionPreference.matches?'static':'cinematic';
$('motion').addEventListener('change',()=>staticFrame());
motionPreference.addEventListener('change',()=>{interrupt('Motion preference changed. Static title frame.');$('motion').value=motionPreference.matches?'static':'restrained';staticFrame();});
document.addEventListener('visibilitychange',()=>{if(document.hidden&&running) interrupt('Paused while tab is hidden. Interrupted exports are discarded.');});
for(const id of ['excerpt','excerpt-number']) $(id).addEventListener('input',()=> {
  stop();excerptStart=Math.max(0,Math.min(Number($(id).value)||0,Math.max(0,(buffer?.duration||SECONDS)-SECONDS)));
  $('excerpt').value=$('excerpt-number').value=excerptStart.toFixed(2);elapsed=0;updateTiming();render(0);status.textContent='Excerpt updated. Press Play to audition.';
});
function clearAudio() {
  loadVersion++;stop();buffer=null;analysis=null;excerptStart=0;fileInput.value='';
  $('excerpt').value=$('excerpt-number').value='0';$('excerpt').max=$('excerpt-number').max='0';
  $('audio-info').textContent='No audio selected. Silent editorial timing.';decoding=false;controls();updateTiming();staticFrame();
}
$('clear-audio').addEventListener('click',clearAudio);
fileInput.addEventListener('change',async()=> {
  const file=fileInput.files[0];if(!file) return;
  clearAudio();const version=++loadVersion;decoding=true;controls();$('audio-info').textContent='Decoding and analyzing locally. No upload.';
  try {
    if(!/\.(wav|m4a|mp3)$/i.test(file.name)) throw Error('Choose a WAV, M4A or MP3 file.');
    const decoded=await context().decodeAudioData(await file.arrayBuffer());
    if(decoded.duration<SECONDS) throw Error(`Choose audio at least ${SECONDS} seconds long.`);
    if(version!==loadVersion) return;
    const measured=analyzePCM(decoded);measured.peak=measured.envelope.reduce((peak,value)=>Math.max(peak,value),.001);buffer=decoded;analysis=measured;
    $('excerpt').max=$('excerpt-number').max=String(buffer.duration-SECONDS);
    $('audio-info').textContent=`${file.name} · ${buffer.duration.toFixed(2)} seconds · decoded and analyzed locally. ${analysis.events.length} measured transients.`;
    updateTiming();staticFrame();
  }catch(error) {if(version===loadVersion) {buffer=null;analysis=null;$('audio-info').textContent=`Unable to load this file: ${error.message} If its codec is unsupported, convert it locally to PCM WAV. Silent preview remains available.`;}}
  finally {if(version===loadVersion) {decoding=false;controls();}}
});
function save(blob,name) {
  const url=URL.createObjectURL(blob),a=document.createElement('a');a.href=url;a.download=name;a.click();setTimeout(()=>URL.revokeObjectURL(url),10000);
}
$('poster').addEventListener('click',()=>{staticFrame();canvas.toBlob(blob=>{if(blob) save(blob,`loptr-lab-${format.value}-static.png`);},'image/png');});
async function exportVideo(withAudio) {
  const mimeType=withAudio?combinedSupport():silentSupport();if(!mimeType) return;
  stop();elapsed=0;render(0);timeline();failedExport=false;exportingAudio=withAudio;
  let stream;
  try {
    const ac=context();await ac.resume();
    if(withAudio) recordingDestination=ac.createMediaStreamDestination();
    stream=canvas.captureStream(30);
    if(withAudio) for(const track of recordingDestination.stream.getAudioTracks()) stream.addTrack(track);
    const chunks=[];recorder=new MediaRecorder(stream,{mimeType,videoBitsPerSecond:12000000,audioBitsPerSecond:192000});
    recording=true;controls();$('download').hidden=true;
    recorder.ondataavailable=event=>{if(event.data.size) chunks.push(event.data);};
    recorder.onerror=()=>{failedExport=true;if(recorder.state!=='inactive') recorder.stop();};
    recorder.onstop=async()=> {
      stop();stream.getTracks().forEach(track=>track.stop());recordingDestination=null;
      if(downloadURL) URL.revokeObjectURL(downloadURL);
      if(elapsed>=duration&&!failedExport&&chunks.length) {
        const blob=new Blob(chunks,{type:recorder.mimeType||mimeType});
        try {if(exportingAudio) requireAudioVideoMP4(await blob.arrayBuffer(),SECONDS);}
        catch(error) {recording=false;controls();$('download').hidden=true;status.textContent='No teaser was created: '+error.message;return;}
        downloadURL=URL.createObjectURL(blob);$('download').href=downloadURL;
        $('download').download=`${exportingAudio?'rapid-fire-regret-15s':'loptr-lab'}-${format.value}.${mimeType.includes('mp4')?'mp4':'webm'}`;$('download').hidden=false;
        status.textContent=`${exportingAudio?'Audio-enabled MP4':'Silent'} 15-second video ready. Download video to save.`;
      } else {$('download').hidden=true;status.textContent='Export interrupted or encoder failed. No teaser was created. Retry MP4 export with this tab visible.';}
      recording=false;controls();
    };
    recorder.start();await start(withAudio);status.textContent=`Recording 15 seconds ${withAudio?'with selected audio':'silently'}. Keep this tab visible.`;
  }catch(error) {
    failedExport=true;stop();
    if(recorder&&recorder.state!=='inactive') recorder.stop();
    else {recording=false;stream?.getTracks().forEach(track=>track.stop());recordingDestination?.stream.getTracks().forEach(track=>track.stop());recordingDestination=null;controls();}
    status.textContent='MP4 encoding unavailable. No incomplete or silent teaser was created. Try a browser supporting MP4 MediaRecorder with audio. '+error.message;
  }
}
$('export').addEventListener('click',()=>exportVideo(false));$('export-audio').addEventListener('click',()=>exportVideo(true));
// Read-only transport information for acceptance tests and manual sync inspection.
export function transportState() {return {elapsed:elapsed/1000,audioOffset:buffer?excerptStart+elapsed/1000:null,audioClock:audioContext?.currentTime,clockStart,running,hasSource:Boolean(source),excerptStart,cuts:timing.cuts,reveal:timing.reveal,recording};}
try {
  images=await Promise.all(projects.map(([,src])=>new Promise((resolve,reject)=>{const image=new Image();image.onload=()=>resolve(image);image.onerror=reject;image.src=src;})));
  document.querySelector('.fallback').hidden=true;canvas.hidden=false;document.querySelector('.controls').hidden=false;document.querySelector('.audio-panel').hidden=false;document.querySelector('.legacy-exports').hidden=false;
  controls();updateTiming();staticFrame();
  if(!silentSupport()) status.textContent='Static frame ready. Browser video encoding unavailable; static PNG download remains available.';
}catch {status.textContent='Motion assets unavailable. The static HTML title remains available.';}
