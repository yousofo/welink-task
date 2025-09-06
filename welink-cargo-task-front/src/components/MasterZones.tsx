"use client";
import { IZone } from "@/lib/apiModels";
import React, { use, useEffect } from "react";
import ZoneCard from "./ZoneCard";
import { useGateZones, useMasterZones } from "@/services/api";
// import { useWebSocket } from "@/hooks/useWebSocket";
import { useAppStore } from "@/store/store";

function MasterZones({ gateId }: { gateId: string }) {
  const { zones, isSuccess } = useGateZones(gateId);
  const { setZones } = useAppStore((s) => s);

  useEffect(() => {

  }, [zones, gateId]);

  return (
    <ul className="grid 2xl:grid-cols-5 xl:grid-cols-4 lg:grid-cols-3 sm:grid-cols-2   gap-4">
      {zones?.map((zone) => (
        <li key={zone.id}>
          <ZoneCard data={zone} />
        </li>
      ))}
    </ul>
  );
}

export default MasterZones;
