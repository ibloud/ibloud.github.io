"""Check the static portfolio contract without third-party dependencies.

Run from any directory: python3 tools/check_portfolio.py
Browser, device, external service and screen-reader acceptance are separate.
"""
from html.parser import HTMLParser
from pathlib import Path
from urllib.parse import unquote, urlsplit
import sys
import xml.etree.ElementTree as ET

ROOT = Path(__file__).resolve().parents[1]
NAV_LABELS = ['Meet Dominique', 'Ecosystem', 'Research proposal', 'Collaborate', 'Provenance & AI']
HOME_NAV_LABELS = ['Work', 'About', 'Contact', 'Ecosystem']


class Page(HTMLParser):
    def __init__(self):
        super().__init__()
        self.tags = []
        self.in_head = False
        self.head_titles = 0
        self.descriptions = []
        self.canonicals = []
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
        if tag == 'head':
            self.in_head = True
        if self.in_head:
            if tag == 'title':
                self.head_titles += 1
            if tag == 'meta' and attrs.get('name') == 'description':
                self.descriptions.append(attrs.get('content', '').strip())
            if tag == 'link' and attrs.get('rel') == 'canonical':
                self.canonicals.append(attrs.get('href', ''))
        if 'id' in attrs:
            self.ids.append(attrs['id'])
        if 'style' in attrs:
            self.inline_styles.append(attrs['style'])
        if tag == 'nav':
            self.in_nav = attrs.get('aria-label') == 'Main navigation'
        if self.in_nav and tag == 'a':
            self.in_nav_link = True
            self.nav_labels.append('')
        if tag == 'link' and attrs.get('rel') == 'stylesheet':
            self.stylesheets.append(attrs.get('href', ''))
        for key in ('href', 'src'):
            if key in attrs:
                self.references.append(attrs[key])

    def handle_endtag(self, tag):
        if tag == 'head':
            self.in_head = False
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
    sitemap_urls = [node.text for node in ET.parse(ROOT / 'sitemap.xml').iter('{http://www.sitemaps.org/schemas/sitemap/0.9}loc')]
    if len(sitemap_urls) != len(set(sitemap_urls)):
        failures.append('sitemap.xml: duplicate URLs')
    for path, page in pages.items():
        def require(condition, reason):
            if not condition:
                failures.append(f'{path.relative_to(ROOT)}: {reason}')

        text = path.read_text()
        relative = path.relative_to(ROOT).as_posix()
        public_url = 'https://ibloud.github.io/' + relative.removesuffix('index.html')
        require(page.head_titles == 1, 'expected one document title in head')
        require(len(page.descriptions) == 1 and bool(page.descriptions[0]), 'expected one nonempty description')
        require(len(page.canonicals) == 1 and page.canonicals[0].startswith('https://ibloud.github.io/'), 'expected one HTTPS portfolio canonical')
        if page.canonicals == [public_url]:
            require(public_url in sitemap_urls, 'self-canonical page missing from sitemap')
        expected_nav = HOME_NAV_LABELS if path == ROOT / 'index.html' else NAV_LABELS
        require(all(page.tags.count(tag) == 1 for tag in ('main', 'h1')) and page.nav_labels == expected_nav, 'expected one primary navigation, main and h1')
        require(page.nav_labels == expected_nav, 'primary navigation labels differ')
        require(len(page.ids) == len(set(page.ids)), 'duplicate IDs')
        require(not page.inline_styles and 'style' not in page.tags, 'page-local CSS')
        require('tailwind' not in text.lower(), 'runtime Tailwind dependency')
        # The established 50 Ways pitch adds its own stylesheet after the foundation.
        # Keep this precise exception; other pages still use one shared stylesheet.
        pitch_pages = {'index.html', 'producer-pitch.html', 'treatment.html'}
        is_pitch = path.parent == ROOT / 'ecosystem/projects/50-ways' and path.name in pitch_pages
        expected_styles = [ROOT / 'assets/portfolio-foundation.css']
        if is_pitch:
            expected_styles.append(ROOT / 'assets/50-ways-pitch.css')
        actual_styles = [(path.parent / unquote(urlsplit(href).path)).resolve() for href in page.stylesheets]
        require(actual_styles == expected_styles, 'wrong stylesheet sequence')
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
    print(f'PASS: {len(pages)} HTML pages; shared CSS/navigation, landmarks, IDs, local links, fragments and SEO metadata.')
    return 0


if __name__ == '__main__':
    sys.exit(main())
