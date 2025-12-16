import React, { useEffect, useState } from "react";
import { StyleSheet, View } from "react-native";
import { OrderModal, SearchInput, SearchResults } from "../components";
import { reportError, toAppError } from "../errors";
import { useDebounce } from "../hooks";
import { useLocale } from "../i18n";
import { copy } from "../i18n/copy";
import { instrumentsApi } from "../services";
import { Instrument } from "../types";

export default function SearchScreen() {
  useLocale();

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
        const appErr = toAppError(err, {
          layer: 'ui',
          screen: 'SearchScreen',
          action: 'search',
        });
        reportError(appErr);
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
        key="search-input"
        value={query}
        onChangeText={setQuery}
        placeholder={copy.search.placeholder()}
      />

      <SearchResults
        key="search-results"
        results={results}
        loading={loading}
        query={debouncedQuery}
        onResultPress={handleResultPress}
      />

      <OrderModal
        key="search-order-modal"
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
