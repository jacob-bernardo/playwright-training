import { test } from '@playwright/test';
import { HomePage } from '../../pages/HomePage';

test('Test Case 26: Verify Scroll Up without Arrow button and Scroll Down functionality', async ({ page }) => {
  const homePage = new HomePage(page);

  // 1–3. Launch browser, navigate to URL & verify home page
  await homePage.navigate();

  // 4. Scroll down page to bottom
  await homePage.scrollToBottom();

  // 5. Verify 'SUBSCRIPTION' is visible
  await homePage.verifySubscriptionHeader();

  // 6. Scroll up page to top
  await homePage.scrollToTop();

  // 7. Verify page is scrolled up and 'Full-Fledged practice website for Automation Engineers' text is visible
  await homePage.verifyMainHeaderVisible();
});