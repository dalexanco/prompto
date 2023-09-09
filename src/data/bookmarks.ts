import flatten from 'lodash/flatten';
import { useAppStore } from '@src/stores';
import { CacheKeys } from '.';

export interface SimpleBookmarkNode {
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

export const fetchBookmarks = () => {
  const { cacheFetch } = useAppStore.getState();

  return cacheFetch(
    CacheKeys.BROWSER_BOOKMARKS,
    async () => {
      const [rootNode] = await chrome.bookmarks.getTree();
      return digBookmarks(rootNode);
    },
    {
      timeToStale: 60 * 1000
    }
  );
};
