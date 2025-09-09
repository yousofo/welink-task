"use client";
import { useAppStore } from "@/store/store";
import { usePathname, useRouter } from "next/navigation";
import React, { useEffect, useState } from "react";

function Redirecter() {
  const router = useRouter();
  const pathname = usePathname();
  const { config, userData } = useAppStore((s) => s);
  const [mounted, setMounted] = useState(false);

  const allowedEmployeeRoutes = ["/login", "/gates", "/checkout"];
  const allowedPublicRoutes = ["/login", "/gates/"];

  useEffect(() => {
    const role = userData?.user.role.toLowerCase();
    const gate = config.currentGate;

    if (mounted) {
      switch (role) {
        case "admin": {
          break;
        }
        case "employee": {
          if (!allowedEmployeeRoutes.some((r) => pathname.startsWith(r))) {
            router.push("/login");
          }
          break;
        }
        default: {
          if (!allowedPublicRoutes.some((r) => pathname.startsWith(r)) || !gate) {
            console.log("redirecting to login");
            router.push("/login");
          }
          // else if (gate) router.push("/gates/" + gate.id);
          // else router.push("/login");

          break;
        }
      }
    }

    setMounted(true);
  }, [userData?.user.role, pathname, mounted]);

  return null;
}

export default Redirecter;
