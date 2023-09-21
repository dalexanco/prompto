import { test, expect } from './fixtures';

test.describe('#command.tab-duplicate', () => {
  test("should be suggested while typing 'du'", async ({
    page,
    goToExtensionPage,
    extractPromptPlaceholder
  }) => {
    await goToExtensionPage(`/popup.html`);

    await page.getByTestId('input-prompt').fill('du');

    const placeholder = await extractPromptPlaceholder();
    await expect(placeholder).toEqual('duplicate');

    await page.keyboard.press('Tab');
    await expect(page.getByTestId('input-prompt')).toHaveValue(/^duplicate\s*/);
  });

  test('should duplicate current tab on execute', async ({
    page,
    context,
    goToExtensionPage
  }) => {
    await goToExtensionPage(`/popup.html`);
    // Execute command
    await page.getByTestId('input-prompt').fill('duplicate ');
    await page.keyboard.press('Enter');
    // Wait for prompt to close
    await page.waitForEvent('close');
    await context.waitForEvent('page');
    // Filter existing pages
    const urls = context
      .pages()
      .map((page) => page.url())
      .filter((url) => url.endsWith('popup.html'));
    // Check the page was duplicated
    expect(urls).toHaveLength(1);
  });
});
