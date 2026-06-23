/**
 * screenshot.js — Takes full-page screenshots using Puppeteer
 *
 * Usage:
 *   node tools/screenshot.js [url] [output] [options]
 *
 * Arguments (positional):
 *   url     — Full URL to screenshot. Default: http://localhost:3000
 *   output  — Output file path. Default: .tmp/screenshots/<timestamp>.png
 *
 * Options:
 *   --width=<n>       Viewport width in px. Default: 1440
 *   --height=<n>      Viewport height in px. Default: 900
 *   --full-page       Capture full scrollable page (default: true)
 *   --mobile          Use mobile viewport (375×812, deviceScaleFactor 2)
 *   --wait=<ms>       Extra wait after page load in ms. Default: 1500
 *   --selector=<css>  Wait for this CSS selector before screenshotting
 *   --clip=<x,y,w,h>  Capture only a clipping rect instead of full page
 *   --all             Screenshot all known routes (/  /jonel  /dine-five)
 *
 * Examples:
 *   node tools/screenshot.js
 *   node tools/screenshot.js http://localhost:3000/dine-five .tmp/screenshots/dine-five.png
 *   node tools/screenshot.js http://localhost:3000 .tmp/screenshots/home.png --mobile
 *   node tools/screenshot.js --all
 */

const puppeteer = require("puppeteer");
const path = require("path");
const fs = require("fs");

// ─── Parse args ───────────────────────────────────────────────────────────────

const args = process.argv.slice(2);

function flag(name) {
  return args.some((a) => a === `--${name}` || a.startsWith(`--${name}=`));
}
function opt(name, fallback) {
  const a = args.find((a) => a.startsWith(`--${name}=`));
  return a ? a.split("=").slice(1).join("=") : fallback;
}

const positional = args.filter((a) => !a.startsWith("--"));
const BASE_URL = positional[0] || "http://localhost:3000";
const outputArg = positional[1] || null;

const ALL_ROUTES = flag("all");
const MOBILE = flag("mobile");
const FULL_PAGE = !flag("no-full-page");
const WAIT_MS = parseInt(opt("wait", "1500"), 10);
const SELECTOR = opt("selector", null);
const CLIP_RAW = opt("clip", null);
const WIDTH = parseInt(opt("width", MOBILE ? "375" : "1440"), 10);
const HEIGHT = parseInt(opt("height", MOBILE ? "812" : "900"), 10);

// ─── Targets ──────────────────────────────────────────────────────────────────

const KNOWN_ROUTES = [
  { route: "/", label: "home" },
  { route: "/jonel", label: "jonel" },
  { route: "/dine-five", label: "dine-five" },
];

function buildTargets() {
  if (ALL_ROUTES) {
    return KNOWN_ROUTES.map(({ route, label }) => ({
      url: BASE_URL.replace(/\/$/, "") + route,
      output: path.join(
        process.cwd(),
        `.tmp/screenshots/${label}${MOBILE ? "-mobile" : ""}.png`
      ),
      label,
    }));
  }

  const ts = Date.now();
  const defaultOutput = path.join(
    process.cwd(),
    `.tmp/screenshots/screenshot-${ts}.png`
  );

  return [
    {
      url: BASE_URL,
      output: outputArg
        ? path.resolve(outputArg)
        : defaultOutput,
      label: outputArg ? path.basename(outputArg, ".png") : `screenshot-${ts}`,
    },
  ];
}

// ─── Screenshot ───────────────────────────────────────────────────────────────

async function shoot(browser, { url, output, label }) {
  const page = await browser.newPage();

  await page.setViewport({
    width: WIDTH,
    height: HEIGHT,
    deviceScaleFactor: MOBILE ? 2 : 1,
    isMobile: MOBILE,
    hasTouch: MOBILE,
  });

  console.log(`  → Loading ${url}`);
  await page.goto(url, { waitUntil: "networkidle2", timeout: 30000 });

  if (SELECTOR) {
    console.log(`  → Waiting for selector: ${SELECTOR}`);
    await page.waitForSelector(SELECTOR, { timeout: 10000 });
  }

  // Scroll through slowly so IntersectionObserver triggers framer-motion whileInView.
  // 300ms per step gives framer-motion enough time to fire before we pass the element.
  console.log(`  → Scrolling page to trigger animations`);
  await page.evaluate(async () => {
    const pageHeight = document.body.scrollHeight;
    const step = 500;
    for (let y = 0; y < pageHeight; y += step) {
      window.scrollTo(0, y);
      await new Promise((r) => setTimeout(r, 300));
    }
    window.scrollTo(0, 0);
  });

  // Wait for all animations to settle (framer-motion transitions are ~600ms).
  const animWait = Math.max(WAIT_MS, 1200);
  console.log(`  → Waiting ${animWait}ms for animations to complete`);
  await new Promise((r) => setTimeout(r, animWait));

  // Force any still-hidden animated elements visible (inline style override).
  // Targets framer-motion elements that are still at opacity 0 after scroll.
  console.log(`  → Forcing remaining hidden elements visible`);
  await page.addStyleTag({
    content: `.df-r, .df-rl, .df-rr { opacity: 1 !important; transform: none !important; }`,
  });
  await page.evaluate(() => {
    document.querySelectorAll("*").forEach((el) => {
      const h = /** @type {HTMLElement} */ (el);
      if (!h.style) return;
      const op = parseFloat(h.style.opacity);
      if (!isNaN(op) && op < 0.5) {
        h.style.opacity = "1";
        h.style.transform = "none";
      }
    });
  });
  await new Promise((r) => setTimeout(r, 400));

  const shootOpts = { path: output };

  if (CLIP_RAW) {
    const [x, y, w, h] = CLIP_RAW.split(",").map(Number);
    shootOpts.clip = { x, y, width: w, height: h };
  } else {
    shootOpts.fullPage = FULL_PAGE;
  }

  fs.mkdirSync(path.dirname(output), { recursive: true });
  await page.screenshot(shootOpts);
  await page.close();

  console.log(`  ✓ Saved: ${output}`);
  return output;
}

// ─── Main ─────────────────────────────────────────────────────────────────────

(async () => {
  const targets = buildTargets();

  console.log(`\nDineFive Screenshot Tool`);
  console.log(`Viewport: ${WIDTH}×${HEIGHT}${MOBILE ? " (mobile)" : ""}`);
  console.log(`Full page: ${FULL_PAGE}`);
  console.log(`Targets: ${targets.length}\n`);

  const browser = await puppeteer.launch({
    headless: true,
    args: [
      "--no-sandbox",
      "--disable-setuid-sandbox",
      "--disable-dev-shm-usage",
    ],
  });

  const saved = [];
  for (const target of targets) {
    try {
      const out = await shoot(browser, target);
      saved.push(out);
    } catch (err) {
      console.error(`  ✗ Failed ${target.label}: ${err.message}`);
    }
  }

  await browser.close();

  console.log(`\nDone. ${saved.length}/${targets.length} screenshots saved.`);
  if (saved.length > 0) {
    console.log("\nFiles:");
    saved.forEach((f) => console.log(`  ${f}`));
  }
})();
