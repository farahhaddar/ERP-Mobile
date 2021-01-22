import "react-native-gesture-handler";
import React, { useState, useEffect } from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
import AsyncStorage from "@react-native-async-storage/async-storage";
import Login from "./components/LoginScreen";
import HomeScreen from "./components/HomeScreen.js";
import EmployeeList from "./components/EmployeeList";
import Individualkpis from "./components/IndividualKpi";
import ProjectRoles from "./components/ProjectRoles";
import Graph from "./components/Graph";
import EmployeeKpi from "./components/KpiList";
import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome';
import { faSignOutAlt, faChartLine } from '@fortawesome/free-solid-svg-icons';

const AuthStack = createStackNavigator();

const AuthStackScreen = () => (
  <AuthStack.Navigator
    initialRouteName="Login"
    screenOptions={{
      headerShown: false,
    }}
  >
    <AuthStack.Screen name="Login">
      {(props) => <Login {...props} />}
    </AuthStack.Screen>
  </AuthStack.Navigator>
);

const Stack = createStackNavigator();
const StackScreen = () => (
  <Stack.Navigator>
    <Stack.Screen name="HomeScreen">
      {(props) => <HomeScreen {...props} />}
    </Stack.Screen>
    <Stack.Screen name="EmployeeList">
      {(props) => <EmployeeList {...props} />}
    </Stack.Screen>
    <Stack.Screen name="ProjectRoles">
      {(props) => <ProjectRoles {...props} />}
    </Stack.Screen>
    <Stack.Screen name="Individualkpis">
      {(props) => <Individualkpis {...props} />}
    </Stack.Screen>
    <Stack.Screen
      name="EmployeeKpi"
      options={{ headerTitle: "Employee   Kpi's   Level" }}
    >
      {(props) => <EmployeeKpi {...props} />}
    </Stack.Screen>
    <Stack.Screen name="Graph">{(props) => <Graph {...props} />}</Stack.Screen>
  </Stack.Navigator>
);
export default function App() {
  const [token, setToken] = useState("");
  useEffect(() => {
    const stored = async () => {
      const token = await AsyncStorage.getItem("token");
      setToken(token);
    };
    stored();
  }, [token]);

  return (
    <NavigationContainer>

      {token ? <StackScreen /> : <AuthStackScreen />}

      <Stack.Navigator>

        
        <Stack.Screen name="HomeScreen"  >
          {(props) => <HomeScreen {...props} />}
        </Stack.Screen>
        <Stack.Screen name="EmployeeList">
          {(props) => <EmployeeList {...props} />}
        </Stack.Screen>
        <Stack.Screen name="ProjectRoles">
          {(props) => <ProjectRoles {...props} />}
        </Stack.Screen>
        <Stack.Screen name="Individualkpis" >
          {(props) => <Individualkpis {...props} />}
        </Stack.Screen>
        <Stack.Screen name="Graph">
          {(props) => <Graph {...props} />}
        </Stack.Screen>
{/* nn */}

        
      </Stack.Navigator>
    </NavigationContainer>
  );
}
