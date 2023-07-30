import { CommandSuggestion } from '@src/types/commands';
import { CommandSuggestionGroupCurrentTab } from '@src/commands/group-current-tab';
import Description from '../Suggestion/description';
import Tag from '../Tag';
import Title from '../Suggestion/title';

interface SuggestionGroupProps {
  suggestion: CommandSuggestion;
  hasFocus?: boolean;
}

export default function SuggestionGroup({
  suggestion: rawSuggestion,
  hasFocus
}: SuggestionGroupProps): JSX.Element {
  const suggestion = rawSuggestion as CommandSuggestionGroupCurrentTab;
  const { groupName, description } = suggestion;

  return (
    <>
      <Title>
        group in <Tag colored={hasFocus}>{groupName}</Tag>
      </Title>
      <Description>{description}</Description>
    </>
  );
}
