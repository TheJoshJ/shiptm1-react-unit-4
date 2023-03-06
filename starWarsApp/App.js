import React, { useState, useEffect } from "react";
import { StyleSheet, View } from "react-native";
import SearchScreen from "./SearchScreen";
import ResultsScreen from "./ResultsScreen";

export default function App() {
  const [results, setResults] = useState(null);
  const [showResults, setShowResults] = useState(false);

  useEffect(() => {
    const fetchData = async () => {
      const response = await fetch(
        `https://swapi.dev/api/species/?search=human&format=json`
      );
      const data = await response.json();
      const filteredResults = data.results.filter(
        (result) => result.classification === "mammal"
      );
      const resultsWithPeople = await Promise.all(
        filteredResults.map(async (result) => {
          const peopleResponses = await Promise.all(
            result.people.map((url) => fetch(url))
          );
          const peopleData = await Promise.all(
            peopleResponses.map((response) => response.json())
          );
          const peopleNames = peopleData.map((person) => person.name);
          return { ...result, peopleNames };
        })
      );
      setResults(resultsWithPeople);
    };
    fetchData();
  }, []);

  const handleSearch = async (query) => {
    const response = await fetch(
      `https://swapi.dev/api/species/?search=${query}&format=json`
    );
    const data = await response.json();
    const filteredResults = data.results.filter(
      (result) => result.classification === "mammal"
    );
    const resultsWithPeople = await Promise.all(
      filteredResults.map(async (result) => {
        const peopleResponses = await Promise.all(
          result.people.map((url) => fetch(url))
        );
        const peopleData = await Promise.all(
          peopleResponses.map((response) => response.json())
        );
        const peopleNames = peopleData.map((person) => person.name);
        return { ...result, peopleNames };
      })
    );
    setResults(resultsWithPeople);
    setShowResults(true);
  };

  const dummyData = ["Dormé", "Dooku", "Bail Prestor Organa", "Jocasta Nu"];

  return (
    <View style={styles.container}>
      {results !== null && showResults ? (
        <ResultsScreen results={results} setShowResults={setShowResults} />
      ) : (
        <SearchScreen
          handleSearch={handleSearch}
          setShowResults={setShowResults}
        />
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
  },
});

//I got it to display the names finally after a LOT of trouble shooting (YAY). The only thing I didn't have time to add was to reset my results every time I went back to the search screen. As a result of that, whenever you complete a search initially it will show the previous results and then after all of the promises from the fetch request are fulfilled it will update to list the people. Wookie and Human I believe are the only ones that work right now based on the paramaters of it needing to be a mammal.
