import create from 'zustand';
import { devtools } from 'zustand/middleware';

import type { ZoteraWebConfig } from '@zotera/types';

interface ZoteraState {
  options: ZoteraWebConfig & {
    allowAnonymousDownload: boolean;
  };
  search: string;
  setSearch: (search: string) => void;
}

export const useZoteraStore = create<ZoteraState>()(
  devtools((set) => ({
    options: window.__ZOTERA_OPTIONS,
    search: '',
    setSearch: (search: string) => set({ search })
  }))
);

declare global {
  interface Window {
    __ZOTERA_OPTIONS: ZoteraWebConfig & {
      allowAnonymousDownload: boolean;
    };
  }
}
