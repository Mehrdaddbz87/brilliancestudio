const fs = require("fs");

const files = ["lighthouse-home.json", "lighthouse-contact.json"];

for (const file of files) {
  const report = JSON.parse(fs.readFileSync(file, "utf8"));

  const summary = {
    file,
    finalUrl: report.finalUrl,
    categories: Object.fromEntries(
      Object.entries(report.categories).map(([key, value]) => [
        key,
        Math.round(value.score * 100),
      ]),
    ),
    metrics: {
      fcp: report.audits["first-contentful-paint"]?.displayValue || null,
      lcp: report.audits["largest-contentful-paint"]?.displayValue || null,
      tbt: report.audits["total-blocking-time"]?.displayValue || null,
      cls: report.audits["cumulative-layout-shift"]?.displayValue || null,
      si: report.audits["speed-index"]?.displayValue || null,
    },
    notableIssues: Object.values(report.audits)
      .filter(
        (audit) =>
          audit.score !== null &&
          audit.score < 1 &&
          typeof audit.numericValue !== "undefined",
      )
      .sort((a, b) => a.score - b.score)
      .slice(0, 12)
      .map((audit) => ({
        id: audit.id,
        title: audit.title,
        score: audit.score,
        displayValue: audit.displayValue || null,
      })),
  };

  process.stdout.write(`${JSON.stringify(summary, null, 2)}\n`);
}
