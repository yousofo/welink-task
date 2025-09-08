import AdminGates from "@/components/AdminGates";
import GatesHeader from "@/components/GatesHeader";
import Link from "next/link";
import React from "react";

function Gates() {
  return (
    <>
      <GatesHeader />
      <main className="container mx-auto p-4">
        <AdminGates />
      </main>
    </>
  );
}

export default Gates;
