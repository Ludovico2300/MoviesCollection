import { Image, Text, TouchableOpacity, View } from "react-native";
import { AntDesign } from "@expo/vector-icons";
import  React, { useEffect, useState } from "react";

//per risolvere can't find variable:navigation
import { useNavigation } from "@react-navigation/native";

interface MovieProps {
  id: number;
  title: string;
  rating: number;
  cover: string;
}

interface MovieDetails {
  overview: string;
  backdrop_path: string;
  release_date: number;
}


function MovieCard ({ id, title, rating, cover }: MovieProps) :JSX.Element {
  const [movieDetails, setMovieDetails] = useState<MovieDetails>();
  const [fetchedDetails, setFetchedDetails] = useState<boolean>(false);

  const navigation :any = useNavigation();

  useEffect(() => {
    fetch(
      `https://api.themoviedb.org/3/movie/${id}?api_key=a74169393e0da3cfbc2c58c5feec63d7`,
    )
      .then((response) => response.json())
      .then((data) => {
        setMovieDetails(data);
        setFetchedDetails(true);
      });
  }, [fetchedDetails]); //per evitare l'errore del caricamento dell'app prima del fetch

  return (
    <TouchableOpacity
      onPress={() =>
        navigation.navigate("MovieScreen", {
          id: id,
          title: title,
          overview: movieDetails?.overview,
          backDrop: `https://image.tmdb.org/t/p/w500${movieDetails?.backdrop_path}`,
          cover: cover,
          rating: rating,
          date: movieDetails?.release_date,
        })
      }
      testID={`${title}-movieCardBtnId`}
    >
      <View className="bg-transparent flex-1 flex-row m-2 py-2 items-center border-b-2 border-black-500"
      accessibilityLabel={`${title}-movieCardLbl`}
      testID={`${title}-movieCardId`}
      >
        <Image className="w-20 h-20 rounded-md"
        source={{ uri: cover }} />
        <View className="flex-1 m-5 justify-center">
          <View>
            <Text className="font-bold text-lg mx-1">{title}</Text>
          </View>
          <View className="flex-1 flex-row">
            <View className="flex-1 flex-row mx-1">
              <AntDesign name='calendar' size={15} color='black' />
              {movieDetails && <Text>{movieDetails?.release_date}</Text>}
            </View>
            <View className="flex-1 flex-row mx-1">
              <AntDesign name='staro' size={15} color='black' />
              <Text>{rating}</Text>
            </View>
          </View>
        </View>
        <AntDesign name='right' size={24} color='lightgrey' />
      </View>
    </TouchableOpacity>
  );
};

export default MovieCard;