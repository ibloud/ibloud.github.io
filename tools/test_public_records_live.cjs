// Optional live-service acceptance against a locally served page. Never mocks data.
// Uses the same isolated Playwright install as test_public_records_browser.cjs.
const {chromium} = require('playwright');
const {X509Certificate, createHash} = require('node:crypto');
const {readFileSync} = require('node:fs');
const assert = require('node:assert/strict');
(async () => {
 const args = ['--no-sandbox'];
 // Chromium's trust store may omit the managed environment's supplied proxy CA.
 // Trust that exact CA public key only; do not disable certificate checks globally.
 if (process.env.NODE_EXTRA_CA_CERTS) {
  const ca = new X509Certificate(readFileSync(process.env.NODE_EXTRA_CA_CERTS));
  const pin = createHash('sha256').update(ca.publicKey.export({type:'spki',format:'der'})).digest('base64');
  args.push('--ignore-certificate-errors-spki-list=' + pin);
 }
 const server = process.env.HTTPS_PROXY || process.env.HTTP_PROXY;
 const browser = await chromium.launch({executablePath:process.env.CHROMIUM_PATH || '/usr/bin/chromium', headless:true, args,
  ...(server ? {proxy:{server,bypass:'127.0.0.1,localhost'}} : {})});
 try {
  const page = await browser.newPage();
  const base = process.env.TEST_BASE || 'http://127.0.0.1:4173';
  await page.goto(base + '/ecosystem/');
  await page.locator('#records-load').click();
  await page.waitForFunction(() => !document.querySelector('#records-load').disabled);
  const recordStatus = await page.locator('#records-status').innerText();
  assert.match(recordStatus,/public records retrieved/);
  const count = await page.locator('#records-list article').count();
  assert.ok(count > 0 && count <= 5, 'real public records are required');
  const source = await page.locator('#records-list a').first().getAttribute('href');
  assert.match(source,/^https:\/\/bsky\.app\/profile\/did:plc:o6kuv3yieti2vqrb7ckmd5vg\/post\//);
  await page.locator('#records-more').click();
  await page.waitForFunction(() => !document.querySelector('#records-load').disabled);
  assert.ok(await page.locator('#records-list article').count() > count,'live second page');
  await page.locator('#feedback-load').click();
  await page.waitForFunction(() => !document.querySelector('#feedback-load').disabled);
  const feedbackStatus = await page.locator('#feedback-status').innerText();
  assert.match(feedbackStatus,/public comments retrieved/);
  console.log(JSON.stringify({checkedAt:new Date().toISOString(),page:base+'/ecosystem/',recordStatus,source,
   pagination:'second live page retrieved',feedbackStatus,happyView:'pending; no provider request configured'},null,2));
 } finally { await browser.close(); }
})().catch(error => { console.error(error); process.exit(1); });
