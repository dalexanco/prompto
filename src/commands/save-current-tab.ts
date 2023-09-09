import { SimpleBookmarkNode, fetchBookmarks } from '@src/data/bookmarks';
import { limit } from '@src/helpers/list';
import {
  CommandIcon,
  CommandSuggestion,
  CommandTemplate,
  CommandType
} from '@src/types/commands';

const RESULTS_LIMIT = 15;
const MIN_INPUT_LENGTH = 1;

const searchFolderWithWords = (folder: SimpleBookmarkNode, words: string[]) => {
  const nonMatchingWordsIndex = words.findIndex(
    (word) => !folder.index.includes(word)
  );
  return nonMatchingWordsIndex < 0;
};

export default {
  type: CommandType.BOOKMARK_SAVE,
  keywords: ['save'],
  execute: () => Promise.resolve(false),
  generateSuggestions: async (inputText, options) => {
    const bookmarksPromise = fetchBookmarks();

    const inputQuery = options?.extractedInputWithoutKeyword || '';
    if (inputQuery.length < MIN_INPUT_LENGTH) return Promise.resolve([]);

    const { data: bookmarks } = await bookmarksPromise;
    if (!bookmarks || bookmarks.length == 0) return Promise.resolve([]);

    const inputWords = inputQuery.toLowerCase().split(' ');
    const folders = bookmarks.filter((folder) =>
      searchFolderWithWords(folder, inputWords)
    );

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
        description: `In ${formatedPath}`,
        iconKey: CommandIcon.BOOKMARK,
        hasDetails: true
      } as CommandSuggestion;
    });

    return data;
  }
} as CommandTemplate;
