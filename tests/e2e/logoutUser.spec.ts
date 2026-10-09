import { test, expect } from '@playwright/test';
import { HomePage } from '../../pages/HomePage';
import { AuthPage } from '../../pages/AuthPage';
import { SignupPage } from '../../pages/SignupPage';
import { AccountStatusPage } from '../../pages/AccountStatusPage';
import userData from '../../data/userData.json';

test.describe('Test Case 4: Logout User Flow', () => {
  let userEmail: string;

  // Prerequisites: Ensure an account exists to log into
  test.beforeEach(async ({ page }) => {
    const homePage = new HomePage(page);
    const authPage = new AuthPage(page);
    const signupPage = new SignupPage(page);
    const accountStatusPage = new AccountStatusPage(page);

    userEmail = `test_logout_${Date.now()}@example.com`;

    await homePage.navigate();
    await homePage.clickSignupLogin();
    await authPage.enterSignupDetails(userData.newUser.name, userEmail);
    await authPage.clickSignup();

    await signupPage.fillAccountInfo(userData.newUser);
    await signupPage.fillAddressInfo(userData.newUser);
    await signupPage.clickCreateAccount();
    await accountStatusPage.clickContinue();

    // Log out initial creation session so we start from a clean state
    await homePage.clickLogout();
  });

  test('Logout successfully returns user to login page', async ({ page }) => {
    const homePage = new HomePage(page);
    const authPage = new AuthPage(page);

    // 1–2. Navigate & verify home page
    await homePage.navigate();

    // 3–5. Go to login page & verify header
    await homePage.clickSignupLogin();
    await authPage.verifyLoginHeader();

    // 6–7. Enter credentials and click login
    await authPage.login(userEmail, userData.newUser.password);

    // 8. Verify 'Logged in as username'
    await homePage.verifyLoggedInUser(userData.newUser.name);

    // 9. Click 'Logout'
    await homePage.clickLogout();

    // 10. Verify navigation back to login page
    await expect(page).toHaveURL(/.*login/);
    await authPage.verifyLoginHeader();
  });
});