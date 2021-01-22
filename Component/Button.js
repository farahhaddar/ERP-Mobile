import React from "react";
import { StyleSheet, TouchableOpacity, Text } from "react-native";

const ButtonComponent = (props) => (
  <TouchableOpacity
    activeOpacity={0.8}
    onPress={props.press}
    style={styles.buttonContainer}
  >
    <Text style={styles.buttonText}>{props.title}</Text>
  </TouchableOpacity>
);
const styles = StyleSheet.create({
  buttonContainer: {
    backgroundColor: "rgb(179, 26, 77)",
    borderRadius: 3,
    paddingVertical: 5,
    paddingHorizontal: 8,
  },

  buttonText: {
    fontSize: 12,
    color: "#fff",
    fontWeight: "bold",
    alignSelf: "center",
    textTransform: "uppercase",
  },
});

export default ButtonComponent;
