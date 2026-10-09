import { test, expect } from '@playwright/test';
import { loadApiTestCases } from '../../utils/csvReader';

const testCases = loadApiTestCases();

// Locate API-SM-004 (API2) from CSV
const tc004 = testCases.find((tc) => tc['TC ID'] === 'API-SM-004' || tc['API'] === 'API2');

test.describe('Milestone 4: Playwright API Testing - API 2', () => {
  test(`${tc004?.['TC ID'] || 'API-SM-004'}: ${tc004?.['Scenario'] || 'POST to products list non-supported'}`, async ({ request }) => {
    expect(tc004).toBeDefined();

    // Construct endpoint (/api + /productsList)
    const endpoint = `/api${tc004!['Endpoint']}`;
    
    // 1. Send HTTP POST Request
    const response = await request.post(`https://automationexercise.com${endpoint}`);

    // 2. Validate HTTP Status Code (Automation Exercise API returns 200 OK with custom payload error)
    expect(response.status()).toBe(200);

    // 3. Parse JSON Body
    const responseBody = await response.json();

    // 4. Validate API Response Code (405) and Message
    expect(responseBody.responseCode).toBe(405);
    expect(responseBody.message).toBe('This request method is not supported.');
  });
});