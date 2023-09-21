import { test, expect } from './fixtures';

test.describe('#command.save-current-tab', () => {
  test("should expose autocomplete on 's'", async ({
    page,
    goToExtensionPage
  }) => {
    await goToExtensionPage(`/popup.html`);

    await page.getByTestId('input-prompt').fill('s');
    await expect(page.getByText('save')).toBeVisible();

    await page.keyboard.press('Tab');
    await expect(page.getByTestId('input-prompt')).toHaveValue(/^save\s*/);
  });

  test('should suggest to save in native folders', async ({
    page,
    goToExtensionPage,
    expectHasSuggestion
  }) => {
    await goToExtensionPage(`/popup.html`);

    await page.getByTestId('input-prompt').fill('save ');
    await expectHasSuggestion('save in my bar');
    await expectHasSuggestion('save in others');
  });

  test('should suggest to save in simple folder', async ({
    page,
    goToExtensionPage,
    expectHasSuggestion
  }) => {
    await goToExtensionPage(`/popup.html`);

    await page.getByTestId('input-prompt').fill('save exam');
    await expectHasSuggestion('save in example');
  });

  test('should suggest to save in sub folders', async ({
    page,
    goToExtensionPage,
    expectHasSuggestion
  }) => {
    await goToExtensionPage(`/popup.html`);

    await page.getByTestId('input-prompt').fill('save lat');
    await expectHasSuggestion('save in later');
  });

  test('should show details page on press ->', async ({
    page,
    goToExtensionPage
  }) => {
    await goToExtensionPage(`/popup.html`);
    await page.getByTestId('input-prompt').fill('save example');
    await page.keyboard.press('ArrowRight');
    await page.waitForURL('**/popup.html#/details/tab-save-*');
  });

  test('should add bookmark on execute', async ({
    page,
    context,
    goToExtensionPage
  }) => {
    await goToExtensionPage(`/popup.html`);
    const targetUrl = page.url();
    // Execute command
    await page.getByTestId('input-prompt').fill('save example');
    await page.keyboard.press('Enter');
    await page.waitForEvent('close');
    // Retrieve bookmark
    const bookmarksPage = await context.newPage();
    await bookmarksPage.goto('chrome://bookmarks');
    await bookmarksPage.getByRole('treeitem').getByText('example').click();
    const bookmarkFound = bookmarksPage.getByRole('grid').getByText('Prompto');
    await expect(bookmarkFound).toBeVisible();
    // Check bookmark target
    const targetPagePromise = context.waitForEvent('page');
    await bookmarkFound.dblclick();
    const targetPage = await targetPagePromise;
    await targetPage.waitForURL(targetUrl);
  });

  test('should add bookmark folder if necessary', async ({
    page,
    context,
    goToExtensionPage
  }) => {
    await goToExtensionPage(`/popup.html`);
    const targetUrl = page.url();
    // Execute command
    await page.getByTestId('input-prompt').fill('save new-folder');
    await page.keyboard.press('Enter');
    await page.waitForEvent('close');
    // Retrieve bookmark
    const bookmarksPage = await context.newPage();
    await bookmarksPage.goto('chrome://bookmarks');
    const createdFolder = bookmarksPage
      .getByRole('treeitem')
      .getByText('new-folder');
    await expect(createdFolder).toBeVisible();
    await createdFolder.click();
    const bookmarkFound = bookmarksPage.getByRole('grid').getByText('Prompto');
    await expect(bookmarkFound).toBeVisible();
    // Check bookmark target
    const targetPagePromise = context.waitForEvent('page');
    await bookmarkFound.dblclick();
    const targetPage = await targetPagePromise;
    await targetPage.waitForURL(targetUrl);
  });
});
