import { useMemo, useRef } from "react";
import { WebsocketProvider } from "y-websocket";
import { Doc } from "yjs";

export const useWebsocket = () => {
  const doc = useRef(new Doc()).current;
  useMemo(
    () => new WebsocketProvider("ws://localhost:1234", "room", doc),
    [doc]
  );

  return { doc };
};
