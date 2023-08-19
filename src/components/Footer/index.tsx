import React from 'react';

import ChevronDownIcon from '@src/icons/chevron-down';
import ChevronUpIcon from '@src/icons/chevron-up';
import PromptoIcon from '@src/icons/prompto';

export default function Footer(): JSX.Element | null {
  return (
    <footer className="flex border-t border-t-gray-100 bg-gray-50 px-4 py-2">
      <span className="grow text-xs font-medium text-primary">
        <PromptoIcon className="inline-block h-3 w-3 fill-current align-text-bottom text-primary" />{' '}
        Prompto
      </span>
      <p className="justify-self-end text-xs italic text-gray-500">
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
