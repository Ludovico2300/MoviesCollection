import {
  FlatList,
  StyleSheet,
  Text,
  View,
  ActivityIndicator,
  TouchableOpacity
} from "react-native";
import React, { useState, useEffect } from "react";

import MovieCard from "../components/MovieCard";

// in questa pagina ho avuto problemi con typescript...come in tutte le altre

import { useNavigation } from "@react-navigation/native";

const HomeScreen = () => {
  const [movies, setMovies] = useState();
  const [fetched, setFetched] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);

  const navigation = useNavigation();

  React.useLayoutEffect(() => {
    navigation.setOptions({
      headerRight: () => (
        //@ts-ignore
        <TouchableOpacity
          onPress={() => navigation.navigate("FavoritesScreen" )}
        >
          <Text>Favorites</Text>
        </TouchableOpacity>
      ),
    });
  },[navigation]);

//inizio infinite loop

  const renderLoader = () => {
    return <ActivityIndicator size="large" color="#aaa" />;
  };

  const loadMoreItem = () => {
    console.log("load more");
    setCurrentPage(currentPage + 1);

    fetch(
      `https://api.themoviedb.org/3/movie/top_rated?api_key=a74169393e0da3cfbc2c58c5feec63d7&page=${currentPage}`
    )
      .then((response) => response.json())
      .then((data) => {
        setMovies([...movies, ...data.results]); //quando viene caricata la nuova pagina, perdo dei dettagli di film, probabilmente il fetch è più veloce del render
        setFetched(true);
        // console.log(movies, fetched);
      });
  };

//fine infinite loop

  useEffect(() => {
    fetch(
      `https://api.themoviedb.org/3/movie/top_rated?api_key=a74169393e0da3cfbc2c58c5feec63d7&page=${currentPage}`
    )
      .then((response) => response.json())
      .then((data) => {
        setMovies(data.results);
        setFetched(true);
        // console.log(movies, fetched);
      });
  }, [fetched, currentPage]); //per evitare l'errore del caricamento dell'app prima del fetch

  //creo il render item per poter usare FlatList
  const renderItem = ({ item }) => {
    return (
      <MovieCard
        key={`${item.id}+${Date.now()}`}
        id={item.id}
        title={item.title}
        rating={item.vote_average}
        cover={` https://image.tmdb.org/t/p/w500${item.poster_path}`}
      />
    );
  };

  return (
    <View style={styles.homeContainer}>

      <FlatList
        data={movies}
        renderItem={renderItem}
        keyExtractor={(item) => item.id}
        ListFooterComponent={renderLoader}
        onEndReached={loadMoreItem}
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
