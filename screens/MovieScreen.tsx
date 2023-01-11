import { StyleSheet, Text, View, Image, useWindowDimensions, TouchableOpacity } from 'react-native'
import { AntDesign } from '@expo/vector-icons';
import React, {useState} from 'react'
//per risolvere can't find variable:navigation
import { useNavigation } from '@react-navigation/native'

import AsyncStorage from '@react-native-async-storage/async-storage';


interface DataInterface {
  id: number;
  title: string;
  overview: string;
  backDrop: string;
  rating: number;
  cover: string;
  date: string;
}

//creare layout pagina film singolo

//@ts-ignore
const MovieScreen = ({navigation, route}) => {
  
const layoutx = useWindowDimensions().width;
const [color, setColor] = useState("black");



const data : DataInterface = {id :route.params.id,
   title : route.params.title,
   overview : route.params.overview,
   backDrop : route.params.backDrop,
   cover : route.params.cover,
   rating : route.params.rating,
   date : route.params.date}


const navigation1 = useNavigation();

// @ts-ignore
const storeData = async (movie) => {
  try {
    const jsonValue = JSON.stringify(movie)
    await AsyncStorage.setItem("favorites", jsonValue)
    alert("Added to Favorites!")
    console.log(jsonValue)
  } catch (e) {
    console.log(e)
  }
}

  React.useLayoutEffect(() => {
    navigation1.setOptions({
      headerRight: () => (
        
        <TouchableOpacity
        //@ts-ignore
        onPress={()=>storeData(data)}
        >
          <AntDesign name="hearto" size={20} color={color} />
        </TouchableOpacity>
      ),
    });
  },[navigation1]);



  return (
    <View>
     <Image style={{width:layoutx, height:layoutx, borderRadius: 5,}} source={{ uri: data.backDrop }} resizeMode={'cover'}/>
      <Text style={styles.title}>{data.title}</Text>
      
      <Text>{data.overview}</Text>
  

    </View>
  )
}

export default MovieScreen

const styles = StyleSheet.create({
  title:{
    fontWeight:"bold",
  }

})