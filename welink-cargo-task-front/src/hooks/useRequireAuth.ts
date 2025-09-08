import { useAppStore } from "@/store/store";
import { useRouter } from "next/navigation";
import { useEffect } from "react";

export function useRequireAuth() {
  const { userData } = useAppStore((s) => s);

  const { push } = useRouter();

  useEffect(() => {
    if (!userData?.token) {
      push("/login");
    }
  }, [userData?.token]);

  return !!userData?.token;
}
