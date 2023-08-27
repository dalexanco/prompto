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
import classNames from 'classnames';
import PromptoSquareIcon from '@src/icons/prompto-square';
import Card, { CardContent, CardTitle } from '@src/components/Card';

function Hero({ hidden }: { hidden: boolean }) {
  if (hidden) return;

  return (
    <Card color="primary" className="mx-4 mt-3">
      <CardTitle color="primary">Welcome aboard !</CardTitle>
      <CardContent color="primary">
        The best way to learn is to play with it, so try typing a command like
        &quot;group&quot;, &quot;save&quot; or &quot;clean&quot;.{' '}
      </CardContent>
    </Card>
  );
}

function TipsOfTheDay({ hidden }: { hidden: boolean }) {
  if (hidden) return;

  return (
    <Card className="mx-4 mt-3">
      <CardTitle>Tip of the day</CardTitle>
      <CardContent>You can pin a tab using &quot;tab&quot; command</CardContent>
    </Card>
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
  const hasSuggestions = suggestions.length > 0;

  return (
    <div className={`${css.popupContainer} flex flex-col bg-stone-50`}>
      <div className="m-4 flex items-center justify-center">
        <PromptoSquareIcon className="inline-block h-5 w-5 align-text-bottom" />{' '}
        <span className="ml-2 text-base font-medium text-stone-800">
          Prompto
        </span>
      </div>
      <Card color="white" className="mx-4 p-0">
        <form onSubmit={onSubmit}>
          <PromptInput
            placeholder={placeholderValue}
            value={inputValue}
            onChange={onInputChange}
            className={classNames('border-gray-200', {
              ['border-b']: hasSuggestions
            })}
          />
          <ul
            ref={suggestionListRef}
            className="flex max-h-96 grow flex-col items-stretch overflow-y-scroll"
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
        </form>
      </Card>
      <Hero hidden={hasSuggestions} />
      <TipsOfTheDay hidden={hasSuggestions} />

      <Footer />
    </div>
  );
}
