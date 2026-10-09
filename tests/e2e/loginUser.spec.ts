import { test } from '@playwright/test';
import { HomePage } from '../../pages/HomePage';
import { AuthPage } from '../../pages/AuthPage';
import { SignupPage } from '../../pages/SignupPage';
import { AccountStatusPage } from '../../pages/AccountStatusPage';
import userData from '../../data/userData.json';

test.describe('Test Case 2: Login User with correct email and password', () => {
  let userEmail: string;

  // Setup: Create a fresh user so there's a valid account to log in with
  test.beforeEach(async ({ page }) => {
    const homePage = new HomePage(page);
    const authPage = new AuthPage(page);
    const signupPage = new SignupPage(page);
    const accountStatusPage = new AccountStatusPage(page);

    userEmail = `test_login_${Date.now()}@example.com`;

    await homePage.navigate();
    await homePage.clickSignupLogin();
    await authPage.enterSignupDetails(userData.newUser.name, userEmail);
    await authPage.clickSignup();

    await signupPage.fillAccountInfo(userData.newUser);
    await signupPage.fillAddressInfo(userData.newUser);
    await signupPage.clickCreateAccount();
    await accountStatusPage.clickContinue();

    // Logout to reset state for the actual test
    await page.locator('a[href="/logout"]').click();
  });

  test('Login and Delete Account', async ({ page }) => {
    const homePage = new HomePage(page);
    const authPage = new AuthPage(page);
    const accountStatusPage = new AccountStatusPage(page);

    // 1–3. Launch browser, navigate to URL & verify home page
    await homePage.navigate();

    // 4. Click on 'Signup / Login' button
    await homePage.clickSignupLogin();

    // 5. Verify 'Login to your account' is visible
    await authPage.verifyLoginHeader();

    // 6–7. Enter correct email address and password, then click 'login'
    await authPage.login(userEmail, userData.newUser.password);

    // 8. Verify that 'Logged in as username' is visible
    await homePage.verifyLoggedInUser(userData.newUser.name);

    // 9. Click 'Delete Account' button
    await homePage.clickDeleteAccount();

    // 10. Verify that 'ACCOUNT DELETED!' is visible
    await accountStatusPage.verifyAccountDeleted();
  });
});