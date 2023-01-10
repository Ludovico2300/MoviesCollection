import { StyleSheet, Text, View, StatusBar } from "react-native";
// import AsyncStorage from "@react-native-async-storage/async-storage";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";

const Stack = createNativeStackNavigator();

import HomeScreen from "./screens/HomeScreen";
import MovieScreen from "./screens/MovieScreen";
import FavoritesScreen from "./screens/FavoritesScreen";

export default function App() {
  return (
    // <View style={styles.container}>
    //   <Home />
    // </View>

    <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen
          name="HomeScreen"
          component={HomeScreen}
          options={{ headerShown:false}}
        />
        <Stack.Screen
          name="MovieScreen"
          component={MovieScreen}
          options={{ title: "Movie" }}
        />
         <Stack.Screen
          name="FavoritesScreen"
          component={FavoritesScreen}
          options={{ title: "FavoritesScreen" }}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    marginTop: StatusBar.currentHeight,
  },
});
