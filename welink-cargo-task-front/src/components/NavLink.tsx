"use client";
import Link from "next/link";
import { usePathname } from "next/navigation";
import React from "react";

function NavLink({
  children,
  href,
  className,
  activeClass,
}: Readonly<{
  children: React.ReactNode;
  href: string;
  className?: string;
  activeClass?: string;
}>) {
  const pathname = usePathname();
  const isActive = pathname === href;

  return (
    <Link href={href} className={className + " " + (isActive ? activeClass : "")}>
      {children}
    </Link>
  );
}

export default NavLink;
