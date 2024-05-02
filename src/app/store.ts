"use client";

import { proxy, subscribe, useSnapshot } from "valtio";

type Page = {
  title: string;
};

type Store = {
  pages: Record<string, Page>;
};

export const store = proxy<Store>({
  pages: {},
});

console.log("init store", JSON.stringify(store));

subscribe(store, () => {
  console.warn("store changed", JSON.stringify(store));
});

export const addPage = () => {
  const id = Date.now().toString();
  store.pages[id] = { title: `Page ${id}` };
};

export const useStore = () => useSnapshot(store);
