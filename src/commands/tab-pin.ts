import {
  CommandIcon,
  CommandSuggestion,
  CommandTemplate,
  CommandType
} from '@src/types/commands';

interface CommandSuggestionTabPin extends CommandSuggestion {
  tabId: number;
}

export default {
  type: CommandType.TAB_PIN,
  keywords: ['pin'],
  keywordRequired: true,
  execute: async (suggestion: CommandSuggestion) => {
    const { tabId } = suggestion as CommandSuggestionTabPin;
    await chrome.tabs.update(tabId, { pinned: true });
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
    if (!currentTab || !currentTab.id || currentTab.pinned)
      return Promise.resolve([]);

    return Promise.resolve([
      {
        key: `tab-pin`,
        type: CommandType.TAB_PIN,
        title: `Pin current tab`,
        tabId: currentTab.id,
        iconKey: CommandIcon.PINNED
      } as CommandSuggestionTabPin
    ]);
  }
} as CommandTemplate;
