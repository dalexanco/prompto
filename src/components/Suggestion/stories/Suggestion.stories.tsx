import * as React from 'react';
import { Suggestion } from '../component';
import { ComponentMeta } from '@storybook/react';
import { CommandIcon, CommandType } from '../../../types/commands';

export default {
  title: 'Components/Suggestion',
  component: Suggestion
} as ComponentMeta<typeof Suggestion>;

const TITLE = 'A title';

const Wrapper = ({ children }: { children: JSX.Element | JSX.Element[] }) => (
  <div className="max-w-md bg-white">{children}</div>
);

export const Default = (): JSX.Element => (
  <Wrapper>
    <Suggestion
      suggestion={{
        key: '',
        title: TITLE,
        description: 'And an awesome description !',
        type: CommandType.BOOKMARK,
        iconKey: CommandIcon.BOOKMARK
      }}
    />
    <Suggestion
      suggestion={{
        key: '',
        title: TITLE,
        description: 'And an awesome description !',
        type: CommandType.FOCUS_TAB,
        iconKey: CommandIcon.SQUARE_PLUS
      }}
    />
    <Suggestion
      suggestion={{
        key: '',
        title: TITLE,
        description: 'And an awesome description !',
        type: CommandType.UNKNOWN
      }}
      hasFocus
    />
    <Suggestion
      suggestion={{
        key: '',
        title: TITLE,
        description: 'And an awesome description !',
        type: CommandType.UNKNOWN,
        iconKey: CommandIcon.INFORMATION_CIRCLE
      }}
    />
  </Wrapper>
);

export const WithFocus = (): JSX.Element => (
  <Wrapper>
    <Suggestion
      suggestion={{
        key: '',
        title: 'When it does not have focus',
        description: 'And an awesome description !',
        type: CommandType.FOCUS_TAB
      }}
    />
    <Suggestion
      suggestion={{
        key: '',
        title: 'When it has focus',
        description: 'And an awesome description !',
        type: CommandType.BOOKMARK
      }}
      hasFocus
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
        description: 'And an awesome description !',
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
        description: 'And an awesome description !',
        type: CommandType.BOOKMARK
      }}
      hasFocus
    />
  </Wrapper>
);
