const assert = require('node:assert/strict');
const {chromium} = require('playwright');
const {default:AxeBuilder} = require('@axe-core/playwright');
(async () => {
 const browser=await chromium.launch({executablePath:process.env.CHROMIUM_PATH||'/usr/bin/chromium',args:['--no-sandbox']});
 const context=await browser.newContext({acceptDownloads:true,reducedMotion:'reduce'});
 const page=await context.newPage();
 const errors=[];page.on('pageerror',e=>errors.push(e.message));
 const base=process.env.TEST_BASE||'http://127.0.0.1:4173';
 await page.goto(base+'/cinematic/');await page.waitForSelector('canvas:not([hidden])');
 for(const width of [320,390,768,1440]) {
  await page.setViewportSize({width,height:1000});
  assert(await page.evaluate(()=>document.documentElement.scrollWidth<=innerWidth));
  const axe=await new AxeBuilder({page}).withTags(['wcag2a','wcag2aa','wcag21aa']).analyze();assert.deepEqual(axe.violations,[]);
 }

 assert.match(await page.locator('#status').innerText(),/Static/);
 await page.locator('#play').focus();await page.keyboard.press('Enter');
 await page.waitForTimeout(700);await page.locator('#pause').click();assert.match(await page.locator('#status').innerText(),/Paused/);
 await page.locator('#play').click();await page.waitForFunction(()=>document.querySelector('#status').textContent.includes('complete'),{timeout:20000});assert.match(await page.locator('#status').innerText(),/complete/);
 await page.selectOption('#format','tall');assert.equal(await page.locator('.stage canvas').getAttribute('width'),'1080');
 assert(await page.evaluate(()=>document.documentElement.scrollWidth<=innerWidth));
 const axe=await new AxeBuilder({page}).withTags(['wcag2a','wcag2aa','wcag21aa']).analyze();assert.deepEqual(axe.violations,[]);
 await page.selectOption('#format','wide');
 await page.locator('.legacy-exports summary').click();await page.locator('#export').click();await page.waitForSelector('#download:not([hidden])',{timeout:30000});
 assert.match(await page.locator('#status').innerText(),/ready/);
 const download=page.waitForEvent('download');await page.locator('#download').click();
 const file=await download;if(process.env.VIDEO_OUTPUT) await file.saveAs(process.env.VIDEO_OUTPUT);
 await page.selectOption('#format','tall');await page.locator('#export').click();await page.waitForSelector('#download:not([hidden])',{timeout:30000});
 const tallDownload=page.waitForEvent('download');await page.locator('#download').click();const tallFile=await tallDownload;if(process.env.TALL_VIDEO_OUTPUT) await tallFile.saveAs(process.env.TALL_VIDEO_OUTPUT);
 const still=page.waitForEvent('download');await page.locator('#poster').click();assert.match((await still).suggestedFilename(),/static.png/);
 const offline=await browser.newPage({javaScriptEnabled:false});await offline.goto(base+'/cinematic/');assert(await offline.locator('.fallback').isVisible());
 assert.equal(await offline.locator('.fallback img').count(),5);
 assert.deepEqual(errors,[]);await browser.close();console.log('PASS: reflow, axe A/AA, reduced motion/static default, keyboard playback, pause/resume, formats, video and PNG export, no-JS, no JS errors.');
})().catch(e=>{console.error(e);process.exit(1)});
