// Public, user-triggered reads only. No identity sessions, writes or retained data.
export const DID = 'did:plc:o6kuv3yieti2vqrb7ckmd5vg';
export const COLLECTION = 'app.bsky.feed.post';
export const PDS = 'https://eurosky.social';
export const ISSUE = 'https://github.com/ibloud/ibloud.github.io/issues/50';
export const COMMENTS = 'https://api.github.com/repos/ibloud/ibloud.github.io/issues/50/comments';
export const HAPPYVIEW = Object.freeze({ status: 'pending', endpoint: null });
const validDate = value => typeof value === 'string' && Number.isFinite(Date.parse(value));

export async function readJSON(url, fetcher = fetch) {
 const response = await fetcher(url, { method: 'GET', credentials: 'omit', cache: 'no-store',
  referrerPolicy: 'no-referrer', redirect: 'error', signal: AbortSignal.timeout(12000), headers: { Accept: 'application/json' } });
 if (!response.ok) throw new Error(response.status === 403 || response.status === 429 ? 'Provider access or rate limit; open the original source or retry later.' : `Public service returned HTTP ${response.status}.`);
 return response.json();
}

export async function readRecords(cursor, fetcher = fetch) {
 // Re-resolve on every page, and stop rather than silently follow a changed PDS.
 const identity = await readJSON(`https://plc.directory/${DID}`, fetcher);
 if (!identity || identity.id !== DID || !Array.isArray(identity.service) || !identity.service.some(s =>
  (s.id === '#atproto_pds' || s.id === `${DID}#atproto_pds`) &&
  s.type === 'AtprotoPersonalDataServer' && s.serviceEndpoint === PDS)) {
  throw new Error('The public PDS identity changed or could not be verified. Open the original source.');
 }
 const url = new URL(`${PDS}/xrpc/com.atproto.repo.listRecords`);
 url.search = new URLSearchParams({ repo: DID, collection: COLLECTION, limit: '5', reverse: 'false', ...(cursor ? { cursor } : {}) });
 return normalizeRecords(await readJSON(url.href, fetcher));
}

export function normalizeRecords(data) {
 if (!data || !Array.isArray(data.records) || data.records.length > 5 ||
  (data.cursor !== undefined && (typeof data.cursor !== 'string' || data.cursor.length > 2048 || !data.cursor))) throw new Error('Malformed public record response.');
 let skipped = 0;
 const items = [];
 for (const record of data.records) {
  const prefix = `at://${DID}/${COLLECTION}/`;
  const key = typeof record?.uri === 'string' && record.uri.startsWith(prefix) ? record.uri.slice(prefix.length) : '';
  if (!/^[a-zA-Z0-9._~:-]{1,512}$/.test(key) || !record.cid || typeof record.cid !== 'string' || record.cid.length > 256 ||
   record.value?.$type !== COLLECTION || typeof record.value.text !== 'string' || record.value.text.length > 10000 || !validDate(record.value.createdAt)) { skipped++; continue; }
  items.push({ uri: record.uri, cid: record.cid, did: DID, collection: COLLECTION, createdAt: record.value.createdAt,
   text: record.value.text, source: `https://bsky.app/profile/${DID}/post/${encodeURIComponent(key)}` });
 }
 return { items, cursor: data.cursor || null, skipped };
}

export async function readComments(page = 1, fetcher = fetch) {
 if (!Number.isInteger(page) || page < 1 || page > 10) throw new Error('Invalid feedback page.');
 const data = await readJSON(`${COMMENTS}?per_page=10&page=${page}`, fetcher);
 if (!Array.isArray(data) || data.length > 10) throw new Error('Malformed GitHub feedback response.');
 let skipped = 0;
 const items = [];
 for (const comment of data) {
  if (!Number.isSafeInteger(comment?.id) || !/^https:\/\/github\.com\/ibloud\/ibloud\.github\.io\/issues\/50#issuecomment-\d+$/.test(comment.html_url) ||
   !validDate(comment.created_at) || !validDate(comment.updated_at) || typeof comment.body !== 'string' || comment.body.length > 65536 ||
   !/^[a-zA-Z0-9-]{1,39}$/.test(comment.user?.login || '')) { skipped++; continue; }
  items.push({ uri: comment.html_url, author: comment.user.login, text: comment.body, createdAt: comment.created_at, updatedAt: comment.updated_at });
 }
 return { items, nextPage: data.length === 10 && page < 10 ? page + 1 : null, skipped };
}

