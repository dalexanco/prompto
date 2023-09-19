import { limit } from '@src/helpers/list';
import {
  CommandIcon,
  CommandSuggestion,
  CommandTemplate,
  CommandType
} from '@src/types/commands';

const RESULTS_LIMIT = 5;
const MIN_INPUT_LENGTH = 1;

export interface CommandSuggestionGroupCurrentTab extends CommandSuggestion {
  groupId: number;
  groupName: string;
}

function mapGroupToSuggestion(
  group: chrome.tabGroups.TabGroup
): CommandSuggestionGroupCurrentTab {
  return {
    groupId: group.id,
    groupName: group.title,
    key: `group-in-${group.id}`,
    type: CommandType.GROUP_CURRENT,
    title: `group in ${group.title || ''}`,
    description: 'Attach current tab to this group',
    iconKey: CommandIcon.SQUARE_PLUS
  } as CommandSuggestionGroupCurrentTab;
}

export default {
  type: CommandType.GROUP_CURRENT,
  keywords: ['group'],
  keywordRequired: true,
  execute: async (suggestion: CommandSuggestion) => {
    const command = suggestion as CommandSuggestionGroupCurrentTab;
    const windowId = chrome.windows.WINDOW_ID_CURRENT;
    const [currentTab] = await chrome.tabs.query({
      active: true,
      windowId
    });
    if (!currentTab || !currentTab.id) return { succeed: false };

    await chrome.tabs.group({
      groupId: command.groupId,
      tabIds: [currentTab.id]
    });
    return { succeed: true };
  },
  generateSuggestions: async (
    rawInput,
    options
  ): Promise<CommandSuggestion[]> => {
    if (!options?.extractedKeyword) return Promise.resolve([]);

    const inputQuery = options.extractedInputWithoutKeyword || '';
    const inputWords = inputQuery.toLowerCase().split(' ');
    const currentWindowId = chrome.windows.WINDOW_ID_CURRENT;
    const allGroups = await chrome.tabGroups.query({
      windowId: currentWindowId
    });

    if (!inputQuery || inputQuery.length < MIN_INPUT_LENGTH) {
      return allGroups
        .sort(({ title: titleA = '' }, { title: titleB = '' }) =>
          titleA.localeCompare(titleB)
        )
        .filter(limit(RESULTS_LIMIT))
        .map(mapGroupToSuggestion);
    }

    return allGroups
      .filter(({ title }) => {
        const nonMatchingWordsIndex = inputWords.findIndex(
          (word) => !title || !title.toLocaleLowerCase().includes(word)
        );
        return nonMatchingWordsIndex < 0;
      })
      .filter(limit(RESULTS_LIMIT))
      .map(mapGroupToSuggestion);
  }
} as CommandTemplate;
