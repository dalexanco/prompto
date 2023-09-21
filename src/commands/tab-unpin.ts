import {
  CommandIcon,
  CommandSuggestion,
  CommandTemplate,
  CommandType
} from '@src/types/commands';

interface CommandSuggestionTabUnpin extends CommandSuggestion {
  tabId: number;
}

export default {
  type: CommandType.TAB_UNPIN,
  keywords: ['unpin'],
  keywordRequired: true,
  execute: async (suggestion: CommandSuggestion) => {
    const { tabId } = suggestion as CommandSuggestionTabUnpin;
    await chrome.tabs.update(tabId, { pinned: false });
    return { succeed: true };
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
        key: `tab-unpin`,
        type: CommandType.TAB_UNPIN,
        title: `Unpin current tab`,
        tabId: currentTab.id,
        iconKey: CommandIcon.PINNED_OFF
      } as CommandSuggestionTabUnpin
    ]);
  }
} as CommandTemplate;
