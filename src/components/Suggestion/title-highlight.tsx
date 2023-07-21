import { ReactNode } from 'react';

export default function TitleHighlight({
  children
}: {
  children: ReactNode;
}): JSX.Element {
  return <span className="font-medium text-primary-400">{children}</span>;
}
