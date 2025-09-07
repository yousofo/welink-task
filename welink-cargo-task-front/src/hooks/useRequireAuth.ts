import { useAppStore } from "@/store/store";
import { useRouter } from "next/navigation";
import { useEffect } from "react";

export function useRequireAuth() {
  const { user } = useAppStore((s) => s);

  const { push } = useRouter();

  useEffect(() => {
    if (!user?.token) {
      push("/login");
    }
  }, [user?.token]);

  return !!user?.token;
}
