import {
  CommandSuggestion,
  CommandTemplate,
  CommandType
} from '@src/types/commands';

const alphaCompare = (a: string | undefined, b: string | undefined) => {
  if (a === undefined) return -1;
  if (b === undefined) return 1;

  return a.localeCompare(b);
};

export default {
  type: CommandType.ALL_TABS_SORT,
  keywords: ['sort'],
  keywordRequired: true,
  execute: async () => {
    const currentWindowId = chrome.windows.WINDOW_ID_CURRENT;
    const pinnedTabs = await chrome.tabs.query({
      pinned: true,
      windowId: currentWindowId
    });
    // Push groups on top
    const pinnedIndexOffset = pinnedTabs.length;
    const allGroups = await chrome.tabGroups.query({
      windowId: currentWindowId
    });
    await allGroups
      .sort((a, b) => alphaCompare(a.title, b.title))
      .map(({ id }) => id)
      .reverse()
      .reduce(async (prev, groupId) => {
        await prev;
        await chrome.tabGroups.move(groupId, {
          index: pinnedIndexOffset
        });
        await chrome.tabGroups.update(groupId, {
          collapsed: true
        });
      }, Promise.resolve());
    // Sort other tabs
    const otherTabs = await chrome.tabs.query({
      pinned: false,
      groupId: chrome.tabGroups.TAB_GROUP_ID_NONE,
      windowId: currentWindowId
    });
    const groupsIndexOffset = otherTabs.reduce(
      (prev, { index }) => (prev < index ? prev : index),
      pinnedIndexOffset + otherTabs.length
    );
    await otherTabs
      .sort((a, b) => alphaCompare(a.url, b.url))
      .filter(({ id }) => id != undefined)
      .map(({ id }) => id as number)
      .reduce(
        (prev, tabId, indexInOthers) =>
          prev.then(
            () =>
              chrome.tabs.move(tabId, {
                index: indexInOthers + groupsIndexOffset
              }) as Promise<chrome.tabs.Tab | void>
          ),
        Promise.resolve() as Promise<chrome.tabs.Tab | void>
      );

    return { succeed: true };
  },
  generateSuggestions: async (
    inputText,
    options
  ): Promise<CommandSuggestion[]> => {
    if (!options?.extractedKeyword) return Promise.resolve([]);
    return Promise.resolve([
      {
        key: `all-tabs-sort`,
        type: CommandType.ALL_TABS_SORT,
        title: `Sort all your tabs`,
        description: 'Groups collapsed first and tabs sorted by url'
      } as CommandSuggestion
    ]);
  }
} as CommandTemplate;
