from pathlib import Path
from html.parser import HTMLParser
from urllib.parse import urlsplit, unquote
import xml.etree.ElementTree as ET
root=Path(__file__).resolve().parent/'dist'
class Document(HTMLParser):
 def __init__(self,text):
  super().__init__();self.ids=set();self.links=[];self.errors=[];self.feed(text)
 def handle_starttag(self,tag,attrs):
  a=dict(attrs)
  if 'id' in a:
   if a['id'] in self.ids:self.errors.append('Duplicate id '+a['id'])
   self.ids.add(a['id'])
  for key in ('href','src'):
   if key in a:self.links.append(a[key])
  if tag=='img' and not a.get('alt'):self.errors.append('Image lacks alt')
docs={p:Document(p.read_text()) for p in root.rglob('*.html')};errors=[]
for p,d in docs.items():
 errors.extend(f'{p}: {e}' for e in d.errors)
 for link in d.links:
  u=urlsplit(link)
  if u.scheme or u.netloc:continue
  dest=(root/u.path.lstrip('/')) if u.path.startswith('/') else p.parent/u.path
  if dest.is_dir():dest=dest/'index.html'
  if not u.path:dest=p
  if not dest.exists():errors.append(f'{p.relative_to(root)}: missing {link}')
  elif u.fragment and dest in docs and unquote(u.fragment) not in docs[dest].ids:errors.append(f'{p.relative_to(root)}: missing anchor {link}')
locs=ET.parse(root/'sitemap.xml').findall('.//{*}loc')
assert len(locs)==len(docs)==16
if errors:raise SystemExit('\n'.join(errors))
print(f'Validated {len(docs)} HTML pages: local links, fragments, image descriptions, unique IDs; {len(locs)} sitemap URLs.')
