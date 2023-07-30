import classNames from 'classnames';
import { ReactNode } from 'react';

export default function Tag({
  colored = false,
  children,
  className
}: {
  children: ReactNode;
  colored: boolean | undefined;
  className?: string | undefined;
}) {
  const flagStyles = classNames(
    'rounded-sm border px-1 text-xs font-medium',
    {
      ['border-primary-100 bg-primary-50 text-primary-800']: colored,
      ['border-gray-100 bg-gray-50 text-gray-800']: !colored
    },
    className
  );

  return <span className={flagStyles}>{children}</span>;
}
