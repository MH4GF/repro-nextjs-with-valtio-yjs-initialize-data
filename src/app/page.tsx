"use client";

import { useEffect } from "react";
import { addPage, store, useStore } from "./store";
import { useWebsocket } from "./yjs";
import { bind } from "valtio-yjs";

export default function Home() {
  const { doc } = useWebsocket();
  const snap = useStore();

  useEffect(() => {
    const ymap = doc.getMap("store");
    const unbind = bind(store, ymap);

    return () => {
      unbind();
    };
  }, [doc]);

  return (
    <div>
      <button type="button" onClick={addPage}>
        Add Page
      </button>
      <h1>Pages</h1>
      <ul>
        {Object.entries(snap.pages).map(([id, page]) => (
          <li key={id}>{page.title}</li>
        ))}
      </ul>
    </div>
  );
}
