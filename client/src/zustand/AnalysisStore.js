import create from "zustand";

const useAnalysisStore = create((set, get) => ({
  analysis: {
    videoPath: "",
    thumbnailPath: "",
    userId: "test",
    area: {},
    date: "",
    time: "",
  },

  setAnalysis: (name, value) => {
    set((state) => ({ analysis: { ...get().analysis, [name]: value } }));
  },

  setAnalysisArea: (name, value) => {
    set(() => ({
      analysis: {
        ...get().analysis,
        area: { ...get().analysis.area, [name]: value },
      },
    }));
  },
  resetAnalysis: () => {
    set(() => ({
      videoPath: "",
      thumbnailPath: "",
      userId: "test",
      area: {},
      date: "",
      time: "",
    }));
  },

  onChangeHandler: (e) => {
    const { name, value } = e.target;

    set((state) => {
      get().setAnalysis([name], value);
    });
    console.log(get().analysis);
  },

  draw: "",
  setDraw: (value) => {
    set((state) => ({ draw: value }));
  },

  coordinate: "",
  setCoordinate: (name, value) => {
    set((state) => ({ coordinate: { ...get().coordinate, [name]: value } }));
  },
  resetCoordinate: () => {
    set(() => ({ coordinate: "" }));
  },

  areaList: [
    {
      id: 1,
      name: "물그릇",
      color: "blue",
      state: "",
    },
    {
      id: 2,
      name: "밥그릇",
      color: "red",
      state: "",
    },
    {
      id: 3,
      name: "화장실",
      color: "green",
      state: "",
    },
  ],

  setAreaList: (area) => {
    set((state) => ({ areaList: [...get().areaList, area] }));
    console.log("저장소 areaList", get().areaList);
  },

  setFilteredAreaList: (filtered) => {
    set(() => ({ areaList: filtered }));
  },

  incorrect: { color: "red", fontSize: "small" },
  correct: { color: "blue", fontSize: "small", marginLeft: "8px" },
}));

export default useAnalysisStore;
