"use client";
import { IZone } from "@/lib/apiModels";
import React, { use, useEffect, useState } from "react";
import ZoneCard from "./ZoneCard";
import { useGateZones, useMasterZones } from "@/services/api";
// import { useWebSocket } from "@/hooks/useWebSocket";
import { useAppStore } from "@/store/store";
import { useRequireGateId } from "@/hooks/useRequireGateId";

function MasterZones({ gateId }: { gateId: string }) {
  const { setZones, config } = useAppStore((s) => s);
  const { zones, isSuccess } = useGateZones(gateId,config.currentGate!);
  const hasGateId = useRequireGateId();
  const [mounted, setMounted] = useState(false);
  
  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) return null;
  if (!hasGateId) return null;

  return (
    <ul suppressHydrationWarning className="grid 2xl:grid-cols-5 xl:grid-cols-4 lg:grid-cols-3 sm:grid-cols-2   gap-4">
      {zones?.map((zone) => (
        <li key={zone.id}>
          <ZoneCard data={zone} userMode={config.userMode} />
        </li>
      ))}
    </ul>
  );
}

export default MasterZones;
