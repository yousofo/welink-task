"use client";
import { useAppStore } from "@/store/store";
import Link from "next/link";
import React from "react";

function GatesHeader() {
  const { userData } = useAppStore((state) => state);
  const isAdmin = userData?.user?.role.toLowerCase() === "admin";
  console.log("userData: ",userData);
  console.log("isAdmin: ",isAdmin);

  return (
    <header className="container mx-auto   items-center justify-between p-4">
      <div className=" ">
        <span className="text-xs text-red-600 dark:text-red-400">Employees only</span>
        <div className="flex items-center justify-between mt-2">
          <p className="text-lg font-semibold text-gray-600 dark:text-gray-200">Choose a gate to register it with WeLink for this location</p>
          {isAdmin && (
            <Link
              href="/dashboard/control-panel"
              className="text-sm font-semibold text-gray-600 dark:text-gray-200 bg-purple-200 dark:bg-purple-700/10 border border-purple-200 dark:border-purple-600 py-0.5 px-4 rounded-md underline"
            >
              Dashboard
            </Link>
          )}
        </div>
      </div>
      <hr className="container  my-2 border-gray-300/50" />
    </header>
  );
}

export default GatesHeader;
