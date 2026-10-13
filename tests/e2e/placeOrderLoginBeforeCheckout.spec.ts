import { test, expect } from "@playwright/test";
import { HomePage } from "../../pages/HomePage";
import { AuthPage } from "../../pages/AuthPage";
import { ProductsPage } from "../../pages/ProductsPage";
import { CartPage } from "../../pages/CartPage";
import { CheckoutPage } from "../../pages/CheckoutPage";
import { PaymentPage } from "../../pages/PaymentPage";

test.describe("Milestone 5 - E2E Tests: Test Case 16", () => {
  test("Place Order: Login before Checkout", async ({ page, request }) => {
    const homePage = new HomePage(page);
    const authPage = new AuthPage(page);
    const productsPage = new ProductsPage(page);
    const cartPage = new CartPage(page);
    const checkoutPage = new CheckoutPage(page);
    const paymentPage = new PaymentPage(page);

    const timeStamp = Date.now();
    const username = `LoginUser_${timeStamp}`;
    const testEmail = `login_checkout_${timeStamp}@example.com`;
    const testPassword = "Password123!";

    // Pre-requisite: Register dedicated user via API
    await request.post("https://automationexercise.com/api/createAccount", {
      form: {
        name: username,
        email: testEmail,
        password: testPassword,
        title: "Mr",
        birth_date: "15",
        birth_month: "05",
        birth_year: "1992",
        firstname: "Alex",
        lastname: "Smith",
        company: "Automated Inc",
        address1: "789 Market Street",
        address2: "Apt 4B",
        country: "United States",
        zipcode: "90001",
        state: "California",
        city: "Los Angeles",
        mobile_number: "5551234567",
      },
    });

    // 1 & 2. Launch browser and navigate to URL
    await homePage.navigate();

    // 3. Verify home page is visible successfully
    await homePage.verifyMainHeaderVisible();

    // 4. Click 'Signup / Login' button
    await homePage.clickSignupLogin();

    // 5. Fill email, password and click 'Login' button
    await authPage.verifyLoginHeader();
    await authPage.login(testEmail, testPassword);

    // 6. Verify 'Logged in as username' at top
    await homePage.verifyLoggedInUser(username);

    // 7. Add products to cart
    await homePage.clickProducts();
    await productsPage.hoverAndAddFirstProductToCart();
    await productsPage.clickContinueShopping();

    // 8 & 9. Click 'Cart' button and verify cart page is displayed
    await homePage.clickCart();
    await cartPage.verifyCartPageDisplayed();

    // 10. Click Proceed To Checkout
    await cartPage.clickProceedToCheckout();

    // 11. Verify Address Details and Review Your Order
    await checkoutPage.verifyCheckoutPageDisplayed();

    // 12. Enter description in comment text area and click 'Place Order'
    await checkoutPage.enterCommentAndPlaceOrder(
      "Leave package with security gate.",
    );

    // 13. Enter payment details: Name on Card, Card Number, CVC, Expiration date
    await paymentPage.enterPaymentDetails(
      "Alex Smith",
      "4111111111111111",
      "456",
      "08",
      "2029",
    );

    // 14. Click 'Pay and Confirm Order' button
    await paymentPage.clickPayAndConfirmOrder();

    // 15. Verify success message 'Your order has been placed successfully!'
    await paymentPage.verifySuccessMessage();

    // 16. Click 'Delete Account' button
    await homePage.clickDeleteAccount();

    // 17. Verify 'ACCOUNT DELETED!' and click 'Continue' button
    await authPage.verifyAccountDeleted();
  });
});
