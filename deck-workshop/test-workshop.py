from html.parser import HTMLParser
from pathlib import Path
import json, re

class Audit(HTMLParser):
    def __init__(self):
        super().__init__()
        self.ids=set(); self.errors=[]; self.tabs=[]; self.panels=[]; self.forms=[]; self.links=[]
    def handle_starttag(self, tag, attrs):
        a=dict(attrs)
        if "id" in a:
            if a["id"] in self.ids:self.errors.append("duplicate id: "+a["id"])
            self.ids.add(a["id"])
        if a.get("role")=="tab":self.tabs.append(a)
        if a.get("role")=="tabpanel":self.panels.append(a)
        if tag=="form":self.forms.append(a)
        if tag=="a" and a.get("href"):self.links.append(a["href"])

source=Path("index.html").read_text(encoding="utf-8")
audit=Audit(); audit.feed(source)
assert not audit.errors, audit.errors
assert len(audit.tabs)==2 and len(audit.panels)==2
assert len(audit.forms)==2
assert {x.get("aria-controls") for x in audit.tabs}=={x.get("id") for x in audit.panels}
assert all(x.get("data-system") in {"veiled-dominion","violets-revenge"} for x in audit.forms)
assert len({x.get("data-system") for x in audit.forms})==2
assert "card-lab.html" in audit.links
for marker in ("loptr-workshop:v1:veiled-dominion","loptr-workshop:v1:violets-revenge","localStorage","data-export","data-clear","VIOLETS-REVENGE-CARD-DEMO-SCOPE"):
    assert marker in source, marker

lab=Path("card-lab.html").read_text(encoding="utf-8")
assert 'const cards=[' in lab
payload=re.search(r'const cards=(\[.*?\]);\nconst \$=',lab,re.S)
assert payload, "card data block missing"
cards=json.loads(payload.group(1))
assert len(cards)==52, len(cards)
assert len({c["id"] for c in cards})==52
assert {c["suit"] for c in cards}=={"♠","♥","♦","♣"}
assert all(c.get("name") and c.get("text") for c in cards)
for marker in ('id="shuffle"','id="draw"','id="discardSelected"','id="reset"','id="returnDiscard"','handSelected','role="status"'):
    assert marker in lab, marker
assert "deck=[]" in lab, "builder should start with an empty selected deck"
assert 'https://github.com/ibloud/violets-revenge/blob/main/docs/VIOLETS-REVENGE-CARD-DEMO-SCOPE.md' in lab
assert "No canonical Violet card list" in lab
print("PASS: two isolated game tabs and review stores; 52 unique source-backed Sealed Deck cards; card selection, deck building, shuffle, draw, hand selection, discard, reset and return-discard controls; Violet source boundary.")
