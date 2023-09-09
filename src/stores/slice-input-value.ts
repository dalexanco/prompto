import { StateCreator } from 'zustand';

export interface InputValueSlice {
  inputValue: string;
  inputValueSet: (value: string) => void;
}

export const createInputValueSlice: StateCreator<
  InputValueSlice,
  [],
  [],
  InputValueSlice
> = (set) => ({
  inputValue: '',
  inputValueSet: (value: string) => set({ inputValue: value })
});
