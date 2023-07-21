import classNames from 'classnames';
import React, { ReactNode } from 'react';

interface DescriptionProps {
  colored?: boolean;
  children: ReactNode;
}

export default function Description({
  colored,
  children
}: DescriptionProps): JSX.Element | null {
  const styles = classNames(
    'overflow-hidden text-ellipsis whitespace-nowrap text-xs',
    {
      ['text-primary-200']: colored
    }
  );
  return <p className={styles}>{children}</p>;
}
