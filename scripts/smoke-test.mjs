import { chromium } from "playwright";

const baseUrl = process.env.SMOKE_BASE_URL || "http://127.0.0.1:5173";
const routes = [
  ["/", "LangLearn"],
  ["/translate/text", "Universal Translator"],
  ["/translate/voice", "Universal Voice Translator"],
  ["/learn", "Interactive Lessons"],
  ["/practice", "Practice Center"],
  ["/chatbot", "AI Language Tutor"],
  ["/achievements", "Achievements"],
  ["/history", "Learning History"],
];

const browser = await chromium.launch({ headless: true });
const page = await browser.newPage();
const failures = [];

page.on("pageerror", (error) => failures.push(`pageerror: ${error.message}`));
page.on("console", (message) => {
  if (message.type() === "error") {
    if (message.text().includes("Failed to load resource: the server responded with a status of 404")) {
      return;
    }
    failures.push(`console error: ${message.text()}`);
  }
});

for (const [path, text] of routes) {
  await page.goto(`${baseUrl}${path}`, { waitUntil: "networkidle" });
  await page.getByText(text, { exact: false }).first().waitFor({ timeout: 10000 });
}

await page.goto(`${baseUrl}/translate/text`, { waitUntil: "networkidle" });
await page.getByPlaceholder("Type or paste your text here...").fill("hello");
await page.getByRole("button", { name: /translate/i }).click();
await page.getByText("hola", { exact: false }).first().waitFor({ timeout: 10000 });

await page.goto(`${baseUrl}/practice`, { waitUntil: "networkidle" });
await page.getByRole("button", { name: /start exercise/i }).click();
await page.getByText("Match the words", { exact: false }).waitFor({ timeout: 10000 });

await page.goto(`${baseUrl}/chatbot`, { waitUntil: "networkidle" });
await page.getByPlaceholder("Type your message...").fill("Teach me greetings");
await page.locator('form button[type="submit"]').click();
await page.getByText("Teach me greetings", { exact: false }).waitFor({ timeout: 10000 });
await page.getByText("practice", { exact: false }).waitFor({ timeout: 10000 });

await page.goto(`${baseUrl}/learn`, { waitUntil: "networkidle" });
await page.getByText("Basic Greetings", { exact: false }).first().waitFor({ timeout: 10000 });
await page.getByLabel("Start Basic Greetings").first().click();
await page.getByText("Key Vocabulary", { exact: false }).waitFor({ timeout: 10000 });

await browser.close();

if (failures.length > 0) {
  console.error(failures.join("\n"));
  process.exit(1);
}

console.log("Smoke test passed");
