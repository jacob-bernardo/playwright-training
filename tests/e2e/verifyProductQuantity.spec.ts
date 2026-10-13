import { test, expect } from "@playwright/test";
import { HomePage } from "../../pages/HomePage";
import { ProductsDetailPage } from "../../pages/ProductsDetailPage";
import { CartPage } from "../../pages/CartPage";

test.describe("Milestone 5 - E2E Tests: Test Case 13", () => {
  test("Verify Product quantity in Cart", async ({ page }) => {
    const homePage = new HomePage(page);
    const productDetailPage = new ProductsDetailPage(page);
    const cartPage = new CartPage(page);

    // 1 & 2. Launch browser and navigate to URL
    await homePage.navigate();

    // 3. Verify that home page is visible successfully
    await homePage.verifyMainHeaderVisible();

    // 4. Click 'View Product' for any product on home page
    await homePage.clickFirstViewProduct();

    // 5. Verify product detail is opened
    await expect(page).toHaveURL(/\/product_details\/\d+/);
    await productDetailPage.verifyProductDetailsVisible();

    // 6. Increase quantity to 4
    await productDetailPage.setQuantity("4");

    // 7. Click 'Add to cart' button
    await productDetailPage.clickAddToCart();

    // 8. Click 'View Cart' button from modal
    await productDetailPage.clickModalViewCart();

    // 9. Verify that product is displayed in cart page with exact quantity (4)
    await cartPage.verifyCartItemCount(1);
    await cartPage.verifyProductQuantity(0, "4");
  });
});
