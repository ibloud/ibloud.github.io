import {test} from 'node:test';
import assert from 'node:assert/strict';
import {analyzePCM,excerptTiming,excerptWAV} from '../cinematic/audio.mjs';
function fixture() {
 const rate=48000,pcm=new Float32Array(rate*12);
 for(const t of [.75,1.5,2.25,3,4.3,6.7,7.4,8.1,8.8,10.3]) for(let i=0;i<rate*.08;i++) pcm[Math.round(t*rate)+i]=.7*Math.sin(i/rate*2*Math.PI*440)*Math.exp(-i/(rate*.015));
 return {sampleRate:rate,numberOfChannels:1,length:pcm.length,getChannelData:()=>pcm};
}
test('local PCM onset detection follows known transients and excerpt offsets',()=>{
 const events=analyzePCM(fixture()).events;
 for(const time of [.75,1.5,2.25,3,4.3,6.7,7.4,8.1,8.8,10.3]) assert(events.some(e=>Math.abs(e.time-time)<.04));
 const timing=excerptTiming(events,6,true);assert.equal(timing.cuts.length,4);
 for(const cut of timing.cuts) assert(events.some(e=>Math.abs(e.time-6-cut)<.001));
 assert(Math.abs(timing.reveal-4.3)<.04);
});
test('silence does not fabricate audio beats; silent editorial preset is explicit',()=>{
 const silent={sampleRate:48000,length:48000*7,numberOfChannels:1,getChannelData:()=>new Float32Array(48000*7)};
 assert.deepEqual(analyzePCM(silent).events,[]);assert.deepEqual(excerptTiming([],0,true).cuts,[]);
 assert.equal(excerptTiming([],0,false).cuts.length,4);
});
test('fallback WAV contains exactly six seconds from selected PCM offset',()=>{
 const data=new DataView(excerptWAV(fixture(),6));assert.equal(data.getUint32(40,true),48000*6*2);
 assert.equal(data.getUint32(24,true),48000);assert.equal(data.getUint16(22,true),1);
 assert.equal(data.getInt16(44,true),0);assert.notEqual(data.getInt16(44+(Math.round(.7*48000)+17)*2,true),0);
});
