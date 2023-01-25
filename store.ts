import {create} from 'zustand';
import { persist, createJSONStorage } from 'zustand/middleware';
import { Movie } from './screens/HomeScreen';
import produce from 'immer';
import AsyncStorage from '@react-native-async-storage/async-storage';

//interface per i dati dello store dei Movie
interface MovieStateData {
  page: number,
  movies: Movie[]
}

//interface per i metodi dello store dei Movie
interface MovieStateMethod {
  incrementPage: ()=> void,
  appendMovies: (movies: Movie[])=> void,
  emptyMovies: ()=>void
}

//interface per unire le interfaces dello store dei Movie
interface MovieState extends MovieStateData,MovieStateMethod{}


export const useStore = create<MovieState>(
    (set) => ({
  page: 1,
  movies: [],

  incrementPage:()=>set( produce((state) => {
    return {
      page: state.page + 1
    }
  })),

  appendMovies: (movies) => set( produce((state: MovieState) => {
    return {
      movies: [...state.movies, ...movies]
    }
  }),
),

  emptyMovies: ()=>set(produce((state)=>{
    state.movies= []
  }))
})
);



//interface per i dati dello store dei Favs
interface FavMovieStateData {
  favoritesMovies: Movie[]
}
//interface per i metodi dello store dei Favs
interface FavMovieStateMethod {
  addFavMovies: (movie: Movie)=> void,
  removeFavMovies: (movie: Movie)=> void,
}

//interface per unire le interfaces dello store dei Favs
interface FavMovieState extends FavMovieStateData, FavMovieStateMethod{}


export const useStoreFav = create<FavMovieState>(
  //@ts-ignore
  persist(
      (set) => ({
        favoritesMovies: [],
        addFavMovies: (movie) => {
          set((state) => ({
            favoritesMovies: [...state.favoritesMovies, movie],
          }));
        },
        removeFavMovies: (movie) => {
          set((state)=>{
            for (let i = 0; i < state.favoritesMovies?.length; i++) {
              if (state.favoritesMovies[i].title === movie.title) {
                state.favoritesMovies.splice(i, 1); 
              }
            }
            return {favoritesMovies: [...state.favoritesMovies]};
          })
        },
      })
      ,
      {
        //con persist e la gestione dello storage, non è necessario richiamare getItem e setItem,
        //viene gestito tutto dallo store, a aptto che le modifiche si effettuino con i metodi dello store!!
        name: "favorites-storage",
        storage: createJSONStorage(() => AsyncStorage),
      }
    )
);
