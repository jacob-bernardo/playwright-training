import { test, expect } from "@playwright/test";
import { loadApiTestCases } from "../../utils/csvReader";

const testCases = loadApiTestCases();

// Locate API-SM-014 (API10) from CSV
const tc014 = testCases.find(
  (tc) => tc["TC ID"] === "API-SM-014" || tc["API"] === "API10",
);

test.describe("Milestone 4: Playwright API Testing - API 10", () => {
  test(`${tc014?.["TC ID"] || "API-SM-014"}: ${tc014?.["Scenario"] || "Invalid login"}`, async ({
    request,
  }) => {
    expect(tc014).toBeDefined();

    // Construct endpoint (/api + /verifyLogin)
    const endpoint = `/api${tc014!["Endpoint"]}`;
    const fullUrl = `https://automationexercise.com${endpoint}`;

    const invalidEmail = `invalid_user_${Date.now()}@nonexistent.com`;
    const invalidPassword = "invalidPassword123";

    // 1. Log Request Info
    console.log(`\n--- REQUEST ---`);
    console.log(`Method: ${tc014!["Method"]}`);
    console.log(`URL: ${fullUrl}`);
    console.log(`Form Payload: email=${invalidEmail}`);

    // 2. Send HTTP POST Request with invalid credentials
    const response = await request.post(fullUrl, {
      form: {
        email: invalidEmail,
        password: invalidPassword,
      },
    });

    // 3. Log Response Info
    console.log(`--- RESPONSE ---`);
    console.log(`HTTP Status: ${response.status()}`);

    // 4. Validate HTTP Status Code
    expect(response.status()).toBe(200);

    // 5. Parse JSON Body
    const responseBody = await response.json();
    console.log(`Response Payload:`, JSON.stringify(responseBody, null, 2));

    // 6. Validate API Response Code (404) and Error Message
    expect(responseBody.responseCode).toBe(404);
    expect(responseBody.message).toBe("User not found!");
  });
});
