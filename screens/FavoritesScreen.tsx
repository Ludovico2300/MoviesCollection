import { StyleSheet, FlatList, View, Text } from "react-native";
import React, { useState, useEffect } from "react";
import MovieCard from "../components/MovieCard";

import AsyncStorage from "@react-native-async-storage/async-storage";

interface Favorite{
  id: number;
  title: string;
  rating: number;
  cover: string;
}

const FavoritesScreen = () => {
  const [favorites, setFavorites] = useState<any|Favorite>();
  const [getted, setGetted] = useState<boolean>(false);
  const [refreshing, setRefreshing] = useState<boolean>(false);

  const getFavorites = async () => {
    try {
      const jsonValue : string|any = await AsyncStorage.getItem("fav");
      // console.log(typeof(jsonValue)); //string
      setFavorites(JSON.parse(jsonValue));
    } catch (e) {
      console.log(e);
    }
  };

  useEffect(() => {
    getFavorites();
    setGetted(true);
    setRefreshing(false);
  }, [getted, refreshing]);

  const handleRefresh = () => {
    setRefreshing(true);
  };

  //creo il render item per poter usare FlatList
  
  const renderItem : any= ({ item }: {item:Favorite}) => {
     return (<MovieCard
        key={`${item.id}&&${Date.now()}`}
        id={item.id}
        title={item.title}
        rating={item.rating}
        cover={`https://image.tmdb.org/t/p/w500${item.cover}`}
      />)
  };

    

  return (
    <View
    testID="favoritesViewId"
    >
        {// se favorites ha dati esegue il flatlist, altrimenti il text
        favorites ? 
        <FlatList
        data={favorites}
        renderItem={renderItem}
        keyExtractor={item => item.id}
        refreshing={refreshing}
        onRefresh={handleRefresh}
      /> 
      : <Text style={styles.noFavTitle}>No Favorites...</Text>
      }
      
    </View>
  );
};

export default FavoritesScreen;

const styles = StyleSheet.create({
  noFavTitle:{
    fontWeight: "bold",
    fontSize: 20,
  }
});
