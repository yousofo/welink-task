"use client";
import { useRequireAuth } from "@/hooks/useRequireAuth";
import { IGate } from "@/lib/apiModels";
import { useGates } from "@/services/api";
import { useAppStore } from "@/store/store";
import Link from "next/link";
import React, { useEffect, useState } from "react";

function AdminGates() {
  const { data: gates } = useGates();
  const { config, setConfig } = useAppStore((s) => s);
  const isLoggedIn = useRequireAuth();
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) return null;
  if (!isLoggedIn) return null;

  function chooseGate(gate: IGate) {
    setConfig({ ...config, userMode: config.userMode, currentGate: gate });
  }

  return (
    <ul className="grid 2xl:grid-cols-5 xl:grid-cols-4 lg:grid-cols-3 sm:grid-cols-2   gap-4">
      {gates?.map((gate) => (
        <li
          key={gate.id}
          className="h-full relative p-3 overflow-hidden rounded-md bg-[#3270c81f] dark:bg-[#0f1c2e63] border border-[#1c76de] dark:border-[#0d3868]
    drop-shadow drop-shadow-gray-600/50 dark:drop-shadow-gray-800/50 text-gray-800 dark:text-gray-200"
        >
          {/* zone count badge */}
          <div className="absolute top-0.5 right-0 text-sm font-semibold  text-white  overflow-hidden ps-4">
            <div className="bg-green-600 dark:bg-green-800 py-0.5 pe-2  relative ">
              <span className="z-10">{gate.zoneIds?.length} zones</span>
              <span className="bg-green-600 dark:bg-green-800 absolute -top-2 -left-2 w-4 h-10 rotate-[-30deg] -z-10"></span>
            </div>
          </div>

          <h5 className="text-lg font-semibold mt-1">{gate.name}</h5>
          <p className="text-sm text-gray-600 dark:text-gray-400">{gate.location}</p>

          <Link
            href={`/gates/${gate.id}`}
            onClick={() => chooseGate(gate)}
            className="w-full text-center block mt-6 bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded "
          >
            Choose
          </Link>
        </li>
      ))}
    </ul>
  );
}

export default AdminGates;
