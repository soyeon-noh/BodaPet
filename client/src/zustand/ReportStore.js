import create from "zustand";

const useReportStore = create((set, get) => ({
  reportId: "",
  setReportId: (id) => set((state) => ({ reportId: id })),

  reportTimeList: [], // {id, time}
  setReportTimeList: (times) => set(() => ({ reportTimeList: times })),

  report: {
    userId: "",
    date: "",
    // time:"",
    move_time: [],
    visit_time: [],
    heatmap: "",
    scatter: "",
    // heatmap: [],
    // scatter: [],
  },

  setReport: (reportInfo) => set((state) => ({ report: reportInfo })),
}));

export default useReportStore;
