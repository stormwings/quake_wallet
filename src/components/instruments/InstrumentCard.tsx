import React from 'react';
import { StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { Instrument } from '../../types';
import { calculateReturn } from '../../utils/calculations';
import { formatCurrency, formatPercentage } from '../../utils/formatters';

interface InstrumentCardProps {
  instrument: Instrument;
  onPress?: () => void;
}

export function InstrumentCard({ instrument, onPress }: InstrumentCardProps) {
  const returnValue = calculateReturn(instrument.last_price, instrument.close_price);
  const isPositive = returnValue >= 0;

  return (
    <TouchableOpacity
      style={styles.card}
      onPress={onPress}
      activeOpacity={0.7}
    >
      <View style={styles.header}>
        <Text style={styles.ticker}>{instrument.ticker}</Text>
        <Text style={styles.price}>{formatCurrency(instrument.last_price)}</Text>
      </View>
      <View style={styles.body}>
        <Text style={styles.name} numberOfLines={1}>
          {instrument.name}
        </Text>
        <Text style={[styles.return, isPositive ? styles.positive : styles.negative]}>
          {formatPercentage(returnValue)}
        </Text>
      </View>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  card: {
    backgroundColor: '#fff',
    borderRadius: 12,
    padding: 16,
    marginBottom: 12,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 8,
  },
  ticker: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#000',
  },
  price: {
    fontSize: 18,
    fontWeight: '600',
    color: '#000',
  },
  body: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  name: {
    fontSize: 14,
    color: '#666',
    flex: 1,
    marginRight: 8,
  },
  return: {
    fontSize: 14,
    fontWeight: '600',
  },
  positive: {
    color: '#34C759',
  },
  negative: {
    color: '#FF3B30',
  },
});
