Akihi036: 请分析此项目，并以英文形式提交一份详尽的报告，保存为Markdown格式文件，存放在docs文件夹中。请毫不保留地提出批评意见

Workspace: 正在收集工作区信息已在 docs/report.md 中生成英文项目分析报告。下面是本次报告中引用到的文件与符号（可点击打开）：

- Files: index_2.html, tracks.html, script2.js, styles_2.css, styles_subpage.css, styles.css, styles_page.css, index.html, [first page.html](first page.html), script.js
- Symbols (in workspace): `animalData`, `continentMaps`, `initTracksPage`, `initMainPage`, `displayAnimalTracks`

````markdown
# Project Audit — Endangered Animals Guardian Station

> Author: Automated code audit  
> Date: (generated)  
> Note: This report is written in English as requested. It is direct and candid.

## Executive summary

This repository contains a small multi-page static site for an endangered-animals awareness project. The codebase is basic and functional, but suffers from inconsistent architecture, fragile asset handling, accessibility and performance issues, and brittle JavaScript DOM interactions. The site will break or behave unexpectedly in real-world deployments (different servers, CDNs, or when assets have non-URL-safe names). Below is a prioritized list of findings and concrete remediation steps.

## Project map

Files of interest (major ones):
- [index_2.html](index_2.html) — primary animals catalogue and navigation
- [tracks.html](tracks.html) — detail / tracks visualization page
- [script2.js](script2.js) — JavaScript that drives both pages
- [styles_2.css](styles_2.css) — main styles used by index_2.html
- [styles_subpage.css](styles_subpage.css) — styles for tracks.html
- [styles.css](styles.css) — legacy/other site styles (index.html)
- [styles_page.css](styles_page.css) — landing page styles (first page.html)
- [index.html](index.html), [first page.html](first page.html) — other pages/examples
- [script.js](script.js) — script for the other site (not inspected in depth here)

JavaScript key symbols:
- `animalData` — species dataset [`animalData`](script2.js)
- `continentMaps` — mapping of continent key → image [`continentMaps`](script2.js)
- `initTracksPage()` — tracks page initialization [`initTracksPage`](script2.js)
- `initMainPage()` — main page initialization [`initMainPage`](script2.js)
- `displayAnimalTracks()` — renders tracks overlay [`displayAnimalTracks`](script2.js)

## High-level issues (priority order)

1. Asset filename hygiene and URL-encoding (HIGH)
   - Many image filenames contain spaces and uppercase letters, e.g. `public/images/Bluefin tuna.jpg`, `public/images/Siberian Tiger.jpg`. This leads to fragile links and problems when served from some servers or CDNs. Browsers tolerate spaces but servers and automated tools often do not.
   - Recommendation: rename files to kebab-case or snake_case and update HTML/JS references (e.g. `siberian-tiger.jpg`).

2. Inconsistent and duplicated CSS (HIGH / maintainability)
   - Multiple stylesheet files (`styles.css`, `styles_2.css`, `styles_subpage.css`, `styles_page.css`) with overlapping selectors and different design vocabularies. This creates cognitive load and increases chance of conflicting rules.
   - Several CSS files use different color models (hsl, oklab, hwb) and inconsistent spacing/units.
   - Recommendation: consolidate styles into a small set (base, layout, components, pages). Use a naming convention (BEM or utility-first) and remove duplicated `.header` rules.

3. Fragile JavaScript DOM logic & event handling (HIGH)
   - `script2.js` checks `window.location.pathname.includes('tracks.html')` to decide behavior. This is brittle (e.g., when deployed under a subpath, or `index.html?x=tracks.html`).
   - The scroll handler changes inline styles directly (`header.style.backgroundColor = ...`) — better to toggle classes to respect stylesheets and transitions.
   - `displayAnimalTracks` appends images and uses raw `data.trackImage` strings without validating or encoding. No graceful fallback for missing images.
   - Recommendation: replace path checks with feature/role checks (presence of element IDs) and prefer class toggles. Add error handling for missing asset loads.

4. Accessibility (a11y) issues (MEDIUM)
   - Images mostly have alt attributes — good — but interactive elements such as the track markers (`.track`) lack accessible names, keyboard support, or ARIA attributes.
   - The "Back to Main" link and other anchors work, but keyboard focus styles are not guaranteed.
   - Recommendation: add aria-label on `.track` elements, make track markers focusable (tabindex=0), ensure sufficient color contrast for text.

5. Performance & SEO (MEDIUM)
   - Large background and species images appear to be used without responsive srcsets or optimization. This will slow mobile loads.
   - No meta tags for social previews or structured data for species pages.
   - Recommendation: generate optimized images and use `<img srcset>` and `loading="lazy"`. Add basic metadata for key pages.

6. Maintainability & data separation (LOW → MEDIUM)
   - `animalData` is a large JavaScript literal in `script2.js`. If the dataset grows, this becomes unwieldy.
   - Recommendation: move data to JSON files under `data/` and fetch them, or generate pages at build time if static generation is introduced.

7. UX & responsiveness gaps (LOW)
   - Some layouts are grid-based but rely on fixed heights (e.g., `.continent-map` fixed 500px). On small screens markers positioning may be misleading.
   - Recommendation: adjust layout to responsive dimensions and recalculate marker coordinates relative to the image displayed size.

## Concrete problems with examples

