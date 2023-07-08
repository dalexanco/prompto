import {
  CommandSuggestion,
  CommandTemplate,
  CommandType
} from '@src/types/commands';

export default {
  type: CommandType.HERO,
  keywords: [],
  keywordRequired: false,
  execute: async () => true,
  generateSuggestions: async (
    rawInput: string
  ): Promise<CommandSuggestion[]> => {
    if (rawInput.length > 0) return Promise.resolve([]);

    return Promise.resolve([
      {
        key: `hero`,
        type: CommandType.HERO,
        title: `Hi ! Welcome aboard !`,
        description: `You will love Prompto, let see how you can use it`
      } as CommandSuggestion
    ]);
  }
} as CommandTemplate;
