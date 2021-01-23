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
var user = ["John", "James", "Lisa"];
var empId;
var count = 10,
  rows = 10;
export default class ProjectRoles extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      projects: "",
      page: 1,
      refreshing: false,
      search: "",
      token: "",
    };
    this.updateSearch = this.updateSearch.bind(this);
  }
  componentWillUnmount() {
    count = rows;
  }
  componentDidMount() {
    var { data } = this.props.route.params;

    empId = data;
    AsyncStorage.getItem("token").then((value) => {
      this.setState({ token: value });

      fetch(
        "http://192.168.1.105:8000/api/projectRole/" +
          empId +
          "/" +
          rows +
          "?page=1 " +
          "&projectName=" +
          this.state.search,
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
          this.setState({ projects: JSON.parse(res) });
          count = JSON.parse(res).data.length;
        });
    });
  }
  updateSearch(e) {
    this.setState({ page: 1 });
    this.setState({ search: e });
    fetch(
      "http://192.168.1.105:8000/api/projectRole/" +
        empId +
        "/" +
        rows +
        "?page=1 " +
        "&projectName=" +
        e,
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
        // let x = JSON.parse(res);
        // if (x.data.length > 1) while (x.data.length > 1) x.data.pop();
        this.setState({ projects: JSON.parse(res) });
        count = JSON.parse(res).data.length;
      })
      .catch((error) => {});
  }
  handleMore = () => {
    fetch(
      "http://192.168.1.105:8000/api/projectRole/" +
        empId +
        "/" +
        rows +
        "?page= " +
        this.state.page +
        "&projectName=" +
        this.state.search,
      {
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

        let projects = { ...this.state.projects };
        if (count < rows) for (let i = 0; i < count; i++) projects.data.pop();

        projects.data = [...projects.data, ...JSON.parse(res).data];
        this.setState({
          projects: projects,
        });
        count = JSON.parse(res).data.length;
      })
      .catch((error) => {
        console.log(error);
      });
  };
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

  render() {
    var color = ["255,255,255", "245, 245, 245"];

    const data = { name: "Ali" };

    return (
      <View style={{ flex: 1, paddingTop: 30 }}>
        <SearchBar
          containerStyle={{
            backgroundColor: "wite",
            borderTopColor: "transparent",
            borderBottomColor: "transparent",
            borderRightColor: "transparent",
            borderLeftColor: "transparent",
            borderRadius: 90,
          }}
          round="true"
          inputContainerStyle={{
            borderWidth: 0,
            backgroundColor: "rgba(0,0,0,0.2)",
            borderRadius: 90,
          }}
          placeholderTextColor={"rgba(255,25,146,0.9)"}
          placeholder={"Search By Name"}
          onChangeText={this.updateSearch}
          value={this.state.search}
        />

        {/* <ScrollView> */}

        <View style={[styles.flex, { position: "relative" }]}>
          <Text style={styles.tableTitle}>Project</Text>
          <Text style={[styles.tableTitle, styles.b]}>Role</Text>
        </View>

        <FlatList
          keyExtractor={(item, index) => index}
          data={this.state.projects.data}
          renderItem={({ item, index }) => (
            <View
              style={[
                styles.flex,
                { backgroundColor: "rgb(" + color[index % 2] + ")" },
              ]}
            >
              <Text style={[styles.users, styles.a]}>{item.projectName}</Text>
              <Text style={styles.users}>{item.roleName}</Text>
            </View>
          )}
          refreshing={this.state.refreshing}
          onRefresh={() => this.onRefresh()}
          onEndReached={this.handleMore}
        ></FlatList>
      </View>
    );
  }
}
AppRegistry.registerComponent("Example of FlatList", () => FlatListComp);
const styles = StyleSheet.create({
  users: {
    fontSize: 16,
    borderWidth: 0,
    padding: 20,
    width: "52%",
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
    fontWeight: "bold",
    color: "grey",
    fontSize: 22,
    paddingLeft: 40,
    paddingTop: 20,
    marginTop: 15,
    width: "50%",
  },
  width: {
    borderBottomWidth: 1,
    borderBottomColor: "grey",
  },
  SearchBar: {
    flex: 1,
    paddingTop: 8,
    borderWidth: 0,
    borderRadius: 90,
  },
  a: {
    paddingLeft: 30,
  },
  b: {
    paddingLeft: 70,
  },
});
