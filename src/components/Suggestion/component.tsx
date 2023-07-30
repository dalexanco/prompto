/* eslint-disable no-case-declarations */
import React from 'react';
import classNames from 'classnames';

import {
  CommandIcon,
  CommandSuggestion,
  CommandType
} from '../../types/commands';
import Title from './title';
import Description from './description';
import SuggestionIcon from './icon';
import SuggestionBookmark from '../SuggestionSaveCurrentTab';
import SuggestionGroup from '../SuggestionGroupCurrentTab';

type SuggestionProps = React.DetailedHTMLProps<
  React.LiHTMLAttributes<HTMLLIElement>,
  HTMLLIElement
> & {
  suggestion: CommandSuggestion;
  hasFocus?: boolean;
};

const Content = ({
  suggestion
}: {
  suggestion: CommandSuggestion;
}): JSX.Element => {
  return (
    <>
      <Title>{suggestion.title}</Title>
      <Description>{suggestion.description}</Description>
    </>
  );
};

const selectContentComponent = (
  type: CommandType
): (({
  suggestion: rawSuggestion,
  hasFocus
}: SuggestionProps) => JSX.Element) => {
  switch (type) {
    case CommandType.BOOKMARK_SAVE:
      return SuggestionBookmark;
    case CommandType.GROUP_CURRENT:
      return SuggestionGroup;
    default:
      return Content;
  }
};

export function Suggestion({
  suggestion,
  hasFocus = false,
  ...wrapperProps
}: SuggestionProps): JSX.Element | null {
  if (!suggestion) return null;

  const wrapperClass = classNames('flex flex-row items-start p-1 last:mb-2', {
    ['bg-gray-50']: hasFocus
  });
  const iconClass = classNames('flex self-center rounded-lg p-2 m-1', {});
  const iconKey =
    suggestion.iconKey != undefined ? suggestion.iconKey : CommandIcon.BOLT;
  const SuggestionContent = selectContentComponent(suggestion.type);

  return (
    <li className={wrapperClass} {...wrapperProps}>
      <div className={iconClass}>
        <SuggestionIcon hasFocus={hasFocus} iconKey={iconKey} />
      </div>
      <div className="mx-2 min-w-0 self-center">
        <SuggestionContent suggestion={suggestion} hasFocus={hasFocus} />
      </div>
    </li>
  );
}
