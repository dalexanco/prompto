import classNames from 'classnames';
import React, { ReactNode } from 'react';

interface DescriptionProps {
  colored?: boolean;
  multiline?: boolean;
  children: ReactNode;
}

export default function Description({
  colored = false,
  multiline = false,
  children
}: DescriptionProps): JSX.Element | null {
  const styles = classNames('text-xs', {
    ['text-primary-200']: colored,
    ['overflow-hidden text-ellipsis whitespace-nowrap']: !multiline,
    ['whitespace-pre-line']: multiline
  });
  return <p className={styles}>{children}</p>;
}
