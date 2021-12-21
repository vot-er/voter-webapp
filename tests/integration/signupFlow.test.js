import { Client } from "pg";
import puppeteer from "puppeteer";
import { UUIDV4 } from "sequelize";

require("dotenv").config();
const client = new Client(process.env.DATABASE_URL);

jest.setTimeout(10000);
let browser;
beforeAll(async () => {
  await client.connect();
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
  if (browser) await browser.close();
  await client.end();
});
describe("Signup Flow", () => {
  test("successfully complete the signup flow", async () => {
    const userValues = {
      firstName: "John",
      lastName: "Doe",
      email: `${UUIDV4()}@mailinator.com`,
      jobTitle: "Clinic Manager",
      occupation: "other",
      stateOfWork: "AL",
    };
    // Signup
    const page = await browser.newPage();
    await page.goto("http://localhost:3000");
    await page.waitForSelector(".signup-card");
    const html = await page.$eval(".signup-card", (e) => e.innerHTML);
    expect(html).toContain("Let's get you a healthy democracy kit.");
    await page.focus("input[name=firstName]");
    await page.keyboard.type(expectedValues.firstName);
    await page.focus("input[name=lastName]");
    await page.keyboard.type(expectedValues.lastName);
    await page.focus("input[name=email]");
    await page.keyboard.type(expectedValues.email);
    await page.focus("input[name=password]");
    await page.keyboard.type("testtest");
    await page.click("#create-new-org-link");
    await page.waitForSelector("input[name=newOrganizationName]");
    await page.focus("input[name=newOrganizationName]");
    await page.keyboard.type("Test Clinic");
    await page.click("#state-of-work-select");
    await page.waitForSelector("#react-select-state-of-work-select-option-0", {
      timeout: 1000,
    });
    await page.click("#react-select-state-of-work-select-option-0");
    await page.click("#occupation-select");
    await page.waitForSelector("#react-select-occupation-select-option-0", {
      timeout: 1000,
    });
    await page.click("#react-select-occupation-select-option-10");

    await page.focus("input[name=jobTitle]");
    await page.keyboard.type(expectedValues.jobTitle);

    await page.waitForTimeout(500);
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

    await page.focus("input[name=addressLine1]");
    await page.keyboard.type("200 Main St");
    await page.focus("input[name=addressLine2]");
    await page.keyboard.type("Apt 123");
    await page.focus("input[name=city]");
    await page.keyboard.type("Anywhere");
    await page.click("#state-select");
    await page.waitForSelector("#react-select-state-select-option-0", {
      timeout: 1000,
    });
    await page.click("#react-select-state-select-option-0");
    await page.focus("input[name=zipcode]");
    await page.keyboard.type("10000");

    await page.focus("input[name=phoneNumber]");
    await page.keyboard.type("123-123-1234");

    await page.waitForTimeout(500);
    await page.click("button[type=submit]");
    await page.waitForTimeout(1000);
    expect(page.url()).toBe("https://voter.kindful.com/");
    const { rows } = await client.query(
      `SELECT * FROM "users" WHERE email = $1`,
      [userValues.email]
    );
    const user = rows[0];
    expect(rows.length).toEqual(1);
    Object.keys(userValues).forEach((key) => {
      expect(user[key]).toEqual(userValues[key]);
    });
  });
});
