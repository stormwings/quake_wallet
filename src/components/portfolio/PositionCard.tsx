import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { Position } from '../../types';
import { calculateMarketValue, calculateProfit, calculateProfitPercentage } from '../../utils/calculations';
import { formatCurrency, formatPercentage } from '../../utils/formatters';

interface PositionCardProps {
  position: Position;
}

export const PositionCard: React.FC<PositionCardProps> = ({ position }) => {
  const { ticker, quantity, last_price, avg_cost_price } = position;

  const marketValue = calculateMarketValue(quantity, last_price);
  const profit = calculateProfit(quantity, last_price, avg_cost_price);
  const profitPercentage = calculateProfitPercentage(last_price, avg_cost_price);

  const isProfitable = profit >= 0;
  const profitColor = isProfitable ? '#10b981' : '#ef4444';

  return (
    <View style={styles.card}>
      <View style={styles.header}>
        <Text style={styles.ticker}>{ticker}</Text>
        <Text style={styles.quantity}>{quantity} acciones</Text>
      </View>

      <View style={styles.row}>
        <Text style={styles.label}>Valor de mercado:</Text>
        <Text style={styles.value}>{formatCurrency(marketValue)}</Text>
      </View>

      <View style={styles.row}>
        <Text style={styles.label}>Ganancia:</Text>
        <Text style={[styles.value, { color: profitColor }]}>
          {formatCurrency(profit)}
        </Text>
      </View>

      <View style={styles.row}>
        <Text style={styles.label}>Rendimiento:</Text>
        <Text style={[styles.value, { color: profitColor }]}>
          {formatPercentage(profitPercentage)}
        </Text>
      </View>

      <View style={styles.divider} />

      <View style={styles.footer}>
        <Text style={styles.footerLabel}>Precio promedio de compra:</Text>
        <Text style={styles.footerValue}>{formatCurrency(avg_cost_price)}</Text>
      </View>

      <View style={styles.footer}>
        <Text style={styles.footerLabel}>Precio actual:</Text>
        <Text style={styles.footerValue}>{formatCurrency(last_price)}</Text>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  card: {
    backgroundColor: '#ffffff',
    borderRadius: 12,
    padding: 16,
    marginHorizontal: 16,
    marginVertical: 8,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 16,
  },
  ticker: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#1f2937',
  },
  quantity: {
    fontSize: 14,
    color: '#6b7280',
  },
  row: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 12,
  },
  label: {
    fontSize: 14,
    color: '#6b7280',
  },
  value: {
    fontSize: 16,
    fontWeight: '600',
    color: '#1f2937',
  },
  divider: {
    height: 1,
    backgroundColor: '#e5e7eb',
    marginVertical: 12,
  },
  footer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginTop: 4,
  },
  footerLabel: {
    fontSize: 12,
    color: '#9ca3af',
  },
  footerValue: {
    fontSize: 12,
    color: '#6b7280',
    fontWeight: '500',
  },
});
