import React from 'react';
import { View, Text, FlatList, StyleSheet } from 'react-native';
import { Instrument } from '../../types';
import { InstrumentCard } from '../instruments';
import { Loading } from '../common';

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
  onResultPress
}) => {
  if (loading) {
    return <Loading />;
  }

  if (!query.trim()) {
    return (
      <View style={styles.emptyContainer}>
        <Text style={styles.emptyIcon}>🔍</Text>
        <Text style={styles.emptyTitle}>Buscar instrumentos</Text>
        <Text style={styles.emptyText}>
          Ingresa el ticker del instrumento que deseas buscar
        </Text>
      </View>
    );
  }

  if (results.length === 0) {
    return (
      <View style={styles.emptyContainer}>
        <Text style={styles.emptyIcon}>😕</Text>
        <Text style={styles.emptyTitle}>Sin resultados</Text>
        <Text style={styles.emptyText}>
          No se encontraron instrumentos para &quot;{query}&quot;
        </Text>
      </View>
    );
  }

  return (
    <FlatList
      data={results}
      keyExtractor={(item) => item.id.toString()}
      renderItem={({ item }) => (
        <InstrumentCard
          instrument={item}
          onPress={() => onResultPress(item)}
        />
      )}
      contentContainerStyle={styles.listContainer}
      showsVerticalScrollIndicator={false}
    />
  );
};

const styles = StyleSheet.create({
  listContainer: {
    paddingVertical: 8,
  },
  emptyContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 40,
  },
  emptyIcon: {
    fontSize: 64,
    marginBottom: 16,
  },
  emptyTitle: {
    fontSize: 20,
    fontWeight: '600',
    color: '#1f2937',
    marginBottom: 8,
  },
  emptyText: {
    fontSize: 16,
    color: '#9ca3af',
    textAlign: 'center',
    lineHeight: 24,
  },
});
