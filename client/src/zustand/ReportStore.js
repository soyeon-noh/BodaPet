import create from "zustand";

const useReportStore = create((set) => ({
  report: {
    date: "",
    activity: "",
    area: [
      {
        name: "",
        value: "",
      },
    ],
    video: "",
  },
  setUser: (data) => set((state) => ({ user: data })),
}));

export default useReportStore;
