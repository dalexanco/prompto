import classNames from 'classnames';
import React, { ReactNode } from 'react';

interface TitleProps {
  hasFocus?: boolean;
  children: ReactNode;
}

export default function Title({ hasFocus, children }: TitleProps): JSX.Element {
  const styles = classNames(
    'overflow-hidden text-ellipsis whitespace-nowrap text-sm',
    {
      ['text-gray-800']: hasFocus,
      ['text-gray-700']: !hasFocus
    }
  );
  return <h3 className={styles}>{children}</h3>;
}
