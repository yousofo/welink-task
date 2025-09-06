// stores/useAppStore.ts
import { ICategory, IGate, IUser, IZone } from "@/lib/apiModels";
import { create } from "zustand";

//from localstorage
function getItem<T>(key: string) {
  if (typeof window === "undefined") return null;
  const item = localStorage.getItem(key);
  return item ? (JSON.parse(item) as T) : null;
}

interface IAppStateConfig {
  userMode: "visitor" | "subscriber";
  currentGate: IGate | null;
}

type AppState = {
  user: IUser | null;
  config: IAppStateConfig;
  categories: ICategory[];
  zones: IZone[];
  gates: IGate[];
  setUser: (user: IUser) => void;
  setGates: (gates: IGate[]) => void;
  setZones: (zones: IZone[]) => void;
  updateZones: (updater: (zones: IZone[]) => IZone[]) => void;
  setCategories: (user: ICategory[]) => void;
  setConfig: (config: IAppStateConfig) => void;
  reset: () => void;
};

export const useAppStore = create<AppState>((set,get) => ({
  user: getItem<IUser>("user"),
  config: { userMode: "visitor", currentGate: getItem<IGate>("gate") },
  categories: [],
  zones: [],
  gates: [],
  setUser: (user) => set({ user }),
  setGates: (gates) => set({ gates }),
  setZones: (zones) => set({ zones }),
  updateZones: (updater: (zones: IZone[]) => IZone[]) => {
    const currentZones = get().zones;
    const newZones = updater(currentZones);
    console.log("newZones", newZones);
    set({ zones: newZones });
  },
  setCategories: (categories) => set({ categories }),
  setConfig: (config) => set({ config }),
  reset: () => set({ user: null }),
}));
