import React, { ReactNode } from 'react';

interface TitleProps {
  children: ReactNode;
}

export default function Title({ children }: TitleProps): JSX.Element {
  return (
    <p className="overflow-hidden text-ellipsis whitespace-nowrap text-sm">
      {children}
    </p>
  );
}
