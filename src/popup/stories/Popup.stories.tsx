import BookmarkIcon from '@src/icons/bookmark';
import MagnifyingGlassIcon from '@src/icons/magnifying-glass';
import { ComponentMeta } from '@storybook/react';
import { range } from 'lodash';
import * as React from 'react';

export default {
  title: 'Mockups/Popup',
  component: Mockup
} as ComponentMeta<typeof Mockup>;

const Item = () => (
  <li className=" bg-surface-container-low hover:bg-surface-container mt-1 flex flex-row p-3 first:rounded-t-xl last:rounded-b-xl">
    <div className="self-center rounded-lg p-2">
      <BookmarkIcon className="w-5 stroke-on-surface" />
    </div>
    <div className="ml-2">
      <p className="text-on-surface">Title</p>
      <p className="text-sm text-on-surface-variant">Description</p>
    </div>
  </li>
);

export function Mockup() {
  return (
    <div className="bg-white" style={{ width: '400px' }}>
      <div className="flex w-full flex-col bg-background">
        <div className="bg-surface-container-high mb-3 flex flex-row text-on-surface ">
          <MagnifyingGlassIcon className="mx-4 w-5" />
          <input
            type="text"
            className="h-14 grow bg-transparent py-4 outline-none placeholder:italic placeholder:text-on-surface placeholder:opacity-40"
            placeholder="Search or command..."
          />
        </div>

        <div className="m-2">
          <div className="mx-2 mb-3 rounded-xl bg-secondary-container px-5 py-4 text-on-secondary-container">
            <p className="text-xs font-bold uppercase leading-5">
              Welcome abord
            </p>
            <p className="text-sm opacity-80">
              Hey, this should be a tutorial card
            </p>
          </div>

          <ul className="mx-2">
            {range(0, 10).map((i) => (
              <Item key={i} />
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
}
