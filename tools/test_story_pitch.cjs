// Isolated test dependencies: playwright@1.65.0 and @axe-core/playwright@4.14.0.
// Serve this repository on port 4174, then run with NODE_PATH pointing to those tools.
const {chromium}=require('playwright');
const {default:AxeBuilder}=require('@axe-core/playwright');
const assert=require('node:assert/strict');
(async()=>{
 const browser=await chromium.launch({executablePath:process.env.CHROMIUM_PATH||'/usr/bin/chromium',headless:true,args:['--no-sandbox']});
 try {
  const context=await browser.newContext();const page=await context.newPage();
  const base=process.env.TEST_BASE||'http://127.0.0.1:4174';const requests=[];
  page.on('request',r=>requests.push(r.url()));
  await page.goto(base+'/ecosystem/projects/deaths-daughter/');await page.evaluate(()=>document.fonts.ready);
  assert.ok(requests.every(url=>url.startsWith(base)),'no external fonts, scripts, trackers or embeds');
  assert.equal(await page.locator('h1').innerText(),'From Fan Fiction to Original Worlds');
  assert.equal(await page.locator('main').count(),1);assert.equal(await page.locator('iframe,input,form').count(),0);
  const chapterTitles=await page.locator('.story-sequence h3').allTextContents();
  assert.deepEqual(chapterTitles,["Satan's Fury","The Serpent of Old","Death's Daughter is Born","The Flaming Sword","The Journey of the Flame"]);
  assert.equal(await page.locator('a[href*="wattpad.com/story/"]').count(),0,'no fictional published-story URL');
  assert.ok(await page.locator('a[href="https://www.wattpad.com/user/IBLoud"]').count()>=2);
  const pixie=page.locator('a.pixie-launcher');
  assert.equal(await pixie.count(),1,'one persistent PIXIE launch control on Death’s Daughter pitch');
  assert.equal(await pixie.getAttribute('aria-label'),'Open PIXIE Project Companion');
  assert.ok(await pixie.locator('img').evaluate(img=>img.complete&&img.naturalWidth>0),'local PIXIE sigil loads');
  assert.equal(await pixie.evaluate(el=>getComputedStyle(el).position),'fixed','PIXIE stays fixed');
  const violetPage=await context.newPage();await violetPage.goto(base+'/ecosystem/projects/violets-revenge/');
  assert.equal(await violetPage.locator('a.pixie-launcher').count(),1,'Violet pitch has PIXIE');
  assert.equal(await violetPage.locator('a.pixie-launcher').evaluate(el=>getComputedStyle(el).position),'fixed');
  await violetPage.close();
  assert.equal(await page.locator('a[href*="docs.google.com"],a[href*="drive.google.com"]').count(),0,'owner-only source documents remain unlinked');
  assert.match(await page.locator('.story-status').innerText(),/Pre-publication development/);
  assert.match(await page.locator('#historical-posts').innerText(),/Source-verified/);
  assert.match(await page.locator('#historical-posts').innerText(),/27,490 records/);
  assert.equal(await page.locator('#historical-posts .story-evidence-list li').count(),4);
  assert.ok(await page.locator('#historical-posts a[href="https://bsky.app/profile/ibloud.xyz/post/3lkbcy6gxis2g"]').count()===1);
  assert.equal(await page.locator('#historical-posts time[datetime="2025-03-13"]').count(),1);
  assert.match(await page.locator('#reading-map').innerText(),/not an accepted sequel/);
  assert.equal(await page.locator('.story-quote blockquote').count(),2);
  assert.match(await page.locator('.story-quote').first().innerText(),/How do you apologize to a piece of carved obsidian/);
  assert.ok(await page.locator('.story-cover img').evaluate(img=>img.complete&&img.naturalWidth>0),'local source cover loads');
  const priorTheme=await page.evaluate(()=>document.documentElement.dataset.theme);await page.locator('.theme-toggle').click();assert.notEqual(await page.evaluate(()=>document.documentElement.dataset.theme),priorTheme);
  // First keyboard target is the skip link; Enter takes focus to main.
  await page.reload();await page.keyboard.press('Tab');assert.equal(await page.evaluate(()=>document.activeElement.className),'skip-link');
  await page.keyboard.press('Enter');assert.equal(await page.evaluate(()=>document.activeElement.id),'main');
  const visited=new Set();for(let i=0;i<100;i++){await page.keyboard.press('Tab');visited.add(await page.evaluate(()=>document.activeElement.tagName+':'+document.activeElement.textContent.trim()));}
  assert.ok([...visited].some(x=>x.startsWith('A:Explore IBLoud on Wattpad')));assert.ok([...visited].some(x=>x.startsWith('A:Explore the proposed series')));
  assert.ok([...visited].some(x=>x.startsWith('SUMMARY:Can I read')));
  const question=page.locator('#questions summary').first();await question.focus();await page.keyboard.press('Enter');assert.equal(await question.evaluate(el=>el.parentElement.open),true);
  assert.equal(await question.evaluate(el=>getComputedStyle(el).outlineStyle),'solid');await page.keyboard.press('Enter');
  const results=[];
  for(const width of [320,768,1024,1440])for(const theme of ['dark','light']){
   await page.setViewportSize({width,height:1000});await page.evaluate(t=>document.documentElement.dataset.theme=t,theme);
   const audit=await new AxeBuilder({page}).withTags(['wcag2a','wcag2aa','wcag21aa']).analyze();
   assert.deepEqual(audit.violations.map(v=>({id:v.id,nodes:v.nodes.map(n=>n.target)})),[],`axe ${width}/${theme}`);
   assert.ok(await page.evaluate(()=>document.documentElement.scrollWidth<=innerWidth),`horizontal reflow ${width}/${theme}`);
   results.push(`${width}/${theme}: PASS`);
  }
  await page.setViewportSize({width:320,height:1000});await page.evaluate(()=>document.documentElement.style.fontSize='200%');
  assert.ok(await page.evaluate(()=>document.documentElement.scrollWidth<=innerWidth),'200% text at 320px');
  await page.emulateMedia({reducedMotion:'reduce'});assert.equal(await page.evaluate(()=>getComputedStyle(document.documentElement).scrollBehavior),'auto');
  await page.evaluate(()=>{document.documentElement.style.fontSize='';document.documentElement.dataset.theme='dark';});await page.setViewportSize({width:1440,height:1100});await page.goto(base+'/ecosystem/projects/deaths-daughter/');await page.evaluate(()=>{document.documentElement.dataset.theme='dark';return document.fonts.ready;});
  await page.screenshot({path:process.env.DESKTOP_SCREENSHOT||'/tmp/story-pitch-desktop.png',fullPage:false});
  await page.setViewportSize({width:320,height:1000});await page.screenshot({path:process.env.MOBILE_SCREENSHOT||'/tmp/story-pitch-mobile.png'});
  // All content and source destinations remain available without JavaScript.
  const noJS=await browser.newContext({javaScriptEnabled:false});const staticPage=await noJS.newPage();await staticPage.goto(base+'/ecosystem/projects/deaths-daughter/');
  assert.ok(await staticPage.locator('#series-title').isVisible());assert.equal(await staticPage.locator('.story-sequence li').count(),5);await noJS.close();
  console.log(JSON.stringify({content:'PASS: canon structure, source excerpts, development status, private-source boundary and honest destinations',keyboard:'PASS: skip link, Tab order, primary actions, details Enter, visible focus',accessibility:results,textEnlargement:'PASS: 200% at 320px',reducedMotion:'PASS',withoutJavaScript:'PASS'},null,2));
 }finally{await browser.close();}
})().catch(error=>{console.error(error);process.exit(1);});
