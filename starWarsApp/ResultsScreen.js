import React from "react";
import {
  StyleSheet,
  View,
  Text,
  FlatList,
  TouchableOpacity,
} from "react-native";

const ResultsScreen = ({ results, setShowResults }) => {
  const people = results?.map((result) => result.peopleNames).flat();

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.headerText}>Results</Text>
      </View>
      {results ? (
        <FlatList
          data={people}
          keyExtractor={(item, index) => index.toString()}
          renderItem={({ item }) => <Text>{item}</Text>}
          ListEmptyComponent={() => (
            <Text style={styles.noResultsText}>No results found.</Text>
          )}
        />
      ) : (
        <Text>Loading...</Text>
      )}

      <TouchableOpacity onPress={() => setShowResults(false)}>
        <Text style={styles.backButton}>Back to Search</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
  },
  header: {
    alignSelf: "flex-start",
    marginBottom: 20,
    marginLeft: 20,
  },
  headerText: {
    fontSize: 24,
    fontWeight: "bold",
  },
  backButton: {
    marginTop: 20,
    color: "blue",
    textDecorationLine: "underline",
  },
  noResultsText: {
    fontStyle: "italic",
  },
});

export default ResultsScreen;
