import { StatusBar } from "expo-status-bar";
import React, { Component } from "react";
import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome';
import {faSignOutAlt } from '@fortawesome/free-solid-svg-icons';
import {
  SafeAreaView,
  StyleSheet,
  Text,
  View,
  Button,
    FlatList,
  ScrollView,
  AppRegistry,
  TouchableOpacity,
} from "react-native";
import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
import { navigation } from "react-native";
import { ViewComponent } from "react-native";

export default class HomeScreen extends Component {
    constructor(props) {
      super(props);
    }
    
componentDidMount() {
    fetch("http://192.168.0.119:8000/api/employees/10", {
      method: "GET",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
    })
      .then((res) => res.text())
      .then((res) => this.setState({ employees: JSON.parse(res) }))
      .catch((error) => {
        console.log(error);
      });
  }

render(){
 return(
 <SafeAreaView>
 <View>
     <Text> Hello </Text>
 </View>

 </SafeAreaView>
 );
}
}