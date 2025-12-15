import React, { useEffect, useState } from "react";
import { StyleSheet, View } from "react-native";
import { OrderModal, SearchInput, SearchResults } from "../components";
import { useDebounce } from "../hooks";
import { instrumentsApi } from "../services";
import { Instrument } from "../types";

export default function SearchScreen() {
  const [query, setQuery] = useState("");
  const [results, setResults] = useState<Instrument[]>([]);
  const [loading, setLoading] = useState(false);
  const [selectedInstrument, setSelectedInstrument] =
    useState<Instrument | null>(null);
  const [modalVisible, setModalVisible] = useState(false);

  const debouncedQuery = useDebounce(query, 300);

  useEffect(() => {
    const searchInstruments = async () => {
      if (!debouncedQuery.trim()) {
        setResults([]);
        return;
      }

      setLoading(true);

      try {
        const searchResults = await instrumentsApi.search(debouncedQuery);
        setResults(searchResults);
      } catch (err) {
        // TODO: centralize errors
        console.error("Error searching instruments:", err);
        setResults([]);
      } finally {
        setLoading(false);
      }
    };

    searchInstruments();
  }, [debouncedQuery]);

  const handleResultPress = (instrument: Instrument) => {
    setSelectedInstrument(instrument);
    setModalVisible(true);
  };

  const handleCloseModal = () => {
    setModalVisible(false);
    setSelectedInstrument(null);
  };

  return (
    <View testID="search-screen" style={styles.container}>
      <SearchInput
        value={query}
        onChangeText={setQuery}
        placeholder="Buscar por ticker..."
      />

      <SearchResults
        results={results}
        loading={loading}
        query={debouncedQuery}
        onResultPress={handleResultPress}
      />

      <OrderModal
        visible={modalVisible}
        onClose={handleCloseModal}
        instrument={selectedInstrument}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#F8FAFC",
  },
});
