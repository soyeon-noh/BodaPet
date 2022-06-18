import create from "zustand";

const useAreaStore = create((get, set) => ({
  name: "",
  coordinate: [],

  setArea: (data) => {
    set((state) => ({ name: data }));
  },

  setCoordinate: (data) => {
    set((state) => ({ cordinate: [...state.coordinate, data] }));
  },
}));

export default useAreaStore;
