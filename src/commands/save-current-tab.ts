import { limit } from '@src/helpers/list';
import {
  CommandIcon,
  CommandSuggestion,
  CommandTemplate,
  CommandType
} from '@src/types/commands';
import { flatten } from 'lodash';

const RESULTS_LIMIT = 15;
const MIN_INPUT_LENGTH = 2;

interface SimpleBookmarkNode {
  id: string;
  path: string[];
  index: string;
}

function digBookmarks(
  node: chrome.bookmarks.BookmarkTreeNode,
  parentPath: string[] = []
): SimpleBookmarkNode[] {
  const currentPath = node.title ? [...parentPath, node.title] : parentPath;
  const currentIndex = currentPath.join('/').toLocaleLowerCase();
  const currentSimpleNode = {
    id: node.id,
    path: currentPath,
    index: currentIndex
  } as SimpleBookmarkNode;

  if (!node.children) return [];

  const subFolders = node.children.filter((node) => !node.url);
  if (subFolders.length == 0) {
    return [currentSimpleNode];
  }

  return flatten(node.children.map((node) => digBookmarks(node, currentPath)));
}

let bookmarksFolderCache = [] as SimpleBookmarkNode[];

export default {
  type: CommandType.BOOKMARK_SAVE,
  keywords: ['save'],
  keywordRequired: true,
  initialize: async (): Promise<void> => {
    const [rootNode] = await chrome.bookmarks.getTree();

    bookmarksFolderCache = digBookmarks(rootNode);
  },
  execute: () => Promise.resolve(false),
  generateSuggestions: async (
    rawInput: string
  ): Promise<CommandSuggestion[]> => {
    if (!rawInput || rawInput.length < MIN_INPUT_LENGTH)
      return Promise.resolve([]);

    const inputWords = rawInput.toLowerCase().split(' ');

    const folders = bookmarksFolderCache.filter((folder) => {
      const nonMatchingWordsIndex = inputWords.findIndex(
        (word) => !folder.index.includes(word)
      );
      return nonMatchingWordsIndex < 0;
    });

    return Promise.resolve(
      folders.filter(limit(RESULTS_LIMIT)).map((folder) => {
        const formatedFolder = folder.path[folder.path.length - 1];
        const formatedPath = folder.path
          .slice(0, folder.path.length - 2)
          .join('/');
        return {
          id: folder.id,
          key: `save-on-${folder.id}`,
          type: CommandType.BOOKMARK_SAVE,
          title: `Save in ${formatedFolder}`,
          url: 'Attach current tab in this folder',
          description: `In folder ${formatedPath}`,
          iconKey: CommandIcon.BOOKMARK,
          detailsPath: '/details/save'
        } as CommandSuggestion;
      })
    );
  }
} as CommandTemplate;
