import { test, expect } from "@playwright/test";
import { HomePage } from "../../pages/HomePage";
import { CategoryPage } from "../../pages/CategoryPage";

test.describe("Milestone 5 - E2E Tests: Test Case 18", () => {
  test("View Category Products", async ({ page }) => {
    const homePage = new HomePage(page);
    const categoryPage = new CategoryPage(page);

    // 1 & 2. Launch browser and navigate to URL
    await homePage.navigate();

    // 3. Verify that categories are visible on left side bar
    await categoryPage.verifyCategoriesSidebarVisible();

    // 4. Click on 'Women' category
    await categoryPage.clickWomenCategory();

    // 5. Click on 'Dress' sub-category under 'Women' category
    await categoryPage.clickWomenDressCategory();

    // 6. Verify category page is displayed and confirm header text 'WOMEN - DRESS PRODUCTS'
    await categoryPage.verifyCategoryHeaderTitle("WOMEN - DRESS PRODUCTS");

    // 7. On left side bar, click on 'Men' category and then 'Tshirts' sub-category link
    await categoryPage.clickMenCategory();
    await categoryPage.clickMenTshirtsCategory();

    // 8. Verify that user is navigated to that category page ('MEN - TSHIRTS PRODUCTS')
    await categoryPage.verifyCategoryHeaderTitle("MEN - TSHIRTS PRODUCTS");
    await expect(page).toHaveURL(/\/category_products\/3/);
  });
});
