import {
  CommandIcon,
  CommandSuggestion,
  CommandTemplate,
  CommandType
} from '@src/types/commands';

interface CommandSuggestionUnpinCurrentTab extends CommandSuggestion {
  tabId: number;
}

export default {
  type: CommandType.UNPIN_CURRENT_TAB,
  keywords: ['unpin'],
  keywordRequired: true,
  execute: async (suggestion: CommandSuggestion) => {
    const { tabId } = suggestion as CommandSuggestionUnpinCurrentTab;
    await chrome.tabs.update(tabId, { pinned: false });
    return true;
  },
  generateSuggestions: async (
    inputText,
    options
  ): Promise<CommandSuggestion[]> => {
    if (!options?.extractedKeyword) return Promise.resolve([]);

    const [currentTab] = await chrome.tabs.query({
      active: true,
      lastFocusedWindow: true
    });
    if (!currentTab || !currentTab.id || !currentTab.pinned)
      return Promise.resolve([]);

    return Promise.resolve([
      {
        key: `unpin-current-tab`,
        type: CommandType.UNPIN_CURRENT_TAB,
        title: `Unpin current tab`,
        tabId: currentTab.id,
        iconKey: CommandIcon.PINNED_OFF
      } as CommandSuggestionUnpinCurrentTab
    ]);
  }
} as CommandTemplate;
