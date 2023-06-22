import {
  CommandSuggestion,
  CommandTemplate,
  CommandType,
} from "@src/types/commands";

const MIN_INPUT_LENGTH = 2;

interface CommandSuggestionGroupCreate extends CommandSuggestion {
  groupName?: string;
}

export default {
  type: CommandType.GROUP_CREATE,
  keywords: ["group"],
  keywordRequired: true,
  initialize: async (): Promise<void> => Promise.resolve(),
  execute: async (suggestion: CommandSuggestion) => {
    const command = suggestion as CommandSuggestionGroupCreate;
    const [currentTab] = await chrome.tabs.query({
      active: true,
      lastFocusedWindow: true,
    });
    if (!currentTab || !currentTab.id) return false;

    const groupId = await chrome.tabs.group({
      tabIds: [currentTab.id],
    });
    await chrome.tabGroups.update(groupId, { title: command.groupName });
    return true;
  },
  generateSuggestions: async (
    rawInput: string,
  ): Promise<CommandSuggestion[]> => {
    if (!rawInput || rawInput.length < MIN_INPUT_LENGTH)
      return Promise.resolve([]);

    const currentWindowId = chrome.windows.WINDOW_ID_CURRENT;
    const existingGroups = await chrome.tabGroups.query({
      windowId: currentWindowId,
      title: rawInput,
    });
    if (existingGroups.length > 0) return Promise.resolve([]);

    return Promise.resolve([
      {
        key: `group-in-new`,
        type: CommandType.GROUP_CREATE,
        title: `Group in ${rawInput}`,
        description: "Create a new group",
        groupName: rawInput,
      } as CommandSuggestionGroupCreate,
    ]);
  },
} as CommandTemplate;
