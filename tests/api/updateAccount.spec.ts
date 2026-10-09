import { test, expect } from "@playwright/test";

test.describe("Milestone 4: Playwright API Testing - API 13", () => {
  test("API 13: PUT METHOD To Update User Account", async ({ request }) => {
    const fullUrl = "https://automationexercise.com/api/updateAccount";

    const testEmail = `user_to_update_${Date.now()}@example.com`;
    const testPassword = "Password123!";

    // 1. Pre-requisite: Create user account first
    await request.post("https://automationexercise.com/api/createAccount", {
      form: {
        name: "Original Name",
        email: testEmail,
        password: testPassword,
        title: "Mr",
        birth_date: "01",
        birth_month: "01",
        birth_year: "1990",
        firstname: "OriginalFirst",
        lastname: "OriginalLast",
        company: "Original Co",
        address1: "123 Street",
        address2: "Suite 1",
        country: "United States",
        zipcode: "90210",
        state: "California",
        city: "Los Angeles",
        mobile_number: "1234567890",
      },
    });

    // 2. Define updated profile details
    const updatedUserPayload = {
      name: "Updated Name",
      email: testEmail,
      password: testPassword,
      title: "Mrs",
      birth_date: "12",
      birth_month: "12",
      birth_year: "1992",
      firstname: "UpdatedFirst",
      lastname: "UpdatedLast",
      company: "Updated Co",
      address1: "456 Updated Ave",
      address2: "Floor 2",
      country: "Canada",
      zipcode: "M5V 2T6",
      state: "Ontario",
      city: "Toronto",
      mobile_number: "0987654321",
    };

    // 3. Log Request Info
    console.log(`\n--- REQUEST ---`);
    console.log(`Method: PUT`);
    console.log(`URL: ${fullUrl}`);
    console.log(`Form Payload: email=${testEmail}`);

    // 4. Send HTTP PUT Request to update user account
    const response = await request.put(fullUrl, {
      form: updatedUserPayload,
    });

    // 5. Log Response Info
    console.log(`--- RESPONSE ---`);
    console.log(`HTTP Status: ${response.status()}`);

    // 6. Validate HTTP Status Code
    expect(response.status()).toBe(200);

    // 7. Parse JSON Body
    const responseBody = await response.json();
    console.log(`Response Payload:`, JSON.stringify(responseBody, null, 2));

    // 8. Validate API Response Code (200) and Update Message
    expect(responseBody.responseCode).toBe(200);
    expect(responseBody.message).toBe("User updated!");
  });
});
