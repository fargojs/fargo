import create from 'zustand';
import { devtools } from 'zustand/middleware';

import type { ZoteraWebConfig } from '@zotera/types';

interface ZoteraState {
  options: ZoteraWebConfig;
}

export const useZoteraStore = create<ZoteraState>()(
  devtools((set) => ({
    options: window.__ZOTERA_WEB_OPTIONS
  }))
);

declare global {
  interface Window {
    __ZOTERA_WEB_OPTIONS: ZoteraWebConfig;
  }
}
