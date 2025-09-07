"use client";
import { useRequireAdminRole } from "@/hooks/useRequireAdminRole";
import Link from "next/link";
import React, { useEffect, useState } from "react";

function layout({ children }: { children: React.ReactNode }) {
  const [mounted, setMounted] = useState(false);
  const isAdmin = useRequireAdminRole();

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!isAdmin) return null;
  if (!mounted) return null;

  return (
    <>
      <header>WeLink Admin Dashboard</header>
      <main>
        <aside>
          <nav aria-label="Main Navigation" className="flex gap-6 p-4 bg-white shadow">
            <Link href="dashboard/employees">Employees</Link>
            <Link href="dashboard/reports">Parking State Reports</Link>
            <Link href="dashboard/control-panel">Control Panel</Link>
            <Link href="dashboard/logs">Logs</Link>
          </nav>
        </aside>
        <div>{children}</div>
      </main>
    </>
  );
}

export default layout;
