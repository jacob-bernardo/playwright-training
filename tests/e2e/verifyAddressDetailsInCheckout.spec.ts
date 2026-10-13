import { test, expect } from "@playwright/test";
import { HomePage } from "../../pages/HomePage";
import { AuthPage } from "../../pages/AuthPage";
import { ProductsPage } from "../../pages/ProductsPage";
import { CartPage } from "../../pages/CartPage";
import { CheckoutPage } from "../../pages/CheckoutPage";

test.describe("Milestone 5 - E2E Tests: Test Case 23", () => {
  test("Verify address details in checkout page", async ({ page }) => {
    const homePage = new HomePage(page);
    const authPage = new AuthPage(page);
    const productsPage = new ProductsPage(page);
    const cartPage = new CartPage(page);
    const checkoutPage = new CheckoutPage(page);

    const timeStamp = Date.now();
    const username = `User_${timeStamp}`;
    const testEmail = `address_checkout_${timeStamp}@example.com`;

    const userDetails = {
      pass: "Password123!",
      firstName: "John",
      lastName: "Doe",
      address: "123 Test Street",
      country: "United States",
      state: "California",
      city: "Los Angeles",
      zipcode: "90001",
      mobile: "1234567890",
    };

    // 1 & 2. Launch browser and navigate to URL
    await homePage.navigate();

    // 3. Verify that home page is visible successfully
    await homePage.verifyMainHeaderVisible();

    // 4. Click 'Signup / Login' button
    await homePage.clickSignupLogin();

    // 5. Fill all details in Signup and create account
    await authPage.verifySignupHeader();
    await authPage.enterSignupDetails(username, testEmail);
    await authPage.clickSignup();
    await authPage.fillAccountRegistrationDetails(userDetails);

    // 6. Verify 'ACCOUNT CREATED!' and click 'Continue' button
    await authPage.verifyAccountCreated();

    // 7. Verify 'Logged in as username' at top
    await homePage.verifyLoggedInUser(username);

    // 8. Add products to cart
    await homePage.clickProducts();
    await productsPage.hoverAndAddFirstProductToCart();
    await productsPage.clickContinueShopping();

    // 9 & 10. Click 'Cart' button and verify cart page is displayed
    await homePage.clickCart();
    await cartPage.verifyCartPageDisplayed();

    // 11. Click Proceed To Checkout
    await cartPage.clickProceedToCheckout();

    // 12 & 13. Verify that Delivery & Billing addresses match registration details
    const expectedAddressData = {
      fullName: `Mr. ${userDetails.firstName} ${userDetails.lastName}`,
      address1: userDetails.address,
      cityStateZip: `${userDetails.city} ${userDetails.state} ${userDetails.zipcode}`,
      country: userDetails.country,
      mobile: userDetails.mobile,
    };

    await checkoutPage.verifyDeliveryAddressDetails(expectedAddressData);
    await checkoutPage.verifyBillingAddressDetails(expectedAddressData);

    // 14. Click 'Delete Account' button
    await homePage.clickDeleteAccount();

    // 15. Verify 'ACCOUNT DELETED!' and click 'Continue' button
    await authPage.verifyAccountDeleted();
  });
});
