import "react-native-gesture-handler";
import { StatusBar } from "expo-status-bar";
import React from "react";
import { StyleSheet, Text, View, TouchableOpacity } from "react-native";
import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
import FlatListComp from "./components/EmployeeList";
// import TableComp from "./components/TableComp";
import List from "./components/List";

function App() {
  return (
    <View style={styles.container}>
      {/* <FlatListComp /> */}
      <List />
    </View>
  );
}
const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});
export default App;
