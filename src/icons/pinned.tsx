import React from 'react';

interface IconProps {
  className: string | undefined;
}

export default function PinnedIcon({ className }: IconProps): JSX.Element {
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
      <path d="M9 4v6l-2 4v2h10v-2l-2 -4v-6"></path>
      <path d="M12 16l0 5"></path>
      <path d="M8 4l8 0"></path>
    </svg>
  );
}
