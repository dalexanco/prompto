import React, { FormEvent, useCallback, useState } from 'react';
import { useKeyPressEvent } from 'react-use';
import browser from 'webextension-polyfill';

import { PromptInput } from '../components/PromptInput';
import { Suggestion } from '../components/Suggestion';
import css from './styles.module.css';
import useExecute, { usePlaceholder, useSuggestions } from '@src/commands';
import useFocusLoop from '@src/hooks/useFocusLoop';
import useScrollToIndex from '@src/hooks/useScrollToIndex';
import {
  ExtensionRuntimeRequest,
  ExtensionRuntimeRequestType
} from '@src/types/extension';
import logger from '@src/logger';
import Footer from '@src/components/Footer';

function Hero({ inputValue }: { inputValue: string }) {
  if (inputValue && inputValue.length > 0) return;

  return (
    <div className="mx-3 mt-3 rounded-xl bg-secondary-container px-5 py-4 text-on-secondary-container">
      <p className="text-xs font-bold uppercase leading-5">Welcome aboard !</p>
      <p className="text-sm opacity-80">
        The best way to learn is to play with it, so try typing a command like
        &quot;group&quot;, &quot;save&quot; or &quot;clean&quot;.{' '}
      </p>
    </div>
  );
}

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
    <div className={`${css.popupContainer} bg-background`}>
      <form
        onSubmit={onSubmit}
        className="bg-surface-container border-b-surface-container-high border-b"
      >
        <PromptInput
          placeholder={placeholderValue}
          value={inputValue}
          onChange={onInputChange}
        />
      </form>
      <div className="flex grow flex-col overflow-y-scroll">
        <Hero inputValue={inputValue} />

        <ul
          ref={suggestionListRef}
          className="flex grow flex-col items-stretch p-3"
        >
          {suggestions.map((suggestion, index) => (
            <Suggestion
              className="first:rounded-t-xl last:rounded-b-xl"
              onClick={() => onClickSuggestion(index)}
              onMouseEnter={() => setFocus(index)}
              suggestion={suggestion}
              key={suggestion.key}
              hasFocus={suggestion.key === focusedSuggestion?.key}
            />
          ))}
        </ul>
      </div>
      <Footer />
    </div>
  );
}
