import { test, expect } from "@playwright/test";
import { HomePage } from "../../pages/HomePage";
import { BrandsPage } from "../../pages/BrandsPage";

test.describe("Milestone 5 - E2E Tests: Test Case 19", () => {
  test("View & Cart Brand Products", async ({ page }) => {
    const homePage = new HomePage(page);
    const brandsPage = new BrandsPage(page);

    // 1 & 2. Launch browser and navigate to URL
    await homePage.navigate();

    // 3. Click on 'Products' button
    await homePage.clickProducts();

    // 4. Verify that Brands are visible on left side bar
    await brandsPage.verifyBrandsSidebarVisible();

    // 5. Click on 'Polo' brand name
    await brandsPage.clickPoloBrand();

    // 6. Verify user is navigated to brand page and brand products are displayed
    await brandsPage.verifyBrandHeaderTitle("BRAND - POLO PRODUCTS");
    await expect(page).toHaveURL(/\/brand_products\/Polo/);
    await brandsPage.verifyBrandProductsDisplayed();

    // 7. On left side bar, click on 'Madame' brand link
    await brandsPage.clickMadameBrand();

    // 8. Verify user is navigated to that brand page and can see products
    await brandsPage.verifyBrandHeaderTitle("BRAND - MADAME PRODUCTS");
    await expect(page).toHaveURL(/\/brand_products\/Madame/);
    await brandsPage.verifyBrandProductsDisplayed();
  });
});
