import { useAppStore } from "@/store/store";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";

export function useRequireGateId() {
  const storeGate = useAppStore((s) => s.config.currentGate);
  const [gate, setGate] = useState(storeGate);

  const { push } = useRouter();

  useEffect(() => {
    const gate = JSON.parse(localStorage.getItem("gate")!);
    setGate(gate);
    if (!gate) {
      // push("/login");
    }
  }, [storeGate?.id]);

  return !!gate;
}
