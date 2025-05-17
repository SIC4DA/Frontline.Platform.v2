import { create } from "zustand";
import { persist } from "zustand/middleware";

interface SidebarState {
  isOpen: boolean;
  isUpdated: boolean;
  toggle: () => void;
  setSidebarState: (state: boolean) => void;
}

export const useSidebarStore = create<SidebarState>()(
  persist(
    (set) => ({
      isOpen: false,
      isUpdated: false,
      toggle: () => set((state) => ({ isOpen: !state.isOpen, isUpdated: true })),
      setSidebarState: (state: boolean) => set({ isOpen: state, isUpdated: true }),
    }),
    {
      name: "sidebarState",
    },
  ),
);
