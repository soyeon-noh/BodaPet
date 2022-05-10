import create from "zustand";

const useActiveNaviStore = create((set) => ({
  activeNav: "",
  setActiveNav: (nav) => set((state) => ({ activeNav: nav })),
}));

export default useActiveNaviStore;
