"use client";

import { proxy, useSnapshot } from "valtio";

type Page = {
  title: string;
};

type Store = {
  pages: Record<string, Page>;
};

export const store = proxy<Store>({
  pages: {},
});

export const addPage = () => {
  const id = Date.now().toString();
  store.pages[id] = { title: `Page ${id}` };
};

export const useStore = () => useSnapshot(store);