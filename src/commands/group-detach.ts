import {
  CommandIcon,
  CommandSuggestion,
  CommandTemplate,
  CommandType
} from '@src/types/commands';

interface CommandSuggestionGroupDetach extends CommandSuggestion {
  tabId: number;
}

export default {
  type: CommandType.GROUP_DETACH,
  keywords: ['ungroup'],
  keywordRequired: true,
  execute: async (suggestion: CommandSuggestion) => {
    const { tabId } = suggestion as CommandSuggestionGroupDetach;
    await chrome.tabs.ungroup(tabId);
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
    if (!currentTab || !currentTab.id || currentTab.groupId < 0)
      return Promise.resolve([]);

    const group = await chrome.tabGroups.get(currentTab.groupId);
    if (!group) return Promise.resolve([]);

    return Promise.resolve([
      {
        key: `group-detach`,
        type: CommandType.GROUP_DETACH,
        iconKey: CommandIcon.SQUARE_X,
        title: `Ungroup current tab`,
        description: `Remove current tab from '${group.title}'`,
        tabId: currentTab.id
      } as CommandSuggestionGroupDetach
    ]);
  }
} as CommandTemplate;
