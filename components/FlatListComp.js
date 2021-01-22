import { StatusBar } from "expo-status-bar";
import React from "react";
import {
  SafeAreaView,
  StyleSheet,
  Text,
  View,
  FlatList,
  ScrollView,
  AppRegistry,
} from "react-native";

export default class FlatListComp extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      input: [],
      input1: [ ],
    };
  }
  handleMore = () => {
    this.setState({ input: [...this.state.input, this.state.input1] });
  };

  render() {
    var color = ["255,255,255", "245, 245, 245"];

    return (
      <View style={{ flex: 1, paddingTop: 30 }}>
        {/* <ScrollView> */}
        <View style={[styles.flex, { position: "relative" }]}>
          <Text style={styles.tableTitle}>Project</Text>
          <Text style={styles.tableTitle}>Role</Text>
        </View>

        <FlatList
          keyExtractor={(item, index) => index}
          data={this.state.input}
          renderItem={({ item, index }) => (
            <View
              style={[
                styles.flex,
                { backgroundColor: "rgb(" + color[index % 2] + ")" },
              ]}
            >
              <Text style={styles.users}>asdsads</Text>
              <Text style={styles.users}>Manager</Text>
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
