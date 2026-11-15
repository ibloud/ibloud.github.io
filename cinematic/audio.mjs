// Pure local PCM analysis. Events are measured onsets, not a claim of musical BPM.
export const SECONDS = 6;
export function analyzePCM(buffer) {
  const channels = Array.from({length: buffer.numberOfChannels}, (_, i) => buffer.getChannelData(i));
  const hop = Math.max(1, Math.round(buffer.sampleRate * .01));
  const envelope = [], flux = [];
  let previous = 0;
  for (let start = 0; start < buffer.length; start += hop) {
    let sum = 0, count = 0;
    for (let j = start; j < Math.min(start + hop, buffer.length); j += 4) {
      let sample = 0;for (const channel of channels) sample += channel[j] / channels.length;
      sum += sample * sample;count++;
    }
    const level = Math.sqrt(sum / Math.max(1, count));
    envelope.push(level);flux.push(Math.max(0, level - previous));previous = level;
  }
  const sorted = [...flux].sort((a,b) => a-b), median = sorted[Math.floor(sorted.length / 2)] || 0;
  const deviations = flux.map(value => Math.abs(value - median)).sort((a,b) => a-b);
  const threshold = Math.max(.008, median + 4 * (deviations[Math.floor(deviations.length / 2)] || 0));
  const candidates = [];
  for (let i = 1; i < flux.length - 1; i++) {
    if (flux[i] > threshold && flux[i] >= flux[i-1] && flux[i] > flux[i+1]) candidates.push({time:i * hop / buffer.sampleRate, strength:flux[i]});
  }
  const events = [];
  for (const event of candidates.sort((a,b) => b.strength - a.strength)) {
    if (events.every(other => Math.abs(event.time - other.time) >= .35)) events.push(event);
  }
  return {envelope,hopSeconds:hop/buffer.sampleRate,events:events.sort((a,b) => a.time-b.time)};
}
export function excerptTiming(events = [], start = 0, hasAudio = false) {
  const measured = events.filter(event => event.time >= start && event.time < start + SECONDS).map(event => ({...event,time:event.time-start}));
  const cuts = measured.filter(event => event.time >= .45 && event.time <= 3.55).sort((a,b) => b.strength-a.strength).slice(0,4).sort((a,b) => a.time-b.time).map(event => event.time);
  const reveal = measured.filter(event => event.time >= 4.05 && event.time <= 4.65).sort((a,b) => b.strength-a.strength)[0]?.time || 4.25;
  return {cuts:hasAudio ? cuts : [.8,1.6,2.3,2.95],reveal,measured};
}
export function excerptWAV(buffer, start) {
  const frames = Math.round(SECONDS * buffer.sampleRate), channels = Math.min(2,buffer.numberOfChannels);
  const data = new ArrayBuffer(44 + frames * channels * 2), view = new DataView(data);
  const word = (offset,text) => {for (let i=0;i<text.length;i++) view.setUint8(offset+i,text.charCodeAt(i));};
  word(0,'RIFF');view.setUint32(4,data.byteLength-8,true);word(8,'WAVE');word(12,'fmt ');view.setUint32(16,16,true);
  view.setUint16(20,1,true);view.setUint16(22,channels,true);view.setUint32(24,buffer.sampleRate,true);view.setUint32(28,buffer.sampleRate*channels*2,true);
  view.setUint16(32,channels*2,true);view.setUint16(34,16,true);word(36,'data');view.setUint32(40,data.byteLength-44,true);
  const offset = Math.round(start * buffer.sampleRate);
  for(let i=0;i<frames;i++) for(let c=0;c<channels;c++) {
    const sample = Math.max(-1,Math.min(1,buffer.getChannelData(c)[offset+i] || 0));
    view.setInt16(44+(i*channels+c)*2,sample<0?sample*32768:sample*32767,true);
  }
  return data;
}
