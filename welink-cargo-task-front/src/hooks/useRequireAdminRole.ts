import { useAppStore } from "@/store/store";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";

export function useRequireAdminRole() {
  const { userData } = useAppStore((s) => s);
  const [mounted, setMounted] = useState(false);
  const { push } = useRouter();

  useEffect(() => {
    setMounted(true);
  }, []);

  useEffect(() => {
    if (mounted && userData?.user.role.toLowerCase() !== "admin") {
      push("/login");
    }
  }, [userData?.user.role, mounted]);

  return userData?.user.role.toLowerCase() === "admin";
}
