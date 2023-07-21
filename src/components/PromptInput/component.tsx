import React, { LegacyRef } from 'react';

import MagnifyingGlassIcon from '../../icons/magnifying-glass';
import classNames from 'classnames';
import css from './styles.module.css';
import PromptoIcon from '@src/icons/prompto';

interface PromptInputProps {
  onChange?: (value: string) => void;
  placeholder?: string;
  value?: string;
  ignoreKeys?: string[];
  ref?: LegacyRef<HTMLInputElement>;
}

const PROMPT_IGNORE_KEYS = ['ArrowUp', 'ArrowDown', 'Tab'];

export function PromptInput({
  onChange,
  placeholder = '',
  value = ''
}: PromptInputProps): JSX.Element {
  const ignoreArrowKeys = (event: React.KeyboardEvent) =>
    PROMPT_IGNORE_KEYS.includes(event.key) && event.preventDefault();
  const wrapperClassName = classNames(
    'inline-flex items-center bg-white px-6 py-2 dynamicPlaceholder',
    css.dynamicPlaceholder
  );

  return (
    <div className={wrapperClassName} data-placeholder={placeholder}>
      <PromptoIcon className="h-5 w-5 fill-current text-primary-600" />
      <input
        onChange={(event) => onChange && onChange(event.currentTarget.value)}
        onKeyDown={ignoreArrowKeys}
        value={value}
        autoFocus
        placeholder="Search or command..."
        type="text"
        className="my-1 ml-3 whitespace-nowrap px-2 text-base outline-none placeholder:italic"
      />
    </div>
  );
}
