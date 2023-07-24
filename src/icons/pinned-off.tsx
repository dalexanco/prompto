import React from 'react';

interface IconProps {
  className: string | undefined;
}

export default function PinnedOffIcon({ className }: IconProps): JSX.Element {
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
      <path d="M3 3l18 18"></path>
      <path d="M15 4.5l-3.249 3.249m-2.57 1.433l-2.181 .818l-1.5 1.5l7 7l1.5 -1.5l.82 -2.186m1.43 -2.563l3.25 -3.251"></path>
      <path d="M9 15l-4.5 4.5"></path>
      <path d="M14.5 4l5.5 5.5"></path>
    </svg>
  );
}
