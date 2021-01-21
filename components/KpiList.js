import React, { useState, useEffect } from "react";
import {
  SafeAreaView,
  View,
  FlatList,
  StyleSheet,
  Text,
  StatusBar,
} from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import SearchComponent from "../Component/Search";

const List = () => {
  const [employee, setEmployee] = useState("");
  const [change, setChange] = useState("");
  // const token = AsyncStorage.getItem("token");

  useEffect(() => {
    fetch("http://192.168.1.3:8000/api/kpiCurrent/8", {
      method: "GET",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
        // Authorization: "Bearer " + token,
      },
    })
      .then((res) => res.text())
      .then((res) => setEmployee(JSON.parse(res)))
      .catch((err) => console.log(err));
  }, []);

  const searchInput = (value) => setChange(value);

  const ItemSeparatorView = () => {
    return (
      // FlatList Item Separator
      <View
        style={{
          height: 0.5,
          width: "100%",
          backgroundColor: "#C8C8C8",
        }}
      />
    );
  };
  //   useEffect(() => {
  //     const results = employee.filter((employee) => {
  //       return employee.data.empName.toLowerCase().includes(change.toLowerCase());
  //     });
  //     setSearchResults(results);
  //   }, [change]);
  console.log(employee);
  return (
    <SafeAreaView style={styles.container}>
      <SearchComponent change={change} searchInput={searchInput} />
      <View>
        <Text style={styles.title}>Hello</Text>
      </View>
      <FlatList
        data={employee.data}
        renderItem={({ item }) => {
          return (
            <View style={item.id % 2 == 0 ? styles.item : styles.item1}>
              <Text style={styles.title}>{item.empName} </Text>
              <Text style={styles.title}>{item.name}</Text>
              <Text style={styles.title}>{item.level}</Text>
            </View>
          );
        }}
        ItemSeparatorComponent={ItemSeparatorView}
        keyExtractor={(item) => item.id.toString()}
      />
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    marginTop: StatusBar.currentHeight || 0,
    backgroundColor: "powderblue",
  },
  item: {
    backgroundColor: "white",
    padding: 10,
    marginVertical: 8,
    marginHorizontal: 16,
    display: "flex",
    flexDirection: "row",
    justifyContent: "space-between",
    borderRadius: 5,
  },
  item1: {
    backgroundColor: "gold",
    padding: 10,
    marginVertical: 8,
    marginHorizontal: 16,
    display: "flex",
    flexDirection: "row",
    justifyContent: "space-between",
    borderRadius: 5,
  },
  title: {
    width: "30%",
    fontSize: 16,
  },
});

export default List;
