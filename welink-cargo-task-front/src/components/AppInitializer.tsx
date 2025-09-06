"use client";

import { useMasterCategories, useMasterZones } from "@/services/api";
import { wsClient } from "@/services/ws";
import { useAppStore } from "@/store/store";
import { usePathname, useRouter } from "next/navigation";
import { useEffect } from "react";

function AppInitializer() {
  const router = useRouter();
  const pathname = usePathname();
  const config = useAppStore((state) => state.config);
  
  useMasterCategories();
  useEffect(() => {
    wsClient.connect();
    if (!localStorage.getItem("token") && !config.currentGate) {
      router.push("/login");
    }else if (config.currentGate) {
      router.push("/gates/"+config.currentGate.id);
    }
  }, []);

  

  return null;
}

export default AppInitializer;
