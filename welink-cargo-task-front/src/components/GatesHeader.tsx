"use client";
import { useAppStore } from "@/store/store";
import Link from "next/link";
import React from "react";

function GatesHeader() {
  const { userData } = useAppStore((state) => state);
  const isAdmin = userData?.user?.role.toLowerCase() === "admin";
  console.log("userData: ", userData);
  console.log("isAdmin: ", isAdmin);

  return (
    <header className="container mx-auto   items-center justify-between p-4">
      <div className=" ">
        <span className="text-xs text-red-600 dark:text-red-400">Employees only</span>
        <div className="flex items-center justify-between mt-2">
          <p className="text-lg font-semibold text-gray-600 dark:text-gray-200">Choose a gate to register it with WeLink for this location</p>
          <div>
            <Link href="/checkout" className="bg-green-200 dark:bg-green-400/10 py-1 px-2 rounded-md font-semibold border border-green-300 dark:border-green-600 cursor-pointer  hover:opacity-90">Check out a Ticket</Link>
          </div>
        </div>
      </div>
      <hr className="container  my-2 border-gray-300/50" />
    </header>
  );
}

export default GatesHeader;
