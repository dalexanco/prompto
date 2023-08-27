import React from 'react';

import ChevronDownIcon from '@src/icons/chevron-down';
import ChevronUpIcon from '@src/icons/chevron-up';

export default function Footer(): JSX.Element | null {
  return (
    <footer className="flex justify-end border-t border-t-gray-100 bg-gray-50 px-4 py-3">
      <p className="text-xs italic text-gray-500">
        Use{' '}
        <span className=" inline-flex rounded-sm bg-gray-200 p-1">
          <ChevronUpIcon className="inline-flex h-2 w-2" />
        </span>{' '}
        <span className=" inline-flex rounded-sm bg-gray-200 p-1">
          <ChevronDownIcon className="inline-flex h-2 w-2" />
        </span>{' '}
        to navigate
      </p>
    </footer>
  );
}
