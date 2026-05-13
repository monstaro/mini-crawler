const { chromium } = require("playwright");
const { source } = require("axe-core");
const fs = require("fs");

async function crawlPage(url) {
  const browser = await chromium.launch({ headless: true });
  const page = await browser.newPage();
  await page.goto(url, { waitUntil: "networkidle" });
  await page.evaluate(source);

  const results = await page.evaluate(() => {
    return new Promise((resolve) => {
      axe.run(document, {}, (err, results) => {
        resolve(results);
      });
    });
  });

  await browser.close();
  console.log(results.violations);
  const violations = results.violations;
  fs.writeFileSync(
    `./results/hellocentral-${Date.now()}.json`,
    JSON.stringify(violations, null, 2),
  );
}

crawlPage("https://hellocentral.live");
