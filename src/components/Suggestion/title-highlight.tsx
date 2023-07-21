import classNames from 'classnames';
import { ReactNode } from 'react';

export default function TitleHighlight({
  colored = false,
  children
}: {
  colored?: boolean;
  children: ReactNode;
}): JSX.Element {
  const styles = classNames('font-semibold', {
    ['text-gray-800']: !colored
  });
  return <span className={styles}>{children}</span>;
}
