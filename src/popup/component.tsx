import React, { FormEvent, useCallback, useState } from 'react';
import { useKeyPressEvent } from 'react-use';
import browser from 'webextension-polyfill';

import { PromptInput } from '../components/PromptInput';
import { Suggestion } from '../components/Suggestion';
import ChevronDownIcon from '../icons/chevron-down';
import ChevronUpIcon from '../icons/chevron-up';
import css from './styles.module.css';
import useExecute, { usePlaceholder, useSuggestions } from '@src/commands';
import useFocusLoop from '@src/hooks/useFocusLoop';
import useScrollToIndex from '@src/hooks/useScrollToIndex';
import {
  ExtensionRuntimeRequest,
  ExtensionRuntimeRequestType
} from '@src/types/extension';
import logger from '@src/logger';
import PromptoIcon from '@src/icons/prompto';

export function Popup(): JSX.Element {
  React.useEffect(() => {
    browser.runtime.sendMessage({
      type: ExtensionRuntimeRequestType.POPUP_MOUNTED
    } as ExtensionRuntimeRequest);
    logger.info('Popup connected');
  }, []);

  const [inputValue, updateInput] = useState('');
  const { suggestions } = useSuggestions(inputValue);
  const placeholderValue = usePlaceholder(inputValue, updateInput);

  // Manage focus suggestion
  const [suggestionListRef, scrollToIndex] =
    useScrollToIndex<HTMLUListElement>();
  const { focusedIndex, setFocus, moveFocus } = useFocusLoop({
    itemCount: suggestions.length,
    onFocusChange: scrollToIndex
  });
  useKeyPressEvent('ArrowUp', () => moveFocus(-1));
  useKeyPressEvent('ArrowDown', () => moveFocus(1));
  const focusedSuggestion = suggestions[focusedIndex];

  // Prompt changes
  const onInputChange = useCallback(
    (value: string) => {
      setFocus(0);
      updateInput(value);
    },
    [updateInput, setFocus]
  );

  // Form validation
  const execute = useExecute();
  const executeFocusSuggestion = useCallback(() => {
    (async function () {
      try {
        if (!focusedSuggestion) return;
        const commandSuccess = await execute(focusedSuggestion);
        if (commandSuccess) {
          window.close();
        }
      } catch (error) {
        console.error(error);
      }
    })();
  }, [execute, focusedSuggestion]);
  const onClickSuggestion = (index: number) => {
    setFocus(index);
    executeFocusSuggestion();
  };
  const onSubmit = (event: FormEvent) => {
    event.preventDefault();
    executeFocusSuggestion();
  };

  return (
    <div className={css.popupContainer}>
      <form onSubmit={onSubmit} className="border-b border-b-gray-200">
        <PromptInput
          placeholder={placeholderValue}
          value={inputValue}
          onChange={onInputChange}
        />
      </form>
      <ul
        ref={suggestionListRef}
        className="mt-2 flex grow flex-col items-stretch overflow-y-scroll"
      >
        {suggestions.map((suggestion, index) => (
          <Suggestion
            onClick={() => onClickSuggestion(index)}
            onMouseEnter={() => setFocus(index)}
            suggestion={suggestion}
            key={suggestion.key}
            hasFocus={suggestion.key === focusedSuggestion?.key}
          />
        ))}
      </ul>
      <footer className="flex border-t border-t-gray-100 bg-gray-50 px-4 py-2">
        <span className="grow text-xs font-medium text-primary-800">
          <PromptoIcon className="inline-block h-3 w-3 fill-current align-text-bottom text-primary-600" />{' '}
          Prompto
        </span>
        <p className="justify-self-end text-xs italic text-gray-500">
          Use{' '}
          <span className=" inline-flex rounded-sm bg-gray-200 p-1">
            <ChevronUpIcon className="inline-flex h-2 w-2" />
          </span>{' '}
          <span className=" inline-flex rounded-sm bg-gray-200 p-1">
            <ChevronDownIcon className="inline-flex h-2 w-2" />
          </span>{' '}
          to navigate
        </p>
      </footer>
    </div>
  );
}
