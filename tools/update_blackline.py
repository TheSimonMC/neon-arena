#!/usr/bin/env python3
"""Import an unmodified BLACKLINE UMD engine from an HTML lab or JS release."""
import hashlib, json, re, sys, shutil
from pathlib import Path
root = Path(__file__).resolve().parents[1]
incoming = Path(sys.argv[1])
if incoming.is_dir():
    incoming = incoming / 'blackline.js'
source = incoming.read_text()
if '<script' in source:
    matches = [s for s in re.findall(r'<script\b[^>]*>([\s\S]*?)</script>', source) if 'root.Blackline=api' in s]
    if len(matches) != 1:
        raise SystemExit('Expected exactly one BLACKLINE engine script; no files changed.')
    source = matches[0]
for token in ['createEmitter', 'setListener', 'synthesize', 'WEAPONS', 'mechanics']:
    if token not in source:
        raise SystemExit(f'Missing API marker: {token}; review compatibility before importing.')
version = re.search(r"const VERSION\s*=\s*['\"]([^'\"]+)", source)
if not version:
    raise SystemExit('Engine version missing; no files changed.')
(root/'vendor').mkdir(exist_ok=True)
(root/'vendor/blackline.js').write_text(source)
(root/'vendor/blackline-version.json').write_text(json.dumps({'version':version[1], 'sha256':hashlib.sha256(source.encode()).hexdigest()},indent=2)+'\n')
if incoming.name == 'blackline.js':
    for relative, destination in [('API.md', 'docs/BLACKLINE_API.md'), ('LICENSE', 'vendor/BLACKLINE_LICENSE'), ('blackline.d.ts', 'vendor/blackline.d.ts'), ('docs/MIGRATION.md', 'docs/BLACKLINE_MIGRATION.md')]:
        companion = incoming.parent / relative
        if companion.is_file():
            target = root / destination
            target.parent.mkdir(parents=True, exist_ok=True)
            shutil.copyfile(companion, target)
print('Imported BLACKLINE', version[1], 'without modifying engine source. Run tests before publishing.')
