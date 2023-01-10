import {  Image, StyleSheet, Text, TouchableOpacity, View } from "react-native";
import { AntDesign } from "@expo/vector-icons";
import React, { useEffect, useState } from "react";

//per risolvere can't find variable:navigation
import { useNavigation } from '@react-navigation/native'


interface MovieProps {
  id: number;
  title: string;
  rating: number;
  cover: string;
 
}



const MovieCard = ({ id, title, rating, cover }: MovieProps) => {
  const [movieDetails, setMovieDetails] = useState();
  const [fetchedDetails, setFetchedDetails] = useState(false);


  const navigation = useNavigation();

  useEffect(() => {
    fetch(
      `https://api.themoviedb.org/3/movie/${id}?api_key=a74169393e0da3cfbc2c58c5feec63d7`
    )
      .then((response) => response.json())
      .then((data) => {
        // console.log(data);
        setMovieDetails(data);
        setFetchedDetails(true);
        // console.log(movieDetails, fetchedDetails, id);
      });
  }, [fetchedDetails]); //per evitare l'errore del caricamento dell'app prima del fetch

  return (
    <TouchableOpacity
            // @ts-ignore
            onPress={()=>navigation.navigate("MovieScreen",{id: id, title: title, overview: movieDetails.overview, backDrop: ` https://image.tmdb.org/t/p/w500${movieDetails.backdrop_path}`})}

    >
      <View style={styles.container}>
        <Image style={styles.cover} source={{ uri: cover }} />

        <View style={styles.infoContainer}>
          <View>
            <Text style={styles.title}>{title}</Text>
          </View>

          <View style={styles.subDetails}>
            <View style={styles.date}>
              <AntDesign name="calendar" size={15} color="black" />
              {/* probabile errore di typescript, tipizzazione del risultato */}
              {/* @ts-ignore */}
              {movieDetails && <Text>{movieDetails?.release_date}</Text>}
            </View>
            <View style={styles.rating}>
              <AntDesign name="staro" size={15} color="black" />
              <Text>{rating}</Text>
            </View>
          </View>
        </View>
        <AntDesign name="right" size={24} color="lightgrey" />
      </View>
    </TouchableOpacity>
  );
};

export default MovieCard;

const styles = StyleSheet.create({
  container: {
    backgroundColor: "trasparent",
    flex: 1,
    flexDirection: "row",
    margin: 10,
    paddingVertical: 10,
    alignItems: "center",
    borderBottomWidth: 1,
    borderBottomColor: "lightgrey",
  },
  cover: {
    width: 80,
    height: 80,
    borderRadius: 5,
  },
  infoContainer: {
    flex: 1,
    margin: 5,
    // alignItems: "flex-start",
    justifyContent:"center"
  },
  title: {
    fontWeight: "bold",
    fontSize: 20,
  },
  rating: {
    flex: 1,
    flexDirection: "row",
    marginHorizontal: 2,
  },
  date: {
    flex: 1,
    flexDirection: "row",
    marginHorizontal: 2,
  },
  subDetails: {
    flex: 1,
    flexDirection: "row",
  },
});
