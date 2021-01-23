import { StatusBar } from "expo-status-bar";
import React, { Component } from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { FontAwesomeIcon } from "@fortawesome/react-native-fontawesome";
import { faSignOutAlt } from "@fortawesome/free-solid-svg-icons";

// import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome';
// import { faSignOutAlt, faChartLine } from '@fortawesome/free-solid-svg-icons';

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
// import AsyncStorage from "@react-native-async-storage/async-storage";
export default class HomeScreen extends Component {
  constructor(props) {
    super(props);
    this.state = {
      admin: "",
    };
  }
  clearStorage = async () => {
    try {
      await AsyncStorage.removeItem("token");
      await AsyncStorage.removeItem("user");
      this.props.setToken(false);
    } catch (e) {
      console.log(e);
    }
  };

  componentDidMount() {
    AsyncStorage.getItem("user").then((value) =>
      this.setState({ admin: JSON.parse(value) })
    );
  }

  render() {
    return (
      <SafeAreaView style={styles.cont}>
        <View style={styles.logout}>
          <TouchableOpacity title="EmployeeList " onPress={this.clearStorage}>
            <Text style={styles.logout}>
              <FontAwesomeIcon size={22} icon={faSignOutAlt} />
            </Text>
          </TouchableOpacity>
        </View>

        <View>
          <Text style={styles.wlc}> Welcome {this.state.admin.name} ! </Text>
        </View>

        <View>
          <Text style={styles.qus}> What Do You Want To Check? </Text>
        </View>

        <View style={styles.cc}>
          <TouchableOpacity
            style={styles.but}
            title="EmployeeList "
            onPress={() => this.props.navigation.navigate("EmployeeList")}
          >
            <Text style={styles.butTxt}>Employee List </Text>
          </TouchableOpacity>

          <TouchableOpacity
            style={styles.but}
            title="EmployeeKpi"
            onPress={() => this.props.navigation.navigate("EmployeeKpi")}
          >
            <Text style={styles.butTxt}>All Kpis List </Text>
          </TouchableOpacity>
        </View>

        {/* </View > */}
        <View style={styles.footer}>
          <Text style={styles.foot}> &#169; ERP 2021</Text>
        </View>
      </SafeAreaView>
    );
  }
}

const styles = StyleSheet.create({
  cont: {
    backgroundColor: "rgb(255, 255, 255)",
    width: "100%",
    height: "100%",
  },
  cc: {
    marginTop: 40,
    display: "flex",
    flexDirection: "row",
    width: "100%",
    height: 250,
    backgroundColor: "white",

    // borderWidth: 4,
    // borderColor: "pink",
  },
  but: {
    marginRight: 15,
    marginLeft: 20,
    marginBottom: 50,
    marginTop: 50,
    paddingTop: 65,
    width: 140,
    height: 150,
    backgroundColor: "rgb(255,25,146)",
    borderColor: "white",
  },
  butTxt: {
    color: "white",
    textAlign: "center",
    fontWeight: "bold",
    fontSize: 18,
  },
  logout: {
    marginLeft: 160,

    marginTop: 5,
    marginLeft: 160,
  },

  wlc: {
    marginTop: 25,
    textAlign: "center",
    fontSize: 25,
    fontWeight: "bold",
    fontStyle: "italic",
  },
  qus: {
    textAlign: "center",
    marginTop: 40,
    fontSize: 22,
  },
  footer: {
    borderColor: "rgba(0,0,0,0.6)",
    borderWidth: 0,
    borderTopWidth: 2,
    marginTop: 150,
  },
  foot: {
    color: "rgba(0,0,0,0.6)",
    marginTop: 10,
    textAlign: "center",
  },
});
