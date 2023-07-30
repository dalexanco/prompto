import {
  BookmarkFolderSuggestionType,
  SaveCurrentTabSuggestion
} from '@src/commands/save-current-tab';
import { CommandSuggestion } from '@src/types/commands';
import Description from '../Suggestion/description';
import Tag from '../Tag';
import Title from '../Suggestion/title';

interface SuggestionBookmarkProps {
  suggestion: CommandSuggestion;
  hasFocus?: boolean;
}

function mapFolderType(type: BookmarkFolderSuggestionType): string {
  switch (type) {
    case BookmarkFolderSuggestionType.ROOT_BAR:
      return 'bookmarks bar';
    case BookmarkFolderSuggestionType.ROOT_MOB:
      return 'mobile bookmarks';
    case BookmarkFolderSuggestionType.ROOT_OTHERS:
    case BookmarkFolderSuggestionType.FOLDER:
    default:
      return 'bookmarks';
  }
}

export default function SuggestionBookmark({
  suggestion: rawSuggestion,
  hasFocus
}: SuggestionBookmarkProps): JSX.Element {
  const suggestion = rawSuggestion as SaveCurrentTabSuggestion;
  const [firstFolder, ...folders] = suggestion.bookmarkFolderPath;
  const subPath = folders.map(({ title }) => title).join(' › ');
  return (
    <>
      <Title>
        save in <Tag colored={hasFocus}>{subPath}</Tag>
      </Title>
      <Description>In your {mapFolderType(firstFolder.type)}</Description>
    </>
  );
}
