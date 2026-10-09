import { test, expect } from "@playwright/test";

test.describe("Milestone 4: Playwright API Testing - API 12", () => {
  test("API 12: DELETE METHOD To Delete User Account", async ({ request }) => {
    const fullUrl = "https://automationexercise.com/api/deleteAccount";

    // 1. Generate unique details and create temporary user first
    const testEmail = `user_to_delete_${Date.now()}@example.com`;
    const testPassword = "Password123!";

    await request.post("https://automationexercise.com/api/createAccount", {
      form: {
        name: "User To Delete",
        email: testEmail,
        password: testPassword,
        title: "Mr",
        birth_date: "01",
        birth_month: "01",
        birth_year: "1990",
        firstname: "User",
        lastname: "ToDelete",
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

    // 2. Log Request Info
    console.log(`\n--- REQUEST ---`);
    console.log(`Method: DELETE`);
    console.log(`URL: ${fullUrl}`);
    console.log(`Form Payload: email=${testEmail}`);

    // 3. Send HTTP DELETE Request with credentials
    const response = await request.delete(fullUrl, {
      form: {
        email: testEmail,
        password: testPassword,
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

    // 7. Validate API Response Code (200) and Deletion Message
    expect(responseBody.responseCode).toBe(200);
    expect(responseBody.message).toBe("Account deleted!");
  });
});
