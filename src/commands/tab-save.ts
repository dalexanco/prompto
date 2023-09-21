import {
  SimpleBookmarkNode,
  SpecialBookmarkFolder,
  fetchBookmarks
} from '@src/data/bookmarks';
import { limit } from '@src/helpers/list';
import {
  CommandIcon,
  CommandSuggestion,
  CommandTemplate,
  CommandType
} from '@src/types/commands';

const RESULTS_LIMIT = 15;

const filterFolderWithWords = (folder: SimpleBookmarkNode, words: string[]) =>
  words.every((word) => folder.index.includes(word));

const searchFolders = (folders: SimpleBookmarkNode[], inputQuery: string) => {
  const defaultFolders = folders.filter(({ isRoot }) => isRoot);
  const inputWords = inputQuery
    .toLowerCase()
    .split(' ')
    .filter((word) => !!word);
  if (inputWords.length == 0) return defaultFolders;

  return folders.filter((folder) => filterFolderWithWords(folder, inputWords));
};

export interface CommandSuggestionTabSave extends CommandSuggestion {
  bookmarkTitle: string;
  bookmarkUrl: string;
  parentFolderId?: string;
  parentFolderName?: string;
}

const retreiveDefaultBookmarkFolder = async () => {
  const { data: bookmarks } = await fetchBookmarks();
  if (!bookmarks) return undefined;

  return bookmarks.find(
    ({ specialFolder }) => specialFolder == SpecialBookmarkFolder.BAR
  );
};

export default {
  type: CommandType.BOOKMARK_SAVE,
  keywords: ['save'],
  execute: async (suggestion) => {
    const { bookmarkTitle, bookmarkUrl, parentFolderId, parentFolderName } =
      suggestion as CommandSuggestionTabSave;

    if (!parentFolderId && parentFolderName) {
      const defaultFolder = await retreiveDefaultBookmarkFolder();
      if (!defaultFolder) return { succeed: false };

      const parentFolder = await chrome.bookmarks.create({
        title: parentFolderName,
        parentId: defaultFolder.id
      });

      await chrome.bookmarks.create({
        parentId: parentFolder.id,
        title: bookmarkTitle,
        url: bookmarkUrl
      });
    }

    await chrome.bookmarks.create({
      parentId: parentFolderId,
      title: bookmarkTitle,
      url: bookmarkUrl
    });

    return { succeed: true };
  },
  generateSuggestions: async (inputText, options) => {
    const bookmarksPromise = fetchBookmarks();
    const inputQuery = options?.extractedInputWithoutKeyword || '';

    // Suggestions off without keyword
    if (!inputText || !options?.extractedKeyword) return Promise.resolve([]);

    // Suggestions off until bookmarks ready
    const { data: bookmarks } = await bookmarksPromise;
    if (!bookmarks || bookmarks.length == 0) return Promise.resolve([]);

    // Retrieve current tab
    const windowId = chrome.windows.WINDOW_ID_CURRENT;
    const [activeTab] = await chrome.tabs.query({ windowId, active: true });

    // Search a matching folder
    const matchingFolders = searchFolders(bookmarks, inputQuery);

    // Prepare new folder suggestion
    const defaultFolder = bookmarks.find(
      ({ specialFolder }) => specialFolder == SpecialBookmarkFolder.BAR
    );

    const newFolderSuggestions = inputQuery
      ? [
          {
            key: `tab-save-new-folder`,
            type: CommandType.BOOKMARK_SAVE,
            title: `Save in a new folder ${inputQuery}`,
            url: 'Attach current tab in this folder',
            description: defaultFolder
              ? `In ${defaultFolder.path
                  .slice(0, defaultFolder.path.length)
                  .join('/')}`
              : undefined,
            iconKey: CommandIcon.BOOKMARK,
            hasDetails: true,
            parentFolderName: inputQuery,
            bookmarkTitle: activeTab.title,
            bookmarkUrl: activeTab.url
          } as CommandSuggestionTabSave
        ]
      : [];

    return matchingFolders
      .filter(limit(RESULTS_LIMIT))
      .map((folder) => {
        const parentFolderId = folder.id;
        const parentFolderName = folder.path[folder.path.length - 1];
        const formatedPath = folder.path
          .slice(0, folder.path.length - 1)
          .join('/');

        return {
          key: `tab-save-${folder.id}`,
          type: CommandType.BOOKMARK_SAVE,
          title: `Save in ${parentFolderName}`,
          url: 'Attach current tab in this folder',
          description: formatedPath ? `In ${formatedPath}` : undefined,
          iconKey: CommandIcon.BOOKMARK,
          hasDetails: true,
          parentFolderId,
          bookmarkTitle: activeTab.title,
          bookmarkUrl: activeTab.url
        } as CommandSuggestionTabSave;
      })
      .concat(newFolderSuggestions);
  }
} as CommandTemplate;
