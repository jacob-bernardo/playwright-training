import { test, expect } from "@playwright/test";
import { HomePage } from "../../pages/HomePage";
import { ProductsPage } from "../../pages/ProductsPage";
import { CartPage } from "../../pages/CartPage";
import { AuthPage } from "../../pages/AuthPage";
import { CheckoutPage } from "../../pages/CheckoutPage";
import { PaymentPage } from "../../pages/PaymentPage";

test.describe("Milestone 5 - E2E Tests: Test Case 14", () => {
  test("Place Order: Register while Checkout", async ({ page }) => {
    const homePage = new HomePage(page);
    const productsPage = new ProductsPage(page);
    const cartPage = new CartPage(page);
    const authPage = new AuthPage(page);
    const checkoutPage = new CheckoutPage(page);
    const paymentPage = new PaymentPage(page);

    const timeStamp = Date.now();
    const username = `User_${timeStamp}`;
    const testEmail = `register_checkout_${timeStamp}@example.com`;

    // 1 & 2. Launch browser and navigate to URL
    await homePage.navigate();

    // 3. Verify home page is visible
    await homePage.verifyMainHeaderVisible();

    // 4. Add products to cart
    await homePage.clickProducts();
    await productsPage.hoverAndAddFirstProductToCart();
    await productsPage.clickContinueShopping();

    // 5 & 6. Click 'Cart' button and verify cart page is displayed
    await homePage.clickCart();
    await cartPage.verifyCartPageDisplayed();

    // 7. Click Proceed To Checkout
    await cartPage.clickProceedToCheckout();

    // 8. Click 'Register / Login' button in modal
    await cartPage.clickRegisterLoginFromModal();

    // 9. Fill all details in Signup and create account
    await authPage.verifySignupHeader();
    await authPage.enterSignupDetails(username, testEmail);
    await authPage.clickSignup();

    await authPage.fillAccountRegistrationDetails({
      pass: "Password123!",
      firstName: "John",
      lastName: "Doe",
      address: "123 Street Ave",
      country: "United States",
      state: "California",
      city: "Los Angeles",
      zipcode: "90210",
      mobile: "1234567890",
    });

    // 10. Verify 'ACCOUNT CREATED!' and click 'Continue' button
    await authPage.verifyAccountCreated();

    // 11. Verify 'Logged in as username' at top
    await homePage.verifyLoggedInUser(username);

    // 12. Click 'Cart' button
    await homePage.clickCart();

    // 13. Click 'Proceed To Checkout' button
    await cartPage.clickProceedToCheckout();

    // 14. Verify Address Details and Review Your Order
    await checkoutPage.verifyCheckoutPageDisplayed();

    // 15. Enter description in comment text area and click 'Place Order'
    await checkoutPage.enterCommentAndPlaceOrder(
      "Please deliver between 9 AM and 5 PM.",
    );

    // 16. Enter payment details: Name on Card, Card Number, CVC, Expiration date
    await paymentPage.enterPaymentDetails(
      "John Doe",
      "4111111111111111",
      "321",
      "12",
      "2028",
    );

    // 17. Click 'Pay and Confirm Order' button
    await paymentPage.clickPayAndConfirmOrder();

    // 18. Verify success message 'Your order has been placed successfully!'
    await paymentPage.verifySuccessMessage();

    // 19. Click 'Delete Account' button
    await homePage.clickDeleteAccount();

    // 20. Verify 'ACCOUNT DELETED!' and click 'Continue' button
    await authPage.verifyAccountDeleted();
  });
});
