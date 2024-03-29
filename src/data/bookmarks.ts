import flatten from 'lodash/flatten';
import { useAppStore } from '@src/stores';
import { CacheKeys } from '.';

export enum SpecialBookmarkFolder {
  BAR,
  OTHERS,
  MOBILE,
  NONE
}

export interface SimpleBookmarkNode {
  id: string;
  path: string[];
  index: string;
  isRoot: boolean;
  specialFolder: SpecialBookmarkFolder;
}

interface DiggingMetas {
  depth: number;
  layerIndex: number;
  parentPath: string[];
}

function formatTitle(
  node: chrome.bookmarks.BookmarkTreeNode,
  metas: DiggingMetas
) {
  if (!node.title) return '';
  if (metas.depth > 1) return node.title;

  switch (metas.layerIndex) {
    case 0:
      return 'My bar';
    case 1:
      return 'Others';
    case 2:
      return 'Mobile';
    default:
      return node.title;
  }
}

function getSpecialFolder(metas: DiggingMetas) {
  if (metas.depth > 1) return SpecialBookmarkFolder.NONE;

  switch (metas.layerIndex) {
    case 0:
      return SpecialBookmarkFolder.BAR;
    case 1:
      return SpecialBookmarkFolder.OTHERS;
    case 2:
      return SpecialBookmarkFolder.MOBILE;
    default:
      return SpecialBookmarkFolder.NONE;
  }
}

function digBookmarks(
  node: chrome.bookmarks.BookmarkTreeNode,
  metas: DiggingMetas = {
    depth: 0,
    parentPath: [],
    layerIndex: 0
  }
): SimpleBookmarkNode[] {
  const title = formatTitle(node, metas);
  const currentPath = node.title
    ? [...metas.parentPath, title]
    : metas.parentPath;
  const currentIndex = currentPath.join('/').toLocaleLowerCase();
  const currentSimpleNode = {
    id: node.id,
    path: currentPath,
    index: currentIndex,
    isRoot: metas.depth <= 1,
    specialFolder: getSpecialFolder(metas)
  } as SimpleBookmarkNode;

  if (!node.children) return [];

  const subFolders = node.children.filter((node) => !node.url);
  if (subFolders.length == 0) {
    return [currentSimpleNode];
  }

  return [
    ...(title ? [currentSimpleNode] : []),
    ...flatten(
      node.children.map((node, index) => {
        const childMetas: DiggingMetas = {
          depth: metas.depth + 1,
          layerIndex: index,
          parentPath: currentPath
        };
        return digBookmarks(node, childMetas);
      })
    )
  ];
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
