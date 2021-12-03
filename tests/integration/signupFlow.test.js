import puppeteer from "puppeteer";

jest.setTimeout(10000);
let browser;
beforeAll(async () => {
  browser = await puppeteer.launch({
    headless: true,
    args: [
      // Required for Docker version of Puppeteer
      "--no-sandbox",
      "--disable-setuid-sandbox",
      // This will write shared memory files into /tmp instead of /dev/shm,
      // because Docker’s default for /dev/shm is 64MB
      "--disable-dev-shm-usage",
    ],
  });
});
afterAll(async () => {
  await browser.close();
});
describe("Signup Flow", () => {
  test("successfully complete the signup flow", async () => {
    // Signup
    const page = await browser.newPage();
    await page.goto("http://localhost:3000");
    await page.waitForSelector(".signup-card");
    const html = await page.$eval(".signup-card", (e) => e.innerHTML);
    expect(html).toContain("Let's get you a healthy democracy kit.");
    await page.focus("input[name=firstName]");
    await page.keyboard.type("John");
    await page.focus("input[name=lastName]");
    await page.keyboard.type("Doe");
    await page.focus("input[name=email]");
    await page.keyboard.type("test@mailinator.com");
    await page.focus("input[name=password]");
    await page.keyboard.type("testtest");
    await page.click("#create-new-org-link");
    await page.waitForSelector("input[name=newOrganizationName]");
    await page.focus("input[name=newOrganizationName]");
    await page.keyboard.type("Test Clinic");
    await page.click("#state-of-work-select");
    await page.waitForSelector("#react-select-3-option-0", {
      timeout: 1000,
    });
    await page.click("#react-select-3-option-0");
    await page.click("#job-title-select");
    await page.waitForSelector("#react-select-4-option-0", {
      timeout: 1000,
    });
    await page.click("#react-select-4-option-0");

    await page.waitForTimeout(500);
    await page.screenshot({ path: "tmp/screenshot.png" });
    await page.click("button[type=submit]");

    await page.waitForSelector(".order-kit-page", {
      timeout: 3000,
    });
    // Shipping
    const orderKitHtml = await page.$eval(
      ".order-kit-page",
      (e) => e.innerHTML
    );
    expect(orderKitHtml).toContain("Shipping Address");
  });
});
