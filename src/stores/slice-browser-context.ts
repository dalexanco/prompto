import { StateCreator } from 'zustand';

export interface BrowserContextSlice {
  currentTabTitle: string;
  currentTabTitleSet: (value: string) => void;
}

export const createBrowserContextSlice: StateCreator<
  BrowserContextSlice,
  [],
  [],
  BrowserContextSlice
> = (set, get) => ({
  currentTabTitle: '',
  currentTabTitleSet: (currentTabTitle: string) => set({ currentTabTitle })
});
