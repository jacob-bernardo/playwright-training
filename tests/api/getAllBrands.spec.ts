import { test, expect } from '@playwright/test';
import { loadApiTestCases } from '../../utils/csvReader';

const testCases = loadApiTestCases();

// Locate API-SM-009 (API3) from CSV
const tc009 = testCases.find((tc) => tc['TC ID'] === 'API-SM-009' || tc['API'] === 'API3');

test.describe('Milestone 4: Playwright API Testing - API 3', () => {
  test(`${tc009?.['TC ID'] || 'API-SM-009'}: ${tc009?.['Scenario'] || 'Get all brands'}`, async ({ request }) => {
    expect(tc009).toBeDefined();

    // Construct endpoint (/api + /brandsList)
    const endpoint = `/api${tc009!['Endpoint']}`;
    const fullUrl = `https://automationexercise.com${endpoint}`;

    // 1. Log Request Info
    console.log(`\n--- REQUEST ---`);
    console.log(`Method: ${tc009!['Method']}`);
    console.log(`URL: ${fullUrl}`);

    // 2. Send HTTP GET Request
    const response = await request.get(fullUrl);

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
    expect(responseBody).toHaveProperty('brands');
    expect(Array.isArray(responseBody.brands)).toBeTruthy();
    expect(responseBody.brands.length).toBeGreaterThan(0);

    // 7. Validate Brand Object Structure
    const firstBrand = responseBody.brands[0];
    expect(firstBrand).toHaveProperty('id');
    expect(firstBrand).toHaveProperty('brand');
  });
});