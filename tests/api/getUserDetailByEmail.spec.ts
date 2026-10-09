import { test, expect } from "@playwright/test";
import { loadApiTestCases } from "../../utils/csvReader";

const testCases = loadApiTestCases();

// Search CSV for getUserDetailByEmail or fall back to explicit endpoint
const tc = testCases.find(
  (t) =>
    t["Endpoint"]?.includes("getUserDetailByEmail") || t["API"] === "API14",
);

test.describe("Milestone 4: Playwright API Testing - API 14", () => {
  test("API 14: Get user account detail by email", async ({ request }) => {
    const fullUrl = "https://automationexercise.com/api/getUserDetailByEmail";

    const testEmail = `user_details_${Date.now()}@example.com`;
    const testPassword = "Password123!";

    // 1. Pre-requisite: Register user account first
    await request.post("https://automationexercise.com/api/createAccount", {
      form: {
        name: "Details User",
        email: testEmail,
        password: testPassword,
        title: "Mr",
        birth_date: "05",
        birth_month: "05",
        birth_year: "1995",
        firstname: "Details",
        lastname: "User",
        company: "QA Lab",
        address1: "789 Sample St",
        address2: "Apt 4B",
        country: "United States",
        zipcode: "90210",
        state: "California",
        city: "Los Angeles",
        mobile_number: "1122334455",
      },
    });

    // 2. Log Request Info
    console.log(`\n--- REQUEST ---`);
    console.log(`Method: GET`);
    console.log(`URL: ${fullUrl}?email=${testEmail}`);

    // 3. Send HTTP GET Request with email parameter
    const response = await request.get(fullUrl, {
      params: {
        email: testEmail,
      },
    });

    // 4. Log Response Info
    console.log(`--- RESPONSE ---`);
    console.log(`HTTP Status: ${response.status()}`);

    // 5. Validate HTTP Status Code
    expect(response.status()).toBe(200);

    // 6. Parse JSON Body
    const responseBody = await response.json();
    console.log(`Response Payload:`, JSON.stringify(responseBody, null, 2));

    // 7. Validate API Response Code (200) and User Object
    expect(responseBody.responseCode).toBe(200);
    expect(responseBody).toHaveProperty("user");
    expect(responseBody.user.email).toBe(testEmail);
    expect(responseBody.user.name).toBe("Details User");
  });
});
