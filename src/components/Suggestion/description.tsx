import classNames from 'classnames';
import React, { ReactNode } from 'react';

interface DescriptionProps {
  children: ReactNode;
  hasFocus?: boolean;
}

export default function Description({
  children,
  hasFocus = false
}: DescriptionProps): JSX.Element | null {
  return (
    <p
      className={classNames(
        'overflow-hidden text-ellipsis whitespace-nowrap text-xs',
        {
          ['text-gray-600']: hasFocus,
          ['text-gray-500']: !hasFocus
        }
      )}
    >
      {children}
    </p>
  );
}
