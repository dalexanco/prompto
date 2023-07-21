import classNames from 'classnames';
import React, { ReactNode } from 'react';

interface TitleProps {
  colored?: boolean;
  children: ReactNode;
}

export default function Title({ colored, children }: TitleProps): JSX.Element {
  const styles = classNames(
    'overflow-hidden text-ellipsis whitespace-nowrap text-sm',
    {
      ['text-white']: colored
    }
  );
  return <p className={styles}>{children}</p>;
}
