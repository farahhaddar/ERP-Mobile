import "react-native-gesture-handler";
import { StatusBar } from "expo-status-bar";
import React from "react";
import { StyleSheet, Text, View, TouchableOpacity } from "react-native";
import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
import Home from "./components/TableComp";
import HomeScreen from "./components/HomeScreen.js";
import EmployeeList from "./components/EmployeeList";
import TableComp from "./components/TableComp";

export default function App() {
  const Stack = createStackNavigator();

  return (
    // DONT TOUCH
    <NavigationContainer>
      <Stack.Navigator>
        {/* NOTE THAT THE NAME IS THE TITLE OF THE SCREEN AND THE COMPONENT HOME 
       IS WHAT GONNA BE RENDERD IN THE PAGE BOTH ARE SENT AS A PROP THE TITTLE REPLACE THE NAME  */}

        <Stack.Screen name="EmployeeList">
          {(props) => <EmployeeList {...props} />}
        </Stack.Screen>
        <Stack.Screen name="TableComp">
          {(props) => <TableComp {...props} />}
        </Stack.Screen>
        {/* <Stack.Screen
          name="EmployeeList"
          component={EmployeeList}
          options={{ title: "Welcome" }}
        />
        <Stack.Screen
          name="TableComp"
          component={TableComp}
          options={{ title: "Welcome" }}
        /> */}

        {/* USE THIS WAY IF U WANT TO SEND PROPS OTHRER THAN THE COMPONENT NAME  */}
        {/* <Stack.Screen name="Home"> 
        {props => <Home {...props} extraData={someData} />}
        </Stack.Screen> */}

        {/* <Stack.Screen name="" component={} />
        <Stack.Screen name="" component={} /> 
        <Stack.Screen name="" component={} />
        <Stack.Screen name="" component={} />
        <Stack.Screen name="" component={} />
        <Stack.Screen name="" component={} /> */}
      </Stack.Navigator>
    </NavigationContainer>
  );
}
//  TO NAVIGATE USING BUTTONS
// send { navigation } as prop to every component page

// this way allow u  to go to the page many times
{
  /* <Button title="Go to Details... again" onPress={() => navigation.push('Details')}/> */
}
// regular way to navigate
{
  /* <Button title="Go to Home" onPress={() => navigation.navigate('Home')} /> */
}
// go back button
{
  /* <Button title="Go back" onPress={() => navigation.goBack()} /> */
}
// to go back to first page
// onPress={() => navigation.popToTop()}
// to send params in the route
// navigation.navigate('RouteName', { param;value,param:value})
// to access the paramsin the component page : route.params after getting it by sending { route, navigation } in the props
