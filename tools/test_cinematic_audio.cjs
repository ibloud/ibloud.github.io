const assert=require('node:assert/strict');
const {chromium}=require('playwright');
const {default:AxeBuilder}=require('@axe-core/playwright');
const {pathToFileURL}=require('node:url');
const path=require('node:path');
(async()=>{
 const {excerptWAV}=await import(pathToFileURL(path.resolve(__dirname,'../cinematic/audio.mjs')));
 const rate=48000,pcm=new Float32Array(rate*12);
 for(let i=0;i<pcm.length;i++) pcm[i]=.025*Math.sin(i/rate*2*Math.PI*220);
 for(const t of [.6,1.3,2.1,2.7,3.3,4.4,6.6,7.3,8.1,8.7,9.3,10.4]) for(let i=0;i<rate*.08;i++) pcm[Math.round(t*rate)+i]+=.65*Math.sin(i/rate*2*Math.PI*880)*Math.exp(-i/(rate*.02));
 // Two six-second PCM blocks form a deterministic twelve-second local WAV.
 const wav=new Uint8Array(44+pcm.length*2),view=new DataView(wav.buffer);
 const header=new Uint8Array(excerptWAV({sampleRate:rate,numberOfChannels:1,getChannelData:()=>pcm},0));wav.set(header.slice(0,44));
 view.setUint32(4,wav.length-8,true);view.setUint32(40,pcm.length*2,true);
 for(let i=0;i<pcm.length;i++) view.setInt16(44+i*2,Math.max(-1,Math.min(1,pcm[i]))*32767,true);
 const browser=await chromium.launch({executablePath:process.env.CHROMIUM_PATH||'/usr/bin/chromium',args:['--no-sandbox']});
 const context=await browser.newContext({viewport:{width:820,height:1180},hasTouch:true,reducedMotion:'reduce',acceptDownloads:true});
 await context.addInitScript(()=>{window.audioStarts=[];const start=AudioBufferSourceNode.prototype.start;AudioBufferSourceNode.prototype.start=function(...args){window.audioStarts.push(args);return start.apply(this,args);};});
 const page=await context.newPage(),errors=[],unexpected=[];page.on('pageerror',e=>errors.push(e.message));
 page.on('request',request=>{if(request.method()!=='GET'||!request.url().startsWith(process.env.TEST_BASE||'http://127.0.0.1:4173')) unexpected.push(request.url());});
 const base=process.env.TEST_BASE||'http://127.0.0.1:4173';
 await page.goto(base+'/cinematic/');await page.waitForSelector('.audio-panel:not([hidden])');
 await page.locator('#audio-file').setInputFiles({name:'local-sync-test.wav',mimeType:'audio/wav',buffer:Buffer.from(wav)});
 await page.waitForFunction(()=>document.querySelector('#audio-info').textContent.includes('decoded and analyzed locally'));
 assert.match(await page.locator('#analysis').innerText(),/measured transients/);
 assert.equal(await page.evaluate(()=>window.audioStarts.length),0);
 await page.locator('#excerpt-number').fill('2');await page.locator('#excerpt-number').dispatchEvent('input');
 assert.match(await page.locator('#excerpt-summary').innerText(),/2.00–8.00/);
 const staticPixels=await page.locator('.stage canvas').evaluate(canvas=>canvas.toDataURL());
 await page.locator('#play').click();await page.waitForTimeout(650);
 assert.equal(await page.locator('.stage canvas').evaluate(canvas=>canvas.toDataURL()),staticPixels);
 let state=await page.evaluate(async()=> (await import('/cinematic/title.js')).transportState());
 assert(state.running&&state.hasSource);assert(Math.abs(state.elapsed-(state.audioClock-state.clockStart))<.12);
 assert.equal(await page.evaluate(()=>window.audioStarts.at(-1)[1]),2);
 await page.locator('#pause').click();
 const paused=await page.evaluate(async()=> (await import('/cinematic/title.js')).transportState());
 await page.waitForTimeout(300);state=await page.evaluate(async()=> (await import('/cinematic/title.js')).transportState());
 assert.equal(state.elapsed,paused.elapsed);assert(!state.hasSource);
 await page.locator('#play').click();assert(Math.abs(await page.evaluate(()=>window.audioStarts.at(-1)[1])-(2+paused.elapsed))<.1);
 await page.locator('#replay').click();assert.equal(await page.evaluate(()=>window.audioStarts.at(-1)[1]),2);
 await page.locator('#static').click();
 for(const viewport of [{width:820,height:1180},{width:1180,height:820},{width:768,height:1024},{width:320,height:900}]) {
  await page.setViewportSize(viewport);assert(await page.evaluate(()=>document.documentElement.scrollWidth<=innerWidth));
  const axe=await new AxeBuilder({page}).withTags(['wcag2a','wcag2aa','wcag21aa']).analyze();assert.deepEqual(axe.violations,[]);
 }
 await page.setViewportSize({width:320,height:900});
 await page.addStyleTag({content:'html{font-size:200%}'});assert(await page.evaluate(()=>document.documentElement.scrollWidth<=innerWidth));
 await page.reload();await page.waitForSelector('.audio-panel:not([hidden])');
 await page.locator('#audio-file').setInputFiles({name:'local-sync-test.wav',mimeType:'audio/wav',buffer:Buffer.from(wav)});
 await page.waitForFunction(()=>document.querySelector('#audio-info').textContent.includes('decoded and analyzed locally'));
 await page.locator('#excerpt-number').fill('2');await page.locator('#excerpt-number').dispatchEvent('input');
 await page.setViewportSize({width:820,height:1180});
 await page.locator('#export-audio').click();await page.waitForSelector('#download:not([hidden])',{timeout:20000});
 assert.match(await page.locator('#status').innerText(),/Audio-enabled/);
 const videoEvent=page.waitForEvent('download');await page.locator('#download').click();const video=await videoEvent;
 if(process.env.AUDIO_VIDEO_OUTPUT) await video.saveAs(process.env.AUDIO_VIDEO_OUTPUT);
 const excerptEvent=page.waitForEvent('download');await page.locator('#wav').click();const excerpt=await excerptEvent;
 if(process.env.EXCERPT_OUTPUT) await excerpt.saveAs(process.env.EXCERPT_OUTPUT);
 // Original silent option must not start a source even when audio is loaded.
 const before=await page.evaluate(()=>window.audioStarts.length);await page.locator('#export').click();await page.waitForSelector('#download:not([hidden])',{timeout:20000});
 assert.equal(await page.evaluate(()=>window.audioStarts.length),before);assert.match(await page.locator('#status').innerText(),/Silent/);
 await page.locator('#clear-audio').click();assert(await page.locator('#export-audio').isDisabled());
 await page.locator('#audio-file').setInputFiles({name:'corrupt.mp3',mimeType:'audio/mpeg',buffer:Buffer.from('not an audio recording')});
 await page.waitForFunction(()=>document.querySelector('#audio-info').textContent.includes('Unable to load'));
 assert(await page.locator('#export-audio').isDisabled());assert(await page.locator('#play').isEnabled());
 for(const file of (process.env.CODEC_FIXTURES||'').split(',').filter(Boolean)) {
  await page.locator('#audio-file').setInputFiles(file);
  await page.waitForFunction(()=>document.querySelector('#audio-info').textContent.includes('decoded and analyzed locally'));
  assert(await page.locator('#export-audio').isEnabled());
 }
 assert.deepEqual(unexpected,[]);assert.deepEqual(errors,[]);
 // Native combined-encoder capability fallback remains useful.
 const fallback=await browser.newContext();await fallback.addInitScript(()=>{const supported=MediaRecorder.isTypeSupported.bind(MediaRecorder);MediaRecorder.isTypeSupported=type=>type.includes('opus')||type.includes('mp4')?false:supported(type);});
 const fp=await fallback.newPage();await fp.goto(base+'/cinematic/');await fp.waitForSelector('.audio-panel:not([hidden])');
 await fp.locator('#audio-file').setInputFiles({name:'fallback.wav',mimeType:'audio/wav',buffer:Buffer.from(wav)});
 await fp.waitForFunction(()=>document.querySelector('#audio-info').textContent.includes('decoded and analyzed locally'));
 assert(await fp.locator('#export-audio').isDisabled());assert(await fp.locator('#wav').isEnabled());assert(await fp.locator('#export').isEnabled());
 await browser.close();console.log('PASS: local decode, measured timing, no uploads, audio-clock sync, pause/resume/replay offsets, iPad portrait/landscape layout and axe, combined export, WAV fallback, silent isolation, corrupt audio recovery, encoder fallback.');
})().catch(error=>{console.error(error);process.exit(1);});
