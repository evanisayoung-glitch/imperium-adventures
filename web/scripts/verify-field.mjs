/**
 * verify-field.mjs — acceptance harness for the particle wordmark.
 *
 * Runs the interaction contract from references/integration.md §1 against a
 * live URL and prints PASS/FAIL per check. Verify IN MOTION with density
 * sampling — still screenshots catch the crisp moments and miss every
 * in-motion failure (that is how a shipped regression got past review once).
 *
 * Usage:
 *   node verify-field.mjs http://localhost:3000 [chromium-executable-path]
 *
 * Needs playwright (`npm i -D playwright`) and a Chromium. If the page hides
 * behind an intro overlay, dismiss it below (see DISMISS_OVERLAY).
 *
 * Emulation caveats it cannot cover — check on a real iPhone afterward:
 * - iOS Safari drops pointerleave after taps (emulated Chromium fires it),
 *   so hover-state parking bugs pass here and fail on device.
 * - lvh vs URL-bar collapse can't be simulated; the harness only proves the
 *   unit parsed and governs the host.
 * - An already-open Safari tab is stale across deploys; close it, then test.
 */

import { chromium, devices } from 'playwright';

const URL = process.argv[2] || 'http://localhost:3000';
const EXE = process.argv[3]; // optional chromium path

// If the site opens with a full-screen intro (curtain, splash), do whatever
// dismisses it here. PageDown + a tap covers most patterns.
async function DISMISS_OVERLAY(page) {
  await page.keyboard.press('PageDown').catch(() => {});
  await page.waitForTimeout(1800);
  await page.evaluate(() => window.scrollTo(0, 0));
  await page.waitForTimeout(500);
}

// Dot density inside a box centered where the word forms (offsetY -60 above
// the interaction point). Counts alpha-positive samples on a stride.
const densitySnippet = (x, y) => `(() => {
  const c = document.querySelector('canvas');
  if (!c) return -1;
  const ctx = c.getContext('2d');
  const dpr = c.width / c.clientWidth;
  const bx = Math.max(0, (${x} - 160) * dpr), by = Math.max(0, (${y} - 60 - 75) * dpr);
  const d = ctx.getImageData(bx, by, 320 * dpr, 150 * dpr).data;
  let n = 0; for (let i = 3; i < d.length; i += 16) if (d[i] > 60) n++;
  return n;
})()`;

const results = [];
const check = (name, ok, detail) => {
  results.push([ok ? 'PASS' : 'FAIL', name, detail]);
  console.log(`${ok ? '✓ PASS' : '✗ FAIL'}  ${name}  (${detail})`);
};

