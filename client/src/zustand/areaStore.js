import create from "zustand";

const useAreaStore = create((get, set) => ({
  name: "",
  coordinate: [],

  setArea: (data) => {
    set((state) => ({ name: data }));

    console.log("setArea name: ", get().name);
  },

  setCoordinate: (data) => {
    set((state) => ({ cordinate: [...state.coordinate, data] }));
  },
}));

export default useAreaStore;
