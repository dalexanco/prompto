import {
  CommandIcon,
  CommandSuggestion,
  CommandTemplate,
  CommandType
} from '@src/types/commands';

export interface CommandSuggestionGroupCreate extends CommandSuggestion {
  groupName?: string;
}

export default {
  type: CommandType.GROUP_CREATE,
  keywords: ['group'],
  keywordRequired: true,
  execute: async (suggestion: CommandSuggestion) => {
    const command = suggestion as CommandSuggestionGroupCreate;
    const windowId = chrome.windows.WINDOW_ID_CURRENT;
    const [currentTab] = await chrome.tabs.query({
      active: true,
      windowId
    });
    if (!currentTab || !currentTab.id) return false;

    const groupId = await chrome.tabs.group({
      tabIds: [currentTab.id]
    });
    await chrome.tabGroups.update(groupId, { title: command.groupName });
    return true;
  },
  generateSuggestions: async (
    rawInput,
    options
  ): Promise<CommandSuggestion[]> => {
    if (!options?.extractedKeyword || !options.extractedInputWithoutKeyword)
      return Promise.resolve([]);

    const inputQuery = options.extractedInputWithoutKeyword;
    const windowId = chrome.windows.WINDOW_ID_CURRENT;
    const existingGroups = await chrome.tabGroups.query({
      windowId,
      title: inputQuery
    });
    if (existingGroups.length > 0) return Promise.resolve([]);

    return Promise.resolve([
      {
        key: `group-in-new`,
        type: CommandType.GROUP_CREATE,
        title: `group in ${inputQuery}`,
        description: 'Create a new group containing current tab',
        groupName: inputQuery,
        iconKey: CommandIcon.SQUARE_HELP
      } as CommandSuggestionGroupCreate
    ]);
  }
} as CommandTemplate;
