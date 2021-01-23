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
import { FontAwesomeIcon } from "@fortawesome/react-native-fontawesome";
import {
  faSignOutAlt,
  faChartLine,
  faTasks,
} from "@fortawesome/free-solid-svg-icons";

export default function App() {
  const [token, setToken] = useState(false);
  const AuthStack = createStackNavigator();

  const AuthStackScreen = () => (
    <AuthStack.Navigator
      initialRouteName="Login"
      screenOptions={{
        headerShown: false,
      }}
    >
      <AuthStack.Screen name="Login">
        {(props) => <Login setToken={setToken} />}
      </AuthStack.Screen>
    </AuthStack.Navigator>
  );

  const Stack = createStackNavigator();
  const StackScreen = () => (
    <Stack.Navigator>
      <Stack.Screen name="Home">
        {(props) => <HomeScreen setToken={setToken} {...props} />}
      </Stack.Screen>

      <Stack.Screen
        name="EmployeeList"
        options={{ headerTitle: "Employees   Name List" }}
      >
        {(props) => <EmployeeList {...props} />}
      </Stack.Screen>

      <Stack.Screen
        name="ProjectRoles"
        options={{ headerTitle: "Employee Projects &  Roles" }}
      >
        {(props) => <ProjectRoles {...props} />}
      </Stack.Screen>

      <Stack.Screen
        name="Individualkpis"
        options={{ headerTitle: "Individual  kPI" }}
      >
        {(props) => <Individualkpis {...props} />}
      </Stack.Screen>

      <Stack.Screen
        name="EmployeeKpi"
        options={{ headerTitle: "Employee   Kpi's   Level" }}
      >
        {(props) => <EmployeeKpi {...props} />}
      </Stack.Screen>

      <Stack.Screen name="Graph" options={{ headerTitle: "KPI Graph" }}>
        {(props) => <Graph {...props} />}
      </Stack.Screen>
    </Stack.Navigator>
  );

  return (
    <NavigationContainer>
      {token ? <StackScreen /> : <AuthStackScreen />}
    </NavigationContainer>
  );
}
