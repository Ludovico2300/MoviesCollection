import { StyleSheet, Text, View, Image, useWindowDimensions, TouchableOpacity } from 'react-native'
import { AntDesign } from '@expo/vector-icons';
import React, {useState} from 'react'
//per risolvere can't find variable:navigation
import { useNavigation } from '@react-navigation/native'


//creare layout pagina film singolo

//@ts-ignore
const MovieScreen = ({navigation, route}) => {
  
const layoutx = useWindowDimensions().width;
const [color, setColor] = useState("black");

let id = route.params.id;
let title = route.params.title;
let overview = route.params.overview;
let backDrop = route.params.backDrop;

const navigation1 = useNavigation();

  React.useLayoutEffect(() => {
    navigation1.setOptions({
      headerRight: () => (
        //@ts-ignore
        <TouchableOpacity
        //@ts-ignore
          onPress={setColor(color === "black" ?"red":"black")}
        >
          <AntDesign name="hearto" size={20} color={color} />
        </TouchableOpacity>
      ),
    });
  },[navigation]);

  return (
    <View>
     <Image style={{width:layoutx, height:layoutx, borderRadius: 5,}} source={{ uri: backDrop }} resizeMode={'cover'}/>
      <Text>{title}</Text>
      <Text>{id}</Text>
      <Text>{overview}</Text>
      


    </View>
  )
}

export default MovieScreen

const styles = StyleSheet.create({
  

})