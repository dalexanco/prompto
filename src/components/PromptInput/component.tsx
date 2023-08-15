import React, { LegacyRef } from 'react';

import MagnifyingGlassIcon from '../../icons/magnifying-glass';
import classNames from 'classnames';
import css from './styles.module.css';

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
    'items-center flex flex-row dynamicPlaceholder bg-surface-container-low',
    css.dynamicPlaceholder
  );

  return (
    <div className={wrapperClassName} data-placeholder={placeholder}>
      <MagnifyingGlassIcon className="mx-4 h-4 w-4 stroke-on-surface" />
      <input
        onChange={(event) => onChange && onChange(event.currentTarget.value)}
        onKeyDown={ignoreArrowKeys}
        value={value}
        autoFocus
        placeholder="Search or command..."
        type="text"
        className="flex h-12 grow whitespace-nowrap bg-transparent text-base leading-none text-on-surface outline-none placeholder:italic placeholder:text-on-surface placeholder:opacity-50"
      />
    </div>
  );
}
