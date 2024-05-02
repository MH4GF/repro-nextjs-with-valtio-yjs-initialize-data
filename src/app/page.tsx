"use client";

import { addPage, useStore } from "./store";

export default function Home() {
  const snap = useStore();

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
