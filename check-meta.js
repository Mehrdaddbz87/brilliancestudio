const { chromium } = require("playwright");

const paths = ["/", "/contact", "/services"];

async function run() {
  const browser = await chromium.launch({ headless: true });
  const results = [];

  for (const path of paths) {
    const page = await browser.newPage();
    await page.goto(`http://localhost:3000${path}`, { waitUntil: "networkidle" });

    const data = await page.evaluate(() => {
      const getAttribute = (selector, attribute = "content") =>
        document.querySelector(selector)?.getAttribute(attribute) || null;

      const jsonLdScripts = [...document.querySelectorAll('script[type="application/ld+json"]')];
      const parsedJsonLd = jsonLdScripts.map((script) => {
        try {
          return JSON.parse(script.textContent || "");
        } catch {
          return { invalid: true };
        }
      });

      return {
        title: document.title,
        description: getAttribute('meta[name="description"]'),
        canonical: getAttribute('link[rel="canonical"]', "href"),
        keywords: getAttribute('meta[name="keywords"]'),
        ogTitle: getAttribute('meta[property="og:title"]'),
        ogDescription: getAttribute('meta[property="og:description"]'),
        ogUrl: getAttribute('meta[property="og:url"]'),
        ogImage: getAttribute('meta[property="og:image"]'),
        twitterCard: getAttribute('meta[name="twitter:card"]'),
        twitterTitle: getAttribute('meta[name="twitter:title"]'),
        twitterImage: getAttribute('meta[name="twitter:image"]'),
        jsonLdCount: parsedJsonLd.length,
        jsonLdTypes: parsedJsonLd.map((item) => item["@type"] || null),
        localBusiness: parsedJsonLd.find(
          (item) => item && item["@type"] === "LocalBusiness",
        ),
      };
    });

    results.push({ path, ...data });
    await page.close();
  }

  await browser.close();
  process.stdout.write(`${JSON.stringify(results, null, 2)}\n`);
}

run().catch((error) => {
  console.error(error);
  process.exit(1);
});
