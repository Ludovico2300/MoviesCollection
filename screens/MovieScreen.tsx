import {
  StyleSheet,
  Text,
  View,
  Image,
  useWindowDimensions,
  TouchableOpacity,
} from "react-native";
import { AntDesign } from "@expo/vector-icons";
import React, { useEffect, useState } from "react";
//per risolvere can't find variable:navigation
import { useNavigation } from "@react-navigation/native";

import AsyncStorage from "@react-native-async-storage/async-storage";

interface DataInterface {
  id: number;
  title: string;
  overview: string;
  backDrop: string;
  rating: number;
  cover: string;
  date: string;
}

//@ts-ignore
const MovieScreen = ({ navigation, route }) => {
  const layoutx = useWindowDimensions().width;

  const data: DataInterface = {
    id: route.params.id,
    title: route.params.title,
    overview: route.params.overview,
    backDrop: route.params.backDrop,
    cover: route.params.cover,
    rating: route.params.rating,
    date: route.params.date,
  };

  const navigation1 = useNavigation();

  // controllo se il film è già presente nei preferiti.
  //@ts-ignore
  const containsObject = (obj, list) => {
    var i;
    for (i = 0; i < list.length; i++) {
      console.log(list.length);
      if (list[i].title === obj.title) {
        return true;
      }
    }
    return false;
  };

  //@ts-ignore
  const storeData = async (movie) => {
    try {
      const jsonValueFavorites = await AsyncStorage.getItem("fav");
      console.log(movie.typeof);
      let favMovies : DataInterface[]= [];
      if (jsonValueFavorites) {
        favMovies = JSON.parse(jsonValueFavorites);
      }
      let check : boolean= containsObject(movie, favMovies);
      console.log(check);
      if (favMovies) {
        if (check === false) {
          favMovies.push(movie);
          alert("Added to Favorites!");
          await AsyncStorage.setItem("fav", JSON.stringify(favMovies));
        } else {
          alert("Removed from Favorites");
          for (let i = 0; i < favMovies?.length; i++) {
            if (favMovies[i].title === movie.title) {
              //controllo se il titolo del film è uguale all'elemento nel loop
              console.log(favMovies[i].title);
              favMovies.splice(i, 1); //partendo dall'indice di ricerca (primo parametro) rimuovi 1 elemento (secondo parametro)
              await AsyncStorage.setItem("fav", JSON.stringify(favMovies));
            }
          }
        }
      }
    } catch (e) {
      console.log(e);
    }
  };

 

  //add "Favorite Heart to Movie Info Screen Header"
  React.useLayoutEffect(() => {
    navigation1.setOptions({
      headerRight: () => (
        <TouchableOpacity

          onPress={() => storeData(data)}
        >
          {/* @ts-ignore */}
          <AntDesign name='hearto' size={20} color={ containsObject(data, favorites)===true ? 'red' : 'black' }/>
        </TouchableOpacity>
      ),
    });
  }, [navigation1]);

  return (
    <View>
      <Image
        style={{ width: layoutx, height: layoutx, borderRadius: 5 }}
        source={{ uri: data.backDrop }}
        resizeMode={"cover"}
      />
      <Text style={styles.title}>{data.title}</Text>

      <Text>{data.overview}</Text>
    </View>
  );
};

export default MovieScreen;

const styles = StyleSheet.create({
  title: {
    fontWeight: "bold",
  },
});
