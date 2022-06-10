import create from "zustand";

const useUserStore = create((set, get) => ({
  user: {
    userId: "",
    password: "",
    email: "",
  },
  setUser: (name, value) => {
    // console.log("setUser에 값이 들어오긴해 name", name);
    // console.log("setUser에 값이 들어오긴해 value", value);
    set((state) => ({ user: { ...get().user, [name]: value } }));

    console.log("setUser data: ", get().user);
  },

  onChangeHandler: (e) => {
    const { name, value } = e.target;

    set((state) => {
      console.log("여기안와?");
      get().setUser([name], value);
    });
  },
}));

export default useUserStore;
