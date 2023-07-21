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
  const wrapperClass = classNames(
    'flex flex-row items-start p-1 mx-2 rounded-md last:mb-2',
    {
      ['bg-primary-600']: hasFocus
    }
  );
  const iconClass = classNames('flex self-center rounded-lg p-3 m-1', {
    [' bg-gray-50']: !hasFocus
  });

  return (
    <li className={wrapperClass} {...wrapperProps}>
      <div className={iconClass}>
        <SuggestionIcon hasFocus={hasFocus} iconKey={iconKey} />
      </div>
      <div className="mx-2 min-w-0 self-center">{children}</div>
    </li>
  );
}
