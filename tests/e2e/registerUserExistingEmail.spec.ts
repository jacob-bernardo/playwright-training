import { test } from '@playwright/test';
import { HomePage } from '../../pages/HomePage';
import { AuthPage } from '../../pages/AuthPage';
import { SignupPage } from '../../pages/SignupPage';
import { AccountStatusPage } from '../../pages/AccountStatusPage';
import userData from '../../data/userData.json';

test.describe('Test Case 5: Register User with existing email', () => {
  let existingUserEmail: string;

  // Prerequisite: Create an account so the email exists in the system
  test.beforeEach(async ({ page }) => {
    const homePage = new HomePage(page);
    const authPage = new AuthPage(page);
    const signupPage = new SignupPage(page);
    const accountStatusPage = new AccountStatusPage(page);

    existingUserEmail = `existing_user_${Date.now()}@example.com`;

    await homePage.navigate();
    await homePage.clickSignupLogin();
    await authPage.enterSignupDetails(userData.newUser.name, existingUserEmail);
    await authPage.clickSignup();

    await signupPage.fillAccountInfo(userData.newUser);
    await signupPage.fillAddressInfo(userData.newUser);
    await signupPage.clickCreateAccount();
    await accountStatusPage.clickContinue();

    // Log out to clear session
    await homePage.clickLogout();
  });

  test('Should display error when registering with an existing email', async ({ page }) => {
    const homePage = new HomePage(page);
    const authPage = new AuthPage(page);

    // 1–3. Launch browser, navigate to URL & verify home page
    await homePage.navigate();

    // 4. Click on 'Signup / Login' button
    await homePage.clickSignupLogin();

    // 5. Verify 'New User Signup!' is visible
    await authPage.verifySignupHeader();

    // 6. Enter name and already registered email address
    await authPage.enterSignupDetails(userData.newUser.name, existingUserEmail);

    // 7. Click 'Signup' button
    await authPage.clickSignup();

    // 8. Verify error 'Email Address already exist!' is visible
    await authPage.verifySignupError();
  });
}); 