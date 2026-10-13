import { test, expect } from "@playwright/test";
import { HomePage } from "../../pages/HomePage";
import { CartPage } from "../../pages/CartPage";

test.describe("Milestone 5 - E2E Tests: Test Case 22", () => {
  test("Add to cart from Recommended items", async ({ page }) => {
    const homePage = new HomePage(page);
    const cartPage = new CartPage(page);

    // 1 & 2. Launch browser and navigate to URL
    await homePage.navigate();

    // 3 & 4. Scroll to bottom of page and verify 'RECOMMENDED ITEMS' are visible
    await homePage.scrollToRecommendedItems();

    // 5. Click on 'Add To Cart' on Recommended product
    await homePage.clickAddRecommendedProductToCart();

    // 6. Click on 'View Cart' button from modal
    await homePage.clickModalViewCart();

    // 7. Verify that product is displayed in cart page
    await cartPage.verifyCartPageDisplayed();
    await cartPage.verifyCartItemCount(1);
  });
});
