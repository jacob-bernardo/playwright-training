import { test, expect } from "@playwright/test";
import { loadApiTestCases } from "../../utils/csvReader";

const testCases = loadApiTestCases();

// Locate API-SM-008 (API6) from CSV
const tc008 = testCases.find(
  (tc) => tc["TC ID"] === "API-SM-008" || tc["API"] === "API6",
);

test.describe("Milestone 4: Playwright API Testing - API 6", () => {
  test(`${tc008?.["TC ID"] || "API-SM-008"}: ${tc008?.["Scenario"] || "Missing search parameter"}`, async ({
    request,
  }) => {
    expect(tc008).toBeDefined();

    // Construct endpoint (/api + /searchProduct)
    const endpoint = `/api${tc008!["Endpoint"]}`;
    const fullUrl = `https://automationexercise.com${endpoint}`;

    // 1. Log Request Info
    console.log(`\n--- REQUEST ---`);
    console.log(`Method: ${tc008!["Method"]}`);
    console.log(`URL: ${fullUrl}`);
    console.log(`Payload: None (missing search_product parameter)`);

    // 2. Send HTTP POST Request without form data/body
    const response = await request.post(fullUrl);

    // 3. Log Response Info
    console.log(`--- RESPONSE ---`);
    console.log(`HTTP Status: ${response.status()}`);

    // 4. Validate HTTP Status Code
    expect(response.status()).toBe(200);

    // 5. Parse JSON Body
    const responseBody = await response.json();
    console.log(`Response Payload:`, JSON.stringify(responseBody, null, 2));

    // 6. Validate API Response Code (400) and Error Message
    expect(responseBody.responseCode).toBe(400);
    expect(responseBody.message).toBe(
      "Bad request, search_product parameter is missing in POST request.",
    );
  });
});
