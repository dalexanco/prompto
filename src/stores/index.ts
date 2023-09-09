import { create } from 'zustand';

import { InputValueSlice, createInputValueSlice } from './slice-input-value';
import {
  InputPlaceholderSlice,
  createInputPlaceholderSlice
} from './slice-input-placeholder';
import { SuggestionsSlice, createSuggestionsSlice } from './slice-suggestions';
import {
  FocusedIndexSlice,
  createFocusedIndexSlice
} from './slice-focus-index';
import { CacheSlice, createCacheSlice } from './slice-cache';
import { CommandSuggestion } from '@src/types/commands';

function sliceSelectorFactory<T>() {
  return (state: T) => state as T;
}

export const useAppStore = create<
  InputValueSlice &
    InputPlaceholderSlice &
    SuggestionsSlice &
    FocusedIndexSlice &
    CacheSlice
>((...a) => ({
  ...createInputValueSlice(...a),
  ...createInputPlaceholderSlice(...a),
  ...createSuggestionsSlice(...a),
  ...createFocusedIndexSlice(...a),
  ...createCacheSlice(...a)
}));

export const useInputValueStore = (): InputValueSlice =>
  useAppStore(sliceSelectorFactory());

export const useSuggestionsStore = (): SuggestionsSlice =>
  useAppStore(sliceSelectorFactory());

export const useFocusedIndexStore = (): FocusedIndexSlice =>
  useAppStore(sliceSelectorFactory());

export const useInputPlaceholderStore = (): InputPlaceholderSlice =>
  useAppStore(sliceSelectorFactory());

// Custom cross slice hooks
export const useFocusedSuggestionStore = (): CommandSuggestion | undefined => {
  const { focusedIndex, suggestions } = useAppStore();
  return focusedIndex <= suggestions.length
    ? suggestions[focusedIndex]
    : undefined;
};
