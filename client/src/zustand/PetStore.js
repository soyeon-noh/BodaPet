import create from "zustand";

const usePetStore = create((set, get) => ({
  pet: {
    id: "",
    userId: "test",
    name: "",
    videoPath: "",
  },
  setPet: (name, value) => {
    // console.log("set에 값이 들어오긴해 name", name);
    // console.log("set에 값이 들어오긴해 value", value);
    set((state) => ({ pet: { ...get().pet, [name]: value } }));

    // console.log("setPet data: ", get().pet);
  },

  onChangeHandler: (e) => {
    const { name, value } = e.target;

    set((state) => {
      get().setPet([name], value);
    });
  },
}));

export default usePetStore;
