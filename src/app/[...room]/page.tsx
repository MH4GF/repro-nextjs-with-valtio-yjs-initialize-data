"use client";

import { useEffect } from "react";
import { addPage, store, useStore } from "../store";
import { useWebsocket } from "../yjs";
import { bind } from "valtio-yjs";
import Link from "next/link";

export default function Home({
  params: { room: _room },
}: {
  params: { room: string[] };
}) {
  const room = _room.join("/");
  const { doc } = useWebsocket(room);
  const snap = useStore();

  useEffect(() => {
    const ymap = doc.getMap(room);
    ymap.observeDeep((events) => {
      console.log("ymap events", events);
    });
    doc.on("update", (origin, doc, tr) => {
      console.log("doc update", origin, doc, tr);
    });

    const unbind = bind(store, ymap);

    return () => {
      unbind();
    };
  }, [doc, room]);

  return (
    <div>
      <button type="button" onClick={() => addPage(room)}>
        Add Page
      </button>
      <h1>Pages</h1>
      <ul>
        {Object.entries(snap.pages).map(([id, page]) => (
          <li key={id}>{page.title}</li>
        ))}
      </ul>
      <div>
        <h2>All Rooms</h2>
        <ul>
          <li>
            <Link href="/foo">/foo</Link>
          </li>
          <li>
            <Link href="/bar">/bar</Link>
          </li>
          <li>
            <Link href="/baz">/baz</Link>
          </li>
        </ul>
      </div>
    </div>
  );
}
