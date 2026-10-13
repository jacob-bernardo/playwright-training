import { test, expect } from "@playwright/test";
import { HomePage } from "../../pages/HomePage";
import { ProductsPage } from "../../pages/ProductsPage";
import { CartPage } from "../../pages/CartPage";
import { AuthPage } from "../../pages/AuthPage";
import { CheckoutPage } from "../../pages/CheckoutPage";
import { PaymentPage } from "../../pages/PaymentPage";

test.describe("Milestone 5 - E2E Tests: Test Case 24", () => {
  test("Download Invoice after purchase order", async ({ page }) => {
    const homePage = new HomePage(page);
    const productsPage = new ProductsPage(page);
    const cartPage = new CartPage(page);
    const authPage = new AuthPage(page);
    const checkoutPage = new CheckoutPage(page);
    const paymentPage = new PaymentPage(page);

    const timeStamp = Date.now();
    const username = `InvoiceUser_${timeStamp}`;
    const testEmail = `invoice_${timeStamp}@example.com`;

    // 1 & 2. Launch browser and navigate to URL
    await homePage.navigate();

    // 3. Verify home page is visible successfully
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

    // 8. Click 'Register / Login' button
    await cartPage.clickRegisterLoginFromModal();

    // 9. Fill all details in Signup and create account
    await authPage.verifySignupHeader();
    await authPage.enterSignupDetails(username, testEmail);
    await authPage.clickSignup();

    await authPage.fillAccountRegistrationDetails({
      pass: "Password123!",
      firstName: "David",
      lastName: "Miller",
      address: "100 Tech Blvd",
      country: "United States",
      state: "Texas",
      city: "Austin",
      zipcode: "73301",
      mobile: "5559876543",
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
      "Invoice requested upon delivery.",
    );

    // 16. Enter payment details
    await paymentPage.enterPaymentDetails(
      "David Miller",
      "4111111111111111",
      "789",
      "12",
      "2028",
    );

    // 17. Click 'Pay and Confirm Order' button
    await paymentPage.clickPayAndConfirmOrder();

    // 18. Verify success message 'Your order has been placed successfully!'
    await paymentPage.verifySuccessMessage();

    // 19. Click 'Download Invoice' button and verify invoice is downloaded successfully
    const downloadedFileName = await paymentPage.downloadInvoiceAndVerify();
    expect(downloadedFileName).toBeTruthy();

    // 20. Click 'Continue' button
    await paymentPage.clickContinue();

    // 21. Click 'Delete Account' button
    await homePage.clickDeleteAccount();

    // 22. Verify 'ACCOUNT DELETED!' and click 'Continue' button
    await authPage.verifyAccountDeleted();
  });
});
