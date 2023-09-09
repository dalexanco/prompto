import { useCallback } from 'react';

import { useAppStore, useInputPlaceholderStore } from '@src/stores';
import { useEffectOnce } from 'react-use';

export default function usePromptActions() {
  const { placeholderValue, placeholderSetFromInput } =
    useInputPlaceholderStore();
  const setInputValue = useAppStore((state) => state.inputValueSet);
  const focusedIndexSet = useAppStore((state) => state.focusedIndexSet);
  const suggestionsFetch = useAppStore((state) => state.suggestionsFetch);
  const inputValue = useAppStore((state) => state.inputValue);
  useEffectOnce(() => {
    suggestionsFetch(inputValue);
  });

  const updateInputValue = useCallback(
    (value: string) => {
      focusedIndexSet(0);
      setInputValue(value);
      suggestionsFetch(value);
      placeholderSetFromInput(value);
    },
    [focusedIndexSet, setInputValue, suggestionsFetch, placeholderSetFromInput]
  );

  const acceptPlaceholder = useCallback(() => {
    if (!placeholderValue || placeholderValue.length == 0) return;
    updateInputValue(placeholderValue + ' ');
  }, [placeholderValue, updateInputValue]);

  return {
    updateInputValue,
    acceptPlaceholder
  };
}
