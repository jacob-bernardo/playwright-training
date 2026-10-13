import { test, expect } from "@playwright/test";
import { HomePage } from "../../pages/HomePage";
import { ProductsPage } from "../../pages/ProductsPage";
import { CartPage } from "../../pages/CartPage";

test.describe("Milestone 5 - E2E Tests: Test Case 12", () => {
  test("Add Products in Cart", async ({ page }) => {
    const homePage = new HomePage(page);
    const productsPage = new ProductsPage(page);
    const cartPage = new CartPage(page);

    // 1 & 2. Launch browser and Navigate to URL
    await homePage.navigate();

    // 3. Verify home page is visible
    await homePage.verifyMainHeaderVisible();

    // 4. Click Products button
    await homePage.clickProducts();

    // 5. Hover over first product and click Add to cart
    await productsPage.hoverAndAddFirstProductToCart();

    // 6. Click Continue Shopping button
    await productsPage.clickContinueShopping();

    // 7. Hover over second product and click Add to cart
    await productsPage.hoverAndAddSecondProductToCart();

    // 8. Click View Cart button in modal
    await productsPage.clickModalViewCart();

    // 9. Verify both products are added to Cart
    await cartPage.verifyCartItemCount(2);

    // 10. Verify their prices, quantity, and total price
    // First product: Blue Top - Rs. 500, Qty 1, Total Rs. 500
    await cartPage.verifyProductDetails(0, "Rs. 500", "1", "Rs. 500");
    // Second product: Men Tshirt - Rs. 400, Qty 1, Total Rs. 400
    await cartPage.verifyProductDetails(1, "Rs. 400", "1", "Rs. 400");
  });
});
