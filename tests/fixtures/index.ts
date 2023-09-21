import { test as base, chromium, type BrowserContext } from '@playwright/test';
import { randomUUID } from 'crypto';
import { mkdir, copyFile } from 'fs/promises';
import path from 'path';

const EXTENSION_PATH = path.join(__dirname, '../../dist');

export const test = base.extend<{
  context: BrowserContext;
  extensionBaseUrl: string;
  extensionId: string;
  extractPromptPlaceholder: () => Promise<string>;
  importBookmarks: (bookmarkFilePath: string) => Promise<BrowserContext>;
  goToExtensionPage: (pagePath: string) => Promise<BrowserContext>;
  expectHasSuggestion: (suggestionTitle: string) => Promise<BrowserContext>;
}>({
  // eslint-disable-next-line no-empty-pattern
  context: async ({}, use) => {
    // Prepare arguments
    const chromeTmpFolder = `/tmp/chromium-${randomUUID()}`;
    const chromeArgs = [
      `--disable-extensions-except=${EXTENSION_PATH}`,
      `--load-extension=${EXTENSION_PATH}`,
      '--lang=EN'
    ];
    if (process.env.PLAYWRIGHT_HEADLESS) chromeArgs.push('--headless=new');

    // Inject bookmarks fixtures
    const bookmarksFixturesPath = path.join(__dirname, './Bookmarks');
    const bookmarksTargetDir = path.join(chromeTmpFolder, 'Default');
    const bookmarksTarget = path.join(bookmarksTargetDir, 'Bookmarks');
    await mkdir(bookmarksTargetDir, { recursive: true });
    await copyFile(bookmarksFixturesPath, bookmarksTarget);

    // Launch browser
    console.log(
      "Booting chromium using persistent context : '%s'",
      chromeTmpFolder
    );
    const browser = await chromium.launchPersistentContext(chromeTmpFolder, {
      headless: false,
      args: chromeArgs
    });
    use(browser);
  },
  extractPromptPlaceholder: async ({ page }, use) => {
    use(
      () =>
        page.evaluate(
          'document.querySelector("[data-testid=input-prompt]").parentNode.getAttribute("data-placeholder")'
        ) as Promise<string>
    );
  },
  extensionId: async ({ context }, use) => {
    let [background] = context.serviceWorkers();
    if (!background) background = await context.waitForEvent('serviceworker');

    const extensionDetailsUrl = new URL(background.url());
    const extensionId = extensionDetailsUrl.host;
    if (!extensionId) throw new Error('Missing extensionId : cannot found id');
    await use(extensionId);
  },
  extensionBaseUrl: async ({ extensionId }, use) => {
    await use(`chrome-extension://${extensionId}`);
  },
  goToExtensionPage: async ({ context, extensionId, page }, use) => {
    await use(async (pagePath: string) => {
      const pageUrl = `chrome-extension://${extensionId}${pagePath}`;
      await page.goto(pageUrl);
      return context;
    });
  },
  expectHasSuggestion: async ({ context, page }, use) => {
    await use(async (suggestionTitle: string) => {
      await expect(
        page
          .getByRole('listitem')
          .filter({ has: page.getByRole('heading', { name: suggestionTitle }) })
      ).toHaveCount(1);
      return context;
    });
  }
});
export const expect = test.expect;
