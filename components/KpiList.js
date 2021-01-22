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
// import { navigation } from "react-native";
var flowers = [{ key: "asdasd1" }, { key: "asdasd2" }];
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
    fetch(
      "http://192.168.1.4:8000/api/kpiCurrent/" +
        rows +
        "?page= " +
        this.state.page +
        "&empName=" +
        this.state.search,
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
        count = JSON.parse(res).data.length;
      })
      .catch((error) => {
        console.log(error);
      });
  }
  handleMore = () => {
    fetch(
      "http://192.168.1.4:8000/api/kpiCurrent/" +
        rows +
        "?page= " +
        this.state.page +
        "&empName=" +
        this.state.search,
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
        console.log(error);
      });
  };
  updateSearch(e) {
    this.setState({ page: 1 });
    this.setState({ search: e });
    fetch(
      "http://192.168.1.4:8000/api/kpiCurrent/" +
        rows +
        "?page= 1" +
        "&empName=" +
        e,
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
      <View style={{ flex: 1 }}>
        <SearchComponent
          searchInput={this.updateSearch}
          change={this.state.search}
        />

        <View style={[styles.flex, { position: "relative" }]}>
          <Text style={styles.tableTitle}>Employee</Text>
          <Text style={styles.tableTitle}>KPI</Text>
          <Text style={styles.tableTitle}>Level</Text>
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
              <Text style={styles.users}>{item.empName}</Text>
              <Text style={styles.users}>{item.name}</Text>
              <Text style={styles.users}>{item.level}</Text>
              {/* <Text style={styles.users}>{item.name}</Text>
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
              <Text style={styles.users}>
                <TouchableOpacity
                  style={styles.buttonContainer}
                  onPress={() =>
                    this.props.navigation.navigate("Individualkpis", {
                      data: item.id,
                    })
                  }
                >
                  <Text style={styles.buttonText}>Kpis</Text>
                </TouchableOpacity>
              </Text> */}
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
    fontSize: 15,
    borderWidth: 0,
    padding: 20,
    width: "33%",
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
    paddingTop: 10,
    marginBottom: 20,
    width: "33%",
  },
  width: {
    borderBottomWidth: 1,
    borderBottomColor: "grey",
  },
});
