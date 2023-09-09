import React, { FormEvent, useCallback, useState } from 'react';
import classNames from 'classnames';
import browser from 'webextension-polyfill';
import { useKeyPressEvent } from 'react-use';

import css from './styles.module.css';
import useCommandExecute from '@src/commands';
import { PromptInput } from '@src/components/PromptInput';
import {
  ExtensionRuntimeRequest,
  ExtensionRuntimeRequestType
} from '@src/types/extension';
import Card, { CardContent, CardTitle } from '@src/components/Card';
import logger from '@src/logger';
import Footer from '@src/components/Footer';
import SuggestionList from '@src/components/SuggestionList';
import Header from '@src/components/Header';
import PopupCommandDetails from '@src/pages/PopupCommandDetails';
import {
  useAppStore,
  useFocusedSuggestionStore,
  useSuggestionsStore
} from '@src/stores';

function Hero({ hidden }: { hidden: boolean }) {
  const invalidate = useAppStore((state) => state.cacheInvalidate);
  if (hidden) return;

  return (
    <Card color="primary" className="mx-4 mt-3">
      <CardTitle color="primary">Welcome aboard !</CardTitle>
      <CardContent color="primary">
        The best way to learn is to play with it, so try typing a command like
        &quot;group&quot;, &quot;save&quot; or &quot;clean&quot;.{' '}
        <button onClick={() => invalidate}>Test</button>
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

export function PopupPrompt(): JSX.Element {
  React.useEffect(() => {
    browser.runtime.sendMessage({
      type: ExtensionRuntimeRequestType.POPUP_MOUNTED
    } as ExtensionRuntimeRequest);
    logger.info('Popup connected');
  }, []);
  const [isDetailsPanelVisible, showDetailsPanel] = useState(false);

  useKeyPressEvent('ArrowRight', () => {
    if (focusedSuggestion && focusedSuggestion.hasDetails) {
      showDetailsPanel(true);
    }
  });
  useKeyPressEvent('ArrowLeft', () => {
    if (isDetailsPanelVisible) {
      showDetailsPanel(false);
    }
  });

  // Form validation
  const focusedSuggestion = useFocusedSuggestionStore();
  const execute = useCommandExecute();
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
  const onSubmit = (event: FormEvent) => {
    event.preventDefault();
    executeFocusSuggestion();
  };

  const { suggestions } = useSuggestionsStore();
  const hasSuggestions = suggestions.length > 0;

  return (
    <div
      className={classNames(css.popupContainer, 'flex flex-col bg-stone-50')}
    >
      {isDetailsPanelVisible ? (
        <PopupCommandDetails suggestion={focusedSuggestion} />
      ) : (
        <>
          <Header />
          <Card color="white" className="mx-4 p-0">
            <form onSubmit={onSubmit}>
              <PromptInput
                className={classNames('border-gray-200', {
                  ['border-b']: hasSuggestions
                })}
              />
              <SuggestionList
                className="flex max-h-96 grow flex-col items-stretch overflow-y-scroll"
                onClickSuggestion={executeFocusSuggestion}
              />
            </form>
          </Card>
          <Hero hidden={hasSuggestions} />
          <TipsOfTheDay hidden={hasSuggestions} />

          <Footer />
        </>
      )}
    </div>
  );
}
