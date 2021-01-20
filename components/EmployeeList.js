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
// import { navigation } from "react-native";
var flowers = [{ key: "asdasd1" }, { key: "asdasd2" }];
var count = 3,
  rows = 3;
export default class FlatListComp extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      input: [{ key: "asdasd5" }, { key: "asdasd1" }],
      input1: [{ key: "asdasd5" }, { key: "asdasd1" }],
      employees: "",
      search: "",
      page: 1,
    };
    this.updateSearch = this.updateSearch.bind(this);
  }
  componentDidMount() {
    fetch(
      "http://192.168.1.105:8000/api/employees/" +
        rows +
        "?page= " +
        this.state.page,
      {
        method: "GET",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
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
        // console.log(error);
      });
  }
  handleMore = () => {
    // alert("hi");
    fetch(
      "http://192.168.1.105:8000/api/employees/" +
        rows +
        "?page= " +
        this.state.page,
      {
        method: "GET",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
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
        // console.log(error);
      });
    this.setState({ input: [...this.state.input, this.state.input1] });
  };
  updateSearch(e) {
    this.setState({ page: 1 });
    this.setState({ search: e });
  }

  render() {
    console.log(this.state.employees);
    var color = ["255,255,255", "245, 245, 245"];
    // console.log(this.state.employees);
    const data = { name: "Ali" };

    return (
      <View style={{ flex: 1, paddingTop: 30 }}>
        <SearchBar
          placeholder="Type Here..."
          onChangeText={this.updateSearch}
          value={this.state.search}
        />
        {/* <ScrollView> */}
        <View style={[styles.flex, { position: "relative" }]}>
          <Text style={styles.tableTitle}>Employee</Text>
          <Text style={styles.tableTitle}>Action</Text>
        </View>

        <FlatList
          keyExtractor={(item, index) => index}
          data={this.state.employees.data}
          renderItem={({ item, index }) => (
            <View
              style={[
                styles.flex,
                { backgroundColor: "rgb(" + color[index % 2] + ")" },
              ]}
            >
              <Text style={styles.users}>{item.name}</Text>
              <Text style={styles.users}>
                <TouchableOpacity
                  style={styles.buttonContainer}
                  onPress={() =>
                    this.props.navigation.navigate("ProjectRoles", {
                      data: item.id,
                    })
                  }
                >
                  <Text style={styles.buttonText}>Project</Text>
                </TouchableOpacity>
              </Text>
            </View>
          )}
          onEndReached={this.handleMore}
        ></FlatList>
        {/* </ScrollView> */}
      </View>
    );
  }
}
AppRegistry.registerComponent("Example of FlatList", () => FlatListComp);
const styles = StyleSheet.create({
  users: {
    fontSize: 25,
    borderWidth: 0,
    padding: 20,
    width: "50%",
  },
  flex: {
    display: "flex",
    flexDirection: "row",
  },
  flex1: {
    display: "flex",
    flexDirection: "row",
    backgroundColor: "rgb(245, 245, 245)",
  },
  tableTitle: {
    color: "grey",
    fontSize: 25,
    paddingLeft: 20,
    paddingTop: 20,
    marginTop: 20,
    width: "50%",
  },
  width: {
    borderBottomWidth: 1,
    borderBottomColor: "grey",
  },
});