import { create } from "zustand";
import { createJSONStorage, persist } from "zustand/middleware";

interface AppState {
  isConnected: boolean;
  setIsConnected: (status: boolean) => void;
}

const useAppStore = create<AppState>()(
  persist(
    (set) => ({
      isConnected: false,
      setIsConnected: (status) => set({ isConnected: status }),
    }),
    {
      name: "hubspot-extension-storage",
      storage: createJSONStorage(() => localStorage),
      partialize: (state) => ({ isConnected: state.isConnected }),
    }
  )
);
