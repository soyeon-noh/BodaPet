import create from "zustand";

const useUserStore = create((get, set) => ({
  user: {
    id: "",
    name: "",
    password: "",
    passwordCheck: "",
    email: "",
  },

  // setReport: (data) => set((state) => ({ report: data })),

  setUser: (data) => {
    console.log("setUser data: ", data);
    set({ user: data });
  },

  // setId: (data) => set({ id: data }),
  // setName: (data) => set({ name: data }),
  // setPassword: (data) => set({ password: data }),
  // setPasswordCheck: (data) => set({ passwordCheck: data }),
  // setEmail: (data) => set({ email: data }),

  // onChangeHandler: (e) => {
  //   const { name, value } = e.target;
  //   setReport({ ...get().user, [name]: value });
  //   console.log("괜찮아", name, value);
  // },
}));

export default useUserStore;
