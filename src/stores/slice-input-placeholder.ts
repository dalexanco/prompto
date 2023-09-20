import flatten from 'lodash/flatten';
import { StateCreator } from 'zustand';

import { COMMANDS_REGISTRY } from '@src/commands';

export interface InputPlaceholderSlice {
  placeholderValue: string;
  placeholderSet: (value: string) => void;
  placeholderSetFromInput: (inputText: string) => void;
}

const EMPTY_PLACEHOLDER = '';

export const createInputPlaceholderSlice: StateCreator<
  InputPlaceholderSlice,
  [],
  [],
  InputPlaceholderSlice
> = (set) => {
  return {
    placeholderValue: '',
    placeholderSet: (placeholderValue: string) => set({ placeholderValue }),
    placeholderSetFromInput: (inputText: string) => {
      if (!inputText) return set({ placeholderValue: EMPTY_PLACEHOLDER });

      const KEYWORDS = flatten(
        COMMANDS_REGISTRY.map(({ keywords }) =>
          keywords.map((keyword) => keyword.toLowerCase())
        )
      );
      const inputValue = inputText.toLowerCase();
      const firstMatching = KEYWORDS.find((keyword) =>
        keyword.startsWith(inputValue)
      );
      set({ placeholderValue: firstMatching || EMPTY_PLACEHOLDER });
    }
  };
};
