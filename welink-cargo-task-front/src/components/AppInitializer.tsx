"use client";

import { useMasterCategories, useMasterZones } from "@/services/api";
import { WebSocketStatusEnum, wsClient } from "@/services/ws";
import { useAppStore } from "@/store/store";
 import { useEffect } from "react";

function AppInitializer() {
  const { config, setConfig } = useAppStore((state) => state);

  useMasterCategories();
  useEffect(() => {
    // if (wsClient.status === WebSocketStatusEnum.CLOSED) {
    //   setConfig({ ...config, currentGate: null });
    // }
    if (wsClient.status !== WebSocketStatusEnum.OPEN && wsClient.status !== WebSocketStatusEnum.CONNECTING) {
      wsClient.connect();
    }

    //commented this for testing purposes
    //todo: check
    // return () => wsClient.disconnect();
  }, [wsClient.status]);

  return null;
}

export default AppInitializer;
