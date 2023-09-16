import { SimpleBookmarkNode, fetchBookmarks } from '@src/data/bookmarks';
import { limit } from '@src/helpers/list';
import {
  CommandIcon,
  CommandSuggestion,
  CommandTemplate,
  CommandType
} from '@src/types/commands';

const RESULTS_LIMIT = 15;

const searchFolderWithWords = (folder: SimpleBookmarkNode, words: string[]) => {
  const someWordMatching = words.some((word) => folder.index.includes(word));
  const isRootFolder = folder.path.length == 1;

  return someWordMatching || isRootFolder;
};

const compareFolderWeight = (
  folderA: SimpleBookmarkNode,
  folderB: SimpleBookmarkNode
) => {
  const isARootFolder = folderA.path.length == 1;
  const isBRootFolder = folderB.path.length == 1;
  if (isARootFolder) return 1;
  if (isBRootFolder) return -1;
  return 0;
};

export default {
  type: CommandType.BOOKMARK_SAVE,
  keywords: ['save'],
  execute: () => Promise.resolve(false),
  generateSuggestions: async (inputText, options) => {
    const bookmarksPromise = fetchBookmarks();

    if (!inputText || !options?.extractedKeyword) return Promise.resolve([]);

    const inputQuery = options?.extractedInputWithoutKeyword || '';
    const { data: bookmarks } = await bookmarksPromise;
    if (!bookmarks || bookmarks.length == 0) return Promise.resolve([]);

    const inputWords = inputQuery
      .toLowerCase()
      .split(' ')
      .filter((word) => !!word);
    const folders = bookmarks
      .filter((folder) => searchFolderWithWords(folder, inputWords))
      .sort(compareFolderWeight);

    const data = folders.filter(limit(RESULTS_LIMIT)).map((folder) => {
      const formatedFolder = folder.path[folder.path.length - 1];
      const formatedPath = folder.path
        .slice(0, folder.path.length - 1)
        .join('/');

      return {
        id: folder.id,
        key: `save-on-${folder.id}`,
        type: CommandType.BOOKMARK_SAVE,
        title: `Save in ${formatedFolder}`,
        url: 'Attach current tab in this folder',
        description: formatedPath ? `In ${formatedPath}` : undefined,
        iconKey: CommandIcon.BOOKMARK,
        hasDetails: true
      } as CommandSuggestion;
    });

    return data;
  }
} as CommandTemplate;
