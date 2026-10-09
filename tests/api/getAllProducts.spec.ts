import { test, expect } from '@playwright/test';
import { loadApiTestCases } from '../../utils/csvReader';

const testCases = loadApiTestCases();

// Look up TC ID 'API-SM-001' from Row 3 of the sheet
const tc001 = testCases.find((tc) => tc['TC ID'] === 'API-SM-001');

test.describe('Milestone 4: Playwright API Testing', () => {
  test(`${tc001?.['TC ID'] || 'API-SM-001'}: ${tc001?.['Scenario'] || 'Get all products'}`, async ({ request }) => {
    expect(tc001).toBeDefined();

    // Base API URL + CSV Endpoint (/api + /productsList = /api/productsList)
    const endpoint = `/api${tc001!['Endpoint']}`;
    const response = await request.get(`https://automationexercise.com${endpoint}`);

    // Verify HTTP status 200
    expect(response.status()).toBe(200);

    const responseBody = await response.json();

    // Verify API JSON payload
    expect(responseBody.responseCode).toBe(200);
    expect(responseBody).toHaveProperty('products');
    expect(Array.isArray(responseBody.products)).toBeTruthy();
    expect(responseBody.products.length).toBeGreaterThan(0);

    // Verify schema of first product
    const firstProduct = responseBody.products[0];
    expect(firstProduct).toHaveProperty('id');
    expect(firstProduct).toHaveProperty('name');
    expect(firstProduct).toHaveProperty('price');
    expect(firstProduct).toHaveProperty('brand');
    expect(firstProduct).toHaveProperty('category');
  });
});