import { limit } from '@src/helpers/list';
import {
  CommandIcon,
  CommandSuggestion,
  CommandTemplate,
  CommandType
} from '@src/types/commands';
import { flatten } from 'lodash';

const RESULTS_LIMIT = 5;
const MIN_INPUT_LENGTH = 2;

export enum BookmarkFolderSuggestionType {
  FOLDER,
  ROOT_BAR,
  ROOT_MOB,
  ROOT_OTHERS
}

export interface BookmarkFolderSuggestion {
  id: string;
  type: BookmarkFolderSuggestionType;
  title: string;
}

interface SimpleBookmarkNode {
  bookmarkFolderId: string;
  bookmarkFolderPath: BookmarkFolderSuggestion[];
  bookmarkIndex: string;
}

export type SaveCurrentTabSuggestion = CommandSuggestion & SimpleBookmarkNode;

const SYSTEM_FOLDER_TYPES = {
  ['1']: BookmarkFolderSuggestionType.ROOT_BAR,
  ['2']: BookmarkFolderSuggestionType.ROOT_OTHERS,
  ['3']: BookmarkFolderSuggestionType.ROOT_MOB
} as {
  [key: string]: BookmarkFolderSuggestionType;
};

function mapNodeToBookmarkFolder({
  id,
  title
}: chrome.bookmarks.BookmarkTreeNode): BookmarkFolderSuggestion {
  return {
    id,
    type: SYSTEM_FOLDER_TYPES[id] || BookmarkFolderSuggestionType.FOLDER,
    title
  } as BookmarkFolderSuggestion;
}

function digBookmarks(
  node: chrome.bookmarks.BookmarkTreeNode,
  parentPath: BookmarkFolderSuggestion[] = []
): SimpleBookmarkNode[] {
  const currentPath = node.title
    ? [...parentPath, mapNodeToBookmarkFolder(node)]
    : parentPath;
  const currentSimpleNode = {
    bookmarkFolderId: node.id,
    bookmarkFolderPath: currentPath,
    bookmarkIndex: currentPath
      .map(({ title }) => title.toLocaleLowerCase())
      .join('/')
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
        (word) => !folder.bookmarkIndex.includes(word)
      );
      return nonMatchingWordsIndex < 0;
    });

    return Promise.resolve(
      folders.filter(limit(RESULTS_LIMIT)).map(
        (folder) =>
          ({
            id: folder.bookmarkFolderId,
            key: `save-on-${folder.bookmarkFolderId}`,
            type: CommandType.BOOKMARK_SAVE,
            title: `Save in ${folder.bookmarkIndex}`,
            url: 'Attach current tab in this folder',
            iconKey: CommandIcon.BOOKMARK,
            ...folder
          } as SaveCurrentTabSuggestion)
      )
    );
  }
} as CommandTemplate;
