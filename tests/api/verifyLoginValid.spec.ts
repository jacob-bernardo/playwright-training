import { test, expect } from "@playwright/test";
import { loadApiTestCases } from "../../utils/csvReader";

const testCases = loadApiTestCases();

// Locate API-SM-012 (API7) from CSV
const tc012 = testCases.find(
  (tc) => tc["TC ID"] === "API-SM-012" || tc["API"] === "API7",
);

test.describe("Milestone 4: Playwright API Testing - API 7", () => {
  test(`${tc012?.["TC ID"] || "API-SM-012"}: ${tc012?.["Scenario"] || "Valid login"}`, async ({
    request,
  }) => {
    expect(tc012).toBeDefined();

    const endpoint = `/api${tc012!["Endpoint"]}`;
    const fullUrl = `https://automationexercise.com${endpoint}`;

    // 1. Generate unique user details
    const validEmail = `test_user_${Date.now()}@example.com`;
    const validPassword = "password123";

    // 2. Pre-requisite: Create user account first so it exists in DB
    await request.post("https://automationexercise.com/api/createAccount", {
      form: {
        name: "Test User",
        email: validEmail,
        password: validPassword,
        title: "Mr",
        birth_date: "10",
        birth_month: "05",
        birth_year: "1995",
        firstname: "Test",
        lastname: "User",
        company: "QA",
        address1: "123 Street",
        address2: "Suite 1",
        country: "United States",
        zipcode: "90210",
        state: "California",
        city: "Los Angeles",
        mobile_number: "1234567890",
      },
    });

    // 3. Log Request Info
    console.log(`\n--- REQUEST ---`);
    console.log(`Method: ${tc012!["Method"]}`);
    console.log(`URL: ${fullUrl}`);
    console.log(`Form Payload: email=${validEmail}`);

    // 4. Send HTTP POST Request with valid registered credentials
    const response = await request.post(fullUrl, {
      form: {
        email: validEmail,
        password: validPassword,
      },
    });

    // 5. Log Response Info
    console.log(`--- RESPONSE ---`);
    console.log(`HTTP Status: ${response.status()}`);

    // 6. Validate HTTP Status Code
    expect(response.status()).toBe(200);

    // 7. Parse JSON Body
    const responseBody = await response.json();
    console.log(`Response Payload:`, JSON.stringify(responseBody, null, 2));

    // 8. Validate API Response Code (200) and Success Message
    expect(responseBody.responseCode).toBe(200);
    expect(responseBody.message).toBe("User exists!");
  });
});
