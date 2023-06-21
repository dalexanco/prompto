import {
  CommandSuggestion,
  CommandTemplate,
  CommandType,
} from "@src/types/commands";

interface CommandSuggestionUngroupCurrentTab extends CommandSuggestion {
  tabId: number;
}

export default {
  type: CommandType.UNGROUP_CURRENT,
  keywords: ["ungroup"],
  keywordRequired: true,
  execute: async (suggestion: CommandSuggestion) => {
    const { tabId } = suggestion as CommandSuggestionUngroupCurrentTab;
    await chrome.tabs.ungroup(tabId);
    return true;
  },
  generateSuggestions: async (): Promise<CommandSuggestion[]> => {
    const [currentTab] = await chrome.tabs.query({
      active: true,
      lastFocusedWindow: true,
    });
    if (!currentTab || !currentTab.id || !currentTab.groupId)
      return Promise.resolve([]);

    return Promise.resolve([
      {
        key: `ungroup-current-tab`,
        type: CommandType.UNGROUP_CURRENT,
        title: `Ungroup current tab`,
        tabId: currentTab.id,
      } as CommandSuggestionUngroupCurrentTab,
    ]);
  },
} as CommandTemplate;
