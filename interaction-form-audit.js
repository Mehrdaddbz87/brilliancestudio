const { chromium } = require("playwright");

function firstVisibleLocator(page, selectors) {
  for (const selector of selectors) {
    const locator = page.locator(selector).first();
    if (locator) {
      return locator;
    }
  }

  return null;
}

async function getStyleSnapshot(locator) {
  return locator.evaluate((element) => {
    const style = window.getComputedStyle(element);
    return {
      color: style.color,
      backgroundColor: style.backgroundColor,
      borderColor: style.borderColor,
      boxShadow: style.boxShadow,
      transform: style.transform,
      transitionDuration: style.transitionDuration,
      opacity: style.opacity,
      filter: style.filter,
    };
  });
}

async function testAnimations(browser) {
  const page = await browser.newPage({ viewport: { width: 1440, height: 900 } });
  const results = {};

  await page.goto("http://localhost:3000/", { waitUntil: "networkidle" });

  const primaryButton = page.getByRole("link", { name: /start project/i }).first();
  const buttonBefore = await getStyleSnapshot(primaryButton);
  await primaryButton.hover();
  await page.waitForTimeout(250);
  const buttonAfter = await getStyleSnapshot(primaryButton);

  const navLink = page.locator("header nav a").first();
  const navBefore = await getStyleSnapshot(navLink);
  await navLink.hover();
  await page.waitForTimeout(250);
  const navAfter = await getStyleSnapshot(navLink);

  const footerLink = page.locator("footer a").first();
  const footerBefore = await getStyleSnapshot(footerLink);
  await footerLink.hover();
  await page.waitForTimeout(250);
  const footerAfter = await getStyleSnapshot(footerLink);

  await page.goto("http://localhost:3000/services", { waitUntil: "networkidle" });
  const card = page.locator("article").first();
  const cardBefore = await getStyleSnapshot(card);
  await card.hover();
  await page.waitForTimeout(250);
  const cardAfter = await getStyleSnapshot(card);

  const fadeSection = page.locator("main > div").nth(1);
  await page.evaluate(() => window.scrollTo(0, document.body.scrollHeight * 0.35));
  await page.waitForTimeout(700);
  const fadeState = await getStyleSnapshot(fadeSection);

  results.primaryButton = {
    before: buttonBefore,
    after: buttonAfter,
  };
  results.navLink = {
    before: navBefore,
    after: navAfter,
  };
  results.footerLink = {
    before: footerBefore,
    after: footerAfter,
  };
  results.card = {
    before: cardBefore,
    after: cardAfter,
  };
  results.fadeSection = fadeState;

  await page.close();
  return results;
}

async function submitAndCapture(requestPromise) {
  const response = await requestPromise;
  const body = await response.json().catch(() => null);

  return {
    status: response.status(),
    body,
  };
}

