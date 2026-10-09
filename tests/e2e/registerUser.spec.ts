import { test } from '@playwright/test';
import { HomePage } from '../../pages/HomePage';
import { AuthPage } from '../../pages/AuthPage';
import { SignupPage } from '../../pages/SignupPage';
import { AccountStatusPage } from '../../pages/AccountStatusPage';
import userData from '../../data/userData.json';

test('Test Case 1: Register User Flow', async ({ page }) => {
  const homePage = new HomePage(page);
  const authPage = new AuthPage(page);
  const signupPage = new SignupPage(page);
  const accountStatusPage = new AccountStatusPage(page);

  // 1–3. Launch browser, navigate to URL & verify home page
  await homePage.navigate();

  // 4–5. Click 'Signup / Login' and verify header
  await homePage.clickSignupLogin();
  await authPage.verifySignupHeader();

  // 6–7. Enter name/email and submit
  // Tip: Generate a unique email per run to avoid "Email already exists"
  const dynamicEmail = `test_${Date.now()}@example.com`;
  await authPage.enterSignupDetails(userData.newUser.name, dynamicEmail);
  await authPage.clickSignup();

  // 8–12. Verify header, fill personal & address information, check options
  await signupPage.verifyPageHeader();
  await signupPage.fillAccountInfo(userData.newUser);
  await signupPage.fillAddressInfo(userData.newUser);

  // 13–15. Create account & verify 'ACCOUNT CREATED!'
  await signupPage.clickCreateAccount();
  await accountStatusPage.verifyAccountCreated();
  await accountStatusPage.clickContinue();

  // 16. Verify 'Logged in as username'
  await homePage.verifyLoggedInUser(userData.newUser.name);

  // 17–18. Delete account & verify 'ACCOUNT DELETED!'
  await homePage.clickDeleteAccount();
  await accountStatusPage.verifyAccountDeleted();
  await accountStatusPage.clickContinue();
});