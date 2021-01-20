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
var user = ["John", "James", "Lisa"];
var empId;
var count = 3,
  rows = 3;
export default class ProjectRoles extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      projects: "",
      page: 1,
    };
  }
  componentDidMount() {
    // var a = this.props.navigation.state.params.something;
    // alert(a);
    var { data } = this.props.route.params;
    // alert(data);
    empId = data;
    fetch(
      "http://192.168.1.105:8000/api/projectRole/" + empId + "/3" + "?page=1 "
    )
      .then((res) => res.text())
      .then((res) => {
        if (JSON.parse(res).data.length == rows) {
          this.state.page = this.state.page + 1;
        }
        this.setState({ projects: JSON.parse(res) });
      });
  }
  handleMore = () => {
    // this.setState({ input: [...this.state.input, this.state.input1] });
    fetch(
      "http://192.168.1.105:8000/api/projectRole/" +
        empId +
        "/3" +
        "?page= " +
        this.state.page
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
        // console.log(error);
      });
  };

  render() {
    var color = ["255,255,255", "245, 245, 245"];
    // console.log(this.state.employees);
    const data = { name: "Ali" };

    return (
      <View style={{ flex: 1, paddingTop: 30 }}>
        {/* <ScrollView> */}
        <View style={[styles.flex, { position: "relative" }]}>
          <Text style={styles.tableTitle}>Project</Text>
          <Text style={styles.tableTitle}>Role</Text>
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
              <Text style={styles.users}>{item.projectName}</Text>
              <Text style={styles.users}>{item.roleName}</Text>
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