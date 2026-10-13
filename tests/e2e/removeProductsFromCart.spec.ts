import { test, expect } from "@playwright/test";
import { HomePage } from "../../pages/HomePage";
import { ProductsPage } from "../../pages/ProductsPage";
import { CartPage } from "../../pages/CartPage";

test.describe("Milestone 5 - E2E Tests: Test Case 17", () => {
  test("Remove Products From Cart", async ({ page }) => {
    const homePage = new HomePage(page);
    const productsPage = new ProductsPage(page);
    const cartPage = new CartPage(page);

    // 1 & 2. Launch browser and Navigate to URL
    await homePage.navigate();

    // 3. Verify that home page is visible successfully
    await homePage.verifyMainHeaderVisible();

    // 4. Add products to cart
    await homePage.clickProducts();
    await productsPage.hoverAndAddFirstProductToCart();
    await productsPage.clickContinueShopping();

    // 5. Click 'Cart' button
    await homePage.clickCart();

    // 6. Verify that cart page is displayed
    await cartPage.verifyCartPageDisplayed();
    await cartPage.verifyCartItemCount(1);

    // 7. Click 'X' button corresponding to particular product
    await cartPage.removeProductFromCart(0);

    // 8. Verify that product is removed from the cart
    await cartPage.verifyProductRemoved();
  });
});
