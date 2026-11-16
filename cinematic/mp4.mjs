// Inspect ISO-BMFF tracks before offering an audio-enabled teaser download.
// No codec relabeling: WebM bytes are never renamed to .mp4.
export function inspectMP4(data) {
  const view=new DataView(data);
  const text=(offset,length)=>String.fromCharCode(...new Uint8Array(data,offset,length));
  function boxes(start,end) {
    const result=[];
    for(let offset=start;offset+8<=end;) {
      let size=view.getUint32(offset),header=8;
      const type=text(offset+4,4);
      if(size===1) {if(offset+16>end) throw Error('Truncated MP4 box');size=Number(view.getBigUint64(offset+8));header=16;}
      if(size===0) size=end-offset;
      if(size<header||!Number.isSafeInteger(size)||offset+size>end) throw Error('Invalid MP4 box size');
      result.push({type,start:offset+header,end:offset+size});offset+=size;
    }
    return result;
  }
  const top=boxes(0,data.byteLength),movie=top.find(box=>box.type==='moov');
  if(!top.some(box=>box.type==='ftyp')||!movie) throw Error('Encoder did not produce an MP4 movie');
  const movieHeader=boxes(movie.start,movie.end).find(box=>box.type==='mvhd');
  let duration=null;
  if(movieHeader) {
    const version=view.getUint8(movieHeader.start),offset=version===1?20:12;
    const needed=offset+4+(version===1?8:4);
    if(movieHeader.end-movieHeader.start<needed) throw Error('Truncated MP4 movie header');
    const scale=view.getUint32(movieHeader.start+offset);
    const ticks=version===1?Number(view.getBigUint64(movieHeader.start+offset+4)):view.getUint32(movieHeader.start+offset+4);
    if(scale) duration=ticks/scale;
  }
  const handlers=[];
  for(const track of boxes(movie.start,movie.end).filter(box=>box.type==='trak')) {
    const media=boxes(track.start,track.end).find(box=>box.type==='mdia');if(!media) continue;
    const handler=boxes(media.start,media.end).find(box=>box.type==='hdlr');
    if(handler&&handler.end-handler.start>=12) handlers.push(text(handler.start+8,4));
  }
  return {hasVideo:handlers.includes('vide'),hasAudio:handlers.includes('soun'),handlers,duration};
}
export function requireAudioVideoMP4(data, expectedDuration) {
  const tracks=inspectMP4(data);
  if(!tracks.hasVideo||!tracks.hasAudio) throw Error('MP4 must contain both video and audio tracks');
  if(expectedDuration!==undefined&&(!Number.isFinite(tracks.duration)||Math.abs(tracks.duration-expectedDuration)>.15)) throw Error('Recorder timing is outside the 15-second tolerance. Use the exact local MP4 renderer.');
  return tracks;
}
