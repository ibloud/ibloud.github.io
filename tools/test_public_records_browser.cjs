// Test-only dependencies: playwright and @axe-core/playwright (no runtime dependencies).
// Start: python3 -m http.server 4173 --directory . --bind 127.0.0.1
// NODE_PATH=<test-dependencies>/node_modules node tools/test_public_records_browser.cjs
const {chromium} = require('playwright');
const {default: AxeBuilder} = require('@axe-core/playwright');
const assert = require('node:assert/strict');
const fs = require('node:fs');
const BASE = process.env.TEST_BASE || 'http://127.0.0.1:4173';
const DID='did:plc:o6kuv3yieti2vqrb7ckmd5vg', C='app.bsky.feed.post';
const record=(key,text='Public test fixture')=>({uri:`at://${DID}/${C}/${key}`,cid:'bafyreifixture',value:{$type:C,text,createdAt:'2026-11-09T10:00:00Z'}});
const identity={id:DID,service:[{id:'#atproto_pds',type:'AtprotoPersonalDataServer',serviceEndpoint:'https://eurosky.social'}]};
(async()=>{
 const browser=await chromium.launch({executablePath:process.env.CHROMIUM_PATH||'/usr/bin/chromium',headless:true,args:['--no-sandbox']});
 const context=await browser.newContext();const page=await context.newPage();let thirdParty=0,mode='normal',commentPage=0;
 await page.route('https://**/*',async route=>{
  thirdParty++;const url=new URL(route.request().url());
  assert.equal(route.request().method(),'GET');assert.equal(route.request().headers().authorization,undefined);
  if(url.hostname==='plc.directory') return route.fulfill({json:identity});
  if(url.hostname==='eurosky.social') {
   if(mode==='outage') return route.fulfill({status:503,json:{error:'Unavailable'}});
   if(mode==='malformed') return route.fulfill({body:'not json',contentType:'application/json'});
   if(mode==='deleted') return route.fulfill({json:{records:[]}});
   if(mode==='invalid') return route.fulfill({json:{records:[{uri:'javascript:evil'}]}});
   return route.fulfill({json:{records:url.searchParams.has('cursor')?[record('one','Edited public fixture'),record('two')]:[record('one','<img src=x onerror="window.pwned=1">')],cursor:'repeat'}});
  }
  if(url.hostname==='api.github.com') {commentPage++;
   const item={id:1,html_url:'https://github.com/ibloud/ibloud.github.io/issues/50#issuecomment-1',body:'<script>window.pwned=1</script>',user:{login:'tester'},created_at:'2026-11-09T10:00:00Z',updated_at:'2026-11-09T11:00:00Z'};
   return route.fulfill({json:mode==='deleted'?[]:Array.from({length:commentPage===1?10:1},(_,i)=>({...item,id:i+1,html_url:item.html_url.replace(/-1$/,'-'+(i+1))}))});
  }
  throw Error(`Unexpected request ${url}`);
 });
 await page.goto(BASE+'/ecosystem/');await page.waitForTimeout(200);assert.equal(thirdParty,0,'no third-party requests before action');
 await page.locator('#records-load').click();await page.waitForFunction(()=>document.querySelector('#records-list article'));
 assert.equal(await page.locator('#records-list img').count(),0);assert.equal(await page.evaluate(()=>window.pwned),undefined);
 assert.equal(await page.locator('#records-list a').getAttribute('href'),`https://bsky.app/profile/${DID}/post/one`);
 await page.locator('#records-more').click();await page.waitForFunction(()=>document.querySelectorAll('#records-list article').length===2);
 assert.match(await page.locator('#records-status').innerText(),/Repeated cursor/);assert.ok(await page.locator('#records-more').isHidden());
 await page.locator('#records-clear').click();assert.equal(await page.locator('#records-list article').count(),0);
 for (const [testMode,message] of [['outage',/Could not/],['malformed',/Invalid JSON/],['invalid',/invalid entries omitted/],['deleted',/No published entries/]]) {
  mode=testMode;await page.locator('#records-load').click();await page.waitForFunction(()=>!document.querySelector('#records-load').disabled);
  assert.match(await page.locator('#records-status').innerText(),message);assert.equal(await page.locator('#records-list article').count(),0);
 }
 mode='normal';await page.locator('#feedback-load').click();await page.waitForFunction(()=>document.querySelectorAll('#feedback-list article').length===10);
 assert.equal(await page.locator('#feedback-list script').count(),0);await page.locator('#feedback-more').click();await page.waitForFunction(()=>!document.querySelector('#feedback-load').disabled);
 assert.equal(await page.locator('#feedback-list article').count(),10);assert.ok(await page.locator('#feedback-more').isHidden());
 mode='deleted';await page.locator('#feedback-load').click();await page.waitForFunction(()=>!document.querySelector('#feedback-load').disabled);assert.equal(await page.locator('#feedback-list article').count(),0);
 // Expiration tells users their snapshot is stale, without a background network request.
 mode='normal';await page.clock.install();await page.locator('#records-load').click();await page.waitForFunction(()=>!document.querySelector('#records-load').disabled);
 const before=thirdParty;await page.clock.fastForward(300001);assert.match(await page.locator('#records-status').innerText(),/over five minutes old/);assert.equal(thirdParty,before);await page.clock.resume();
 // Keyboard opens contextual guidance and reaches every reader action and persistent PIXIE link.
 await page.locator('#pixie-test-guidance summary').focus();await page.keyboard.press('Enter');assert.ok(await page.locator('#pixie-test-guidance').getAttribute('open')!==null);
 const visited=new Set();for(let i=0;i<35;i++){await page.keyboard.press('Tab');visited.add(await page.evaluate(()=>document.activeElement.id));}for(const id of ['records-load','records-clear','feedback-load','feedback-clear']) assert.ok(visited.has(id),'Tab reaches '+id);
 await page.locator('#records-clear').focus();await page.keyboard.press('Enter');assert.equal(await page.locator('#records-list article').count(),0);
 await page.locator('.pixie-launcher').focus();assert.match(await page.locator('.pixie-launcher').evaluate(el=>getComputedStyle(el).outlineStyle),/solid/);
 assert.equal(await page.locator('.pixie-launcher').getAttribute('href'),'https://pixie-project-companion-production.up.railway.app/');
 const results=[];
 // Refill so long URIs, hostile text and comment metadata participate in layout/a11y checks.
 mode='normal';await page.locator('#records-load').click();await page.waitForFunction(()=>!document.querySelector('#records-load').disabled);
 await page.locator('#feedback-load').click();await page.waitForFunction(()=>!document.querySelector('#feedback-load').disabled);
 for(const width of [320,768,1024,1440]) for(const theme of ['dark','light']) {
  await page.setViewportSize({width,height:1000});await page.evaluate(t=>document.documentElement.dataset.theme=t,theme);
  const report=await new AxeBuilder({page}).withTags(['wcag2a','wcag2aa','wcag21aa']).analyze();
  assert.deepEqual(report.violations.map(v=>({id:v.id,nodes:v.nodes.map(n=>n.target)})),[],`axe ${width}/${theme}`);
  assert.ok(await page.evaluate(()=>document.documentElement.scrollWidth<=innerWidth),`overflow ${width}/${theme}`);results.push(`${width}/${theme}: axe and layout pass`);
 }
 await page.setViewportSize({width:320,height:1000});await page.evaluate(()=>document.documentElement.style.fontSize='200%');
 assert.ok(await page.evaluate(()=>document.documentElement.scrollWidth<=innerWidth),'200% text reflow');
 await page.emulateMedia({reducedMotion:'reduce'});assert.equal(await page.evaluate(()=>getComputedStyle(document.documentElement).scrollBehavior),'auto');
 await page.screenshot({path:process.env.SCREENSHOT_PATH||'/tmp/public-test-320.png',fullPage:true});
 console.log(JSON.stringify({fixtureChecks:'PASS: consent, attribution, hostile text, pagination, deduplication, deletion, malformed/unavailable services, stale view, keyboard',accessibility:results,textEnlargement:'PASS 200% at 320px',reducedMotion:'PASS'},null,2));
 const noJS=await browser.newContext({javaScriptEnabled:false});const staticPage=await noJS.newPage();
 await staticPage.goto(BASE+'/ecosystem/');assert.ok(await staticPage.locator('noscript').isVisible());assert.equal(await staticPage.locator('a[href="https://github.com/ibloud/ibloud.github.io/issues/50"]').count(),1);await noJS.close();
 await browser.close();
})().catch(error=>{console.error(error);process.exit(1);});
