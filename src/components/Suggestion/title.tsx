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
      ['text-on-surface']: hasFocus,
      ['text-on-surface-variant']: !hasFocus
    }
  );
  return <p className={styles}>{children}</p>;
}
