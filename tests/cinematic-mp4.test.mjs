import {test} from 'node:test';
import assert from 'node:assert/strict';
import {requireAudioVideoMP4} from '../cinematic/mp4.mjs';
const box=(type,...payload)=>{const data=Buffer.concat(payload);const result=Buffer.alloc(8+data.length);result.writeUInt32BE(result.length);result.write(type,4);data.copy(result,8);return result;};
const track=type=>box('trak',box('mdia',box('hdlr',Buffer.alloc(8),Buffer.from(type),Buffer.alloc(12))));
const movie=(...tracks)=>{const data=Buffer.concat([box('ftyp',Buffer.from('isom0000')),box('moov',...tracks)]);return data.buffer.slice(data.byteOffset,data.byteOffset+data.byteLength);};
test('teaser export rejects MP4 with missing sound or picture rather than delivering a silent file',()=>{
 assert.throws(()=>requireAudioVideoMP4(movie(track('vide'))),/both video and audio/);
 assert.throws(()=>requireAudioVideoMP4(movie(track('soun'))),/both video and audio/);
 assert.deepEqual(requireAudioVideoMP4(movie(track('vide'),track('soun'))).handlers,['vide','soun']);
});
test('renamed WebM and damaged MP4 bytes cannot pass teaser container validation',()=>{
 assert.throws(()=>requireAudioVideoMP4(new Uint8Array([0x1a,0x45,0xdf,0xa3,0,0,0,0]).buffer));
 assert.throws(()=>requireAudioVideoMP4(new Uint8Array([0,0,255,255,0,0,0,0]).buffer));
});

test('an overlong native recording is refused instead of being labelled a 15-second teaser',()=>{
 const header=Buffer.alloc(100);header.writeUInt32BE(1000,12);header.writeUInt32BE(17386,16);
 assert.throws(()=>requireAudioVideoMP4(movie(box('mvhd',header),track('vide'),track('soun')),15),/timing/);
});
