import { test } from '@playwright/test';
import { HomePage } from '../../pages/HomePage';
import { TestCasesPage } from '../../pages/TestCasesPage';

test('Test Case 7: Verify Test Cases Page', async ({ page }) => {
  const homePage = new HomePage(page);
  const testCasesPage = new TestCasesPage(page);

  // 1–3. Launch browser, navigate to URL & verify home page
  await homePage.navigate();

  // 4. Click on 'Test Cases' button
  await homePage.clickTestCases();

  // 5. Verify user is navigated to test cases page successfully
  await testCasesPage.verifyTestCasesPageHeader();
});