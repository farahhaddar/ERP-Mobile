import { StatusBar } from "expo-status-bar";
import React from "react";
import { SafeAreaView, FlatList, ScrollView } from "react-native";
import { StyleSheet, Text, View } from "react-native";
var user = ["John", "James", "Lisa"];
export default class TableComp extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      input: "",
    };
  }

  render() {
    let data = [];
    for (let i = 0; i < 7; i++) {
      data.push(<Text style={styles.users}>asdsad</Text>);
      data.push(<Text style={styles.users1}>asdsad</Text>);
    }
    return (
      <SafeAreaView>
        <ScrollView>
          <View style={styles.flex}>
            <Text style={styles.tableTitle}>Project</Text>
            <Text style={styles.tableTitle}>Role</Text>
          </View>
          <Text style={styles.width}></Text>
          <View style={styles.flex}>
            <Text style={styles.users}>asdsads</Text>
            <Text style={styles.users}>Manager</Text>
          </View>
          <View style={styles.flex1}>
            <Text style={styles.users}>asdsad</Text>
            <Text style={styles.users}>Role</Text>
          </View>
          <View style={styles.flex}>
            <Text style={styles.users}>asdsads</Text>
            <Text style={styles.users}>Manager</Text>
          </View>
          <View style={styles.flex1}>
            <Text style={styles.users}>asdsad</Text>
            <Text style={styles.users}>Role</Text>
          </View>
          <View style={styles.flex}>
            <Text style={styles.users}>asdsads</Text>
            <Text style={styles.users}>Manager</Text>
          </View>
          <View style={styles.flex1}>
            <Text style={styles.users}>asdsad</Text>
            <Text style={styles.users}>Role</Text>
          </View>
          <View style={styles.flex}>
            <Text style={styles.users}>asdsads</Text>
            <Text style={styles.users}>Manager</Text>
          </View>
          <View style={styles.flex1}>
            <Text style={styles.users}>asdsad</Text>
            <Text style={styles.users}>Role</Text>
          </View>
          <View style={styles.flex}>
            <Text style={styles.users}>asdsads</Text>
            <Text style={styles.users}>Manager</Text>
          </View>
          <View style={styles.flex1}>
            <Text style={styles.users}>asdsad</Text>
            <Text style={styles.users}>Role</Text>
          </View>
          <View style={styles.flex}>
            <Text style={styles.users}>asdsads</Text>
            <Text style={styles.users}>Manager</Text>
          </View>
          <View style={styles.flex1}>
            <Text style={styles.users}>asdsad</Text>
            <Text style={styles.users}>Role</Text>
          </View>
          <View style={styles.flex}>
            <Text style={styles.users}>asdsads</Text>
            <Text style={styles.users}>Manager</Text>
          </View>
          <View style={styles.flex1}>
            <Text style={styles.users}>asdsad</Text>
            <Text style={styles.users}>Role</Text>
          </View>
        </ScrollView>
      </SafeAreaView>
    );
  }
}
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
