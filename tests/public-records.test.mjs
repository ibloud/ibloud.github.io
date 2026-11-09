import test from 'node:test';
import assert from 'node:assert/strict';
import { DID, COLLECTION, PDS, HAPPYVIEW, readJSON, readRecords, readComments, normalizeRecords, appendUnique } from '../assets/public-records.mjs';
const record = (key='abc', text='public text') => ({ uri:`at://${DID}/${COLLECTION}/${key}`, cid:'bafytestcid', value:{$type:COLLECTION,text,createdAt:'2026-11-09T10:00:00Z'} });
const identity = {id:DID,service:[{id:'#atproto_pds',type:'AtprotoPersonalDataServer',serviceEndpoint:PDS}]};
const comment = {id:1,html_url:'https://github.com/ibloud/ibloud.github.io/issues/50#issuecomment-1',body:'Public feedback',user:{login:'test-user'},created_at:'2026-11-09T10:00:00Z',updated_at:'2026-11-09T11:00:00Z'};
const ok = data => ({ok:true,json:async()=>data});
test('record attribution preserves canonical identity, URI, collection, CID, date and text',()=>{
 const raw=record('abc','<script>alert(1)</script>'); const {items}=normalizeRecords({records:[raw]});
 assert.deepEqual(items[0],{uri:raw.uri,cid:raw.cid,did:DID,collection:COLLECTION,createdAt:raw.value.createdAt,text:raw.value.text,source:`https://bsky.app/profile/${DID}/post/abc`});
});
test('malformed responses and cursors fail closed',()=>{
 for(const data of [null,{}, {records:null},{records:[],cursor:{}},{records:[],cursor:''},{records:Array(6).fill(record())}]) assert.throws(()=>normalizeRecords(data));
});
test('malformed records, wrong-author and URI injection are omitted',()=>{
 const invalid=[{...record(),uri:'javascript:alert(1)'},{...record(),uri:`at://${DID}/${COLLECTION}/x?query=bad`},{...record(),value:{text:'wrong type',createdAt:'today'}},{...record(),cid:12}];
 assert.equal(normalizeRecords({records:invalid}).skipped,4);
});
test('deduplication preserves order and updates same-URI records',()=>{
 assert.deepEqual(appendUnique([{uri:'a',text:'old'}],[{uri:'a',text:'edited'},{uri:'b'}]),[{uri:'a',text:'edited'},{uri:'b'}]);
 assert.deepEqual(normalizeRecords({records:[]}),{items:[],cursor:null,skipped:0});
});
test('public transport is GET-only, no credentials/cache/referrer and bounded timeout',async()=>{
 await readJSON('https://example.com',async(url,options)=>{assert.equal(options.method,'GET');assert.equal(options.credentials,'omit');assert.equal(options.cache,'no-store');assert.equal(options.referrerPolicy,'no-referrer');assert.equal(options.redirect,'error');assert.ok(options.signal);assert.deepEqual(options.headers,{Accept:'application/json'});return ok({});});
});
test('service errors, rate limits and invalid JSON reject without fabricated data',async()=>{
 for(const status of [403,429,500,503]) await assert.rejects(readJSON('url',async()=>({ok:false,status})));
 await assert.rejects(readJSON('url',async()=>({ok:true,json:async()=>{throw new SyntaxError('invalid JSON');}})));
});
test('PDS identity resolves on each page; opaque cursor is encoded, endpoint is pinned',async()=>{
 let calls=[]; const mock=async(url)=>{calls.push(String(url));return ok(calls.length%2?identity:{records:[record()],cursor:'next &/?'});};
 const first=await readRecords(null,mock); await readRecords(first.cursor,mock);
 assert.equal(calls.filter(u=>u.startsWith('https://plc.directory/')).length,2);
 const url=new URL(calls[3]);assert.equal(url.origin,PDS);assert.equal(url.searchParams.get('cursor'),'next &/?');assert.equal(url.searchParams.get('repo'),DID);assert.equal(url.searchParams.get('reverse'),'false');
});
test('changed identity/PDS never follows unreviewed endpoints',async()=>{
 let calls=0;await assert.rejects(readRecords(null,async()=>{calls++;return ok({...identity,service:[{...identity.service[0],serviceEndpoint:'https://attacker.test'}]});}));assert.equal(calls,1);
});
test('comments validate sources and authors; full page paginates and partial page ends',async()=>{
 const result=await readComments(1,async()=>ok(Array.from({length:10},(_,i)=>({...comment,id:i+1,html_url:comment.html_url.replace(/-1$/,'-'+(i+1))})))); assert.equal(result.nextPage,2);
 assert.equal((await readComments(2,async()=>ok([comment]))).nextPage,null);
 const bad=await readComments(1,async()=>ok([{...comment,html_url:'javascript:alert(1)'},{...comment,user:{login:'<img>'}}]));assert.equal(bad.skipped,2);
 await assert.rejects(readComments(0));await assert.rejects(readComments(1,async()=>ok({comments:[]})));
});
test('HappyView remains explicitly pending with no invented endpoint',()=>{assert.equal(HAPPYVIEW.status,'pending');assert.equal(HAPPYVIEW.endpoint,null);assert.ok(Object.isFrozen(HAPPYVIEW));});
