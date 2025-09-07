import { useAppStore } from "@/store/store";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";

export function useRequireGateId() {
  const storeGate = useAppStore((s) => s.config.currentGate);
  const [gate, setGate] = useState(storeGate);

  const { push } = useRouter();

  useEffect(() => {
    const gateId = JSON.parse(localStorage.getItem("gate")!)?.id;
    setGate(gateId);
    if (!gateId) {
      push("/login");
    }
  }, [storeGate?.id]);

  return !!gate;
}
