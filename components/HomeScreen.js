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

    
    render(){
     return(
     <SafeAreaView >
      <View>
        <Text>   Welcome Admin !   </Text>
     </View> 
     
     <View>
        <Text>  What Do You Want To Check?  </Text>
     </View> 
    
      <View>

       <Button title="EmployeeList " onPress={() => this.props.navigation.navigate('EmployeeList')}/>
       
       <Button title="Over All Kpi  List " onPress={() => this.props.navigation.navigate('Individualkpis')}/> 

      </View>
      <View>
        <FontAwesomeIcon icon={ faSignOutAlt} />
      </View>


     </SafeAreaView>
     );
    }
    
    }