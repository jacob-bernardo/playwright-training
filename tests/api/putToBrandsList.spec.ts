import { test, expect } from "@playwright/test";
import { loadApiTestCases } from "../../utils/csvReader";

const testCases = loadApiTestCases();

// Locate API-SM-011 (API4) from CSV
const tc011 = testCases.find(
  (tc) => tc["TC ID"] === "API-SM-011" || tc["API"] === "API4",
);

test.describe("Milestone 4: Playwright API Testing - API 4", () => {
  test(`${tc011?.["TC ID"] || "API-SM-011"}: ${tc011?.["Scenario"] || "PUT to brands list non-supported"}`, async ({
    request,
  }) => {
    expect(tc011).toBeDefined();

    // Construct endpoint (/api + /brandsList)
    const endpoint = `/api${tc011!["Endpoint"]}`;
    const fullUrl = `https://automationexercise.com${endpoint}`;

    // 1. Log Request Info
    console.log(`\n--- REQUEST ---`);
    console.log(`Method: ${tc011!["Method"]}`);
    console.log(`URL: ${fullUrl}`);

    // 2. Send HTTP PUT Request
    const response = await request.put(fullUrl);

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