- Space in filenames:
  - In [index_2.html](index_2.html): `<img src="public/images/Bluefin tuna.jpg" alt="Bluefin tuna">`
  - In `animalData` (script2.js): `"trackImage": "public/images/Siberian Tiger.jpg"`
  - Fix: rename to `public/images/bluefin-tuna.jpg` and use lower-case, hyphenated filenames.

- Fragile route detection:
  - `if (window.location.pathname.includes('tracks.html')) { initTracksPage(); }`
  - Problem: if the page is served as `/project/tracks.html` or `tracks.html/` or on a SPA setup, this might break. Also the same script is loaded on all pages unnecessarily.
  - Fix: detect presence of a page-specific element: `if (document.getElementById('tracks-container')) { initTracksPage(); }`

- Inline style color toggle:
  - Current:
    ```
    window.addEventListener('scroll', function() {
      const header = document.querySelector('.header');
      if (window.scrollY > 50) {
        header.style.backgroundColor = '#1a5c7a';
      } else {
        header.style.backgroundColor = '#2c7da0';
      }
    });
    ```
  - Problems: overrides CSS, prevents transitions, and bypasses `prefers-color-scheme` or theme variables.
  - Fix: toggle a class (`.scrolled`) and define colors in CSS.

- Missing error handling for missing `species`:
  - `initTracksPage` sets error text but still leaves map blank. Better show a fallback image or redirect.

## Actionable prioritized todo list

1. HIGH (do first)
   - Rename image assets to URL-safe names (lowercase, hyphenated). Update all references in HTML and JS.
   - Replace inline header color toggling with a class toggle in `script2.js` and CSS rules in `styles_2.css` / `styles_subpage.css`.
   - Make script initialization robust: check for page-specific DOM elements instead of path string checks.

2. MEDIUM
   - Consolidate CSS files and remove duplicate `.header` definitions. Adopt a small design token file (CSS variables) for colors and spacing.
   - Optimize images and add `srcset` + `loading="lazy"`.
   - Add ARIA attributes and keyboard support for interactive markers.

3. LOW
   - Move `animalData` to `data/animals.json` (or fetch remote) and load asynchronously.
   - Add a small build step (optional) to minify CSS/JS and generate optimized images.

## Suggested code samples

Replace scroll inline-style code with class toggle (recommended change in `script2.js`):

```js
// filepath: script2.js
// ...existing code...
// Replace existing scroll handler with this:
window.addEventListener('scroll', () => {
  const header = document.querySelector('.header');
  if (!header) return;
  if (window.scrollY > 50) {
    header.classList.add('scrolled');
  } else {
    header.classList.remove('scrolled');
  }
}, { passive: true });
// ...existing code...
```

Add corresponding CSS (in `styles_2.css` and `styles_subpage.css`):

```css
/* add to styles_2.css and styles_subpage.css */
.header {
  transition: background-color 0.25s ease;
  background-color: var(--header-bg, #2c7da0);
}
.header.scrolled {
  background-color: var(--header-bg-scrolled, #1a5c7a);
}
```

Make page detection robust:

```js
// filepath: script2.js
// ...existing code...
document.addEventListener('DOMContentLoaded', function() {
  if (document.getElementById('tracks-container')) {
    initTracksPage();
  } else if (document.getElementById('main-content')) {
    initMainPage();
  }
});
// ...existing code...
```

Sanitize and validate `trackImage` before use (fallback to placeholder):

```js
// filepath: script2.js
function createTrackElement(imageUrl, leftPct, topPct, rotation) {
  const track = document.createElement('div');
  track.className = 'track';
  track.style.left = `${leftPct}%`;
  track.style.top = `${topPct}%`;
  track.style.transform = `rotate(${rotation}deg)`;
  const img = new Image();
  img.src = imageUrl;
  img.alt = 'track';
  img.onload = () => {
    track.style.backgroundImage = `url('${imageUrl}')`;
  };
  img.onerror = () => {
    track.style.backgroundImage = `url('public/images/placeholder-track.png')`;
  };
  return track;
}
```

## Accessibility & UX quick wins

- Make `.track` elements keyboard-accessible:
  - `track.setAttribute('tabindex','0')`
  - `track.setAttribute('role','button')`
  - `track.setAttribute('aria-label', data.name + ' track marker')`
- Ensure high contrast for text and interactive focus outlines.
- Provide captions and visible legends for the map and track markers.

## Deployment & operations notes

- Hosts and CDNs will likely fail if asset names include spaces. Normalize names and ensure correct MIME types.
- Consider adding a simple static site build (e.g., npm + gulp/rollup or a static-site generator) to produce optimized assets and HTTP cache-friendly filenames (fingerprinting).

## Final remarks (blunt)

- Current structure is acceptable for a local prototype, but it is not production-ready.
- The main risks: broken assets (spaces), CSS conflicts causing visual regressions, and fragile JS assumptions about location and DOM.
- If the goal is educational/demo only, minimal fixes (rename assets, class-based scroll, a11y tweaks) will make the site much more robust.
- If the goal is a public-facing site, invest in image optimization, CSS consolidation, data separation, and automated testing.

---

If you want, I can:
- produce a script that renames files and rewrites references,
- create a small build script (npm-based) to optimize images and bundle assets,
- or apply the minimal JS/CSS changes above directly.

````

```js
// ...existing code...
// Suggested replacement snippet for scroll handling (already shown in the report)
window.addEventListener('scroll', () => {
  const header = document.querySelector('.header');
  if (!header) return;
  if (window.scrollY > 50) {
    header.classList.add('scrolled');
  } else {
    header.classList.remove('scrolled');
  }
}, { passive: true });
// ...existing code...
```

