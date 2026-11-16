#!/usr/bin/env python3
"""Static QA for the Portfolio V2 preview; no external dependencies."""
from collections import Counter
from html.parser import HTMLParser
from pathlib import Path
from urllib.parse import urlsplit
import re
import shutil
import subprocess
import sys

ROOT = Path(__file__).resolve().parents[1]
HTML = (ROOT / "index.html").read_text(encoding="utf-8")
errors = []

class Scan(HTMLParser):
    def __init__(self):
        super().__init__(convert_charrefs=True)
        self.ids = []
        self.links = []
        self.images = []
        self.forms = []
        self.sections = []
        self.meta = {}
        self.scripts = []
        self.current_script = None
        self.h1_count = 0
        self.lang = None
        self.has_title = False

    def handle_starttag(self, tag, attrs):
        a = dict(attrs)
        if tag == "html":
            self.lang = a.get("lang")
        if a.get("id"):
            self.ids.append(a["id"])
        if tag == "a":
            self.links.append(a)
        if tag == "img":
            self.images.append(a)
        if tag == "form":
            self.forms.append(a)
        if tag == "section":
            self.sections.append(a.get("id"))
        if tag == "meta":
            self.meta[a.get("name", "")] = a.get("content", "")
        if tag == "h1":
            self.h1_count += 1
        if tag == "title":
            self.has_title = True
        if tag == "script" and not a.get("src"):
            self.current_script = []

    def handle_data(self, data):
        if self.current_script is not None:
            self.current_script.append(data)

    def handle_endtag(self, tag):
        if tag == "script" and self.current_script is not None:
            self.scripts.append("".join(self.current_script))
            self.current_script = None

audit = Scan()
audit.feed(HTML)

if audit.lang != "bg":
    errors.append("html lang must be bg")
if not audit.has_title:
    errors.append("Missing document title")
if not audit.meta.get("description"):
    errors.append("Missing meta description")
if not audit.meta.get("viewport"):
    errors.append("Missing viewport meta")
if audit.h1_count != 1:
    errors.append(f"Expected one H1, got {audit.h1_count}")
duplicate_ids = [k for k, v in Counter(audit.ids).items() if v > 1]
if duplicate_ids:
    errors.append("Duplicate ids: " + ", ".join(duplicate_ids))
for required in ("main", "about", "services", "projects"):
    if required not in audit.ids:
        errors.append("Missing section/landmark #" + required)
if not any(link.get("href") == "#main" for link in audit.links):
    errors.append("Missing keyboard skip link")
for link in audit.links:
    href = link.get("href", "")
    if href.startswith("#") and href[1:] not in audit.ids:
        errors.append("Broken anchor: " + href)
    if link.get("target") == "_blank" and "noopener" not in link.get("rel", ""):
        errors.append("External link missing noopener: " + href)
    if href.strip().lower().startswith("javascript:"):
        errors.append("Dangerous javascript href")
if len(audit.images) > 0 and any(not i.get("alt") for i in audit.images):
    errors.append("One or more images lack alt text")
if "assets/floating/" in HTML or "eg-motion.js" in HTML:
    errors.append("Previously reverted 20-image motion assets were reintroduced")
if "<!--" in HTML and "placeholder" in HTML.lower():
    print("NOTE: Inspect comments for remaining placeholders")
if "mailto:" not in HTML:
    errors.append("No working contact handoff")
if "form action=" in HTML and "mailto:" not in HTML:
    errors.append("Unverified form handling")
if "data-8b-placeholder" in HTML:
    errors.append("Demo placeholder remains")
if not re.search(r"prefers-reduced-motion\s*:\s*reduce", HTML):
    errors.append("Missing reduced-motion CSS")
if "aria-expanded" not in HTML or "Escape" not in HTML:
    errors.append("Mobile menu should expose state and Escape handling")
if not re.search(r"@media\s*\(?max-width", HTML):
    errors.append("Missing mobile responsive styles")
if not re.search(r"(?i)<main\b", HTML):
    errors.append("Missing main landmark")
if shutil.which("node"):
    for num, js in enumerate(audit.scripts, 1):
        result = subprocess.run(["node", "--check"], input=js, text=True, capture_output=True)
        if result.returncode:
            errors.append(f"Inline script {num} has invalid JS: {result.stderr[:170]}")
else:
    print("NOT TESTED: Node.js is unavailable; skipped JavaScript parse check")
print(f"Portfolio V2: {len(audit.ids)} ids, {len(audit.links)} links, {len(audit.sections)} sections, {len(audit.scripts)} inline JS")
if errors:
    print("FAIL:")
    for err in errors:
        print(" -", err)
    sys.exit(1)
print("PASS: structural static validation (not equivalent to browser QA)")
