import React, { useEffect } from 'react';
import { ActivityIndicator, FlatList, StyleSheet, Text, View } from 'react-native';
import { InstrumentCard } from '../components/instruments';
import { useAppDispatch, useAppSelector } from '../store';
import { fetchInstruments } from '../store/slices';

export default function InstrumentsScreen() {
  const dispatch = useAppDispatch();
  const { data, loading, error } = useAppSelector((state) => state.instruments);

  useEffect(() => {
    dispatch(fetchInstruments());
  }, [dispatch]);

  if (loading) {
    return (
      <View style={styles.centered}>
        <ActivityIndicator size="large" color="#007AFF" />
      </View>
    );
  }

  if (error) {
    return (
      <View style={styles.centered}>
        <Text style={styles.errorText}>Error: {error}</Text>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <FlatList
        data={data}
        keyExtractor={(item) => item.id.toString()}
        renderItem={({ item }) => <InstrumentCard instrument={item} />}
        contentContainerStyle={styles.list}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f5f5f5',
  },
  centered: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  list: {
    padding: 16,
  },
  errorText: {
    color: '#ff3b30',
    fontSize: 16,
  },
});
