"""Dependency-free static-site checks. Run from any working directory."""
from html.parser import HTMLParser
from pathlib import Path
from urllib.parse import urlsplit, unquote
import subprocess

ROOT = Path(__file__).resolve().parents[1]
class Audit(HTMLParser):
    def __init__(self):
        super().__init__()
        self.ids = []
        self.links = []
        self.headings = []
    def handle_starttag(self, tag, attrs):
        attrs = dict(attrs)
        if 'id' in attrs: self.ids.append(attrs['id'])
        if tag == 'h1': self.headings.append(tag)
        if tag == 'img': assert 'alt' in attrs, 'Image missing alternative text'
        if tag == 'iframe': assert attrs.get('title'), 'Iframe missing title'
        if tag == 'a' and attrs.get('target') == '_blank':
            assert 'noopener' in attrs.get('rel', ''), 'Unsafe new-tab link'
        for key in ('href', 'src'):
            if key in attrs: self.links.append(attrs[key])
audit = Audit()
audit.feed((ROOT / 'index.html').read_text())
assert len(audit.headings) == 1, 'Expected one primary heading'
assert len(audit.ids) == len(set(audit.ids)), 'Duplicate IDs'
for link in audit.links:
    parsed = urlsplit(link)
    if parsed.scheme or parsed.netloc: continue
    if parsed.path:
        assert (ROOT / unquote(parsed.path.lstrip('/'))).is_file(), f'Missing file: {link}'
    elif parsed.fragment:
        assert parsed.fragment in audit.ids, f'Missing anchor: {link}'
assert (ROOT / 'CNAME').read_text().strip() == 'stephzha.com'
for script in (ROOT / 'assets/js').glob('*.js'):
    subprocess.run(['node', '--check', str(script)], check=True)
assert all(x in audit.ids for x in ['intro','about','experience','projects','skills','education','places','contact','fridgevision'])
print(f'PASS: {len(audit.links)} links/assets, unique anchors, image/frame labels, JavaScript syntax, custom domain.')
