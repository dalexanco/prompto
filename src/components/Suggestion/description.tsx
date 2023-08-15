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
  const styles = classNames(
    'overflow-hidden text-ellipsis whitespace-nowrap text-xs text-on-surface-container',
    {
      ['text-on-surface']: hasFocus,
      ['text-on-surface-variant']: !hasFocus
    }
  );
  return <p className={styles}>{children}</p>;
}
