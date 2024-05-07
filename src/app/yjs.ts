import { useMemo, useRef } from "react";
import { WebsocketProvider } from "y-websocket";
import { Doc } from "yjs";

export const useWebsocket = (room: string) => {
  const doc = useRef(new Doc()).current;
  useMemo(
    () => new WebsocketProvider("ws://localhost:1234", room, doc),
    [doc, room]
  );

  return { doc };
};
