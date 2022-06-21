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

    // console.log("setUser data: ", get().user);
  },

  onChangeHandler: (e) => {
    const { name, value } = e.target;

    set((state) => {

      get().setUser([name], value);
    });
  },

  resetUser: () => {
    set(() => ({
      user: {
        userId: "",
        password: "",
        email: "",
      },
    }));
  },

  loginUser: "",

  setLoginUser: () => {
    set(() => ({ loginUser: get().user }));
  },

  resetLoginUser: () => {
    set(() => ({
      loginUser: "",
    }));
  },
}));

export default useUserStore;
