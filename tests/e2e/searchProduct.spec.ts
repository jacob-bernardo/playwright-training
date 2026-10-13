import { test, expect } from "@playwright/test";
import { HomePage } from "../../pages/HomePage";
import { ProductsPage } from "../../pages/ProductsPage";

test.describe("Milestone 5 - E2E Tests: Test Case 9", () => {
  test("Search Product and verify results", async ({ page }) => {
    const homePage = new HomePage(page);
    const productsPage = new ProductsPage(page);

    const searchKeyword = "top";

    // 1 & 2. Launch browser and navigate to URL
    await homePage.navigate();

    // 3. Verify that home page is visible successfully
    await homePage.verifyMainHeaderVisible();

    // 4. Click on 'Products' button
    await homePage.clickProducts();

    // 5. Verify user is navigated to ALL PRODUCTS page successfully
    await productsPage.verifyAllProductsPageLoaded();

    // 6. Enter product name in search input and click search button
    await productsPage.searchProduct(searchKeyword);

    // 7. Verify 'SEARCHED PRODUCTS' is visible
    await productsPage.verifySearchedProductsHeaderVisible();

    // 8. Verify all the products related to search are visible
    await productsPage.verifySearchedProductsVisible();
  });
});
