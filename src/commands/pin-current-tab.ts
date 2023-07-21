import {
  CommandIcon,
  CommandSuggestion,
  CommandTemplate,
  CommandType
} from '@src/types/commands';

interface CommandSuggestionPinCurrentTab extends CommandSuggestion {
  tabId: number;
}

export default {
  type: CommandType.PIN_CURRENT_TAB,
  keywords: ['pin'],
  keywordRequired: true,
  execute: async (suggestion: CommandSuggestion) => {
    const { tabId } = suggestion as CommandSuggestionPinCurrentTab;
    await chrome.tabs.update(tabId, { pinned: true });
    return true;
  },
  generateSuggestions: async (): Promise<CommandSuggestion[]> => {
    const [currentTab] = await chrome.tabs.query({
      active: true,
      lastFocusedWindow: true
    });
    if (!currentTab || !currentTab.id || currentTab.pinned)
      return Promise.resolve([]);

    return Promise.resolve([
      {
        key: `pin-current-tab`,
        type: CommandType.PIN_CURRENT_TAB,
        title: `Pin current tab`,
        tabId: currentTab.id
      } as CommandSuggestionPinCurrentTab
    ]);
  }
} as CommandTemplate;
