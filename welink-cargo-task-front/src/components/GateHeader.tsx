"use client";
import { useAppStore } from "@/store/store";
import Link from "next/link";
import { usePathname } from "next/navigation";
import React, { useEffect } from "react";

function GateHeader() {
  const { config, setConfig, userData, setUserData } = useAppStore((state) => state);
  const pathname = usePathname();
  const { userMode, currentGate } = config;
  const connected = true;

  const activeModeClasses = " text-green-400   z-10  opacity-100 ";
  const btnClasses = "bg-gray-200 dark:bg-gray-700 py-1 px-2 rounded-md font-semibold border border-gray-300 dark:border-gray-600 cursor-pointer opacity-50 hover:opacity-100 ";

  function toggleMode(userMode: "visitor" | "subscriber") {
    setConfig({ ...config, userMode });
  }

  function handleLogout() {
    setUserData(null);
    localStorage.removeItem("user");
  }
  const isEmployee = userData?.user.role.toLowerCase() === "employee";

  return (
    <header className="container mx-auto flex flex-col gap-4 sm:flex-row items-center justify-between p-4 border-b">
      <div className="flex items-center">
        {isEmployee && (
          <Link href="/gates" className="flex items-center gap-2 border-e pe-3 me-3 border-gray-300 dark:border-gray-600/50 underline">
            All Gates
          </Link>
        )}
        <div className="flex items-center gap-2 ">
          <h2 suppressHydrationWarning>{config.currentGate?.name}</h2>
          <p className={" text-xs " + (connected ? "text-green-400" : "text-red-400")}>({connected ? "Connected" : "Disconnected"})</p>
        </div>
      </div>
      <div className="flex items-center">
        {isEmployee ? (
          <div>
            <Link href="/checkout" className="bg-green-200 dark:bg-green-400/10 py-1 px-2 rounded-md font-semibold border border-green-300 dark:border-green-600 cursor-pointer  hover:opacity-90">
              Check out a Ticket
            </Link>
          </div>
        ) : (
          <div className="flex gap-2">
            <button onClick={() => toggleMode("visitor")} className={btnClasses + (userMode === "visitor" ? activeModeClasses : "")}>
              Visitor
            </button>
            <button onClick={() => toggleMode("subscriber")} className={btnClasses + (userMode === "subscriber" ? activeModeClasses : "")}>
              Subscriber
            </button>
          </div>
        )}
        <div className="h-full border-s border-gray-300 dark:border-gray-600/50 ps-3 ms-3">
          {isEmployee ? (
            <button onClick={handleLogout} className="text-red-500 underline">
              Logout
            </button>
          ) : (
            <Link href="/dashboard" className="underline ">
              Login
            </Link>
          )}
        </div>
      </div>
    </header>
  );
}

export default GateHeader;
