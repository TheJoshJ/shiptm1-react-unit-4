import React, { useState } from "react";
import { StyleSheet, TextInput, View, Text } from "react-native";
import { Button } from "react-native-elements";

const SearchScreen = ({ handleSearch, setShowResults }) => {
  const [searchInput, setSearchInput] = useState("");

  const handleSubmit = () => {
    handleSearch(searchInput);
    setShowResults(true);
  };

  return (
    <View style={styles.container}>
      <TextInput
        style={styles.searchBox}
        value={searchInput}
        onChangeText={setSearchInput}
        placeholder="Search for a mammal"
      />
      <Button title="Search" onPress={handleSubmit} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
  },
  searchBox: {
    borderWidth: 1,
    borderColor: "#000",
    borderRadius: 5,
    padding: 10,
    width: "80%",
    marginBottom: 20,
  },
});

export default SearchScreen;
