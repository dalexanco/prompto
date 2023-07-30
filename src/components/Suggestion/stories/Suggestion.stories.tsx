import * as React from 'react';
import { Suggestion } from '../component';
import { ComponentMeta } from '@storybook/react';
import {
  CommandIcon,
  CommandSuggestion,
  CommandType
} from '../../../types/commands';
import {
  BookmarkFolderSuggestionType,
  SaveCurrentTabSuggestion
} from '@src/commands/save-current-tab';

export default {
  title: 'Components/Suggestion',
  component: Suggestion
} as ComponentMeta<typeof Suggestion>;

const TITLE = 'A title';
const DESCRIPTION = 'And an awesome description !';

const Wrapper = ({ children }: { children: JSX.Element | JSX.Element[] }) => (
  <div className="max-w-md bg-white">{children}</div>
);

const suggestions = [
  {
    key: '',
    title: TITLE,
    description: DESCRIPTION,
    type: CommandType.BOOKMARK,
    iconKey: CommandIcon.BOOKMARK
  },
  {
    key: '',
    title: TITLE,
    description: DESCRIPTION,
    type: CommandType.FOCUS_TAB,
    iconKey: CommandIcon.SQUARE_PLUS
  },
  {
    key: '',
    title: TITLE,
    description: DESCRIPTION,
    type: CommandType.UNKNOWN
  },
  {
    key: '',
    title: TITLE,
    description: DESCRIPTION,
    type: CommandType.UNKNOWN,
    iconKey: CommandIcon.INFORMATION_CIRCLE
  }
] as CommandSuggestion[];

export const Default = (): JSX.Element => (
  <Wrapper>
    {suggestions.map((suggestion) => (
      <Suggestion key={suggestion.key} suggestion={suggestion} />
    ))}
  </Wrapper>
);

export const WithFocus = (): JSX.Element => (
  <Wrapper>
    <Suggestion
      suggestion={{
        key: '',
        title: 'When it does not have focus',
        description: DESCRIPTION,
        type: CommandType.FOCUS_TAB
      }}
    />
    <Suggestion
      suggestion={{
        key: '',
        title: 'When it has focus',
        description: DESCRIPTION,
        type: CommandType.BOOKMARK
      }}
      hasFocus
    />
    <Suggestion
      suggestion={{
        key: '',
        title: 'When it does not have focus',
        description: DESCRIPTION,
        type: CommandType.FOCUS_TAB
      }}
    />
  </Wrapper>
);

export const WithLongTitle = (): JSX.Element => (
  <Wrapper>
    <Suggestion
      suggestion={{
        key: '',
        title:
          'With a very very long title, I mean very very very very very very very very very very long',
        description: DESCRIPTION,
        type: CommandType.BOOKMARK
      }}
    />
  </Wrapper>
);

export const WithLongDescription = (): JSX.Element => (
  <Wrapper>
    <Suggestion
      suggestion={{
        key: '',
        title: TITLE,
        description:
          'With a very very long description, I mean very very very very very very very very very very long',
        type: CommandType.BOOKMARK
      }}
      hasFocus
    />
  </Wrapper>
);

const bookmarkSaveSuggestions = [
  {
    key: '',
    title: TITLE,
    description: 'A folder path from bookmarks-bar',
    type: CommandType.BOOKMARK_SAVE,
    iconKey: CommandIcon.BOOKMARK,
    bookmarkFolderPath: [
      {
        id: '1',
        title: 'Should not be displayed',
        type: BookmarkFolderSuggestionType.ROOT_BAR
      },
      {
        id: '4',
        title: 'A folder',
        type: BookmarkFolderSuggestionType.FOLDER
      },
      {
        id: '5',
        title: 'sub-folder',
        type: BookmarkFolderSuggestionType.FOLDER
      }
    ],
    bookmarkFolderId: '',
    bookmarkIndex: ''
  } as SaveCurrentTabSuggestion,
  {
    key: '',
    title: TITLE,
    description: 'A folder path from mobile root',
    type: CommandType.BOOKMARK_SAVE,
    iconKey: CommandIcon.BOOKMARK,
    bookmarkFolderPath: [
      {
        id: '1',
        title: 'Should not be displayed',
        type: BookmarkFolderSuggestionType.ROOT_MOB
      },
      {
        id: '4',
        title: 'A folder',
        type: BookmarkFolderSuggestionType.FOLDER
      },
      {
        id: '5',
        title: 'sub-folder',
        type: BookmarkFolderSuggestionType.FOLDER
      }
    ],
    bookmarkFolderId: '',
    bookmarkIndex: ''
  } as SaveCurrentTabSuggestion,
  {
    key: '',
    title: TITLE,
    description: DESCRIPTION,
    type: CommandType.UNKNOWN
  },
  {
    key: '',
    title: TITLE,
    description: 'A folder path from other bookmarks',
    type: CommandType.BOOKMARK_SAVE,
    iconKey: CommandIcon.BOOKMARK,
    bookmarkFolderPath: [
      {
        id: '1',
        title: 'Should not be displayed',
        type: BookmarkFolderSuggestionType.ROOT_OTHERS
      },
      {
        id: '4',
        title: 'A folder with a long name',
        type: BookmarkFolderSuggestionType.FOLDER
      },
      {
        id: '5',
        title: 'extra-sub-folder',
        type: BookmarkFolderSuggestionType.FOLDER
      },
      {
        id: '6',
        title: 'super-mega-sub-folder',
        type: BookmarkFolderSuggestionType.FOLDER
      }
    ],
    bookmarkFolderId: '',
    bookmarkIndex: ''
  } as SaveCurrentTabSuggestion
] as CommandSuggestion[];

export const CommandBookmarkSave = (): JSX.Element => (
  <Wrapper>
    {bookmarkSaveSuggestions.map((suggestion, index) => (
      <Suggestion
        key={suggestion.key}
        suggestion={suggestion}
        hasFocus={index == 1}
      />
    ))}
  </Wrapper>
);
