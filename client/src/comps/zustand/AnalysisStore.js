import React from "react";
import create from "zustand";

// zustand 예제
const useAnalysisStore = create((set) => ({
  count: 0,
  증가() {
    set((state) => ({ count: state.count + 1 }));
  },
}));

export default useAnalysisStore;
