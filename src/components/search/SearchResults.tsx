import { Ionicons } from "@expo/vector-icons";
import React from "react";
import { FlatList, StyleSheet, Text, View } from "react-native";
import { copy } from "../../i18n/copy";
import { useLocaleStore } from "../../store/useLocaleStore";
import { Instrument } from "../../types";
import { Loading } from "../common";
import { InstrumentCard } from "../instruments";

interface SearchResultsProps {
  results: Instrument[];
  loading: boolean;
  query: string;
  onResultPress: (instrument: Instrument) => void;
}

export const SearchResults: React.FC<SearchResultsProps> = ({
  results,
  loading,
  query,
  onResultPress,
}) => {
  useLocaleStore((state) => state.locale);

  if (loading) {
    return <Loading />;
  }

  if (!query.trim()) {
    return (
      <View testID="search-empty-state" style={styles.emptyContainer}>
        <View style={styles.illustrationCircle}>
          <Ionicons name="search" size={28} color="#6D28D9" />
        </View>
        <Text style={styles.emptyTitle}>{copy.search.emptyTitle()}</Text>
        <Text style={styles.emptyText}>
          {copy.search.emptyDescription()}
        </Text>
      </View>
    );
  }

  if (results.length === 0) {
    return (
      <View testID="search-no-results" style={styles.emptyContainer}>
        <View
          style={[styles.illustrationCircle, styles.illustrationCircleMuted]}
        >
          <Ionicons name="alert-circle" size={28} color="#6B7280" />
        </View>
        <Text style={styles.emptyTitle}>{copy.search.noResultsTitle()}</Text>
        <Text style={styles.emptyText}>
          {copy.search.noResultsDescription(query)}
        </Text>
      </View>
    );
  }

  return (
    <FlatList
      testID="search-results-list"
      data={results}
      keyExtractor={(item) => item.id.toString()}
      renderItem={({ item }) => (
        <InstrumentCard instrument={item} onPress={() => onResultPress(item)} />
      )}
      contentContainerStyle={styles.listContainer}
      showsVerticalScrollIndicator={false}
      removeClippedSubviews={false}
    />
  );
};

const styles = StyleSheet.create({
  listContainer: {
    paddingTop: 6,
    paddingBottom: 18,
  },

  emptyContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    paddingHorizontal: 28,
  },

  illustrationCircle: {
    width: 64,
    height: 64,
    borderRadius: 32,
    backgroundColor: "#F3E8FF",
    alignItems: "center",
    justifyContent: "center",
    marginBottom: 12,
    borderWidth: 1,
    borderColor: "#E9D5FF",
  },

  illustrationCircleMuted: {
    backgroundColor: "#F3F4F6",
    borderColor: "#E5E7EB",
  },

  emptyTitle: {
    fontSize: 16,
    fontWeight: "800",
    color: "#111827",
    marginBottom: 6,
  },

  emptyText: {
    fontSize: 13,
    color: "#6B7280",
    textAlign: "center",
    lineHeight: 18,
  },
});
