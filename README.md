# Stephanie Zha — Portfolio

A static, responsive portfolio for Yixin (Stephanie) Zha, hosted at https://stephzha.com/.

## Preview and checks

No package installation or compilation is required. From the repository root:

```sh
python3 -m http.server 8765 --bind 127.0.0.1
python3 scripts/check.py
```

Open http://127.0.0.1:8765. Checks require Python 3 and Node.js, but the published site requires neither.

## Editing

- `index.html`: all portfolio content, project details, links and terminal markup. Content and native project disclosures work without JavaScript.
- `assets/css/style.css`: responsive layout, typography, colors, and terminal styles.
- `assets/js/site.js`: moving electrons along SVG chip traces. Native sector links work with mouse, keyboard, touch, or no JavaScript. Respects reduced motion, supports pause/play, and pauses decoration offscreen or in a hidden tab. Chip depth and gentle floating use CSS transforms; no rendering dependency.
- `assets/js/projects.js`: project data used by the interactive terminal. Keep this in sync when editing the static project cards.
- `assets/js/terminal.js`: existing portfolio command interface, including résumé and project shortcuts.
- `assets/resume/Yixin_Zha_Resume.pdf`: existing résumé, unchanged.

The site uses system fonts and local CSS/JS. The original travel map is a lazy-loaded Google Maps embed; its content depends on Google availability. No analytics or external UI libraries are loaded.

## GitHub Pages and custom domain

Keep the existing GitHub Pages source set to `main` / root (`/`) and custom domain `stephzha.com`. The existing `CNAME` is preserved, and `.nojekyll` allows direct static publishing. The canonical and social URLs use the existing apex domain; www redirects to that domain in the current deployment. Keep existing DNS and HTTPS settings.

Review and merge the redesign PR when ready. A branch push does not replace the production site; merging to the configured Pages source publishes the change. No deployment workflow or DNS changes are needed. If Pages is configured differently, retain that configuration and verify its source before merging.

Before release, check desktop and mobile navigation, project disclosures, motion pause/play and reduced-motion preferences, résumé, terminal commands, and travel map. Verify external destinations manually; the static checker verifies local files and anchors only.

## Attribution

The original portfolio was based on https://github.com/varadbhogayata/varadbhogayata.github.io. Existing assets and license are retained. The redesigned layout and animated lattice are original.
