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
import SearchComponent from "../Component/Search";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { SearchBar } from "react-native-elements";

var count = 10,
  rows = 10;
export default class EmployeeKpi extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      employees: "",
      search: "",
      test: "",
      page: 1,
      refreshing: false,
      token: "",
    };
    this.updateSearch = this.updateSearch.bind(this);
  }
  componentWillUnmount() {
    count = rows;
  }

  componentDidMount() {
    // this.setState({ refreshing: false });
    AsyncStorage.getItem("token").then((value) => {
      this.setState({ token: value });
      fetch(
        "http://192.168.1.105:8000/api/kpiCurrent/" +
          rows +
          "?page= " +
          this.state.page +
          "&empName=" +
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
          this.setState({ employees: JSON.parse(res) });
          count = JSON.parse(res).data.length;
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
        this.state.page +
        "&empName=" +
        this.state.search,
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
    fetch(
      "http://192.168.1.105:8000/api/kpiCurrent/" +
        rows +
        "?page= 1" +
        "&empName=" +
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
        this.setState({ employees: JSON.parse(res) });
        count = JSON.parse(res).data.length;
      })
      .catch((error) => {
        console.log(error);
      });
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

  render() {
    const color = ["255,255,255", "245, 245, 245"];

    return (
      <View style={styles.SearchBar}>
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

        <View style={[styles.flex, { position: "relative" }]}>
          <Text style={styles.tableTitle}>Employee</Text>
          <Text style={[styles.tableTitle, styles.t]}>KPI</Text>
          <Text style={[styles.tableTitle, styles.t]}>Level</Text>
        </View>

        <FlatList
          keyExtractor={(item, index) => index.toString()}
          // keyExtractor={item => item.index_id.toString()}
          data={this.state.employees.data}
          renderItem={({ item, index }) => (
            <View
              style={[
                styles.flex,
                { backgroundColor: "rgb(" + color[index % 2] + ")" },
              ]}
            >
              <Text style={[styles.users, styles.n]}>{item.empName}</Text>
              <Text style={[styles.users, styles.l]}>{item.name}</Text>
              <Text style={[styles.users, styles.g]}>{item.level}</Text>
            </View>
          )}
          refreshing={this.state.refreshing}
          onRefresh={() => this.onRefresh()}
          onEndReached={this.handleMore}
          onEndReachedThreshold={0.1}
        ></FlatList>
      </View>
    );
  }
}
AppRegistry.registerComponent("Example of FlatList", () => FlatListComp);
const styles = StyleSheet.create({
  users: {
    fontSize: 20,
    borderWidth: 0,
    padding: 20,
    width: "35%",
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
    paddingLeft: 10,
    paddingTop: 20,
    marginTop: 15,
    width: "35%",
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
  g: {
    paddingLeft: 60,
  },
  n: {
    paddingLeft: 10,
  },
  l: {
    paddingLeft: 30,
  },
  t: {
    paddingLeft: 40,
  },
});
