import React, { useEffect, useState } from "react";
import { StyleSheet, View } from "react-native";
import { OrderModal, SearchInput, SearchResults } from "../components";
import { useDebounce } from "../hooks";
import { copy } from "../i18n/copy";
import { useInstrumentSearch } from "../services/queries/useInstrumentSearch";
import { useLocaleStore } from "../store/useLocaleStore";
import { useOrderModalStore } from "../store/useOrderModalStore";
import { useSearchHistoryStore } from "../store/useSearchHistoryStore";

export default function SearchScreen() {
  useLocaleStore((state) => state.locale);

  const [query, setQuery] = useState("");
  const debouncedQuery = useDebounce(query, 300);

  const { isVisible, selectedInstrument, openModal, closeModal } =
    useOrderModalStore();

  const { addSearch } = useSearchHistoryStore();

  const { data: results = [], isLoading: loading } =
    useInstrumentSearch(debouncedQuery);

  useEffect(() => {
    if (debouncedQuery) {
      addSearch(debouncedQuery);
    }
  }, [debouncedQuery, addSearch]);

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
        onResultPress={openModal}
      />

      <OrderModal
        key="search-order-modal"
        visible={isVisible}
        onClose={closeModal}
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
