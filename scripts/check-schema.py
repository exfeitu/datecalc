#!/usr/bin/env python3
"""Validate all JSON-LD schema blocks across built pages."""
import re, json, glob, sys

html_files = glob.glob('dist/**/*.html', recursive=True)
issues = []

for f in html_files:
    if '404' in f:
        continue
    html = open(f).read()
    blocks = re.findall(r'<script type="application/ld\+json">(.+?)</script>', html)

    for block in blocks:
        data = json.loads(block)
        t = data.get('@type')

        if data.get('@context') != 'https://schema.org':
            issues.append(f'{f}: wrong @context')

        if t == 'WebPage':
            if not data.get('name'): issues.append(f'{f}: WebPage missing name')
            if not data.get('url'): issues.append(f'{f}: WebPage missing url')

            faq = data.get('mainEntity', {})
            if faq.get('@type') == 'FAQPage':
                questions = faq.get('mainEntity', [])
                for q in questions:
                    if q.get('@type') != 'Question':
                        issues.append(f'{f}: FAQ entity not Question')
                    if not q.get('name'):
                        issues.append(f'{f}: Question missing name')
                    ans = q.get('acceptedAnswer', {})
                    if ans.get('@type') != 'Answer':
                        issues.append(f'{f}: Answer wrong type')
                    if not ans.get('text'):
                        issues.append(f'{f}: Answer missing text')

        if t == 'BreadcrumbList':
            items = data.get('itemListElement', [])
            for idx, item in enumerate(items):
                if item.get('position') != idx + 1:
                    issues.append(f'{f}: Breadcrumb position mismatch')

        if t == 'Organization':
            if not data.get('name'): issues.append(f'{f}: Organization missing name')

        if t == 'WebApplication':
            if not data.get('name'): issues.append(f'{f}: WebApplication missing name')

total = len(html_files) - 1  # exclude 404
if issues:
    print(f'FOUND {len(issues)} ISSUES across {total} pages:')
    for i in issues[:20]:
        print(f'  - {i}')
    sys.exit(1)
else:
    print(f'ALL {total} PAGES PASS semantic schema checks')
