import React from 'react';

interface IconProps {
  className: string | undefined;
}

export default function RectangleStackIcon({
  className
}: IconProps): JSX.Element {
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
      <path d="M12 6l-8 4l8 4l8 -4l-8 -4"></path>
      <path d="M4 14l8 4l8 -4"></path>
    </svg>
  );
}
