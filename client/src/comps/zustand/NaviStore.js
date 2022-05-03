import create from "zustand";

const useNaviStore = create((set) => ({
  activeNav: "",
  setActiveNav: () => set((state) => ({ activeNav: state })),
}));

export default useNaviStore;
