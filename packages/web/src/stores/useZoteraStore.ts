import create from 'zustand';
import { devtools } from 'zustand/middleware';

import type { ZoteraWebConfig } from '@zotera/types';

interface ZoteraState {
  options: ZoteraWebConfig & {
    allowAnonymousDownload: boolean;
  };
}

export const useZoteraStore = create<ZoteraState>()(
  devtools((set) => ({
    options: window.__ZOTERA_OPTIONS
  }))
);

declare global {
  interface Window {
    __ZOTERA_OPTIONS: ZoteraWebConfig & {
      allowAnonymousDownload: boolean;
    };
  }
}
