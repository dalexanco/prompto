import {
  CommandIcon,
  CommandSuggestion,
  CommandTemplate,
  CommandType
} from '@src/types/commands';

interface CommandSuggestionTabDuplicate extends CommandSuggestion {
  tabId: number;
}

export default {
  type: CommandType.TAB_DUPLICATE,
  keywords: ['duplicate'],
  keywordRequired: true,
  execute: async (suggestion: CommandSuggestion) => {
    const { tabId } = suggestion as CommandSuggestionTabDuplicate;
    const activeTab = await chrome.tabs.get(tabId);
    await chrome.tabs.create({
      url: activeTab.url,
      pinned: activeTab.pinned,
      index: activeTab.index + 1,
      active: false
    });

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
    if (!currentTab || !currentTab.id) return Promise.resolve([]);

    return Promise.resolve([
      {
        key: `tab-duplicate`,
        type: CommandType.TAB_DUPLICATE,
        title: `Duplicate current tab`,
        tabId: currentTab.id,
        iconKey: CommandIcon.RECTANGLE_STACK
      } as CommandSuggestionTabDuplicate
    ]);
  }
} as CommandTemplate;
