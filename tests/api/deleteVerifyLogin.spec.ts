import { test, expect } from "@playwright/test";
import { loadApiTestCases } from "../../utils/csvReader";

const testCases = loadApiTestCases();

// Locate API-SM-016 (API9) from CSV
const tc016 = testCases.find(
  (tc) => tc["TC ID"] === "API-SM-016" || tc["API"] === "API9",
);

test.describe("Milestone 4: Playwright API Testing - API 9", () => {
  test(`${tc016?.["TC ID"] || "API-SM-016"}: ${tc016?.["Scenario"] || "DELETE method to verify login non-supported"}`, async ({
    request,
  }) => {
    expect(tc016).toBeDefined();

    // Construct endpoint (/api + /verifyLogin)
    const endpoint = `/api${tc016!["Endpoint"]}`;
    const fullUrl = `https://automationexercise.com${endpoint}`;

    // 1. Log Request Info
    console.log(`\n--- REQUEST ---`);
    console.log(`Method: ${tc016!["Method"]}`);
    console.log(`URL: ${fullUrl}`);

    // 2. Send HTTP DELETE Request
    const response = await request.delete(fullUrl);

    // 3. Log Response Info
    console.log(`--- RESPONSE ---`);
    console.log(`HTTP Status: ${response.status()}`);

    // 4. Validate HTTP Status Code
    expect(response.status()).toBe(200);

    // 5. Parse JSON Body
    const responseBody = await response.json();
    console.log(`Response Payload:`, JSON.stringify(responseBody, null, 2));

    // 6. Validate API Response Code (405) and Message
    expect(responseBody.responseCode).toBe(405);
    expect(responseBody.message).toBe("This request method is not supported.");
  });
});
