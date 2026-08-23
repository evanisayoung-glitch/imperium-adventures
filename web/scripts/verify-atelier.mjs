/**
 * verify-atelier.mjs — checks the luxury cabinet catalog.
 *
 * Usage:
 *   node scripts/verify-atelier.mjs http://localhost:3000
 */

import { chromium } from "playwright";

const URL = process.argv[2] || "http://localhost:3000";
const results = [];
const check = (name, ok, detail) => {
  results.push([ok ? "PASS" : "FAIL", name, detail]);
  console.log(`${ok ? "✓ PASS" : "✗ FAIL"}  ${name}  (${detail})`);
};

const run = async () => {
  const browser = await chromium.launch();
  const page = await browser.newPage({ viewport: { width: 1440, height: 900 } });
  page.on("pageerror", (error) => console.log("PAGE ERROR:", error.message));

  await page.goto(`${URL}/atelier`, { waitUntil: "domcontentloaded" });
  await page.waitForTimeout(1200);
  const heading = await page.locator("h1").first().innerText();
  check("cabinet heading", heading.toLowerCase().includes("cabinet"), heading);
  const sylva = page.getByRole("link", { name: /Sylva/i }).first();
  check("sylva card present", await sylva.count().then((n) => n > 0), "Sylva study");

  await page.goto(`${URL}/atelier?family=worlds`, { waitUntil: "domcontentloaded" });
  await page.waitForTimeout(400);
  const titles = page.locator("h2");
  const titleText = await titles.allInnerTexts();
  check(
    "worlds filter keeps sylva",
    titleText.some((text) => /Sylva/i.test(text)),
    titleText.join(" | "),
  );
  check(
    "worlds filter hides sablier",
    titleText.every((text) => !/Sablier/i.test(text)),
    titleText.join(" | "),
  );

  await page.getByRole("link", { name: /Sylva/i }).first().click();
  await page.waitForTimeout(800);
  const studyTitle = await page.locator("h1").first().innerText();
  check("study page title", studyTitle.includes("Sylva"), studyTitle);
  check(
    "commission cta",
    await page.getByRole("link", { name: /Commission this study/i }).count().then((n) => n > 0),
    "mailto present",
  );

  await page.goto(URL, { waitUntil: "domcontentloaded" });
  await page.waitForTimeout(800);
  check(
    "home teaser",
    await page.getByRole("link", { name: /Enter the cabinet/i }).count().then((n) => n > 0),
    "atelier teaser",
  );

  await browser.close();
  const failed = results.filter((row) => row[0] === "FAIL").length;
  process.exit(failed ? 1 : 0);
};

run().catch((error) => {
  console.error(error);
  process.exit(1);
});
