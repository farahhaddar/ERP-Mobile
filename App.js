import "react-native-gesture-handler";
import { StatusBar } from "expo-status-bar";
import React, { useState } from "react";
import { StyleSheet, Text, View, TouchableOpacity } from "react-native";
import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
import FlatListComp from "./components/EmployeeList";
import Kpi from "./components/List";
import Login from "./components/LoginScreen";
import AsyncStorage from "@react-native-async-storage/async-storage";
// import TableComp from "./components/TableComp";
// import List from "./components/List";
const AuthStack = createStackNavigator();

const AuthStackScreen = () => (
  <AuthStack.Navigator initialRouteName="Login">
    <AuthStack.Screen
      name="Login"
      component={Login}
      options={{
        headerTitle: "Login",
      }}
    />
  </AuthStack.Navigator>
);
const RootStack = createStackNavigator();

const RootStackScreen = () => (
  <RootStack.Navigator>
    <RootStack.Screen
      name="kpi"
      component={Kpi}
      options={{
        headerTitle: "Kpi",
      }}
    />
  </RootStack.Navigator>
);
function App() {
  const [token, setToken] = useState("");
  const stored = async () => {
    const token = await AsyncStorage.getItem("token");
    setToken(token);
  };
  stored();

  return (
    <NavigationContainer>
      {token ? <RootStackScreen /> : <AuthStackScreen />}
    </NavigationContainer>
  );
}
const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});
export default App;
