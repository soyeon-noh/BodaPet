import create from "zustand";

const useAnalysisStore = create((set, get) => ({
  analysis: {
    videoPath: "",
    coordinate: [
      {
        petId: "",
        areaName: "",
        x1: "",
        y1: "",
        x2: "",
        y2: "",
      },
    ],
  },
  setAnalysis: (data) => set((state) => ({ analysis: data })),
  onChangeHandler: (e) => {
    const { name, value } = e.target;
    get().setAnalysis({ ...get().analysis, [name]: value });
  },
}));

export default useAnalysisStore;
