import create from "zustand";

const useAnalysisStore = create((set, get) => ({
  analysis: {
    videoPath: "",
    thumbnailPath: "",
    videoLength: "",
    userId: "test",
    area: [{ name: "", coordinate: [] }],
    date: "",
    time: "",
  },

  setAnalysis: (name, value) => {
    set((state) => ({ analysis: { ...get().analysis, [name]: value } }));
  },

  onChangeHandler: (e) => {
    const { name, value } = e.target;

    set((state) => {
      get().setAnalysis([name], value);
    });
    console.log(get().analysis);
  },

  areaList: [
    {
      id: 1,
      name: "물그릇",
      color: "red",
      checked: false,
    },
    {
      id: 2,
      name: "밥그릇",
      color: "orange",
      checked: false,
    },
    {
      id: 3,
      name: "화장실",
      color: "green",
      checked: false,
    },
  ],

  setAreaList: (area) => {
    set((state) => ({ areaList: [...get().areaList, area] }));
    console.log("저장소 areaList", get().areaList);
  },

  setFilteredAreaList: (filtered) => {
    set(() => ({ areaList: filtered }));
  },
}));

export default useAnalysisStore;
