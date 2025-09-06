"use client";
// hooks/api/useZones.ts
import { useFetch } from "@/hooks/useFetch";
import { ICategory, ICheckInSuccessResponse, IGate, IUser, IZone } from "../lib/apiModels";
import { useAppStore } from "@/store/store";
import { useCallback, useEffect, useRef } from "react";
import { useMutation } from "@tanstack/react-query";
import { fetcher } from "@/lib/fetcher";
import { useRouter } from "next/navigation";
// import { useWebSocket } from "@/hooks/useWebSocket";
import { WebSocketStatusEnum, wsClient, WSMessage } from "./ws";

const rootUrl = process.env.NEXT_PUBLIC_API_URL;

//public api

export function useMasterZones() {
  const query = useFetch<IZone[]>({
    queryKey: ["master/zones"],
    url: "/master/zones",
  });

  const { data, isSuccess } = query;

  const setZones = useAppStore((s) => s.setZones);

  useEffect(() => {
    if (isSuccess && data) {
      console.log("zones: ", data);
      setZones(data);
    }
  }, [data, isSuccess, setZones]);

  return query;
}

export function useMasterCategories() {
  const query = useFetch<ICategory[]>({
    queryKey: ["master/categories"],
    url: "/master/categories",
  });

  const { data, isSuccess } = query;

  const setCategories = useAppStore((s) => s.setCategories);

  useEffect(() => {
    if (isSuccess && data) {
      console.log("categories: ", data);
      setCategories(data);
    }
  }, [data, isSuccess, setCategories]);

  return query;
}

export function useGates() {
  const query = useFetch<IGate[]>({
    queryKey: ["master/gates"],
    url: "/master/gates",
  });

  const { data, isSuccess } = query;

  const setGates = useAppStore((s) => s.setGates);

  useEffect(() => {
    if (isSuccess && data) {
      console.log("gates: ", data);
      setGates(data);
    }
  }, [data, isSuccess, setGates]);

  return query;
}

export function useLogin() {
  const setUser = useAppStore((s) => s.setUser);
  const router = useRouter();

  return useMutation({
    mutationFn: async (loginData: { username: string; password: string }) => {
      const username = loginData.username.trim();
      const password = loginData.password.trim();
      console.log("logging in", username, password);
      if (username === "" || password === "") throw new Error("Please enter username and password.");

      return fetcher<IUser>("/auth/login", { method: "POST", body: JSON.stringify({ username, password }) });
    },
    onSuccess(data, variables, context) {
      setUser(data);
      console.log("logged in", data);
      localStorage.setItem("token", data.token);
      router.push("/gates");
    },
  });
}

export function useGateZones(gateId: string) {
  const { setZones, zones, updateZones } = useAppStore((s) => s);
  const { data, isLoading, isSuccess } = useFetch<IZone[]>({
    queryKey: [`gate${gateId}/zones`],
    url: "/master/zones?gateId=" + gateId,
  });

  useEffect(() => {
    if (isSuccess && data) {
      setZones(data);
    }
  }, [data, isSuccess]);

  const onMessage = useCallback(
    (msg: WSMessage) => {
      if (msg.type === "zone-update") {
        const receivedUpdatedZone = msg.payload as IZone;
        updateZones((currentZones: IZone[]) => {
          console.log("old zones:", currentZones);
          const oldZoneIx = currentZones.findIndex((zone) => zone.id === receivedUpdatedZone.id);

          if (oldZoneIx !== -1) {
            return currentZones.map((zone, index) => (index === oldZoneIx ? receivedUpdatedZone : zone));
          } else {
            return [...currentZones, receivedUpdatedZone];
          }
        });
      }
    },
    [setZones]
  );

  const didRun = useRef(false);
  useEffect(() => {
    if (wsClient.status === WebSocketStatusEnum.OPEN && (data?.length ?? 0 > 0)) {
      if (didRun.current) return;
      didRun.current = true;
      wsClient.onMessage(onMessage);
      wsClient.subscribe(gateId);
    }

    return () => wsClient.unsubscribe(gateId);
  }, [wsClient.status, data?.length]);

  return { zones, isSuccess, isLoading };
}

export function useCheckIn() {
  const { setCheckInSuccess } = useAppStore((s) => s);

  return useMutation({
    mutationFn: async ({ gateId, zoneId, type, subscriptionId }: { gateId: string; zoneId: string; type: "visitor" | "subscriber"; subscriptionId?: string }) => {
      return fetcher<ICheckInSuccessResponse>("/tickets/checkin", { method: "POST", body: JSON.stringify({ gateId, zoneId, type, subscriptionId }) });
    },
    onSuccess(data, variables, context) {
      setCheckInSuccess(data);
    },
  });
}
