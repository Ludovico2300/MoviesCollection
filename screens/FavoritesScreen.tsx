import { StyleSheet, FlatList, View } from 'react-native'
import React,{useState, useEffect} from 'react'
import MovieCard from '../components/MovieCard';

import AsyncStorage from '@react-native-async-storage/async-storage';


const FavoritesScreen = () => {
  const [favorites, setfavorites] = useState([])
  const [getted, setGetted] = useState(false)


  // const fetchFavorites = async() => {
  //   const data = await AsyncStorage.getItem("favorites");
  //   if(data) setfavorites(JSON.parse(data));
  //     }

      const getFavorites = async () => {
        try {
          const jsonValue = await AsyncStorage.getItem("favorites")
          //@ts-ignore
          setfavorites([...favorites, JSON.parse(jsonValue)])
          
          // return jsonValue != null ? JSON.parse(jsonValue) : null;
        } catch(e) {
          // error reading value
        }
        
        
        console.log("done",favorites)
      }
      
    
      useEffect(()=> {
        getFavorites();
        setGetted(true)
      }, [getted]);
  


 //creo il render item per poter usare FlatList
 //@ts-ignore
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
    <View >

      <FlatList
        data={favorites}
        renderItem={renderItem}
        keyExtractor={(item) => item.id}
      />
    </View>
  )
}

export default FavoritesScreen

const styles = StyleSheet.create({})