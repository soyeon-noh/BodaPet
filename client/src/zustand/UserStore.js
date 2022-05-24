import create from "zustand";

const useUserStore = create((set) => ({
  user: {
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

export default useUserStore;
