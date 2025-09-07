import { useAppStore } from "@/store/store";
import { useRouter } from "next/navigation";
import { useEffect } from "react";

export function useRequireAdminRole() {
  const { user } = useAppStore((s) => s);

  const { push } = useRouter();

  useEffect(() => {
    if (user?.data.role.toLowerCase() !== "admin") {
      push("/login");
    }
  }, [user?.data.role]);

  return user?.data.role.toLowerCase() === "admin";
}
