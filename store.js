// import create from 'zustand';


// export const useStore = create((set) => ({
//   page: 1,
//   movies: [],
//   fetchMovies: () => set(state => ({ count: state.count + 1 })),
//   incrementPage: () => set(state => ({ page: state.page + 1 })),
//   decrement: () => set(state => ({ count: state.count - 1 }))
// }));


import create from 'zustand'

const useStore = create((set) => ({
  bears: 0,
  increasePopulation: () => set((state) => ({ bears: state.bears + 1 })),
  removeAllBears: () => set({ bears: 0 }),
}))