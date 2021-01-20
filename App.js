import "react-native-gesture-handler";
import { StatusBar } from "expo-status-bar";
import React from "react";
import { StyleSheet, Text, View, TouchableOpacity } from "react-native";
import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
import HomeScreen from "./components/HomeScreen.js";
import EmployeeList from "./components/EmployeeList";
import TableComp from "./components/TableComp";
import Individualkpis from "./components/IndividualKpi";

export default function App() {

  const Stack = createStackNavigator();

  return (
    // DONT TOUCH
    <NavigationContainer>
      <Stack.Navigator>

        
        <Stack.Screen name="HomeScreen">
          {(props) => <HomeScreen {...props} />}
        </Stack.Screen>
        <Stack.Screen name="EmployeeList">
          {(props) => <EmployeeList {...props} />}
        </Stack.Screen>
        <Stack.Screen name="TableComp">
          {(props) => <TableComp {...props} />}
        </Stack.Screen>
        <Stack.Screen name="Individualkpis">
          {(props) => <Individualkpis {...props} />}
        </Stack.Screen>


        
      </Stack.Navigator>
    </NavigationContainer>
  );
}