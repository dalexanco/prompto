import { StateCreator } from 'zustand';

export interface FocusedIndexSlice {
  focusedIndex: number;
  focusedIndexSet: (value: number) => void;
  focusedIndexMove: (offset: number, maxIndex: number) => void;
}

const indexInScale = (value: number, maxValue: number) =>
  ((value % maxValue) + maxValue) % maxValue;

export const createFocusedIndexSlice: StateCreator<
  FocusedIndexSlice,
  [],
  [],
  FocusedIndexSlice
> = (set, get) => ({
  focusedIndex: 0,
  focusedIndexSet: (focusedIndex: number) => set({ focusedIndex }),
  focusedIndexMove: (offset: number, maxIndex: number) =>
    set({ focusedIndex: indexInScale(get().focusedIndex + offset, maxIndex) })
});
