import React from 'react';
import { useKey } from 'react-use';
import classNames from 'classnames';

import MagnifyingGlassIcon from '../../icons/magnifying-glass';
import css from './styles.module.css';
import usePromptActions from '@src/hooks/usePromptActions';
import LoaderIcon from '@src/icons/loader';
import {
  useInputPlaceholderStore,
  useInputValueStore,
  useSuggestionsStore
} from '@src/stores';

const PROMPT_IGNORE_KEYS = ['ArrowUp', 'ArrowDown', 'Tab'];

const ignoreArrowKeys = (event: React.KeyboardEvent) =>
  PROMPT_IGNORE_KEYS.includes(event.key) && event.preventDefault();

export function PromptInput({
  className
}: {
  className?: string | undefined;
}): JSX.Element {
  const { acceptPlaceholder, updateInputValue } = usePromptActions();
  const { placeholderValue } = useInputPlaceholderStore();
  const { inputValue } = useInputValueStore();
  const { suggestionsIsLoading } = useSuggestionsStore();
  useKey(
    'Tab',
    (event) => {
      event.preventDefault();
      acceptPlaceholder();
    },
    {},
    [acceptPlaceholder]
  );

  return (
    <div
      className={classNames(
        'items-center flex flex-row',
        className,
        css.dynamicPlaceholder
      )}
      data-placeholder={placeholderValue}
    >
      <MagnifyingGlassIcon className="m-4 h-5 w-5 stroke-gray-600" />
      <input
        autoFocus
        className="flex h-12 grow whitespace-nowrap bg-transparent text-base leading-none text-gray-600 outline-none placeholder:text-gray-600 placeholder:opacity-50"
        onChange={(event) => updateInputValue(event.currentTarget.value)}
        onKeyDown={ignoreArrowKeys}
        placeholder="Search or command..."
        type="text"
        value={inputValue}
      />
      {suggestionsIsLoading && (
        <LoaderIcon className="m-4 h-5 w-5 animate-spin stroke-gray-200" />
      )}
    </div>
  );
}
