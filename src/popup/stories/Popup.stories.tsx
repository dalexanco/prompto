import BookmarkIcon from '@src/icons/bookmark';
import MagnifyingGlassIcon from '@src/icons/magnifying-glass';
import { ComponentMeta } from '@storybook/react';
import { range } from 'lodash';
import React from 'react';

export default {
  title: 'Mockups/Popup',
  component: Mockup
} as ComponentMeta<typeof Mockup>;

const Item = () => (
  <li className="bg-surface-container-low hover:bg-surface-container flex flex-row p-2 last:rounded-b-xl">
    <div className="self-center rounded-lg px-2">
      <BookmarkIcon className="w-4 stroke-on-surface" />
    </div>
    <div className="ml-2">
      <p className="text-sm text-on-surface">Title</p>
      <p className="text-xs text-on-surface-variant">Description</p>
    </div>
  </li>
);

export function Mockup() {
  return (
    <div style={{ width: '400px' }}>
      <div className="flex w-full flex-col bg-background">
        <div className="bg-surface-container-high group peer mx-5 mt-5 flex flex-row rounded-xl text-on-surface focus-within:rounded-b-none">
          <MagnifyingGlassIcon className="mx-4 w-4 stroke-on-surface" />
          <input
            type="text"
            className="h-11 grow bg-transparent py-4 text-sm outline-none placeholder:italic placeholder:text-on-surface placeholder:opacity-40"
            placeholder="Search or command..."
          />
        </div>

        <ul className=" mx-5">
          <li className="bg-surface-container-low px-4 py-1 pt-2 text-xs font-semibold text-on-surface-variant opacity-80">
            Actions
          </li>
          {range(0, 3).map((i) => (
            <Item key={i} />
          ))}
          <li className="bg-surface-container-low px-4 py-1 text-xs font-semibold text-on-surface-variant opacity-80">
            Historique
          </li>
          {range(0, 3).map((i) => (
            <Item key={i + 3} />
          ))}
          <li className="bg-surface-container border-surface-container-highest rounded-b-xl border-t px-4 py-3 text-xs text-on-surface-variant opacity-80">
            Tips: type enter to execute an action
          </li>
        </ul>

        <div className="m-5 rounded-xl bg-secondary-container px-5 py-4 text-on-secondary-container">
          <p className="text-xs font-bold uppercase leading-5">Welcome abord</p>
          <p className="text-sm opacity-80">
            Hey, this should be a tutorial card
          </p>
        </div>
      </div>
    </div>
  );
}
