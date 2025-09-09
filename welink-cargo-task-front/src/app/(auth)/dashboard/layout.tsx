"use client";
import NavLink from "@/components/NavLink";
import "./styles.css"
import { useRequireAdminRole } from "@/hooks/useRequireAdminRole";
import Link from "next/link";
import React, { useEffect, useState } from "react";
import { useAppStore } from "@/store/store";

function layout({ children }: { children: React.ReactNode }) {
  const [mounted, setMounted] = useState(false);
  const isAdmin = useRequireAdminRole();
  const {setUserData} = useAppStore((s) => s);

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!isAdmin) return null;
  if (!mounted) return null;

  function handleLogout() {
    setUserData(null);
    localStorage.removeItem("user");
  }
  return (
    <>
      <header className="text-2xl font-bold text-center container mx-auto p-4 h-16">
        <span className="ring-offset-1 text-[#4c036f]/10" style={{ WebkitTextStroke: "1px #4c036f" }}>
          WeLink
        </span>{" "}
        Admin Dashboard
      </header>
      <main className="flex gap-2 container mx-auto h-[calc(100vh-4rem)] pb-4">
        <aside className="p-2 bg-white/5 shadow rounded-xl  w-[200px] flex flex-col justify-between">
          <nav aria-label="Main Navigation" className="flex  flex-col [&>a]:p-3 [&>a]:rounded-xl [&>a]:transition">
            <NavLink activeClass="active-dashboard-link" href="/dashboard/control-panel">Control Panel</NavLink>
            <NavLink activeClass="active-dashboard-link" href="/dashboard/employees">Employees</NavLink>
            <NavLink activeClass="active-dashboard-link" href="/dashboard/reports">Parking State Reports</NavLink>
            <NavLink activeClass="active-dashboard-link" href="/dashboard/logs">Logs</NavLink>
          </nav>
          <div className="flex justify-center mt-4">
            <button
              className="text-sm font-semibold text-gray-600 dark:text-gray-200 bg-red-200 dark:bg-red-700/10 border border-red-200 dark:border-red-600 py-0.5 px-4 rounded-md underline"
              onClick={handleLogout}
            >
              Logout
            </button>
          </div>
        </aside>
        <div className="p-4 bg-white/5 shadow rounded-xl  w-[calc(100%-200px)]">{children}</div>
      </main>
    </>
  );
}

export default layout;
