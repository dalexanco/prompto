import BookmarkIcon from '@src/icons/bookmark';
import MagnifyingGlassIcon from '@src/icons/magnifying-glass';
import PromptoIcon from '@src/icons/prompto';
import PromptoSquareIcon from '@src/icons/prompto-square';
import { ComponentMeta } from '@storybook/react';
import classNames from 'classnames';
import { range } from 'lodash';
import React, { useCallback, useState } from 'react';

export default {
  title: 'Mockups/Popup',
  component: Mockup
} as ComponentMeta<typeof Mockup>;

const Item = () => (
  <li className="hover:bg-surface-container mx-2 my-1 flex flex-row rounded-xl p-2">
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
  const [isLayerOpen, setLayerOpen] = useState(true);

  return (
    <div style={{ width: '400px', maxHeight: '600px', overflow: 'scroll' }}>
      <div className="flex w-full flex-col bg-background">
        <div className="flex items-center px-4 py-2">
          <PromptoSquareIcon className="inline-block h-4 w-4 align-text-bottom" />{' '}
          <span className="ml-2 text-xs font-medium text-on-background">
            Prompto
          </span>
        </div>

        <div
          className={classNames(
            'group peer flex flex-row text-on-surface bg-surface-container-lowest border-b border-t border-surface-container-highest'
          )}
        >
          <MagnifyingGlassIcon className="mx-4 w-4 stroke-on-surface" />
          <input
            onFocus={() => setLayerOpen(true)}
            onBlur={() => setLayerOpen(false)}
            type="text"
            className="h-11 grow bg-transparent py-4 text-sm outline-none placeholder:text-on-surface placeholder:opacity-40"
            placeholder="Search or command..."
          />
        </div>

        <ul
          className={classNames(
            'rounded-b-xl transition-[height] transition-transform duration-200 ease-in-out',
            {
              ['h-0 overlay-none overflow-hidden']: !isLayerOpen
            }
          )}
        >
          {range(0, 8).map((i) => (
            <Item key={i} />
          ))}
        </ul>

        <div className="bg-surface-container mx-2 mt-3 rounded-xl px-5 py-4 text-on-surface">
          <p className="text-xs font-bold uppercase leading-5">Tips</p>
          <p className="text-sm opacity-80">Type enter to execute an action</p>
        </div>

        <div className="mx-2 my-3 rounded-xl bg-tertiary-container px-5  py-4 text-on-tertiary-container">
          <p className="text-xs font-bold uppercase leading-5">Welcome abord</p>
          <p className="text-sm opacity-80">
            Hey, this should be a tutorial card
          </p>
        </div>
      </div>
    </div>
  );
}

export function MockupMaterial() {
  const [isLayerOpen, setLayerOpen] = useState(false);

  return (
    <div style={{ width: '400px', maxHeight: '500px', overflowY: 'scroll' }}>
      <div className="flex w-full flex-col bg-background">
        <div className="mx-4 my-3 flex items-center">
          <PromptoSquareIcon className="inline-block h-4 w-4 align-text-bottom" />{' '}
          <span className="ml-2 text-xs font-medium text-on-background">
            Prompto
          </span>
        </div>

        <div className="bg-surface-container-high group peer mx-3 flex flex-row rounded-xl text-on-surface focus-within:rounded-b-none">
          <MagnifyingGlassIcon className="mx-4 w-4 stroke-on-surface" />
          <input
            type="text"
            onFocus={() => setLayerOpen(true)}
            onBlur={() => setLayerOpen(false)}
            className="h-11 grow bg-transparent py-4 text-sm outline-none placeholder:italic placeholder:text-on-surface placeholder:opacity-40"
            placeholder="Search or command..."
          />
        </div>

        <ul
          className={classNames(
            'bg-surface-container-low mx-3 rounded-b-xl pb-1',
            {
              ['h-0 overlay-none overflow-hidden']: !isLayerOpen
            }
          )}
        >
          <li className="px-4 py-1 pt-2 text-xs font-semibold text-on-surface-variant opacity-80">
            Actions
          </li>
          {range(0, 6).map((i) => (
            <Item key={i} />
          ))}
        </ul>

        <div className="bg-surface-container mx-3 mt-3 rounded-xl px-5 py-4 text-on-surface">
          <p className="text-xs font-bold uppercase leading-5">Tips</p>
          <p className="text-sm opacity-80">Type enter to execute an action</p>
        </div>

        <div className="m-3 rounded-xl bg-secondary-container px-5 py-4 text-on-secondary-container">
          <p className="text-xs font-bold uppercase leading-5">Welcome abord</p>
          <p className="text-sm opacity-80">
            Hey, this should be a tutorial card
          </p>
        </div>
      </div>
    </div>
  );
}

const ItemNative = () => (
  <li className="mx-2 my-1 flex flex-row rounded-lg p-2 hover:bg-stone-100">
    <div className="self-center rounded-lg px-2">
      <BookmarkIcon className="w-4 stroke-on-surface" />
    </div>
    <div className="ml-2">
      <p className="text-sm text-slate-800">Title</p>
      <p className="text-xs text-slate-500">Description</p>
    </div>
  </li>
);

export function MockupNative() {
  const [isLayerOpen, setLayerOpen] = useState(false);

  return (
    <div style={{ width: '400px', maxHeight: '500px', overflowY: 'scroll' }}>
      <div className="flex w-full flex-col bg-stone-50">
        <div className="mx-4 my-3 flex items-center">
          <PromptoSquareIcon className="inline-block h-4 w-4 align-text-bottom" />{' '}
          <span className="ml-2 text-xs font-medium text-on-background">
            Prompto
          </span>
        </div>

        <div className="mx-2 flex flex-col rounded-lg border border-gray-200 bg-white text-on-surface drop-shadow-sm">
          <div className="flex flex-row border-gray-200 focus-within:border-b">
            <MagnifyingGlassIcon className="mx-4 w-4 stroke-on-surface" />
            <input
              type="text"
              onFocus={() => setLayerOpen(true)}
              onBlur={() => setLayerOpen(false)}
              className="h-11 grow bg-transparent py-4 text-sm outline-none placeholder:italic placeholder:text-on-surface placeholder:opacity-40"
              placeholder="Search or command..."
            />
          </div>
          <ul
            className={classNames('pb-1', {
              ['hidden']: !isLayerOpen
            })}
          >
            <li className="px-4 py-1 pt-2 text-xs font-semibold text-on-surface-variant opacity-80">
              Actions
            </li>
            {range(0, 6).map((i) => (
              <ItemNative key={i} />
            ))}
          </ul>
        </div>

        <div className="mx-2 mt-3 rounded-lg bg-stone-200 px-5 py-4 text-on-surface drop-shadow-sm">
          <p className="text-xs font-bold uppercase leading-5">Tips</p>
          <p className="text-sm opacity-80">Type enter to execute an action</p>
        </div>

        <div className="m-2 rounded-lg bg-lime-300 px-5 py-4 text-on-secondary-container drop-shadow-sm">
          <p className="text-xs font-bold uppercase leading-5">Welcome abord</p>
          <p className="text-sm opacity-80">
            Hey, this should be a tutorial card
          </p>
        </div>
      </div>
    </div>
  );
}
