import { FlatList, View, Text,TouchableOpacity } from "react-native";
import React, { useState, useEffect } from "react";
import MovieCard from "../components/MovieCard";
import { AntDesign } from "@expo/vector-icons";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { useNavigation } from "@react-navigation/native";
import { useStoreFav } from "../store";

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


const{favoritesMovies, addFavMovies}=useStoreFav();


  useEffect(() => {
    setGetted(true);
    setRefreshing(false);
  }, [getted, refreshing]);

  const handleRefresh = () => {
    setRefreshing(true);
  };

  const navigation = useNavigation();

   //add "Back Arrow" to Movie Info Screen Header
   React.useLayoutEffect(() => {
    navigation.setOptions({
      headerLeft: () => (
        <TouchableOpacity
          onPress={() => navigation.goBack()}
          testID="goBackBtn"
        >
          {/* @ts-ignore */}
          <AntDesign name='leftcircleo' size={20} color={"black"}/>
        </TouchableOpacity>
      ),
    });
  }, [navigation]);

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
       
        <FlatList
        testID="favoritesFlatListId"
        data={favoritesMovies}
        renderItem={renderItem}
        //@ts-ignore
        keyExtractor={item => item.id}
        refreshing={refreshing}
        onRefresh={handleRefresh}
      /> 
    
      
    </View>
  );
};

export default FavoritesScreen;