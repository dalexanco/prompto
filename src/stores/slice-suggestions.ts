import { StateCreator } from 'zustand';
import { produce } from 'immer';
import flatten from 'lodash/flatten';

import {
  CommandSuggestion,
  SuggestionsFactoryOptions
} from '@src/types/commands';
import { DEFAULT_COMMANDS } from '@src/commands';
import { FocusedIndexSlice } from './slice-focus-index';

export interface SuggestionsSlice {
  suggestionsIsLoading: boolean;
  suggestions: CommandSuggestion[];
  suggestionsSet: (suggestions: CommandSuggestion[]) => void;
  suggestionFocus: (index: number) => void;
  suggestionsFetch: (inputText: string) => Promise<CommandSuggestion[]>;
}

function extractOptions(
  input: string,
  keywords: string[]
): SuggestionsFactoryOptions {
  const extractedKeyword = keywords.find((keyword) =>
    input.startsWith(keyword)
  );

  if (!extractedKeyword) return {};

  const extractedInputWithoutKeyword = input
    .substring(extractedKeyword.length)
    .trim();

  return {
    extractedKeyword,
    extractedInputWithoutKeyword
  };
}

export const createSuggestionsSlice: StateCreator<
  SuggestionsSlice & FocusedIndexSlice,
  [],
  [],
  SuggestionsSlice
> = (set, get) => ({
  suggestionsIsLoading: false,
  suggestions: [],
  suggestionsSet: (suggestions: CommandSuggestion[]) => set({ suggestions }),
  suggestionFocus: (focusedIndex) => {
    const suggestions = produce(get().suggestions, (draft) => {
      draft.forEach((item, index) => (item.focused = index == focusedIndex));
    });
    set({ suggestions });
  },
  suggestionsFetch: async (inputText: string) => {
    set({ suggestionsIsLoading: true });
    const results = await Promise.all(
      DEFAULT_COMMANDS.map(({ keywords, generateSuggestions }) => {
        const options = extractOptions(inputText, keywords);
        return generateSuggestions(inputText, options);
      })
    ).then(flatten);
    set({ suggestions: results, suggestionsIsLoading: false });
    return results;
  }
});
