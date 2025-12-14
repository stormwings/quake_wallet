import React, { useState, useEffect } from 'react';
import { View, StyleSheet, Alert } from 'react-native';
import { SearchInput, SearchResults } from '../components';
import { useDebounce } from '../hooks';
import { instrumentsApi } from '../services';
import { Instrument } from '../types';

export default function SearchScreen() {
  const [query, setQuery] = useState('');
  const [results, setResults] = useState<Instrument[]>([]);
  const [loading, setLoading] = useState(false);

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
        // Error handling: log and clear results
        console.error('Error searching instruments:', err);
        setResults([]);
      } finally {
        setLoading(false);
      }
    };

    searchInstruments();
  }, [debouncedQuery]);

  const handleResultPress = (instrument: Instrument) => {
    // TODO: Abrir modal de órdenes con el instrumento seleccionado
    Alert.alert(
      'Instrumento seleccionado',
      `${instrument.ticker} - ${instrument.name}\nPrecio: $${instrument.last_price}`,
      [{ text: 'OK' }]
    );
  };

  return (
    <View style={styles.container}>
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
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f9fafb',
  },
});
