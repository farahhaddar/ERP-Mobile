import React, { useState } from "react";
import { StyleSheet } from "react-native";
import { SearchBar } from "react-native-elements";

const SearchComponent = (props) => {
  return (
    <SearchBar
      placeholder="Search Here..."
      placeholderTextColor="gray"
      platform="default"
      leftIconContainerStyle={{ paddingLeft: 8, width: 30 }}
      containerStyle={styles.searchContainer}
      inputStyle={styles.searchInput}
      round={true}
      showCancel={true}
      showLoading={true}
      lightTheme={true}
      value={props.change}
      onChangeText={props.searchInput}
    />
  );
};

const styles = StyleSheet.create({
  searchContainer: {
    backgroundColor: "rgb(245, 245, 245)",
    width: "100%",
    borderBottomWidth: 0,
    borderTopWidth: 0,
    padding: 10,
  },
  searchInput: {
    color: "black",
  },
});

export default SearchComponent;
