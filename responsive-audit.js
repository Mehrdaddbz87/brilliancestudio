const { chromium } = require("playwright");

const pages = ["/", "/services", "/references", "/contact", "/booking", "/about"];
const viewports = [
  { name: "mobile", width: 390, height: 844, isMobile: true },
  { name: "tablet", width: 768, height: 1024, isMobile: false },
  { name: "desktop", width: 1440, height: 900, isMobile: false },
];

function collectPageData() {
  const docEl = document.documentElement;
  const body = document.body;
  const scrollWidth = Math.max(docEl.scrollWidth, body ? body.scrollWidth : 0);
  const clientWidth = docEl.clientWidth;
  const overflow = scrollWidth - clientWidth;

  const offenders = [...document.querySelectorAll("body *")]
    .filter((el) => {
      const style = window.getComputedStyle(el);
      if (style.display === "none" || style.visibility === "hidden") {
        return false;
      }

      const rect = el.getBoundingClientRect();
      return rect.right > window.innerWidth + 1 || rect.left < -1;
    })
    .slice(0, 8)
    .map((el) => {
      const rect = el.getBoundingClientRect();

      return {
        tag: el.tagName.toLowerCase(),
        text: (el.textContent || "").trim().replace(/\s+/g, " ").slice(0, 80),
        className: String(el.className || "").slice(0, 120),
        left: Math.round(rect.left),
        right: Math.round(rect.right),
        width: Math.round(rect.width),
        height: Math.round(rect.height),
      };
    });

  const interactiveElements = [...document.querySelectorAll("a, button, input, textarea, select")]
    .filter((el) => {
      const style = window.getComputedStyle(el);
      if (style.display === "none" || style.visibility === "hidden") {
        return false;
      }

      const rect = el.getBoundingClientRect();
      return rect.width > 0 && rect.height > 0;
    })
    .map((el) => {
      const rect = el.getBoundingClientRect();

      return {
        tag: el.tagName.toLowerCase(),
        text: (
          el.textContent ||
          el.getAttribute("aria-label") ||
          el.getAttribute("name") ||
          el.getAttribute("placeholder") ||
          ""
        )
          .trim()
          .replace(/\s+/g, " ")
          .slice(0, 60),
        width: Math.round(rect.width),
        height: Math.round(rect.height),
      };
    });

  const smallTargets = interactiveElements
    .filter(
      (item) =>
        item.tag !== "input" &&
        item.tag !== "textarea" &&
        (item.width < 44 || item.height < 44),
    )
    .slice(0, 12);

  const inputs = [...document.querySelectorAll("input, textarea, select")].map((el) => {
    const rect = el.getBoundingClientRect();

    return {
      tag: el.tagName.toLowerCase(),
      name: el.getAttribute("name") || "",
      width: Math.round(rect.width),
      height: Math.round(rect.height),
    };
  });

  return {
    title: document.title,
    clientWidth,
    scrollWidth,
    overflow,
    offenders,
    smallTargets,
    inputs,
  };
}

async function run() {
  const browser = await chromium.launch({ headless: true });
  const results = [];

  for (const viewport of viewports) {
    const context = await browser.newContext({
      viewport: { width: viewport.width, height: viewport.height },
      isMobile: viewport.isMobile,
      deviceScaleFactor: 1,
    });

    for (const path of pages) {
      const page = await context.newPage();
      await page.goto(`http://localhost:3000${path}`, { waitUntil: "networkidle" });

      if (viewport.name === "mobile") {
        const menuButton = page.getByRole("button", {
          name: /toggle navigation menu/i,
        });

        if ((await menuButton.count()) > 0) {
          await menuButton.click();
          await page.waitForTimeout(250);
        }
      }

      const data = await page.evaluate(collectPageData);

      results.push({
        viewport: viewport.name,
        path,
        ...data,
      });

      await page.close();
    }

    await context.close();
  }

  await browser.close();
  process.stdout.write(`${JSON.stringify(results, null, 2)}\n`);
}

run().catch((error) => {
  console.error(error);
  process.exit(1);
});
