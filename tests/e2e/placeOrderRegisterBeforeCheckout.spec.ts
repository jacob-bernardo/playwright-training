import { test, expect } from "@playwright/test";
import { HomePage } from "../../pages/HomePage";
import { AuthPage } from "../../pages/AuthPage";
import { ProductsPage } from "../../pages/ProductsPage";
import { CartPage } from "../../pages/CartPage";
import { CheckoutPage } from "../../pages/CheckoutPage";
import { PaymentPage } from "../../pages/PaymentPage";

test.describe("Milestone 5 - E2E Tests: Test Case 15", () => {
  test("Place Order: Register before Checkout", async ({ page }) => {
    const homePage = new HomePage(page);
    const authPage = new AuthPage(page);
    const productsPage = new ProductsPage(page);
    const cartPage = new CartPage(page);
    const checkoutPage = new CheckoutPage(page);
    const paymentPage = new PaymentPage(page);

    const timeStamp = Date.now();
    const username = `User_${timeStamp}`;
    const testEmail = `register_before_checkout_${timeStamp}@example.com`;

    // 1 & 2. Launch browser and navigate to URL
    await homePage.navigate();

    // 3. Verify home page is visible successfully
    await homePage.verifyMainHeaderVisible();

    // 4. Click 'Signup / Login' button
    await homePage.clickSignupLogin();

    // 5. Fill all details in Signup and create account
    await authPage.verifySignupHeader();
    await authPage.enterSignupDetails(username, testEmail);
    await authPage.clickSignup();

    await authPage.fillAccountRegistrationDetails({
      pass: "Password123!",
      firstName: "Jane",
      lastName: "Doe",
      address: "456 Commerce St",
      country: "United States",
      state: "California",
      city: "San Francisco",
      zipcode: "94105",
      mobile: "9876543210",
    });

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

    // 12. Verify Address Details and Review Your Order
    await checkoutPage.verifyCheckoutPageDisplayed();

    // 13. Enter description in comment text area and click 'Place Order'
    await checkoutPage.enterCommentAndPlaceOrder("Deliver to front porch.");

    // 14. Enter payment details: Name on Card, Card Number, CVC, Expiration date
    await paymentPage.enterPaymentDetails(
      "Jane Doe",
      "4111111111111111",
      "123",
      "11",
      "2027",
    );

    // 15. Click 'Pay and Confirm Order' button
    await paymentPage.clickPayAndConfirmOrder();

    // 16. Verify success message 'Your order has been placed successfully!'
    await paymentPage.verifySuccessMessage();

    // 17. Click 'Delete Account' button
    await homePage.clickDeleteAccount();

    // 18. Verify 'ACCOUNT DELETED!' and click 'Continue' button
    await authPage.verifyAccountDeleted();
  });
});
