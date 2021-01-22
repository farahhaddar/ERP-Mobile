import React from "react";
import { StyleSheet, TouchableOpacity, Text, View } from "react-native";
import { FontAwesomeIcon } from "@fortawesome/react-native-fontawesome";
import { faChevronLeft } from "@fortawesome/free-solid-svg-icons";

const ButtonBackComponent = (props) => (
  <TouchableOpacity
    activeOpacity={0.9}
    onPress={props.press}
    style={styles.buttonContainer}
  >
    <Text>
      <Text style={styles.buttonText}>
        <FontAwesomeIcon
          icon={faChevronLeft}
          size={28}
          style={{
            alignSelf: "flex-start",
            color: "white",
            paddingRight: 20,
          }}
        />
        Back
      </Text>
    </Text>
    <Text style={styles.buttonText}> {props.title}</Text>
  </TouchableOpacity>
);
const styles = StyleSheet.create({
  buttonContainer: {
    width: "100%",
    backgroundColor: "rgb(179, 26, 77)",
    borderRadius: 3,
    paddingVertical: 15,
    paddingHorizontal: 8,
    display: "flex",
    flexDirection: "row",
  },

  buttonText: {
    fontSize: 20,
    fontWeight: "bold",
    color: "#fff",
  },
});

export default ButtonBackComponent;
