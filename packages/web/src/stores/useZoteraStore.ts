import create from "zustand";

import type { ZoteraWebConfig } from "@zotera/types";

interface ZoteraState {
  options: ZoteraWebConfig & {
    allowAnonymousDownload: boolean
  }
  login: ({ username, password }: { username: string; password: string }) => void
}
export const useZoteraStore = create<ZoteraState>()(() => ({
  options: window.__ZOTERA_OPTIONS,
  /*   search: '',
  setSearch: (search: string) => set({ search }), */
  login: async ({ username, password }: { username: string; password: string }) => {
    const response = await fetch("/-/auth/login", {
      method: "POST",
      body: JSON.stringify({ username, password }),
      headers: {
        "Accept": "application/json",
        "Content-Type": "application/json"
      }
    });
    console.log(await response.json());
  }
}));

declare global {
  interface Window {
    __ZOTERA_OPTIONS: ZoteraWebConfig & {
      allowAnonymousDownload: boolean
    }
  }
}
