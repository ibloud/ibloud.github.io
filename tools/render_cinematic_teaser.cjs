// Existing Playwright + FFmpeg tooling. Local input -> one 15s H.264/AAC MP4.
// Source audio is read from disk and never published or sent to a remote server.
const fs=require('node:fs'),path=require('node:path'),http=require('node:http');
const {spawn,spawnSync}=require('node:child_process');
const {once}=require('node:events');
const {createHash}=require('node:crypto');
const {chromium}=require('playwright');
const root=path.resolve(__dirname,'..'),args=process.argv.slice(2);
const option=(name,fallback)=>{const i=args.indexOf(name);return i<0?fallback:args[i+1];};
const source=option('--audio'),output=option('--output'),start=Number(option('--start','0')),format=option('--format','wide');
if(!source||!output||!Number.isFinite(start)||start<0||!['wide','tall'].includes(format)) {
 console.error('Usage: node tools/render_cinematic_teaser.cjs --audio /existing/original.wav --output /private/teaser.mp4 [--start 0] [--format wide|tall]');process.exit(1);
}
const input=path.resolve(source),target=path.resolve(output),seconds=15,fps=30;
const staging=target+'.render-'+process.pid+'.mp4';
if(!fs.statSync(input).isFile()||path.extname(target).toLowerCase()!=='.mp4'||input===target) throw Error('Use an existing audio file and a distinct .mp4 output path.');
if(fs.existsSync(target)||fs.existsSync(staging)||fs.existsSync(target+'.verification.json')) throw Error('Output already exists; choose another filename to preserve it.');
function probe(file) {
 const p=spawnSync('ffprobe',['-v','error','-show_streams','-show_format','-of','json',file],{encoding:'utf8'});
 if(p.status!==0) throw Error('ffprobe failed: '+p.stderr);return JSON.parse(p.stdout);
}
function decoded(file,offset,stream) {
 const p=spawnSync('ffmpeg',['-v','error',...(offset?['-ss',String(offset)]:[]),'-i',file,'-map',stream,'-t',String(seconds),'-ac','1','-ar','8000','-f','f32le','pipe:1'],{maxBuffer:2000000});
 if(p.status!==0) throw Error('Audio decode failed: '+p.stderr.toString());
 const result=[];for(let i=0;i+4<=p.stdout.length;i+=4) result.push(p.stdout.readFloatLE(i));return result;
}
function audioCorrelation(a,b) {
 // ±100ms search at 1ms resolution; coarse samples bound verification cost.
 let best={correlation:-1,lagSeconds:0};
 for(let lag=-800;lag<=800;lag+=8) {
  let dot=0,aa=0,bb=0;
  for(let i=800;i<Math.min(a.length,b.length)-800;i+=4) {const x=a[i],y=b[i+lag];dot+=x*y;aa+=x*x;bb+=y*y;}
  const correlation=dot/Math.sqrt(aa*bb||Infinity);
  if(correlation>best.correlation) best={correlation,lagSeconds:lag/8000};
 }
 return best;
}
const mime={'.html':'text/html','.js':'application/javascript','.mjs':'application/javascript','.css':'text/css','.png':'image/png','.jpeg':'image/jpeg','.svg':'image/svg+xml'};
let browser,encoder,server,done=false,ownsOutput=false;
(async()=>{
 const original=probe(input);
 if(!original.streams.some(s=>s.codec_type==='audio')||Number(original.format.duration)<start+seconds) throw Error('Source must contain the full selected 15-second audio excerpt.');
 fs.mkdirSync(path.dirname(target),{recursive:true});
 server=http.createServer((req,res)=>{
  const url=new URL(req.url,'http://127.0.0.1');
  if(req.method!=='GET') {res.writeHead(405).end();return;}
  const file=url.pathname==='/export.mp4'?staging:path.resolve(root,'.'+decodeURIComponent(url.pathname.endsWith('/')?url.pathname+'index.html':url.pathname));
  if(file!==staging&&(!file.startsWith(root+path.sep)||!['/cinematic/','/assets/'].some(prefix=>url.pathname.startsWith(prefix)))) {res.writeHead(404).end();return;}
  if(!fs.existsSync(file)||!fs.statSync(file).isFile()) {res.writeHead(404).end();return;}
  const length=fs.statSync(file).size;res.writeHead(200,{'Content-Type':file===staging?'video/mp4':mime[path.extname(file)]||'application/octet-stream','Content-Length':length,'Cache-Control':'no-store'});fs.createReadStream(file).pipe(res);
 });
 server.listen(0,'127.0.0.1');await once(server,'listening');const base='http://127.0.0.1:'+server.address().port;
 browser=await chromium.launch({executablePath:process.env.CHROMIUM_PATH||'/usr/bin/chromium',headless:true,args:['--no-sandbox','--autoplay-policy=no-user-gesture-required']});
 const page=await browser.newPage();await page.goto(base+'/cinematic/');await page.waitForSelector('.audio-panel:not([hidden])');
 await page.locator('#audio-file').setInputFiles(input);await page.waitForFunction(()=>!/Decoding/.test(document.querySelector('#audio-info').textContent));
 if(!await page.locator('#audio-info').textContent().then(text=>text.includes('decoded and analyzed locally'))) throw Error('Browser could not decode the supplied recording.');
 await page.locator('#excerpt-number').fill(String(start));await page.locator('#excerpt-number').dispatchEvent('input');await page.selectOption('#format',format);await page.selectOption('#motion','cinematic');
 const timing=await page.evaluate(async()=> (await import('/cinematic/title.js')).transportState());
 encoder=spawn('ffmpeg',['-v','error','-f','image2pipe','-framerate',String(fps),'-i','pipe:0','-ss',String(start),'-i',input,'-map','0:v:0','-map','1:a:0','-t',String(seconds),'-c:v','libx264','-preset','fast','-crf','18','-pix_fmt','yuv420p','-c:a','aac','-b:a','192k','-movflags','+faststart','-n',staging],{stdio:['pipe','ignore','pipe']});
 let failure='';encoder.stderr.on('data',chunk=>{failure=(failure+chunk).slice(-10000);});encoder.stdin.on('error',()=>{});
 const completion=once(encoder,'close');
 for(let frame=0;frame<seconds*fps;frame++) {
  const png=await page.evaluate(async t=>{(await import('/cinematic/title.js')).render(t);return document.querySelector('.stage canvas').toDataURL('image/png').split(',')[1];},frame*1000/fps);
  if(!encoder.stdin.write(Buffer.from(png,'base64'))) await Promise.race([once(encoder.stdin,'drain'),completion.then(()=>{throw Error('Encoder stopped: '+failure);})]);
  if(frame%90===0) process.stdout.write(`Rendered ${frame}/${seconds*fps} frames\n`);
 }
 encoder.stdin.end();const [code]=await completion;if(code!==0) throw Error('FFmpeg failed: '+failure);
 const result=probe(staging),video=result.streams.find(s=>s.codec_type==='video'),audio=result.streams.find(s=>s.codec_type==='audio');
 if(!video||!audio||video.codec_name!=='h264'||audio.codec_name!=='aac'||Math.abs(Number(result.format.duration)-seconds)>.04) throw Error('Output failed MP4 stream/duration verification.');
 const sync=audioCorrelation(decoded(input,start,'0:a:0'),decoded(staging,0,'0:a:0'));
 if(sync.correlation<.95||Math.abs(sync.lagSeconds)>.02) throw Error('Audio identity/synchronization check failed: '+JSON.stringify(sync));
 // Independent native player: no title.js/editor code, one exported MP4 URL.
 const player=await browser.newPage();await player.setContent('<!doctype html><html lang="en"><title>Standalone MP4 acceptance</title><video controls></video></html>');
 await player.locator('video').evaluate((v,src)=>{v.src=src;},base+'/export.mp4');await player.locator('video').evaluate(v=>v.play());
 await player.waitForFunction(()=>document.querySelector('video').ended,undefined,{timeout:30000});
 const playback=await player.locator('video').evaluate(v=>({ended:v.ended,duration:v.duration,currentTime:v.currentTime,width:v.videoWidth,height:v.videoHeight,error:v.error?.message||null,audioDecodedBytes:v.webkitAudioDecodedByteCount||0}));
 if(playback.error||!playback.ended||!playback.audioDecodedBytes||Math.abs(playback.duration-seconds)>.04) throw Error('Standalone playback check failed.');
 const hash=file=>createHash('sha256').update(fs.readFileSync(file)).digest('hex');
 const report={source:{name:path.basename(input),sha256:hash(input)},excerptStart:start,seconds,format,fps,frames:seconds*fps,measuredCuts:timing.cuts,reveal:timing.reveal,output:{name:path.basename(target),sha256:hash(staging),videoCodec:video.codec_name,audioCodec:audio.codec_name,duration:result.format.duration},sync,standalonePlayback:playback,rights:'Pending commercial-use review; no publication or source upload.'};
 fs.copyFileSync(staging,target,fs.constants.COPYFILE_EXCL);ownsOutput=true;
 fs.writeFileSync(target+'.verification.json',JSON.stringify(report,null,2)+'\n',{flag:'wx'});fs.unlinkSync(staging);done=true;console.log(JSON.stringify(report,null,2));
})().catch(error=>{console.error(error.message);process.exitCode=1;}).finally(async()=>{
 encoder?.kill();await browser?.close();server?.close();
 if(fs.existsSync(staging)) fs.unlinkSync(staging);
 if(!done&&ownsOutput&&fs.existsSync(target)) fs.unlinkSync(target);
});
