import React from 'react';

interface IconProps {
  className: string | undefined;
}

export default function BoltIcon({ className }: IconProps): JSX.Element {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      className={className}
      viewBox="0 0 24 24"
      strokeWidth="2"
      stroke="currentColor"
      fill="none"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path stroke="none" d="M0 0h24v24H0z" fill="none"></path>
      <path d="M13 3l0 7l6 0l-8 11l0 -7l-6 0l8 -11"></path>
    </svg>
  );
}
