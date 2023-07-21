import React, { ReactNode } from 'react';

interface DescriptionProps {
  children: ReactNode;
}

export default function Description({
  children
}: DescriptionProps): JSX.Element | null {
  return (
    <p className="overflow-hidden text-ellipsis whitespace-nowrap text-xs text-gray-500">
      {children}
    </p>
  );
}
