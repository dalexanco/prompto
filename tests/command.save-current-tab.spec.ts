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
    await page.waitForURL('**/popup.html#/details/save-on-*');
  });
});
