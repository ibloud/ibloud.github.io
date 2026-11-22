from html.parser import HTMLParser
from pathlib import Path

class Audit(HTMLParser):
    def __init__(self):
        super().__init__()
        self.ids=set()
        self.errors=[]
        self.tabs=[]
        self.panels=[]
        self.forms=[]
        self.links=[]
    def handle_starttag(self, tag, attrs):
        a=dict(attrs)
        if "id" in a:
            if a["id"] in self.ids:self.errors.append("duplicate id: "+a["id"])
            self.ids.add(a["id"])
        if a.get("role")=="tab":self.tabs.append(a)
        if a.get("role")=="tabpanel":self.panels.append(a)
        if tag=="form":self.forms.append(a)
        if tag=="a" and a.get("href"):self.links.append(a["href"])

p=Path("index.html")
audit=Audit()
audit.feed(p.read_text(encoding="utf-8"))
assert not audit.errors, audit.errors
assert len(audit.tabs)==2, audit.tabs
assert len(audit.panels)==2, audit.panels
assert len(audit.forms)==2, audit.forms
assert {x.get("aria-controls") for x in audit.tabs}=={x.get("id") for x in audit.panels}
assert all(x.get("data-system") in {"veiled-dominion","violets-revenge"} for x in audit.forms)
assert len({x.get("data-system") for x in audit.forms})==2
assert "https://github.com/Loptr-Lab/veiled-dominion-engine" in audit.links
assert "https://github.com/ibloud/violets-revenge" in audit.links
source=Path("index.html").read_text(encoding="utf-8")
for marker in ("loptr-workshop:v1:veiled-dominion","loptr-workshop:v1:violets-revenge","localStorage","data-export","data-clear","VIOLETS-REVENGE-CARD-DEMO-SCOPE"):
    assert marker in source, marker
print("PASS: HTML structure, unique IDs, two separate accessible tabs, two isolated local review forms, exports and source links.")
