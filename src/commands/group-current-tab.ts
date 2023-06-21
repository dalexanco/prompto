import { limit } from "@src/helpers/list";
import {
  CommandSuggestion,
  CommandTemplate,
  CommandType,
} from "@src/types/commands";

const RESULTS_LIMIT = 4;
const MIN_INPUT_LENGTH = 1;

interface CommandSuggestionGroupCurrentTab extends CommandSuggestion {
  groupId: number;
  groupName: string;
}

export default {
  type: CommandType.GROUP_CURRENT,
  keywords: ["group"],
  keywordRequired: true,
  initialize: async (): Promise<void> => Promise.resolve(),
  execute: async (suggestion: CommandSuggestion) => {
    const command = suggestion as CommandSuggestionGroupCurrentTab;
    const [currentTab] = await chrome.tabs.query({
      active: true,
      lastFocusedWindow: true,
    });
    if (!currentTab || !currentTab.id) return false;

    await chrome.tabs.group({
      groupId: command.groupId,
      tabIds: [currentTab.id],
    });
    return true;
  },
  generateSuggestions: async (
    rawInput: string,
  ): Promise<CommandSuggestion[]> => {
    if (!rawInput || rawInput.length < MIN_INPUT_LENGTH)
      return Promise.resolve([]);

    const inputWords = rawInput.toLowerCase().split(" ");
    const currentWindowId = chrome.windows.WINDOW_ID_CURRENT;
    const allGroups = await chrome.tabGroups.query({
      windowId: currentWindowId,
    });
    const groups = allGroups
      .filter(({ title }) => {
        const nonMatchingWordsIndex = inputWords.findIndex(
          (word) => !title || !title.toLocaleLowerCase().includes(word),
        );
        return nonMatchingWordsIndex < 0;
      })
      .filter(limit(RESULTS_LIMIT))
      .map(
        (group) =>
          ({
            groupId: group.id,
            groupName: group.title,
            key: `group-in-${group.id}`,
            type: CommandType.GROUP_CURRENT,
            title: `Group in ${group.title || ""}`,
          } as CommandSuggestionGroupCurrentTab),
      );

    return Promise.resolve(groups);
  },
} as CommandTemplate;
