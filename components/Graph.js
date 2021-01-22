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
    fetch("http://192.168.1.105:8000/api/kpisd/100?kpiId=" + kpiId, {
      method: "GET",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
    })
      .then((res) => res.text())
      .then((res) => {
        this.setState({ Kpis: JSON.parse(res) });
      })
      .catch((error) => {
        console.log(error);
      });
  }

  render() {
    let array = [];
    if (this.state.Kpis.data != undefined) {
      for (let i = 0; i < this.state.Kpis.data.length; i++) {
        array.push(this.state.Kpis.data[i].level);
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

    return (
      <View>
        <Text>Kpi Progress </Text>
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
          height={300}
          // withInnerLines='false'
          yAxistitle=" percentage"
          // fromZero='true'
          yAxisLabel="%"
          yAxisInterval={1} // optional, defaults to 1
          chartConfig={{
            backgroundGradientFrom: "rgb(223,28,95)",
            backgroundGradientTo: "rgb(255,25,146)",
            decimalPlaces: 2, // optional, defaults to 2dp
            color: (opacity = 1) => `rgba(0, 0, 0, ${opacity})`,
            labelColor: (opacity = 1) => `rgba(255, 255, 255, ${opacity})`,
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
            marginVertical: 8,
            borderRadius: 16,
          }}
        />
      </View>
    );
  }
}