async function testForms(browser) {
  const results = {};
  const page = await browser.newPage({ viewport: { width: 390, height: 844 } });

  await page.goto("http://localhost:3000/contact", { waitUntil: "networkidle" });

  await page.getByRole("button", { name: /send message/i }).click();
  await page.waitForTimeout(200);
  results.contactEmptyValidation = {
    errors: await page.locator("text=Name is required.").count(),
    emailErrors: await page.locator("text=Email is required.").count(),
    messageErrors: await page.locator("text=Message is required.").count(),
    summaryVisible: await page.locator("text=Please correct the highlighted fields and try again.").count(),
  };

  const contactForm = page.locator("form").nth(0);
  await contactForm.locator('input[name="name"]').fill("Test User");
  await contactForm.locator('input[name="email"]').fill("invalid-email");
  await contactForm.locator('textarea[name="message"]').fill("short");
  await page.getByRole("button", { name: /send message/i }).click();
  await page.waitForTimeout(200);
  results.contactInvalidValidation = {
    invalidEmail: await page.locator("text=Please enter a valid email address.").count(),
    shortMessage: await page.locator("text=Message must be at least 10 characters long.").count(),
  };

  await contactForm.locator('input[name="email"]').fill("qa-contact@example.com");
  await contactForm
    .locator('textarea[name="message"]')
    .fill("This is a browser submission test for the contact form.");
  const contactResponsePromise = page.waitForResponse(
    (response) =>
      response.url().includes("/api/contact") &&
      response.request().method() === "POST",
  );
  await page.getByRole("button", { name: /send message/i }).click();
  results.contactSubmission = await submitAndCapture(contactResponsePromise);
  await page.waitForTimeout(300);
  results.contactStatusText = await page.locator("form").nth(0).textContent();

  const embeddedBookingForm = page.locator("form").nth(1);
  await page.getByRole("button", { name: /request booking/i }).click();
  await page.waitForTimeout(200);
  results.embeddedBookingEmptyValidation = {
    errors: await page.locator("text=Service is required.").count(),
    dateErrors: await page.locator("text=Date is required.").count(),
  };

  await embeddedBookingForm.locator('input[name="name"]').fill("Test User");
  await embeddedBookingForm.locator('input[name="email"]').fill("invalid-email");
  await embeddedBookingForm.locator('input[name="service"]').fill("");
  await page.getByRole("button", { name: /request booking/i }).click();
  await page.waitForTimeout(200);
  results.embeddedBookingInvalidValidation = {
    invalidEmail: await page.locator("text=Please enter a valid email address.").count(),
  };

  await embeddedBookingForm.locator('input[name="email"]').fill("qa-booking@example.com");
  await embeddedBookingForm.locator('input[name="service"]').fill("Renovation");
  await embeddedBookingForm.locator('input[name="preferredDate"]').fill("2026-04-15");
  const embeddedBookingResponsePromise = page.waitForResponse(
    (response) =>
      response.url().includes("/api/booking") &&
      response.request().method() === "POST",
  );
  await page.getByRole("button", { name: /request booking/i }).click();
  results.embeddedBookingSubmission = await submitAndCapture(
    embeddedBookingResponsePromise,
  );
  await page.waitForTimeout(300);
  results.embeddedBookingStatusText = await page.locator("form").nth(1).textContent();

  await page.goto("http://localhost:3000/booking", { waitUntil: "networkidle" });
  await page.getByRole("button", { name: /send booking/i }).click();
  await page.waitForTimeout(200);
  results.bookingPageEmptyValidation = {
    name: await page.locator("text=Name is required.").count(),
    email: await page.locator("text=Email is required.").count(),
    service: await page.locator("text=Service is required.").count(),
    date: await page.locator("text=Date is required.").count(),
  };

  const bookingForm = page.locator("form").first();
  await bookingForm.locator('input[name="name"]').fill("Booking User");
  await bookingForm.locator('input[name="email"]').fill("booking-invalid");
  await bookingForm.locator('input[name="service"]').fill("Home design");
  await page.getByRole("button", { name: /send booking/i }).click();
  await page.waitForTimeout(200);
  results.bookingPageInvalidValidation = {
    invalidEmail: await page.locator("text=Please enter a valid email address.").count(),
    date: await page.locator("text=Date is required.").count(),
  };

  await bookingForm.locator('input[name="email"]').fill("booking@example.com");
  await bookingForm.locator('input[name="preferredDate"]').fill("2026-04-20");
  const bookingPageResponsePromise = page.waitForResponse(
    (response) =>
      response.url().includes("/api/booking") &&
      response.request().method() === "POST",
  );
  await page.getByRole("button", { name: /send booking/i }).click();
  results.bookingPageSubmission = await submitAndCapture(
    bookingPageResponsePromise,
  );
  await page.waitForTimeout(300);
  results.bookingPageStatusText = await page.locator("form").first().textContent();

  const apiResponse = await page.request.get("http://localhost:3000/api/health");
  results.health = {
    status: apiResponse.status(),
    body: await apiResponse.json(),
  };

  await page.close();
  return results;
}

async function run() {
  const browser = await chromium.launch({ headless: true });
  const animations = await testAnimations(browser);
  const forms = await testForms(browser);
  await browser.close();

  process.stdout.write(
    `${JSON.stringify(
      {
        animations,
        forms,
      },
      null,
      2,
    )}\n`,
  );
}

run().catch((error) => {
  console.error(error);
  process.exit(1);
});
