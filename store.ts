import {create} from 'zustand';
import { persist, createJSONStorage } from 'zustand/middleware';
import { Movie } from './screens/HomeScreen';
import produce from 'immer';
import AsyncStorage from '@react-native-async-storage/async-storage';


interface MovieStateData {
  page: number,
  movies: Movie[]
}

interface MovieStateMethod {
  incrementPage: ()=> void,
  appendMovies: (movies: Movie[])=> void,
  emptyMovies: ()=>void
}

interface MovieState extends MovieStateData,MovieStateMethod{}


export const useStore = create<MovieState>(
    (set) => ({
  page: 1,
  movies: [],
  incrementPage: () => set((state) => ({ page: state.page + 1 })),
  appendMovies: (movies) => set((state) => ({ movies: [...state.movies, ...movies] })),
  emptyMovies: ()=>set(produce((state)=>{
    state.movies= []
  }))
})
);



interface FavMovieStateData {
  favoritesMovies: Movie[]
}

interface FavMovieStateMethod {
  appendFavMovies: (favoritesMovies: Movie[])=> void,
}

interface FavMovieState extends FavMovieStateData, FavMovieStateMethod{}


export const useStoreFav = create<FavMovieState>(
  persist(
    (set) => ({
  favoritesMovies: [],
  appendFavMovies: (favoritesMovies) => set((state) => ({ favoritesMovies: [...state.favoritesMovies, ...favoritesMovies] })),
}),{
name: "favorites",
getStorage: () => AsyncStorage,
})
);