import {
  CommandIcon,
  CommandSuggestion,
  CommandTemplate,
  CommandType
} from '@src/types/commands';

type CommandSuggestionFocusTab = CommandSuggestion & {
  tabId: number | undefined;
};

let cacheTabs: chrome.tabs.Tab[] = [];

function searchInTabs(tabs: chrome.tabs.Tab[], rawSearchWord: string) {
  const searchWord = rawSearchWord.toLocaleLowerCase();
  return cacheTabs.filter((tab) => {
    const matchInTitle = tab.title?.toLocaleLowerCase().includes(searchWord);
    const matchInUrl = tab.url?.toLocaleLowerCase().includes(searchWord);

    return matchInTitle || matchInUrl;
  });
}

export default {
  type: CommandType.FOCUS_TAB,
  keywords: ['focus'],
  keywordRequired: true,
  initialize: async (): Promise<void> => {
    const currentWindowId = chrome.windows.WINDOW_ID_CURRENT;
    cacheTabs = await chrome.tabs.query({ windowId: currentWindowId });
  },
  execute: async (suggestion: CommandSuggestion) => {
    const command = suggestion as CommandSuggestionFocusTab;
    if (!command.tabId) return false;

    await chrome.tabs.update(command.tabId, { active: true });
    return true;
  },
  generateSuggestions: async (
    rawInput: string
  ): Promise<CommandSuggestion[]> => {
    const matchingTabs = searchInTabs(cacheTabs, rawInput).filter(
      (tab) => !tab.active
    );

    return Promise.resolve(
      matchingTabs.map(
        (tab) =>
          ({
            key: `focus-tab-${tab.id}`,
            type: CommandType.FOCUS_TAB,
            title: `focus ${tab.title}`,
            description: tab.url,
            iconKey: CommandIcon.EYE,
            tabId: tab.id
          } as CommandSuggestionFocusTab)
      )
    );
  }
} as CommandTemplate;
