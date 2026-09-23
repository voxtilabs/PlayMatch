#!/usr/bin/env python3
"""
PlayMatch — Automated Design & Responsiveness Test Suite
VoxTi Labs · Cinematic Visuals & Low RAM Architecture
"""

import os
import re
import sys

def test_no_emojis():
    print("Test 1: Zero Emojis Check...")
    emoji_pattern = re.compile(r'[\U00010000-\U0010ffff\u2600-\u26ff\u2700-\u27bf]', flags=re.UNICODE)
    found = False
    for root, _, files in os.walk('src'):
        for f in files:
            if f.endswith(('.astro', '.tsx', '.ts', '.css', '.js', '.jsx')):
                p = os.path.join(root, f)
                with open(p, 'r', encoding='utf-8') as fp:
                    content = fp.read()
                matches = emoji_pattern.findall(content)
                if matches:
                    print(f"  FAIL: Found emojis in {p}: {matches}")
                    found = True
    if found:
        sys.exit(1)
    print("  PASS: Exactly 0 emojis in all source files.")

def test_compiled_css():
    print("Test 2: Compiled CSS & Tailwind Classes...")
    dist_astro = os.path.join('dist', '_astro')
    if not os.path.isdir(dist_astro):
        print("  FAIL: dist/_astro directory does not exist. Run build first.")
        sys.exit(1)
    
    css_files = [f for f in os.listdir(dist_astro) if f.endswith('.css')]
    if not css_files:
        print("  FAIL: No CSS files found in dist/_astro")
        sys.exit(1)
        
    combined_css = ""
    for cf in css_files:
        with open(os.path.join(dist_astro, cf), 'r', encoding='utf-8') as fp:
            combined_css += fp.read()

    required_classes = [
        ".flex", ".grid", ".hud-corners", ".touch-scroll-bracket",
        ".telemetry-indicator", ".sound-visualizer", ".anamorphic-flare",
        ".cinema-vignette", ".custom-select-wrapper", ".gamer-profile-modal",
        ".gamer-banner", ".avatar-frame", ".radar-sweep-beam", ".cinematic-embers-layer"
    ]
    for rc in required_classes:
        if rc not in combined_css:
            print(f"  FAIL: Missing critical class in compiled CSS: {rc}")
            sys.exit(1)
        else:
            print(f"  PASS: Found {rc} in compiled CSS.")

    responsive_media = [
        "@media (min-width: 640px)",
        "@media (min-width: 768px)",
        "@media (min-width: 1024px)"
    ]
    for rm in responsive_media:
        if rm not in combined_css:
            print(f"  FAIL: Missing responsive breakpoint: {rm}")
            sys.exit(1)
        else:
            print(f"  PASS: Found responsive breakpoint {rm}.")

def test_html_structure():
    print("Test 3: Built HTML Structure & Meta Tags...")
    html_path = os.path.join('dist', 'index.html')
    if not os.path.isfile(html_path):
        print("  FAIL: dist/index.html does not exist.")
        sys.exit(1)
        
    with open(html_path, 'r', encoding='utf-8') as fp:
        html = fp.read()
        
    assert 'name="viewport"' in html, "Missing viewport meta tag"
    assert 'content="width=device-width, initial-scale=1.0"' in html, "Invalid viewport configuration"
    assert 'cinema-viewport-layers' in html, "Missing cinematic atmospheric layers"
    assert 'nav-hud' in html, "Missing HUD navbar"
    assert 'playersSection' in html, "Missing playersSection"
    assert 'tourneysSection' in html, "Missing tourneysSection"
    assert 'aboutSection' in html, "Missing aboutSection"
    print("  PASS: All semantic HUD components and meta tags verified.")

if __name__ == '__main__':
    print("========================================")
    print("RUNNING PLAYMATCH CINEMATIC DESIGN TESTS")
    print("========================================")
    test_no_emojis()
    test_compiled_css()
    test_html_structure()
    print("========================================")
    print("ALL DESIGN & RESPONSIVENESS TESTS PASSED!")
    print("========================================")
