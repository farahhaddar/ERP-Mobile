import { StatusBar } from "expo-status-bar";
import React, { Component } from "react";
import {
  SafeAreaView,
  StyleSheet,
  Text,
  View,
  FlatList,
  ScrollView,
  AppRegistry,
  TouchableOpacity,
} from "react-native";
import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
import { SearchBar } from "react-native-elements";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { Button } from "react-native";
// import { navigation } from "react-native";
var count = 3,
  rows = 3;

export default class Kpi extends React.Component {
  // store = async () => {
  //   AsyncStorage.getItem("token");
  // };
  constructor(props) {
    super(props);
    this.state = {
      employees: "",
      search: "",
      page: 1,
      refreshing: false,
      token: "",
    };
    this.updateSearch = this.updateSearch.bind(this);
  }

  componentDidMount() {
    // this.setState({ refreshing: false });
    AsyncStorage.getItem("token").then((value) => {
      this.setState({ token: value });
      fetch(
        "http://192.168.1.105:8000/api/kpiCurrent/" +
          rows +
          "?page= " +
          this.state.page,
        {
          method: "GET",
          headers: {
            Accept: "application/json",
            // "Content-Type": "application/json",
            Authorization: "Bearer " + value,
          },
        }
      )
        .then((res) => res.text())
        .then((res) => {
          if (JSON.parse(res).data.length == rows) {
            this.state.page = this.state.page + 1;
          }
          this.setState({ employees: JSON.parse(res) });
        })
        .catch((error) => {
          console.log(error);
        });
    });
  }
  handleMore = () => {
    fetch(
      "http://192.168.1.105:8000/api/kpiCurrent/" +
        rows +
        "?page= " +
        this.state.page,
      {
        method: "GET",
        headers: {
          Accept: "application/json",
          // "Content-Type": "application/json",
          Authorization: "Bearer " + this.state.token,
        },
      }
    )
      .then((res) => res.text())
      .then((res) => {
        if (JSON.parse(res).data.length == rows) {
          this.state.page = this.state.page + 1;
        }

        let employees = { ...this.state.employees };
        if (count < rows) for (let i = 0; i < count; i++) employees.data.pop();

        employees.data = [...employees.data, ...JSON.parse(res).data];
        this.setState({
          employees: employees,
        });
        count = JSON.parse(res).data.length;
      })
      .catch((error) => {
        console.log(error);
      });
  };
  updateSearch(e) {
    this.setState({ page: 1 });
    this.setState({ search: e });
  }
  onRefresh() {
    count = rows;
    this.setState(
      {
        page: 1,
        refreshing: false,
        employees: "",
      },
      () => this.componentDidMount()
    );
  }
  clearStorage = async () => {
    try {
      return await AsyncStorage.clear();
    } catch (e) {
      console.log(e);
    }
  };
  render() {
    console.log(this.state.employees);
    var color = ["255,255,255", "245, 245, 245"];

    return (
      <View style={{ flex: 1, paddingTop: 30 }}>
        <Button title="logout" onPress={this.clearStorage}></Button>

        <SearchBar
          placeholder="Type Here..."
          onChangeText={this.updateSearch}
          value={this.state.search}
        />
        {/* <ScrollView> */}
        <View style={[styles.flex, { position: "relative" }]}>
          <Text style={styles.tableTitle}>Employee</Text>
          <Text style={styles.tableTitle}>KPI</Text>
          <Text style={styles.tableTitle}>Level</Text>
        </View>

        <FlatList
          keyExtractor={(item, index) => index.toString()}
          data={this.state.employees.data}
          renderItem={({ item, index }) => (
            <View
              style={[
                styles.flex,
                { backgroundColor: "rgb(" + color[index % 2] + ")" },
              ]}
            >
              <Text style={styles.users}>{item.empName}</Text>
              <Text style={styles.users}>{item.name}</Text>
              <Text style={styles.users}>{item.level}</Text>
            </View>
          )}
          refreshing={this.state.refreshing}
          onRefresh={() => this.onRefresh()}
          onEndReached={this.handleMore}
          // onEndReachedThreshold={100}
        ></FlatList>
        {/* </ScrollView> */}
      </View>
    );
  }
}
AppRegistry.registerComponent("Example of FlatList", () => FlatListComp);
const styles = StyleSheet.create({
  users: {
    fontSize: 15,
    borderWidth: 0,
    padding: 20,
    width: "30%",
  },
  flex: {
    display: "flex",
    flexDirection: "row",
    justifyContent: "space-between",
  },
  flex1: {
    display: "flex",
    flexDirection: "row",
    backgroundColor: "rgb(245, 245, 245)",
  },
  tableTitle: {
    color: "grey",
    fontSize: 20,
    paddingLeft: 20,
    paddingTop: 20,
    marginTop: 20,
    width: "30%",
  },
  width: {
    borderBottomWidth: 1,
    borderBottomColor: "grey",
  },
});
