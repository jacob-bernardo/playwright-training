import { test, expect } from "@playwright/test";
import { HomePage } from "../../pages/HomePage";
import { ProductsPage } from "../../pages/ProductsPage";
import { CartPage } from "../../pages/CartPage";
import { AuthPage } from "../../pages/AuthPage";

test.describe("Milestone 5 - E2E Tests: Test Case 20", () => {
  test("Search Products and Verify Cart After Login", async ({
    page,
    request,
  }) => {
    const homePage = new HomePage(page);
    const productsPage = new ProductsPage(page);
    const cartPage = new CartPage(page);
    const authPage = new AuthPage(page);

    const testEmail = `cart_login_${Date.now()}@example.com`;
    const testPassword = "Password123!";
    const searchKeyword = "top";

    // Pre-requisite: Create a dedicated user account via API
    await request.post("https://automationexercise.com/api/createAccount", {
      form: {
        name: "Cart Test User",
        email: testEmail,
        password: testPassword,
        title: "Mr",
        birth_date: "10",
        birth_month: "10",
        birth_year: "1990",
        firstname: "Cart",
        lastname: "Tester",
        company: "QA Studio",
        address1: "123 Main St",
        address2: "Suite 100",
        country: "United States",
        zipcode: "90210",
        state: "California",
        city: "Los Angeles",
        mobile_number: "1234567890",
      },
    });

    // 1 & 2. Launch browser and navigate to URL
    await homePage.navigate();

    // 3 & 4. Click 'Products' button and verify navigation to ALL PRODUCTS page
    await homePage.clickProducts();
    await productsPage.verifyAllProductsPageLoaded();

    // 5 & 6. Enter search keyword and verify 'SEARCHED PRODUCTS' header
    await productsPage.searchProduct(searchKeyword);
    await productsPage.verifySearchedProductsHeaderVisible();

    // 7. Verify all products related to search are visible
    await productsPage.verifySearchedProductsVisible();

    // 8. Add all searched products to cart
    await productsPage.addAllSearchedProductsToCart();

    // 9. Click 'Cart' button and verify products are visible in cart
    await homePage.clickCart();
    await cartPage.verifyCartPageDisplayed();
    const preLoginCount = await cartPage.cartItems.count();
    expect(preLoginCount).toBeGreaterThan(0);

    // 10. Click 'Signup / Login' button and submit login details using AuthPage
    await homePage.clickSignupLogin();
    await authPage.verifyLoginHeader();
    await authPage.login(testEmail, testPassword);

    // 11. Again, go to Cart page
    await homePage.clickCart();

    // 12. Verify that those products are visible in cart after login as well
    await cartPage.verifyCartPageDisplayed();
    await cartPage.verifyCartItemCount(preLoginCount);
  });
});
