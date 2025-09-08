"use client";
import NavLink from "@/components/NavLink";
import "./styles.css"
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
      <header className="text-2xl font-bold text-center container mx-auto p-4 h-16">
        <span className="ring-offset-1 text-[#4c036f]/10" style={{ WebkitTextStroke: "1px #4c036f" }}>
          WeLink
        </span>{" "}
        Admin Dashboard
      </header>
      <main className="flex gap-2 container mx-auto h-[calc(100vh-4rem)] pb-4">
        <aside className="p-2 bg-white/5 shadow rounded-xl  w-[200px]">
          <nav aria-label="Main Navigation" className="flex  flex-col [&>a]:p-3 [&>a]:rounded-xl [&>a]:transition">
            <NavLink activeClass="active-dashboard-link" href="/dashboard/control-panel">Control Panel</NavLink>
            <NavLink activeClass="active-dashboard-link" href="/dashboard/employees">Employees</NavLink>
            <NavLink activeClass="active-dashboard-link" href="/dashboard/reports">Parking State Reports</NavLink>
            <NavLink activeClass="active-dashboard-link" href="/dashboard/logs">Logs</NavLink>
          </nav>
        </aside>
        <div className="p-4 bg-white/5 shadow rounded-xl  w-[calc(100%-200px)]">{children}</div>
      </main>
    </>
  );
}

export default layout;
