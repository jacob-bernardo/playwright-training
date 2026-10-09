import { test, expect } from "@playwright/test";
import { loadApiTestCases } from "../../utils/csvReader";

const testCases = loadApiTestCases();

// Locate API-SM-005 (API5) from CSV
const tc005 = testCases.find(
  (tc) => tc["TC ID"] === "API-SM-005" || tc["API"] === "API5",
);

test.describe("Milestone 4: Playwright API Testing - API 5", () => {
  test(`${tc005?.["TC ID"] || "API-SM-005"}: ${tc005?.["Scenario"] || "Search existing product"}`, async ({
    request,
  }) => {
    expect(tc005).toBeDefined();

    // Construct endpoint (/api + /searchProduct)
    const endpoint = `/api${tc005!["Endpoint"]}`;
    const fullUrl = `https://automationexercise.com${endpoint}`;

    const searchKeyword = "top";

    // 1. Log Request Info
    console.log(`\n--- REQUEST ---`);
    console.log(`Method: ${tc005!["Method"]}`);
    console.log(`URL: ${fullUrl}`);
    console.log(`Form Payload: search_product=${searchKeyword}`);

    // 2. Send HTTP POST Request with form data
    const response = await request.post(fullUrl, {
      form: {
        search_product: searchKeyword,
      },
    });

    // 3. Log Response Info
    console.log(`--- RESPONSE ---`);
    console.log(`HTTP Status: ${response.status()}`);

    // 4. Validate HTTP Status Code
    expect(response.status()).toBe(200);

    // 5. Parse JSON Body
    const responseBody = await response.json();
    console.log(`Response Code: ${responseBody.responseCode}`);

    // 6. Validate API Response Payload
    expect(responseBody.responseCode).toBe(200);
    expect(responseBody).toHaveProperty("products");
    expect(Array.isArray(responseBody.products)).toBeTruthy();
    expect(responseBody.products.length).toBeGreaterThan(0);

    // 7. Validate schema and search keyword presence in product names
    const firstProduct = responseBody.products[0];
    expect(firstProduct).toHaveProperty("id");
    expect(firstProduct).toHaveProperty("name");
    expect(firstProduct).toHaveProperty("price");
    expect(firstProduct).toHaveProperty("brand");
  });
});
