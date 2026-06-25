import { chromium } from "playwright";

const baseUrl = process.env.SMOKE_BASE_URL || "http://127.0.0.1:5173";
const routes = [
  ["/", "Learn, translate"],
  ["/translate/text", "Universal Translator"],
  ["/translate/voice", "Universal Voice Translator"],
  ["/learn", "Interactive Lessons"],
  ["/practice", "Practice Center"],
  ["/chatbot", "AI Language Tutor"],
  ["/achievements", "Achievements"],
  ["/history", "Learning History"],
];

const browser = await chromium.launch({ headless: true });
const page = await browser.newPage({ viewport: { width: 1440, height: 1000 } });
await page.addInitScript(() => localStorage.setItem("theme", "light"));

for (const [path, text] of routes) {
  await page.goto(`${baseUrl}${path}`, { waitUntil: "networkidle" });
  await page.getByText(text, { exact: false }).first().waitFor({ timeout: 10000 });
}

await page.goto(baseUrl, { waitUntil: "networkidle" });
const initialTheme = await page.evaluate(() => document.documentElement.dataset.theme);
await page.getByRole("button", { name: /switch to dark theme/i }).click();
const darkTheme = await page.evaluate(() => document.documentElement.dataset.theme);
await page.getByRole("button", { name: /switch to light theme/i }).click();
const lightTheme = await page.evaluate(() => document.documentElement.dataset.theme);

await browser.close();

if (initialTheme !== "light" || darkTheme !== "dark" || lightTheme !== "light") {
  throw new Error(`Theme toggle failed: ${initialTheme} -> ${darkTheme} -> ${lightTheme}`);
}

console.log("UI smoke test passed");
