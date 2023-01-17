import {
  FlatList,
  StyleSheet,
  Text,
  View,
  ActivityIndicator,
  TouchableOpacity,
} from "react-native";
import React, { useState, useEffect } from "react";

import MovieCard from "../components/MovieCard";

// in questa pagina ho avuto problemi con typescript...come in tutte le altre

import { useNavigation } from "@react-navigation/native";



interface Movie{
  index?: number;
  id: number;
  title: string;
  vote_average: number;
  poster_path: string;
}

const HomeScreen = () => {
  const [movies, setMovies] = useState<any|Movie[]>([]);
  const [currentPage, setCurrentPage] = useState<number>(1);

  const navigation:any= useNavigation();

  React.useLayoutEffect(() => {
    navigation.setOptions({
      headerRight: () => (
        <TouchableOpacity
          onPress={() => navigation.navigate("FavoritesScreen")}
          testID="favoritesButtonID"
        >
          <Text>Favorites</Text>
        </TouchableOpacity>
      ),
    });
  }, [navigation]);

  //inizio infinite loop

  const renderLoader = () => {
    return <ActivityIndicator size='large' color='#aaa' />;
  };

  const loadMoreItem = () => {
    console.log("load more");
    console.log(
      `https://api.themoviedb.org/3/movie/top_rated?api_key=a74169393e0da3cfbc2c58c5feec63d7&page=${currentPage}`,
    );
    fetch(
      `https://api.themoviedb.org/3/movie/top_rated?api_key=a74169393e0da3cfbc2c58c5feec63d7&page=${currentPage}`,
    )
      .then((response) => response.json())
      .then((data) => {
        setMovies((prevMovies:Movie[]) => [...prevMovies, ...data.results]); //quando viene caricata la nuova pagina, perdo dei dettagli di film, probabilmente il fetch è più veloce del render
      });
  };

  //fine infinite loop

  const onBottomReached = () => {
    setCurrentPage((prevPage) => prevPage + 1);
  };

  useEffect(() => {
    loadMoreItem();
  }, [currentPage]); //per evitare l'errore del caricamento dell'app prima del fetch

  //creo il render item per poter usare FlatList
  const renderItem = ({ item }:{item:Movie}) => {
    return (
      <MovieCard
      key={`${item.id}&&${Date.now()}`}
      id={item.id}
        title={item.title}
        rating={item.vote_average}
        cover={`https://image.tmdb.org/t/p/w500${item.poster_path}`}
      />
    );
  };

  return (
    <View style={styles.homeContainer} testID="homeViewId">
      <FlatList
        data={movies}
        renderItem={renderItem}
        //@ts-ignore
        keyExtractor={item=> item.id} //errore ts, non capisco
        ListFooterComponent={renderLoader}
        onEndReached={onBottomReached}
        onEndReachedThreshold={0}
      />
    </View>
  );
};

export default HomeScreen;

const styles = StyleSheet.create({
  homeContainer: {
    flex: 1,
  },
});
