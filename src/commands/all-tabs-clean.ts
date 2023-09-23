import {
  CommandSuggestion,
  CommandTemplate,
  CommandType
} from '@src/types/commands';

const isTabEmpty = ({ url }: chrome.tabs.Tab) =>
  url && new URL(url).host !== 'newtab';

export default {
  type: CommandType.ALL_TABS_CLEAN,
  keywords: ['clean'],
  keywordRequired: true,
  execute: async () => {
    const currentWindowId = chrome.windows.WINDOW_ID_CURRENT;
    const [currentTab] = await chrome.tabs.query({
      active: true,
      windowId: currentWindowId
    });
    const tabs = await chrome.tabs.query({
      windowId: currentWindowId,
      groupId: chrome.tabGroups.TAB_GROUP_ID_NONE
    });
    const orphanTabIds = tabs
      .filter((tab) => tab.id != undefined && !tab.active)
      .map((tab) => tab.id) as [number];

    const groups = await chrome.tabGroups.query({ windowId: currentWindowId });
    console.log('Will collapse %d groups...', groups.length);
    await Promise.all(
      groups.map(({ id: groupId }) =>
        chrome.tabGroups.update(groupId, { collapsed: true })
      )
    );

    console.log('Will close %d tabs...', orphanTabIds.length);
    await chrome.tabs.remove(orphanTabIds);

    console.log('Replace active tab by a new one...', orphanTabIds.length);
    const removeActivePromise = currentTab?.id
      ? chrome.tabs.remove(currentTab.id)
      : Promise.resolve();
    await Promise.all([
      chrome.tabs.create({
        windowId: currentWindowId,
        active: true
      }),
      removeActivePromise
    ]);

    return { succeed: true };
  },
  generateSuggestions: async (
    inputText,
    options
  ): Promise<CommandSuggestion[]> => {
    if (!options?.extractedKeyword) return Promise.resolve([]);

    return Promise.resolve([
      {
        key: `all-tabs-clean`,
        type: CommandType.ALL_TABS_CLEAN,
        title: `Clean current session`,
        description: 'Close all tabs except ones attached in a group'
      } as CommandSuggestion
    ]);
  }
} as CommandTemplate;
