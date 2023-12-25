import { Pressable, StyleSheet, Text, View } from "react-native";
import React from "react";
import { Feather } from "@expo/vector-icons";

const NoInternet = ({ onRefeshPress }) => {
  return (
    <View style={styles.container}>
      <Feather name="wifi-off" size={35} color="black" />
      <Text style={styles.text}>No internet connection</Text>
      <Pressable onPress={onRefeshPress}>
        <Feather name="refresh-cw" size={18} color="black" />
        <Text style={styles.text2}>Try Again</Text>
      </Pressable>
    </View>
  );
};

export default NoInternet;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  text: {
    fontSize: 18,
    color: "#383838",
    paddingVertical: 5,
  },
  text2: {
    fontSize: 18,
    paddingLeft: 2,
    paddingVertical: 5,
  },
});
