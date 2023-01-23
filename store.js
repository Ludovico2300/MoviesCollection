import {create} from 'zustand';


export const useStore = create((set) => ({
  page: 1,
  incrementPage: () => set((state) => ({ page: state.page + 1 })),
}));
