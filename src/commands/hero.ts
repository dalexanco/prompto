import {
  CommandIcon,
  CommandSuggestion,
  CommandTemplate,
  CommandType
} from '@src/types/commands';

export default {
  type: CommandType.HERO,
  keywords: [],
  keywordRequired: false,
  execute: async () => false,
  generateSuggestions: async (
    rawInput: string
  ): Promise<CommandSuggestion[]> => {
    if (rawInput.length > 0) return Promise.resolve([]);

    return Promise.resolve([
      {
        key: `hero`,
        type: CommandType.HERO,
        iconKey: CommandIcon.INFORMATION_CIRCLE,
        title: `Hi ! Welcome aboard !`,
        description: `You will love Prompto, just let see how you can use it.
        You can execute command on your browser to help you to stay organised and focus
        For example, try to type "group example" and press enter, it will create a tab-group with your current tab.

        See all existing commands using "help" and please share your feedbacks with the "feedback" command !`
      } as CommandSuggestion
    ]);
  }
} as CommandTemplate;
