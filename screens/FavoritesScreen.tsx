import { StyleSheet, FlatList, View } from "react-native";
import React, { useState, useEffect } from "react";
import MovieCard from "../components/MovieCard";

import AsyncStorage from "@react-native-async-storage/async-storage";

const FavoritesScreen = () => {
  const [favorites, setfavorites] = useState([]);
  const [getted, setGetted] = useState(false);

  const getFavorites = async () => {
    try {
      const jsonValue = await AsyncStorage.getItem("fav");
      //@ts-ignore
      setfavorites(JSON.parse(jsonValue));
    } catch (e) {
      console.log(e);
    }

    console.log("done", favorites);
  };

  useEffect(() => {
    getFavorites();
    setGetted(true);
  }, [getted]);

  //creo il render item per poter usare FlatList
  //@ts-ignore
  const renderItem = ({ item }) => {
    return (
      <MovieCard
        key={`${item.id}+${Date.now()}`}
        id={item.id}
        title={item.title}
        rating={item.rating}
        cover={`https://image.tmdb.org/t/p/w500${item.cover}`}
      />
    );
  };

  return (
    <View>
      <FlatList
        data={favorites}
        renderItem={renderItem}
        keyExtractor={(item) => item.id}
      />
    </View>
  );
};

export default FavoritesScreen;

const styles = StyleSheet.create({});
