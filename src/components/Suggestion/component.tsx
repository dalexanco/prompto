/* eslint-disable no-case-declarations */
import React from 'react';

import {
  CommandIcon,
  CommandSuggestion,
  CommandType
} from '../../types/commands';
import Title from './title';
import Description from './description';
import SuggestionWrapper from './wrapper';
import TitleHighlight from './title-highlight';
import { CommandSuggestionGroupCreate } from '@src/commands/group-create';
import { CommandSuggestionGroupCurrentTab } from '@src/commands/group-current-tab';

type SuggestionProps = React.DetailedHTMLProps<
  React.LiHTMLAttributes<HTMLLIElement>,
  HTMLLIElement
> & {
  suggestion: CommandSuggestion;
  hasFocus?: boolean;
};

const GroupCurrentTab = ({
  suggestion,
  hasFocus,
  ...wrapperProps
}: SuggestionProps): JSX.Element => {
  const customSuggestion = suggestion as CommandSuggestionGroupCurrentTab;
  return (
    <SuggestionWrapper
      iconKey={CommandIcon.RECTANGLE_STACK}
      hasFocus={hasFocus}
      {...wrapperProps}
    >
      <Title colored={hasFocus}>
        <TitleHighlight colored={hasFocus}>group</TitleHighlight> in{' '}
        {customSuggestion.groupName}
      </Title>
      <Description colored={hasFocus}>{suggestion.description}</Description>
    </SuggestionWrapper>
  );
};

const GroupCreate = ({
  suggestion,
  hasFocus,
  ...wrapperProps
}: SuggestionProps): JSX.Element => {
  const customSuggestion = suggestion as CommandSuggestionGroupCreate;
  return (
    <SuggestionWrapper
      iconKey={CommandIcon.RECTANGLE_STACK}
      hasFocus={hasFocus}
      {...wrapperProps}
    >
      <Title colored={hasFocus}>
        <TitleHighlight colored={hasFocus}>group</TitleHighlight> in{' '}
        {customSuggestion.groupName}
      </Title>
      <Description colored={hasFocus}>{suggestion.description}</Description>
    </SuggestionWrapper>
  );
};

export function Suggestion(props: SuggestionProps): JSX.Element | null {
  const { suggestion, hasFocus = false, ...wrapperProps } = props;
  if (!suggestion) return null;

  switch (suggestion.type) {
    case CommandType.GROUP_CURRENT:
      return <GroupCurrentTab {...props} />;
    case CommandType.GROUP_CREATE:
      return <GroupCreate {...props} />;
    default:
      const iconKey =
        suggestion.iconKey != undefined ? suggestion.iconKey : CommandIcon.BOLT;
      return (
        <SuggestionWrapper
          iconKey={iconKey}
          hasFocus={hasFocus}
          {...wrapperProps}
        >
          <Title colored={hasFocus}>{suggestion.title}</Title>
          <Description colored={hasFocus}>{suggestion.description}</Description>
        </SuggestionWrapper>
      );
  }
}
