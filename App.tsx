import { StyleSheet, Text, View, StatusBar, TouchableOpacity } from "react-native";
// import AsyncStorage from "@react-native-async-storage/async-storage";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";

const Stack = createNativeStackNavigator();

import HomeScreen from "./screens/HomeScreen";
import MovieScreen from "./screens/MovieScreen";
import FavoritesScreen from "./screens/FavoritesScreen";


export default function App() {





  return (
 
    <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen
          name="HomeScreen"
          component={HomeScreen}
          options={{
            title: "Movies",
            headerTitleAlign:"center",
            headerStyle:{
              
              backgroundColor: "whitesmoke",
            },
          }}
        />
        <Stack.Screen
          name="MovieScreen"
          component={MovieScreen}
          options={{
            title: "Movie Info",
            headerTitleAlign:"center",
            headerStyle:{
              
              backgroundColor: "whitesmoke",
            },
          }}
        />
         <Stack.Screen
          name="FavoritesScreen"
          component={FavoritesScreen}
          options={{
            title: "Favorites",
            headerTitleAlign:"center",
            headerStyle:{
              
              backgroundColor: "whitesmoke",
            },
          }}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "white",
    marginTop: StatusBar.currentHeight,
  },
});
