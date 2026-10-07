#!/usr/bin/env python3
"""Build the ecosystem for a separate Pages repository; leave the source site intact."""
import argparse
import json
import re
import shutil
from html import escape
from html.parser import HTMLParser
from pathlib import Path
from urllib.parse import urljoin, urlsplit

ROOT = Path(__file__).resolve().parents[1]
SOURCE = 'https://ibloud.github.io/'
OLD = SOURCE + 'ecosystem/'
NEW = 'https://ecosystem.loptrlab.com/'


def relocate(url, source_url):
    if url.startswith('#'):
        return url
    resolved = urljoin(source_url, url)
    if resolved.startswith(OLD):
        return NEW + resolved[len(OLD):]
    if resolved.startswith(SOURCE + 'assets/'):
        return NEW + resolved[len(SOURCE):]
    return resolved


class References(HTMLParser):
    def __init__(self):
        super().__init__()
        self.urls = []
        self.ids = set()
        self.canonicals = []
        self.og_urls = []

    def handle_starttag(self, tag, attrs):
        attrs = dict(attrs)
        if 'id' in attrs:
            self.ids.add(attrs['id'])
        for name in ('href', 'src'):
            if name in attrs:
                self.urls.append(attrs[name])
        if tag == 'link' and attrs.get('rel') == 'canonical':
            self.canonicals.append(attrs.get('href'))
        if tag == 'meta' and attrs.get('property') == 'og:url':
            self.og_urls.append(attrs.get('content'))


def build(output):
    if output.exists():
        raise SystemExit(f'Output already exists: {output}; choose a fresh directory.')
    output.mkdir(parents=True)
    shutil.copytree(ROOT / 'assets', output / 'assets')
    mappings = []
    for source in sorted((ROOT / 'ecosystem').rglob('*.html')):
        relative = source.relative_to(ROOT / 'ecosystem')
        suffix = relative.as_posix().removesuffix('index.html')
        old_url, new_url = OLD + suffix, NEW + suffix
        content = source.read_text()
        content = re.sub(
            r'\b(href|src)="([^"]*)"',
            lambda m: f'{m[1]}="{escape(relocate(m[2], old_url), quote=True)}"',
            content,
        )
        content = content.replace(OLD, NEW).replace(SOURCE + 'assets/', NEW + 'assets/')
        destination = output / relative
        destination.parent.mkdir(parents=True, exist_ok=True)
        destination.write_text(content)
        mappings.append({'old': old_url, 'new': new_url})
    (output / 'CNAME').write_text('ecosystem.loptrlab.com\n')
    (output / '.nojekyll').touch()
    (output / 'robots.txt').write_text('User-agent: *\nAllow: /\n\nSitemap: ' + NEW + 'sitemap.xml\n')
    (output / 'sitemap.xml').write_text(
        '<?xml version="1.0" encoding="UTF-8"?>\n'
        '<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n'
        + ''.join(f'  <url><loc>{escape(row["new"])}</loc></url>\n' for row in mappings)
        + '</urlset>\n'
    )
    (output / 'url-mapping.json').write_text(json.dumps(mappings, indent=2) + '\n')
    (output / '404.html').write_text(
        '<!doctype html><html lang="en"><meta charset="utf-8">'
        '<meta name="viewport" content="width=device-width, initial-scale=1">'
        '<title>Page not found | Loptr Lab ecosystem</title>'
        '<meta name="robots" content="noindex"><main><h1>Page not found</h1>'
        '<p><a href="/">Explore the Loptr Lab ecosystem</a></p></main></html>\n'
    )
    validate(output, mappings)
    print(f'Built and validated {len(mappings)} pages at {output}')


def validate(output, mappings):
    documents = {}
    for file in output.rglob('*.html'):
        parser = References()
        parser.feed(file.read_text())
        documents[file] = parser
    for row in mappings:
        suffix = row['new'][len(NEW):]
        file = output / suffix / 'index.html'
        parser = documents[file]
        assert parser.canonicals == [row['new']], (file, parser.canonicals)
        assert parser.og_urls == [row['new']], (file, parser.og_urls)
        assert OLD not in file.read_text(), file
        for url in parser.urls:
            resolved = urlsplit(urljoin(row['new'], url))
            if resolved.netloc != 'ecosystem.loptrlab.com':
                continue
            target = output / resolved.path.lstrip('/')
            if target.is_dir():
                target = target / 'index.html'
            assert target.is_file(), (file, url, target)
            if resolved.fragment and target in documents:
                assert resolved.fragment in documents[target].ids, (file, url)


if __name__ == '__main__':
    cli = argparse.ArgumentParser(description=__doc__)
    cli.add_argument('--output', required=True, type=Path)
    args = cli.parse_args()
    build(args.output.resolve())
