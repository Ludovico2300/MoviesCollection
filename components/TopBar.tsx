import { StyleSheet, Text, TouchableOpacity, View } from "react-native";
import React from "react";




const TopBar = () => {
  return (
    <View style={styles.topbar}>
      <Text style={styles.topbartext}></Text>
        <Text style={styles.topbartextm}>Movies</Text>
        <Text style={styles.topbartextf}>Favorites</Text>
    </View>
  );
};

export default TopBar;

const styles = StyleSheet.create({
  topbar: {
    alignSelf: 'stretch',
    height: 52,
    flexDirection: 'row', // row
    backgroundColor: 'lightgrey',
    alignItems: 'center',
    justifyContent: 'space-around', // center, space-around
    paddingLeft: 10,
    paddingRight: 10,
  },
  topbartext: {
    fontWeight: "bold",
    fontSize: 15,
  },
  topbartextm: {
    fontWeight: "bold",
    fontSize: 15,
  },
  topbartextf: {
    fontWeight: "bold",
    fontSize: 15,
    color: "blue",
  },
});