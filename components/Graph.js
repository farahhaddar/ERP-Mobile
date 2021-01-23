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
import { LineChart } from "react-native-chart-kit";
import { Dimensions } from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";
let kpiId;
const screenWidth = Dimensions.get("window").width;
export default class Graph extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      Kpis: "",
    };
  }
  componentDidMount() {
    var { data } = this.props.route.params;

    kpiId = data;

    console.log(kpiId);
    AsyncStorage.getItem("token").then((value) => {
      fetch("http://192.168.1.105:8000/api/kpisd/100?kpiId=" + kpiId, {
        method: "GET",
        headers: {
          Accept: "application/json",
          // "Content-Type": "application/json",
          Authorization: "Bearer " + value,
        },
      })
        .then((res) => res.text())
        .then((res) => {
          this.setState({ Kpis: JSON.parse(res) });
        })
        .catch((error) => {
          console.log(error);
        });
    });
  }

  render() {
    let array = [];
    if (this.state.Kpis.data != undefined) {
      for (let i = 0; i < this.state.Kpis.data.length; i++) {
        array.push(parseInt(this.state.Kpis.data[i].level));
      }
    }
    let date = [];
    if (this.state.Kpis.data != undefined) {
      let N = 1;
      for (let i = 0; i < this.state.Kpis.data.length; i++) {
        const level = N++;
        date.push(level);
      }
    }
    if (array[0] == undefined) array.push(0);
    return (
      <View style={styles.cont}>
        <Text style={styles.hed}>Kpi Progress </Text>
        <View style={styles.cc}>
          <View style={styles.gc}>
            <Text style={styles.t}> Percentage </Text>
            <LineChart
              data={{
                labels: date,
                datasets: [
                  {
                    data: array,
                  },
                ],
              }}
              width={Dimensions.get("window").width} // from react-native
              height={250}
              // withInnerLines='false'
              yAxistitle=" percentage"
              // fromZero='true'
              yAxisLabel="%"
              yAxisInterval={1} // optional, defaults to 1
              chartConfig={{
                backgroundGradientFrom: "rgb(223,28,95)",
                backgroundGradientTo: "rgb(255,25,146)",
                decimalPlaces: 0,
                color: (opacity = 1) => `rgba(0, 0, 0, ${opacity})`,
                labelColor: (opacity = 1) => `rgba(255, 255, 255, ${opacity})`,
                propsForLabels: {
                  fontSize: 18,
                  fontWeight: "bold",
                },
                style: {
                  borderRadius: 16,
                },
                propsForDots: {
                  r: "4",
                  strokeWidth: "2",
                  stroke: "rgba(255,255,255)",
                },
              }}
              bezier
              style={{
                marginVertical: 9,
                //// borderRadius: 35,
              }}
            />
            <Text style={styles.tt}> Level </Text>
          </View>
        </View>
      </View>
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
    marginTop: 50,
    display: "flex",
    flexDirection: "row",
    width: "100%",
    height: 390,
    backgroundColor: "black",
    borderRadius: 18,
  },
  hed: {
    textAlign: "center",
    fontSize: 25,
    fontWeight: "bold",
    marginTop: 30,
    marginBottom: 6,
  },
  gc: {
    marginTop: 20,
  },
  t: {
    fontSize: 20,
    color: "white",
    marginBottom: 5,
  },
  tt: {
    fontSize: 20,
    color: "white",
    marginTop: 8,
    textAlign: "right",
  },
});
