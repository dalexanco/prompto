import {
  CommandSuggestion,
  CommandTemplate,
  CommandType
} from '@src/types/commands';

const alphaCompare = (a: string | undefined, b: string | undefined) => {
  if (a === undefined) return -1;
  if (b === undefined) return 1;

  return a.localeCompare(b);
};

export default {
  type: CommandType.ALL_TABS_SORT,
  keywords: ['sort'],
  keywordRequired: true,
  execute: async () => {
    const allGroups = await chrome.tabGroups.query({});
    await allGroups
      .sort((a, b) => alphaCompare(a.title, b.title))
      .map(({ id }) => id)
      .reverse()
      .reduce(
        (prev, groupId) =>
          prev.then(
            () =>
              chrome.tabGroups.move(groupId, {
                index: 0
              }) as Promise<chrome.tabGroups.TabGroup | void>
          ),
        Promise.resolve() as Promise<chrome.tabGroups.TabGroup | void>
      );

    return { succeed: true };
  },
  generateSuggestions: async (
    inputText,
    options
  ): Promise<CommandSuggestion[]> => {
    if (!options?.extractedKeyword) return Promise.resolve([]);
    return Promise.resolve([
      {
        key: `all-tabs-sort`,
        type: CommandType.ALL_TABS_SORT,
        title: `Sort all your tabs`
      } as CommandSuggestion
    ]);
  }
} as CommandTemplate;
