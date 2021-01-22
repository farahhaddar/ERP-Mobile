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

var count = 10,
  rows = 10;
var empId;

export default class FlatListComp extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      Kpis: "",
      search: "",
      page: 1,
      refreshing: false,
    };
    this.updateSearch = this.updateSearch.bind(this);
  }
  componentWillUnmount() {
    count = rows;
  }
  componentDidMount() {
    var { data } = this.props.route.params;

    empId = data;

    fetch(
      "http://192.168.0.119:8000/api/kpiCurrent/10?empId=" +
        empId +
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
        this.setState({ Kpis: JSON.parse(res) });
        count = JSON.parse(res).data.length;
      })
      .catch((error) => {
        console.log(error);
      });
  }
  handleMore = () => {
    var { data } = this.props.route.params;

    empId = data;
    fetch(
      "http://192.168.0.119:8000/api/kpiCurrent/10?empId=" +
        empId +
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

        let Kpis = { ...this.state.Kpis };
        if (count < rows) for (let i = 0; i < count; i++) Kpis.data.pop();

        Kpis.data = [...Kpis.data, ...JSON.parse(res).data];
        this.setState({
          Kpis: Kpis,
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
        Kpis: "",
      },
      () => this.componentDidMount()
    );
  }

  render() {
    const color = ["255,255,255", "245, 245, 245"];

    const data = {};

    return (
      <View style={{ flex: 1, paddingTop: 30 }}>
        <SearchBar
          placeholder="Type Here..."
          onChangeText={this.updateSearch}
          value={this.state.search}
        />

        <View style={[styles.flex, { position: "relative" }]}>
          <Text style={styles.tableTitle}> Kpi name </Text>
          <Text style={styles.tableTitle}>Level</Text>
          <Text style={styles.tableTitle}>graph </Text>
        </View>

        <FlatList
          keyExtractor={(item, index) => index}
          data={this.state.Kpis.data}
          renderItem={({ item, index }) => (
            <View
              style={[
                styles.flex,
                { backgroundColor: "rgb(" + color[index % 2] + ")" },
              ]}
            >
              <Text style={styles.users}>{item.name}</Text>
              <Text style={styles.users}>{item.level}</Text>
              <Text style={styles.users}>
                <TouchableOpacity
                  style={styles.buttonContainer}
                  onPress={() =>
                    this.props.navigation.navigate("Graph", {
                      data: item.id,
                    })
                  }
                >
                  <Text style={styles.buttonText}>graph</Text>
                </TouchableOpacity>
              </Text>
            </View>
          )}
          refreshing={this.state.refreshing}
          onRefresh={() => this.onRefresh()}
          onEndReached={this.handleMore}
          // onEndReachedThreshold={100}
        ></FlatList>
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
    width: "40%",
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
