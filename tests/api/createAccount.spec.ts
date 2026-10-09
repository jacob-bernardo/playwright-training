import { test, expect } from "@playwright/test";
import { loadApiTestCases } from "../../utils/csvReader";

const testCases = loadApiTestCases();

// Search CSV for the createAccount test case or fall back to explicit metadata
const tc = testCases.find(
  (t) => t["Endpoint"]?.includes("createAccount") || t["API"] === "API11",
);

test.describe("Milestone 4: Playwright API Testing - API 11", () => {
  test("API 11: POST To Create/Register User Account", async ({ request }) => {
    const fullUrl = "https://automationexercise.com/api/createAccount";

    // Unique user details for registration
    const userPayload = {
      name: "Automation Tester",
      email: `user_register_${Date.now()}@example.com`,
      password: "Password123!",
      title: "Mr",
      birth_date: "15",
      birth_month: "08",
      birth_year: "1990",
      firstname: "Automation",
      lastname: "Tester",
      company: "QA Studio",
      address1: "123 Testing Ave",
      address2: "Suite 404",
      country: "United States",
      zipcode: "90210",
      state: "California",
      city: "Los Angeles",
      mobile_number: "9876543210",
    };

    // 1. Log Request Info
    console.log(`\n--- REQUEST ---`);
    console.log(`Method: POST`);
    console.log(`URL: ${fullUrl}`);
    console.log(`Form Payload: email=${userPayload.email}`);

    // 2. Send HTTP POST Request with registration parameters
    const response = await request.post(fullUrl, {
      form: userPayload,
    });

    // 3. Log Response Info
    console.log(`--- RESPONSE ---`);
    console.log(`HTTP Status: ${response.status()}`);

    // 4. Validate HTTP Status Code
    expect(response.status()).toBe(200);

    // 5. Parse JSON Body
    const responseBody = await response.json();
    console.log(`Response Payload:`, JSON.stringify(responseBody, null, 2));

    // 6. Validate API Response Code (201) and Success Message
    expect(responseBody.responseCode).toBe(201);
    expect(responseBody.message).toBe("User created!");
  });
});
