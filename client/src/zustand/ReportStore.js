import create from "zustand";

const useReportStore = create((set) => ({
  report: {
    id: "",
    name: "",
    password: "",
    email: "",
  },
  setReport: (data) => set((state) => ({ report: data })),
}));

export default useReportStore;
