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
import { FontAwesomeIcon } from "@fortawesome/react-native-fontawesome";
import { faChartLine } from "@fortawesome/free-solid-svg-icons";
import AsyncStorage from "@react-native-async-storage/async-storage";
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
      token: "",
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
    AsyncStorage.getItem("token").then((value) => {
      this.setState({ token: value });
      fetch(
        "http://192.168.1.105:8000/api/kpiCurrent/10?empId=" +
          empId +
          "?page= " +
          this.state.page +
          "&name=" +
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
          this.setState({ Kpis: JSON.parse(res) });
          count = JSON.parse(res).data.length;
        })
        .catch((error) => {
          console.log(error);
        });
    });
  }
  handleMore = () => {
    var { data } = this.props.route.params;

    empId = data;
    fetch(
      "http://192.168.1.105:8000/api/kpiCurrent/10?empId=" +
        empId +
        "?page= " +
        this.state.page +
        "&name=" +
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
    fetch(
      "http://192.168.1.105:8000/api/kpiCurrent/" +
        rows +
        "?page= 1" +
        "&name=" +
        e +
        "&empId=" +
        empId,
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
        this.setState({ Kpis: JSON.parse(res) });
        count = JSON.parse(res).data.length;
      })
      .catch((error) => {});
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
          <Text style={styles.tableTitle}> KPI </Text>
          <Text style={styles.tableTitle}>Level</Text>
          <Text style={styles.tableTitle}>Graph </Text>
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
              <Text style={[styles.users, styles.n]}>{item.name}</Text>
              <Text style={[styles.users, styles.l]}>{item.level}</Text>
              <Text style={[styles.users, styles.g]}>
                <TouchableOpacity
                  style={styles.buttonContainer}
                  onPress={() =>
                    this.props.navigation.navigate("Graph", {
                      data: item.id,
                    })
                  }
                >
                  <Text style={styles.buttonText}>
                    <FontAwesomeIcon
                      color={"rgb(255,25,146)"}
                      size={22}
                      icon={faChartLine}
                    />
                  </Text>
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
    paddingLeft: 20,
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
    paddingLeft: 40,
  },
  n: {
    paddingLeft: 10,
  },
  l: {
    paddingLeft: 30,
  },
});
