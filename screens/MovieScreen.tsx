import {
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
import { useStoreFav } from "../store";

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
  const [isFavorite, setIsFavorite] = useState(false);

  const {favoritesMovies, addFavMovies, removeFavMovies}= useStoreFav();

  


useEffect(() => {
    const getFavorites = async () => {
        try {
            setIsFavorite(containsObject(data, favoritesMovies));
        } catch (e) {
            console.log(e);
        }
    };
    getFavorites();
}, []);

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
      let check : boolean= containsObject(movie, favoritesMovies);
      console.log(check);
      if (favoritesMovies) {
        if (check === false) 
        {
          setIsFavorite(true);
          addFavMovies(movie)
          alert("Added to Favorites!");
        } 
        else 
        {
          setIsFavorite(false);
          alert("Removed from Favorites");
          removeFavMovies(movie)
        }
      }
    } catch (e) {
      console.log(e);
    }
  };

 

  //add "Favorite Heart" to Movie Info Screen Header
  React.useLayoutEffect(() => {
    navigation1.setOptions({
      headerRight: () => (
        <TouchableOpacity
          onPress={() => storeData(data)}
          testID="addFavoriteBtn"
        >
          {/* @ts-ignore */}
          <AntDesign name='heart' size={20} color={isFavorite ? "red" : "black"}/>
        </TouchableOpacity>
      ),
    });
  }, [navigation1, isFavorite]);

   //add "Back Arrow" to Movie Info Screen Header
   React.useLayoutEffect(() => {
    navigation1.setOptions({
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
  }, [navigation1]);

  return (
    <View
    testID={`${data.title}-movieViewId`}
    >
      <Image
        style={{ width: layoutx, height: layoutx, borderRadius: 5 }}
        source={{ uri: data.backDrop }}
        resizeMode={"cover"}
      />
      <Text className="font-bold">{data.title}</Text>

      <Text>{data.overview}</Text>
    </View>
  );
};

export default MovieScreen;
