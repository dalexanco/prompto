import {
  CommandIcon,
  CommandSuggestion,
  CommandTemplate,
  CommandType
} from '@src/types/commands';

const isTabEmpty = ({ url }: chrome.tabs.Tab) =>
  url && new URL(url).host !== 'newtab';

export default {
  type: CommandType.CLEAN,
  keywords: ['clean'],
  keywordRequired: true,
  execute: async () => {
    const currentWindowId = chrome.windows.WINDOW_ID_CURRENT;
    const tabs = await chrome.tabs.query({ windowId: currentWindowId });
    const orphanTabIds = tabs
      .filter((tab) => tab.groupId < 0 && tab.id != undefined)
      .filter((tab) => isTabEmpty(tab) && !tab.active)
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

    console.log('Create a new active tab...', orphanTabIds.length);
    await chrome.tabs.create({
      windowId: currentWindowId,
      active: true
    });

    return true;
  },
  generateSuggestions: async (): Promise<CommandSuggestion[]> => {
    return Promise.resolve([
      {
        key: `clean-tabs`,
        type: CommandType.CLEAN,
        title: `Clean current session`,
        description: 'Close all tabs except ones attached in a group'
      } as CommandSuggestion
    ]);
  }
} as CommandTemplate;
