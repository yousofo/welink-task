"use client";
import { useAppStore } from "@/store/store";
import Link from "next/link";
import { usePathname } from "next/navigation";
import React, { useEffect } from "react";

function GateHeader() {
  const { config, setConfig ,user} = useAppStore((state) => state);
  const pathname = usePathname();
  const { userMode, currentGate } = config;
  const connected = true;

  const activeModeClasses = " text-green-400   z-10  opacity-100 ";
  const btnClasses =
    "bg-gray-200 dark:bg-gray-700 py-1 px-2 rounded-md font-semibold border border-gray-300 dark:border-gray-600 cursor-pointer opacity-50 hover:opacity-100 ";

  function toggleMode(userMode: "visitor" | "subscriber") {
    setConfig({ ...config, userMode });
  }


  useEffect(() => {
    console.log(pathname);
  }, [pathname]);


  const isAdmin = user?.data.role.toLowerCase() === "admin";

  return (
    <header className="container mx-auto flex items-center justify-between p-4 border-b">
      <div className="flex items-center gap-4">
        <h2 suppressHydrationWarning>{config.currentGate?.name || "Gate"}</h2>
        <p className={connected ? "text-green-400" : "text-red-400"}>({connected ? "Connected" : "Disconnected"})</p>
      </div>
      <div className="flex items-center">
        <div className="flex gap-2">
          <button onClick={() => toggleMode("visitor")} className={btnClasses + (userMode === "visitor" ? activeModeClasses : "")}>
            Visitor
          </button>
          <button onClick={() => toggleMode("subscriber")} className={btnClasses + (userMode === "subscriber" ? activeModeClasses : "")}>
            Subscriber
          </button>
        </div>
        <div className="h-full border-s border-gray-300 dark:border-gray-600/50 ps-3 ms-3">
        {
          
        }
          <Link href="/dashboard" className="underline ">
            Login
          </Link>
        </div>
      </div>
    </header>
  );
}

export default GateHeader;
