import React, { useEffect } from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { useAppDispatch, useAppSelector } from '../store';
import { fetchPortfolio } from '../store/slices';
import { Loading, ErrorMessage, PositionList } from '../components';
import { calculateMarketValue } from '../utils/calculations';
import { formatCurrency } from '../utils/formatters';

export default function PortfolioScreen() {
  const dispatch = useAppDispatch();
  const { data: positions, loading, error } = useAppSelector((state) => state.portfolio);

  useEffect(() => {
    dispatch(fetchPortfolio());
  }, [dispatch]);

  const handleRefresh = () => {
    dispatch(fetchPortfolio());
  };

  const handleRetry = () => {
    dispatch(fetchPortfolio());
  };

  // Calculate total portfolio value
  const totalValue = positions?.reduce((sum, position) => {
    return sum + calculateMarketValue(position.quantity, position.last_price);
  }, 0) || 0;

  if (loading && !positions) {
    return <Loading />;
  }

  if (error && !positions) {
    return <ErrorMessage message={error} onRetry={handleRetry} />;
  }

  return (
    <View style={styles.container}>
      {positions && positions.length > 0 && (
        <View style={styles.header}>
          <Text style={styles.headerLabel}>Valor total del portafolio</Text>
          <Text style={styles.headerValue}>{formatCurrency(totalValue)}</Text>
        </View>
      )}

      {positions && positions.length > 0 ? (
        <PositionList
          positions={positions}
          refreshing={loading}
          onRefresh={handleRefresh}
        />
      ) : (
        <View style={styles.emptyContainer}>
          <Text style={styles.emptyText}>No tienes posiciones en tu portafolio</Text>
        </View>
      )}

      {error && positions && (
        <View style={styles.errorBanner}>
          <Text style={styles.errorBannerText}>{error}</Text>
        </View>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f9fafb',
  },
  header: {
    backgroundColor: '#ffffff',
    padding: 20,
    borderBottomWidth: 1,
    borderBottomColor: '#e5e7eb',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.05,
    shadowRadius: 4,
    elevation: 2,
  },
  headerLabel: {
    fontSize: 14,
    color: '#6b7280',
    marginBottom: 4,
  },
  headerValue: {
    fontSize: 28,
    fontWeight: 'bold',
    color: '#1f2937',
  },
  emptyContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
  },
  emptyText: {
    fontSize: 16,
    color: '#9ca3af',
    textAlign: 'center',
  },
  errorBanner: {
    backgroundColor: '#fef2f2',
    padding: 12,
    borderTopWidth: 1,
    borderTopColor: '#fecaca',
  },
  errorBannerText: {
    color: '#dc2626',
    fontSize: 14,
    textAlign: 'center',
  },
});
