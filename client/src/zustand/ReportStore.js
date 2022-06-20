import create from "zustand";

const useReportStore = create((set) => ({
  reportId: "",
  setReportId: (id) => set((state) => ({ reportId: id })),

  report: {
    userId: "",
    date: "",
    // time:"",
    move_time: [],
    visit_time: [],
    heatmap: "",
    scatter: "",
  },

  setReport: (reportInfo) => set((state) => ({ report: reportInfo })),
}));

export default useReportStore;