export function appendUnique(previous, incoming) {
 const items = new Map(previous.map(item => [item.uri, item]));
 for (const item of incoming) items.set(item.uri, item);
 return [...items.values()];
}

const element = (tag, text) => { const node = document.createElement(tag); if (text !== undefined) node.textContent = text; return node; };
function sourceLink(text, href) { const link = element('a', text); link.href = href; link.rel = 'noopener noreferrer'; return link; }
function renderRecord(item) {
 const article = element('article'); article.className = 'card';
 const heading = element('h4'); heading.append(sourceLink('Original post by @made-sick.org', item.source)); article.append(heading);
 const text = element('p', item.text); text.className = 'public-record-text'; article.append(text);
 const meta = element('dl');
 for (const [label, value] of Object.entries({ DID: item.did, 'Record URI': item.uri, Collection: item.collection, CID: item.cid, 'Author timestamp': item.createdAt, 'Retrieved from': PDS })) {
  meta.append(element('dt', label), element('dd', value));
 }
 article.append(meta); return article;
}
function renderComment(item) {
 const article = element('article'); article.className = 'card';
 const heading = element('h4'); heading.append(sourceLink(`@${item.author} on GitHub`, item.uri));
 const text = element('p', item.text); text.className = 'public-record-text';
 article.append(heading, text, element('p', `Published: ${item.createdAt} · Updated: ${item.updatedAt}`)); return article;
}

function mountReader(kind, reader, render) {
 const start = document.querySelector(`#${kind}-load`), more = document.querySelector(`#${kind}-more`);
 const clear = document.querySelector(`#${kind}-clear`), list = document.querySelector(`#${kind}-list`), status = document.querySelector(`#${kind}-status`);
 if (!start || !more || !clear || !list || !status) return;
 let items = [], cursor = null, pages = 0, timer, seen = new Set();
 async function load(reset) {
  start.disabled = more.disabled = clear.disabled = true;
  clearTimeout(timer);
  if (reset) { items = []; cursor = null; pages = 0; seen.clear(); list.replaceChildren(); }
  status.textContent = 'Reading public data…'; list.setAttribute('aria-busy', 'true');
  try {
   const result = await reader(cursor);
   items = appendUnique(items, result.items); pages++;
   const next = result.cursor ?? result.nextPage ?? null;
   const repeated = next !== null && seen.has(next);
   cursor = repeated || pages >= 10 ? null : next;
   if (next !== null) seen.add(next);
   list.replaceChildren(...items.map(render));
   status.textContent = `${items.length} public ${kind === 'records' ? 'records' : 'comments'} retrieved at ${new Date().toISOString()}.${result.skipped ? ` ${result.skipped} invalid entries omitted.` : ''}${repeated ? ' Repeated cursor; pagination stopped.' : ''}${pages >= 10 ? ' Page limit reached; open the original source for more.' : ''}${!items.length ? ' No published entries returned.' : ''} This is a point-in-time read, not an endorsement. Reload to reflect edits or deletions.`;
   more.hidden = !cursor;
   timer = setTimeout(() => { status.textContent += ' This view is now over five minutes old; reload before relying on it.'; }, 300000);
  } catch (error) {
   // Remove previous pages on error so removed/stale content is never presented as current.
   items = []; cursor = null; list.replaceChildren(); more.hidden = true;
   status.textContent = `Could not read public ${kind}. ${error instanceof SyntaxError ? 'Invalid JSON response.' : error.name === 'TimeoutError' ? 'The request timed out.' : error.message} No cached results are shown. Use the original source links below.`;
  } finally { start.disabled = more.disabled = clear.disabled = false; list.removeAttribute('aria-busy'); }
 }
 start.addEventListener('click', () => load(true)); more.addEventListener('click', () => load(false));
 clear.addEventListener('click', () => { clearTimeout(timer); items = []; cursor = null; pages = 0; seen.clear(); list.replaceChildren(); more.hidden = true; status.textContent = 'Public content cleared from this page.'; });
}

if (typeof document !== 'undefined') {
 mountReader('records', readRecords, renderRecord);
 mountReader('feedback', page => readComments(page || 1), renderComment);
}
