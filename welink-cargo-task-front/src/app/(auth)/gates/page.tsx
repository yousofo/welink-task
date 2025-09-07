import AdminGates from "@/components/AdminGates";
import React from "react";

function Gates() {
  return (
    <>
      <header className="container mx-auto   items-center justify-between p-4">
        <div className="   text-center">
          <span className="text-xs text-red-600 dark:text-red-400">Employees only</span>
          <p className="text-lg font-semibold text-gray-600 dark:text-gray-200">Choose a gate to register it with WeLink for this location</p>
        </div>
        <hr className="container  my-2 border-gray-300/50" />
      </header>
      <main className="container mx-auto p-4">
        <AdminGates />
      </main>
    </>
  );
}

export default Gates;
