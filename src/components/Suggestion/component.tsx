/* eslint-disable no-case-declarations */
import React from 'react';

import { CommandIcon, CommandSuggestion } from '../../types/commands';
import Title from './title';
import Description from './description';
import SuggestionIcon from './icon';
import classNames from 'classnames';

type SuggestionProps = React.DetailedHTMLProps<
  React.LiHTMLAttributes<HTMLLIElement>,
  HTMLLIElement
> & {
  suggestion: CommandSuggestion;
  hasFocus?: boolean;
};

export function Suggestion({
  suggestion,
  hasFocus = false,
  className,
  ...wrapperProps
}: SuggestionProps): JSX.Element | null {
  if (!suggestion) return null;

  const iconClass = classNames('flex self-center rounded-lg p-2 m-1', {});
  const iconKey =
    suggestion.iconKey != undefined ? suggestion.iconKey : CommandIcon.BOLT;

  return (
    <li
      className={classNames(className, 'flex flex-row items-start py-2', {
        ['bg-stone-100']: hasFocus
      })}
      {...wrapperProps}
    >
      <div className={iconClass}>
        <SuggestionIcon className="h-5 w-5 stroke-gray-700" iconKey={iconKey} />
      </div>
      <div className="mx-2 min-w-0 self-center">
        <Title hasFocus={hasFocus}>{suggestion.title}</Title>
        <Description hasFocus={hasFocus}>{suggestion.description}</Description>
      </div>
    </li>
  );
}
