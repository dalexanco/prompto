import classNames from 'classnames';

import { CommandIcon, CommandSuggestion } from '@src/types/commands';
import SuggestionIcon from './icon';

export type SuggestionProps = React.DetailedHTMLProps<
  React.LiHTMLAttributes<HTMLLIElement>,
  HTMLLIElement
> & {
  suggestion: CommandSuggestion;
  hasFocus?: boolean;
};

type SuggestionWrapperProps = React.DetailedHTMLProps<
  React.LiHTMLAttributes<HTMLLIElement>,
  HTMLLIElement
> & {
  hasFocus?: boolean;
  iconKey: CommandIcon;
};

export default function SuggestionWrapper({
  hasFocus = false,
  children,
  iconKey,
  ...wrapperProps
}: SuggestionWrapperProps) {
  const wrapperClass = classNames('flex flex-row items-start p-1 last:mb-2', {
    ['bg-gray-50']: hasFocus
  });
  const iconClass = classNames('flex self-center rounded-lg p-2 m-1', {});

  return (
    <li className={wrapperClass} {...wrapperProps}>
      <div className={iconClass}>
        <SuggestionIcon hasFocus={hasFocus} iconKey={iconKey} />
      </div>
      <div className="mx-2 min-w-0 self-center">{children}</div>
    </li>
  );
}
