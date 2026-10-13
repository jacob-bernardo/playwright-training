import { test, expect } from "@playwright/test";
import { HomePage } from "../../pages/HomePage";
import { ProductsPage } from "../../pages/ProductsPage";
import { ProductsDetailPage } from "../../pages/ProductsDetailPage";

test.describe("Milestone 5 - E2E Tests: Test Case 8", () => {
  test("Verify All Products and product detail page", async ({ page }) => {
    const homePage = new HomePage(page);
    const productsPage = new ProductsPage(page);
    const productDetailPage = new ProductsDetailPage(page);

    // 1 & 2. Launch browser and navigate to URL (title assertion included in navigate)
    await homePage.navigate();

    // 3. Verify that home page is visible successfully
    await homePage.verifyMainHeaderVisible();

    // 4. Click on 'Products' button
    await homePage.clickProducts();

    // 5. Verify user is navigated to ALL PRODUCTS page successfully
    await productsPage.verifyAllProductsPageLoaded();

    // 6. Verify products list is visible
    await productsPage.verifyProductsListVisible();

    // 7. Click on 'View Product' of first product
    await productsPage.clickFirstViewProduct();

    // 8 & 9. User is landed on product detail page; verify product details
    await expect(page).toHaveURL(/\/product_details\/\d+/);
    await productDetailPage.verifyProductDetailsVisible();
  });
});
