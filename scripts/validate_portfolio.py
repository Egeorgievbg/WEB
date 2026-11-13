#!/usr/bin/env python3
"""Dependency-free static QA for the Bulgarian portfolio."""
from html.parser import HTMLParser
from pathlib import Path
from collections import Counter
import re
import subprocess
import sys

ROOT = Path(__file__).resolve().parents[1]
HTML = (ROOT / "index.html").read_text(encoding="utf-8")
errors = []

class Audit(HTMLParser):
    def __init__(self):
        super().__init__(convert_charrefs=True)
        self.ids = []
        self.hrefs = []
        self.images = []
        self.sections = []
        self.form_actions = []
        self.scripts = []
        self.in_script = False
        self.script = []
        self.lang = None
        self.title_seen = False
        self.canonical = []
    def handle_starttag(self, tag, attrs):
        a = dict(attrs)
        if tag == "html":
            self.lang = a.get("lang")
        if "id" in a:
            self.ids.append(a["id"])
        if tag == "a":
            self.hrefs.append(a)
        if tag == "img":
            self.images.append(a)
        if tag == "form":
            self.form_actions.append(a.get("action", ""))
        if tag == "section":
            self.sections.append(a.get("id"))
        if tag == "link" and a.get("rel") == "canonical":
            self.canonical.append(a.get("href"))
        if tag == "script" and not a.get("src"):
            self.in_script = True
            self.script = []
        if tag == "title":
            self.title_seen = True
    def handle_endtag(self, tag):
        if tag == "script" and self.in_script:
            self.scripts.append("".join(self.script))
            self.in_script = False
    def handle_data(self, data):
        if self.in_script:
            self.script.append(data)

audit = Audit()
audit.feed(HTML)
if audit.lang != "bg": errors.append("HTML must have lang=bg.")
if not audit.title_seen: errors.append("Missing title.")
if not audit.canonical: errors.append("Missing canonical.")
if len(audit.ids) != len(set(audit.ids)):
    errors.append("Duplicate IDs: " + ", ".join(k for k,n in Counter(audit.ids).items() if n > 1))
for link in audit.hrefs:
    href = link.get("href", "")
    if href.startswith("#") and href[1:] not in audit.ids:
        errors.append("Broken internal anchor: " + href)
    if link.get("target") == "_blank" and "noopener" not in link.get("rel", ""):
        errors.append("External tab missing noopener: " + href)
if len(audit.images) != 13:
    errors.append("Unexpected image count: " + str(len(audit.images)))
for image in audit.images:
    if not image.get("alt"):
        errors.append("Image missing alt.")
if "data-8b-placeholder" in HTML:
    errors.append("Unresolved demo placeholder.")
if "#main-content" not in (a.get("href") for a in audit.hrefs):
    errors.append("Missing skip link.")
if not any(x.startswith("mailto:") for x in audit.form_actions):
    errors.append("Contact form must clearly hand off to email.")
for forbidden in ("hello@isoline.example", "14 Wren Yard", "€190", "€340"):
    if forbidden in HTML:
        errors.append("Demo content remains: " + forbidden)
for i, script in enumerate(audit.scripts, 1):
    try:
        result = subprocess.run(["node", "--check"], input=script,
                                text=True, capture_output=True, check=False)
        if result.returncode:
            errors.append(f"Inline script {i}: {result.stderr[:250]}")
    except FileNotFoundError:
        print("SKIP JavaScript syntax check (Node.js unavailable).")
        break
print(f"Sections: {len(audit.sections)} | Images: {len(audit.images)} | Links: {len(audit.hrefs)} | Inline JS: {len(audit.scripts)}")
if errors:
    print("FAILED:\n" + "\n".join("- " + e for e in errors))
    sys.exit(1)
print("PASS — static portfolio checks.")
