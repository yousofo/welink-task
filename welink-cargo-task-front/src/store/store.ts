"use client";
// stores/useAppStore.ts
import { ICategory, ICheckInSuccessResponse, IGate, ISubscription, IUserData, IZone } from "@/lib/apiModels";
import { create } from "zustand";
import { persist } from "zustand/middleware";

//from localstorage
export function getItem<T>(key: string) {
  if (typeof window === "undefined") return null;
  const item = localStorage.getItem(key);
  return item ? (JSON.parse(item) as T) : null;
}

interface IAppStateConfig {
  userMode: "visitor" | "subscriber";
  currentGate: IGate | null;
  isConnected: boolean;
}

type AppState = {
  userData: IUserData | null;
  config: IAppStateConfig;
  categories: ICategory[];
  subscription: ISubscription | null;
  zones: IZone[];
  gates: IGate[];
  checkInSuccess: ICheckInSuccessResponse | null;
  //
  // actions
  //
  setUserData: (userData: IUserData) => void;
  setSubscription: (subscriptionId: ISubscription | null) => void;
  setCheckInSuccess: (checkInSuccess: ICheckInSuccessResponse | null) => void;
  setGates: (gates: IGate[]) => void;
  setZones: (zones: IZone[]) => void;
  updateZones: (updater: (zones: IZone[]) => IZone[]) => void;
  setCategories: (user: ICategory[]) => void;
  setConfig: (config: IAppStateConfig) => void;
  reset: () => void;
};

export const useAppStore = create<AppState>()(
  persist(
    (set, get) => ({
      userData: null,
      config: { userMode: "visitor", isConnected: false, currentGate: null },
      categories: [],
      subscription: null,
      zones: [],
      gates: [],
      checkInSuccess: null,
      error: null,

      // actions
      setUserData: (userData) => set({ userData }),
      setSubscription: (subscription) => set({ subscription }),
      setCheckInSuccess: (checkInSuccess) => set({ checkInSuccess }),
      setGates: (gates) => set({ gates }),
      setZones: (zones) => set({ zones }),
      updateZones: (updater) => {
        const currentZones = get().zones;
        const newZones = updater(currentZones);
        set({ zones: newZones });
      },
      setCategories: (categories) => set({ categories }),
      setConfig: (config) => set({ config }),
      reset: () => set({ userData: null, config: { userMode: "visitor", isConnected: false, currentGate: null } }),
    }),
    {
      name: "app-storage", 
      partialize: (state) => ({
        userData: state.userData,
        config: state.config,
        gates: state.gates,
      }),
    }
  )
);
