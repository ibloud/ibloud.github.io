"""Check the static portfolio contract without third-party dependencies.

Run from any directory: python3 tools/check_portfolio.py
Browser, device, external service and screen-reader acceptance are separate.
"""
from html.parser import HTMLParser
from pathlib import Path
from urllib.parse import unquote, urlsplit
import sys

ROOT = Path(__file__).resolve().parents[1]
NAV_LABELS = ['Meet Dominique', 'Ecosystem', 'Research proposal', 'Collaborate', 'Provenance & AI']


class Page(HTMLParser):
    def __init__(self):
        super().__init__()
        self.tags = []
        self.ids = []
        self.references = []
        self.stylesheets = []
        self.inline_styles = []
        self.nav_labels = []
        self.in_nav = False
        self.in_nav_link = False

    def handle_starttag(self, tag, attributes):
        attrs = dict(attributes)
        self.tags.append(tag)
        if 'id' in attrs:
            self.ids.append(attrs['id'])
        if 'style' in attrs:
            self.inline_styles.append(attrs['style'])
        if tag == 'nav':
            self.in_nav = True
        if self.in_nav and tag == 'a':
            self.in_nav_link = True
            self.nav_labels.append('')
        if tag == 'link' and attrs.get('rel') == 'stylesheet':
            self.stylesheets.append(attrs.get('href', ''))
        for key in ('href', 'src'):
            if key in attrs:
                self.references.append(attrs[key])

    def handle_endtag(self, tag):
        if tag == 'nav':
            self.in_nav = False
        if tag == 'a':
            self.in_nav_link = False

    def handle_data(self, text):
        if self.in_nav_link:
            self.nav_labels[-1] += text


def parse(path):
    page = Page()
    page.feed(path.read_text())
    return page


def main():
    pages = {path: parse(path) for path in ROOT.rglob('*.html')}
    failures = []
    for path, page in pages.items():
        def require(condition, reason):
            if not condition:
                failures.append(f'{path.relative_to(ROOT)}: {reason}')

        text = path.read_text()
        require(all(page.tags.count(tag) == 1 for tag in ('nav', 'main', 'h1')), 'expected one navigation, main and h1')
        require(page.nav_labels == NAV_LABELS, 'primary navigation labels differ')
        require(len(page.ids) == len(set(page.ids)), 'duplicate IDs')
        require(not page.inline_styles and 'style' not in page.tags, 'page-local CSS')
        require('tailwind' not in text.lower(), 'runtime Tailwind dependency')
        require(len(page.stylesheets) == 1, 'expected one stylesheet')
        if len(page.stylesheets) == 1:
            require((path.parent / page.stylesheets[0]).resolve() == ROOT / 'assets/portfolio-foundation.css', 'wrong foundation stylesheet')
        for reference in page.references:
            url = urlsplit(reference)
            if url.scheme or url.netloc:
                continue
            target = ROOT / unquote(url.path.lstrip('/')) if url.path.startswith('/') else path.parent / unquote(url.path) if url.path else path
            target = target.resolve()
            if target.is_dir():
                target /= 'index.html'
            require(target.exists(), f'missing local target: {reference}')
            if url.fragment and target in pages:
                require(unquote(url.fragment) in pages[target].ids, f'missing fragment: {reference}')
    if failures:
        print('\n'.join(failures))
        return 1
    print(f'PASS: {len(pages)} HTML pages; shared CSS/navigation, landmarks, IDs, local links and fragments.')
    return 0


if __name__ == '__main__':
    sys.exit(main())
