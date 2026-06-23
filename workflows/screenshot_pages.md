# Workflow: Screenshot Pages

## Objective
Take high-quality screenshots of any or all pages in this Next.js project using Puppeteer.

## Prerequisites
- Dev server must be running (`npm run dev` in a separate terminal, default port 3000)
- OR the built site is served (`npm run build && npm run start`)
- Puppeteer is installed (`npm install puppeteer --save-dev`)

## Tool
`tools/screenshot.js`

## Inputs Required
- `url` — The page URL to screenshot (default: `http://localhost:3000`)
- `output` — Output file path (default: `.tmp/screenshots/<timestamp>.png`)

## Common Commands

### Screenshot a single page (default viewport 1440×900)
```bash
node tools/screenshot.js http://localhost:3000/dine-five .tmp/screenshots/dine-five.png
```

### Screenshot all three brand pages at once
```bash
node tools/screenshot.js --all
# Saves: .tmp/screenshots/home.png, jonel.png, dine-five.png
```

### Mobile viewport screenshot
```bash
node tools/screenshot.js http://localhost:3000/dine-five .tmp/screenshots/dine-five-mobile.png --mobile
```

### Screenshot all pages in mobile view
```bash
node tools/screenshot.js --all --mobile
```

### Custom viewport size
```bash
node tools/screenshot.js http://localhost:3000 .tmp/screenshots/home-wide.png --width=1920 --height=1080
```

### Capture only a specific section (clip rect: x,y,width,height)
```bash
node tools/screenshot.js http://localhost:3000/dine-five .tmp/screenshots/hero-clip.png --clip=0,74,1440,900
```

### Wait for a specific element before screenshotting
```bash
node tools/screenshot.js http://localhost:3000/dine-five .tmp/screenshots/dine-five.png --selector="#waitlist"
```

### Extra wait time for slow animations
```bash
node tools/screenshot.js http://localhost:3000 .tmp/screenshots/home.png --wait=3000
```

## Output
- Screenshots saved to `.tmp/screenshots/`
- `.tmp/` is gitignored — files are disposable and regenerated on demand

## Options Reference
| Flag | Default | Description |
|------|---------|-------------|
| `--all` | false | Screenshot all known routes (/, /jonel, /dine-five) |
| `--mobile` | false | 375×812 viewport, deviceScaleFactor 2 |
| `--width=<n>` | 1440 | Viewport width |
| `--height=<n>` | 900 | Viewport height |
| `--full-page` | true | Capture full scrollable page |
| `--wait=<ms>` | 1500 | Extra wait after page load |
| `--selector=<css>` | — | Wait for CSS selector before shooting |
| `--clip=<x,y,w,h>` | — | Capture a specific rect only |

## Notes
- The tool waits for `networkidle2` before screenshotting (all network requests settled)
- Scroll-reveal animations require the `--wait` flag to capture fully-revealed state
- If the server isn't running, the tool will error with a connection refused message
- Screenshots open in any image viewer or can be uploaded to Google Drive
