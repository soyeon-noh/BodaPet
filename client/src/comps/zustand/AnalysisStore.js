import create from "zustand";

const useAnalysisStore = create((set) => ({
  path: 0,
  setPath: (num) =>
    set((state) => ({
      path: "/analysis" + num + 1,
    })),
}));

export default useAnalysisStore;
