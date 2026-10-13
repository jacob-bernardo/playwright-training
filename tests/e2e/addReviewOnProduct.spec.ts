import { test, expect } from "@playwright/test";
import { HomePage } from "../../pages/HomePage";
import { ProductsPage } from "../../pages/ProductsPage";
import { ProductsDetailPage } from "../../pages/ProductsDetailPage";

test.describe("Milestone 5 - E2E Tests: Test Case 21", () => {
  test("Add review on product", async ({ page }) => {
    const homePage = new HomePage(page);
    const productsPage = new ProductsPage(page);
    const productDetailPage = new ProductsDetailPage(page);

    // 1 & 2. Launch browser and navigate to URL
    await homePage.navigate();

    // 3. Click on 'Products' button
    await homePage.clickProducts();

    // 4. Verify user is navigated to ALL PRODUCTS page successfully
    await productsPage.verifyAllProductsPageLoaded();

    // 5. Click on 'View Product' button on first product
    await productsPage.clickFirstViewProduct();

    // 6. Verify 'Write Your Review' is visible
    await productDetailPage.verifyWriteReviewHeaderVisible();

    // 7 & 8. Enter name, email, review text and click 'Submit' button
    await productDetailPage.submitReview(
      "QA Tester",
      "qatester@example.com",
      "This product exceeded expectations! Highly recommended quality and fit.",
    );

    // 9. Verify success message 'Thank you for your review.'
    await productDetailPage.verifyReviewSuccessMessage();
  });
});
