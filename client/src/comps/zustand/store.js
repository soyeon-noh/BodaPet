import create from "zustand";

// zustand 예제
const useStore = create((set) => ({
  count: 0,
  증가() {
    set((state) => ({ count: state.count + 1 }));
  },
}));

export default useStore;
