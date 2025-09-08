"use client";
// hooks/api/useZones.ts
import { useFetch } from "@/hooks/useFetch";
import { ICategory, ICheckInSuccessResponse, IGate, ISubscription, IUserData, IZone } from "../lib/apiModels";
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
      setGates(data);
    }
  }, [data, isSuccess, setGates]);

  return query;
}

export function useLogin() {
  const setUser = useAppStore((s) => s.setUserData);
  const router = useRouter();

  return useMutation({
    mutationFn: async (loginData: { username: string; password: string }) => {
      const username = loginData.username.trim();
      const password = loginData.password.trim();
      if (username === "" || password === "") throw new Error("Please enter username and password.");

      return fetcher<IUserData>("/auth/login", {
        method: "POST",
        body: JSON.stringify({ username, password }),
      });
    },
    onSuccess(data, variables, context) {
      setUser(data);
      localStorage.setItem("user", JSON.stringify(data));
      router.push("/gates");
    },
  });
}

export function useGateZones(gateId: string, gate: IGate) {
  //
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

  useEffect(() => {
    const prevGate: IGate | null = localStorage.getItem("gate") ? JSON.parse(localStorage.getItem("gate") as string) : null;
    localStorage.setItem("gate", JSON.stringify({ ...gate, id: gateId }));
    let unsubscribeFn = () => {};
    if (wsClient.status === WebSocketStatusEnum.OPEN && gateId) {
      if (prevGate?.id !== gateId) {
        wsClient.unsubscribe(prevGate?.id as string);
      } else {
        wsClient.subscribe(gateId);
      }
      unsubscribeFn = wsClient.onMessage(onMessage);
    }

    return () => {
      if (wsClient.status === WebSocketStatusEnum.OPEN && prevGate?.id !== gateId) {
        unsubscribeFn();
        wsClient.unsubscribe(prevGate?.id as string);
      }
    };
  }, [wsClient.status, gateId]);

  return { zones, isSuccess, isLoading };
}

export function useCheckIn() {
  const { setCheckInSuccess } = useAppStore((s) => s);

  return useMutation({
    mutationFn: async ({ gateId, zoneId, type, subscriptionId }: { gateId: string; zoneId: string; type: "visitor" | "subscriber"; subscriptionId?: string }) => {
      return fetcher<ICheckInSuccessResponse>("/tickets/checkin", {
        method: "POST",
        body: JSON.stringify({ gateId, zoneId, type, subscriptionId }),
      });
    },
    onSuccess(data, variables, context) {
      setCheckInSuccess(data);
    },
  });
}

//use { status: string; message: string } as error
export function useValidateSubscription() {
  const { setSubscription } = useAppStore((s) => s);

  return useMutation<ISubscription, { status: string; message: string }, { id: string }>({
    mutationFn: async ({ id }: { id: string }) => {
      return fetcher<any>("/subscriptions/" + id);
    },
    onSuccess(data, variables, context) {
      setSubscription(data);
    },
  });
}

//
//
//
//
//
//admin dashboard
//
export function useToggleZone() {
  return useMutation({
    mutationFn: async ({ open, zoneId }: { open: boolean; zoneId: string }) => {
      return fetcher<{ zoneId: any; open: boolean }>("/admin/zones/" + zoneId + "/open", {
        method: "PUT",
        body: JSON.stringify({ open }),
        auth: true,
      });
    },
    onSuccess(data, variables, context) {
      //setCheckInSuccess(data);
    },
  });
}