const run = async () => {
  const browser = await chromium.launch(EXE ? { executablePath: EXE } : {});

  // ── Desktop ───────────────────────────────────────────────────────────
  const page = await browser.newPage({ viewport: { width: 1440, height: 900 } });
  page.on('pageerror', (e) => console.log('PAGE ERROR:', e.message));
  await page.goto(URL, { waitUntil: 'load' });
  await page.waitForTimeout(1500);
  await DISMISS_OVERLAY(page);

  const canvases = await page.locator('canvas').count();
  // Strict: per-section instances are the classic mis-integration and they
  // also "work", just wrong. One page-wide field = one canvas once any intro
  // overlay is gone. If a live opaque overlay legitimately owns an instance,
  // dismiss it in DISMISS_OVERLAY before this counts.
  check('exactly one field canvas', canvases === 1, `${canvases} canvas(es) — more than 1 means per-section instances or an undismissed overlay`);

  const SX = 1000, SY = 520;

  await page.mouse.move(SX, SY);
  await page.waitForTimeout(2500);
  const parked = await page.evaluate(densitySnippet(SX, SY));
  check('parked cursor forms nothing', parked >= 0 && parked < 300, `density ${parked}`);
  const ambient = Math.max(20, parked);

  for (let i = 0; i <= 50; i++) { await page.mouse.move(180 + i * 20, 380 + i * 4); await page.waitForTimeout(30); }
  const travel = await page.evaluate(densitySnippet(180 + 50 * 20, 380 + 50 * 4));
  check('page travel forms nothing', travel < ambient * 1.6 + 60, `density ${travel} vs ambient ${ambient}`);

  for (let i = 0; i < 280; i++) {
    await page.mouse.move(SX + Math.sin(i / 2.1) * 70, SY + Math.cos(i / 3.3) * 35);
    await page.waitForTimeout(8);
  }
  const scrub = await page.evaluate(densitySnippet(SX, SY));
  check('scrub charges and forms', scrub > ambient * 4, `density ${scrub}`);
  await page.screenshot({ path: 'verify-scrub-crisp.png', clip: { x: SX - 220, y: SY - 190, width: 440, height: 280 } });
  console.log('   ↳ open verify-scrub-crisp.png — taken WHILE scrubbing; letterforms must be clean, not smeared');

  await page.evaluate(() => document.dispatchEvent(new PointerEvent('pointerleave')));
  await page.waitForTimeout(2600);
  const released = await page.evaluate(densitySnippet(SX, SY));
  check('release exhales fully', released < ambient * 1.6 + 60, `density ${released} 2.6s after leave`);

  const hits = await page.evaluate(() => {
    const out = [];
    for (const sel of ['h1, h2', 'main p', 'a[href]']) {
      // First VISIBLE match — skip-links and other off-screen a11y elements
      // sit at -9999px and would false-fail the probe.
      const el = [...document.querySelectorAll(sel)].find((e) => {
        const r = e.getBoundingClientRect();
        return r.width > 8 && r.height > 8 && r.left > -100 && r.top > -1000;
      });
      if (!el) continue;
      el.scrollIntoView({ block: 'center' });
      const r = el.getBoundingClientRect();
      const hit = document.elementFromPoint(r.left + Math.min(30, r.width / 2), r.top + r.height / 2);
      out.push(hit && hit.tagName !== 'CANVAS');
    }
    return out;
  });
  check('content wins hit-tests', hits.length > 0 && hits.every(Boolean), `${hits.length} probes`);

  // ── Touch ─────────────────────────────────────────────────────────────
  const ctx = await browser.newContext({ ...devices['iPhone 14'] });
  const t = await ctx.newPage();
  t.on('pageerror', (e) => console.log('PAGE ERROR:', e.message));
  await t.goto(URL, { waitUntil: 'load' });
  await t.waitForTimeout(1500);
  await t.touchscreen.tap(195, 420).catch(() => {}); // dismiss overlay if any
  await t.waitForTimeout(2000);
  await t.evaluate(() => window.scrollTo(0, 0));
  await t.waitForTimeout(2000);

  const TX = 195, TY = 460;
  const idle = await t.evaluate(densitySnippet(TX, TY));
  const cdp = await ctx.newCDPSession(t);
  const tap = async () => {
    await cdp.send('Input.dispatchTouchEvent', { type: 'touchStart', touchPoints: [{ x: TX, y: TY }] });
    await t.waitForTimeout(60);
    await cdp.send('Input.dispatchTouchEvent', { type: 'touchEnd', touchPoints: [] });
  };

  await tap();
  // Poll for the true peak — a single still sample is exactly the mistake
  // this skill warns about; the tug crests as the spring lands, ~0.5-0.9s in.
  let single = 0;
  for (let i = 0; i < 9; i++) {
    await t.waitForTimeout(150);
    single = Math.max(single, await t.evaluate(densitySnippet(TX, TY)));
  }
  await t.waitForTimeout(2200);
  const after = await t.evaluate(densitySnippet(TX, TY));
  check('single tap tugs', single > idle * 1.3, `idle ${idle} → peak ${single}`);
  check('single tap never parks', after < idle * 1.4 + 60, `density ${after} 3s later`);

  // Press-and-hold must sustain only one tap's tug — NEVER form the word.
  await cdp.send('Input.dispatchTouchEvent', { type: 'touchStart', touchPoints: [{ x: TX, y: TY }] });
  await t.waitForTimeout(3000);
  const held = await t.evaluate(densitySnippet(TX, TY));
  await cdp.send('Input.dispatchTouchEvent', { type: 'touchEnd', touchPoints: [] });
  await t.waitForTimeout(2500);

  for (let i = 0; i < 12; i++) { await tap(); await t.waitForTimeout(180); }
  const mash = await t.evaluate(densitySnippet(TX, TY));
  check('mash ratchets to formed', mash > idle * 3, `density ${mash}`);
  check('press-and-hold never forms the word', held < mash * 0.55, `held 3s ${held} vs mash ${mash}`);
  await t.waitForTimeout(3200);
  const mashReleased = await t.evaluate(densitySnippet(TX, TY));
  check('mash releases after stopping', mashReleased < idle * 1.6 + 60, `density ${mashReleased}`);

  // A mouse/trackpad on a touch-classified device (iPad) must obey the scrub
  // rule — hover alone never forms.
  await t.mouse.move(TX, TY);
  await t.waitForTimeout(2500);
  const padHover = await t.evaluate(densitySnippet(TX, TY));
  check('mouse-on-touch-device hover never forms', padHover < idle * 1.5 + 60, `density ${padHover}`);

  await cdp.send('Input.dispatchTouchEvent', { type: 'touchStart', touchPoints: [{ x: TX, y: TY + 60 }] });
  await cdp.send('Input.dispatchTouchEvent', { type: 'touchMove', touchPoints: [{ x: TX, y: TY - 80 }] });
  await cdp.send('Input.dispatchTouchEvent', { type: 'touchCancel', touchPoints: [] });
  await t.evaluate(() => window.scrollTo(0, 0));
  await t.waitForTimeout(1500);
  const afterScroll = await t.evaluate(densitySnippet(TX, TY));
  check('scroll-cancel never parks', afterScroll < idle * 1.5 + 60, `density ${afterScroll}`);

  // ── Reduced motion ────────────────────────────────────────────────────
  const rm = await browser.newContext({ viewport: { width: 1440, height: 900 }, reducedMotion: 'reduce' });
  const r = await rm.newPage();
  await r.addInitScript(() => {
    window.__rafCount = 0;
    const raf = window.requestAnimationFrame.bind(window);
    window.requestAnimationFrame = (fn) => { window.__rafCount++; return raf(fn); };
  });
  await r.goto(URL, { waitUntil: 'load' });
  await r.waitForTimeout(2500);
  const before = await r.evaluate(() => window.__rafCount);
  await r.waitForTimeout(1000);
  const loops = (await r.evaluate(() => window.__rafCount)) - before;
  check('reduced motion: no loop', loops < 30, `${loops} rAF callbacks in 1s (site animations may add a few)`);

  await browser.close();

  const fails = results.filter(([s]) => s === 'FAIL').length;
  console.log(`\n${results.length - fails}/${results.length} checks passed${fails ? ' — DO NOT SHIP' : ''}`);
  console.log('Remaining manual step: a real iPhone — single tap must never park, and close any stale Safari tab first.');
  process.exit(fails ? 1 : 0);
};

run().catch((e) => { console.error(e); process.exit(1); });
