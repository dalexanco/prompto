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
  className?: string | undefined;
}

const PROMPT_IGNORE_KEYS = ['ArrowUp', 'ArrowDown', 'Tab'];

export function PromptInput({
  onChange,
  placeholder = '',
  value = '',
  className
}: PromptInputProps): JSX.Element {
  const ignoreArrowKeys = (event: React.KeyboardEvent) =>
    PROMPT_IGNORE_KEYS.includes(event.key) && event.preventDefault();
  const wrapperClassName = classNames(
    'items-center flex flex-row',
    className,
    css.dynamicPlaceholder
  );

  return (
    <div className={wrapperClassName} data-placeholder={placeholder}>
      <MagnifyingGlassIcon className="mx-4 h-4 w-4 stroke-gray-600" />
      <input
        onChange={(event) => onChange && onChange(event.currentTarget.value)}
        onKeyDown={ignoreArrowKeys}
        value={value}
        autoFocus
        placeholder="Search or command..."
        type="text"
        className="flex h-12 grow whitespace-nowrap bg-transparent text-base leading-none text-gray-600 outline-none placeholder:text-gray-600 placeholder:opacity-50"
      />
    </div>
  );
}
