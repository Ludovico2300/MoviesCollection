import { FlatList, StyleSheet, Text, View, ActivityIndicator } from "react-native";
import React, { useState, useEffect } from "react";
import axios from "axios";

import TopBar from "../components/TopBar";
import SingleMovie from "../components/SingleMovie";

// in questa pagina ho avuto problemi con typescript...

const HomeScreen = () => {
  const [movies, setMovies] = useState();
  const [fetched, setFetched] = useState(false);
  const [currentPage, setCurrentPage] = useState(1)

  // const getMovies = () => {
  //   axios
  //     .get(
  //       `https://api.themoviedb.org/3/movie/top_rated?api_key=a74169393e0da3cfbc2c58c5feec63d7&page=2`
  //     )
  //     .then((res) => {
  //       setMovies(res.results);
  //       console.log(res.results);
  //       setFetched(true);
  //       console.log(movies, fetched);
  //     });
  // };

  // useEffect(() => {
  //   getMovies();
  // }, [fetched]);


const renderLoader=()=>{
  return(
    <ActivityIndicator size="large" color="#aaa"/>
  )
}

const loadMoreItem =()=>{
  console.log("load more");
  setCurrentPage(currentPage+1);

  fetch(
    `https://api.themoviedb.org/3/movie/top_rated?api_key=a74169393e0da3cfbc2c58c5feec63d7&page=${currentPage}`
  )
    .then((response) => response.json())
    .then((data) =>
    {
      setMovies([...movies,...data.results]);
      setFetched(true);
      // console.log(movies, fetched);
    }
    );

}


  useEffect(() => {
    fetch(
      `https://api.themoviedb.org/3/movie/top_rated?api_key=a74169393e0da3cfbc2c58c5feec63d7&page=${currentPage}`
    )
      .then((response) => response.json())
      .then((data) =>
      {
        setMovies(data.results);
        setFetched(true);
        // console.log(movies, fetched);
      }
      );
  }, [fetched, currentPage] ); //per evitare l'errore del caricamento dell'app prima del fetch


//creo il render item per poter usare FlatList
  const renderItem=({item}) =>{
    return(
      <SingleMovie
      key={item.id+Date.now()}
      id={item.id}
      title={item.title}
      rating={item.vote_average}
      cover={` https://image.tmdb.org/t/p/w500${item.poster_path}`}
    />
    )
  }

  return (
    <View style={styles.homeContainer}>
      <TopBar />


      <FlatList
      data={movies}
      renderItem={renderItem}
      keyExtractor={item=>item.id}
      ListFooterComponent={renderLoader}
      onEndReached={loadMoreItem}
      onEndReachedThreshold={0}
      />

      {/* {
        //uso && per controllare che in "movies" ci siano dati da mappare
        movies &&
          movies.map((movie) => (
            <SingleMovie
              key={movie.id}
              id={movie.id}
              title={movie.title}
              rating={movie.vote_average}
              cover={` https://image.tmdb.org/t/p/w500${movie.poster_path}`}
            />
          ))
      } */}
    </View>
  );
};

export default HomeScreen;

const styles = StyleSheet.create({
  homeContainer: {
    flex: 1,
  },
});
