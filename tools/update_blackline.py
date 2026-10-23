#!/usr/bin/env python3
"""Import an unmodified BLACKLINE UMD engine from an HTML lab or JS release."""
import hashlib, json, re, sys
from pathlib import Path
root = Path(__file__).resolve().parents[1]
source = Path(sys.argv[1]).read_text()
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
print('Imported BLACKLINE', version[1], 'without modifying engine source. Run tests before publishing.')
