import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { OrderStatus } from '../../types';

interface OrderResponseProps {
  orderId: string;
  status: OrderStatus;
}

export const OrderResponse: React.FC<OrderResponseProps> = ({ orderId, status }) => {
  const getStatusConfig = (orderStatus: OrderStatus) => {
    switch (orderStatus) {
      case 'FILLED':
        return {
          color: '#10b981',
          backgroundColor: '#d1fae5',
          borderColor: '#6ee7b7',
          label: 'EJECUTADA',
          message: 'Tu orden fue ejecutada exitosamente',
          icon: '✓'
        };
      case 'PENDING':
        return {
          color: '#f59e0b',
          backgroundColor: '#fef3c7',
          borderColor: '#fcd34d',
          label: 'PENDIENTE',
          message: 'Tu orden está esperando ejecución',
          icon: '⏳'
        };
      case 'REJECTED':
        return {
          color: '#ef4444',
          backgroundColor: '#fee2e2',
          borderColor: '#fca5a5',
          label: 'RECHAZADA',
          message: 'Tu orden fue rechazada por el mercado',
          icon: '✕'
        };
    }
  };

  const config = getStatusConfig(status);

  return (
    <View style={styles.container}>
      <View style={[styles.statusBadge, { backgroundColor: config.backgroundColor, borderColor: config.borderColor }]}>
        <Text style={styles.statusIcon}>{config.icon}</Text>
        <Text style={[styles.statusLabel, { color: config.color }]}>
          {config.label}
        </Text>
      </View>

      <Text style={styles.message}>{config.message}</Text>

      <View style={styles.infoContainer}>
        <Text style={styles.infoLabel}>ID de la orden:</Text>
        <Text style={styles.orderId}>{orderId}</Text>
      </View>

      {status === 'PENDING' && (
        <Text style={styles.hint}>
          La orden se ejecutará cuando se alcance el precio límite especificado.
        </Text>
      )}

      {status === 'REJECTED' && (
        <Text style={styles.hint}>
          Verifica que tengas fondos suficientes e intenta nuevamente.
        </Text>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    gap: 16,
  },
  statusBadge: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 12,
    paddingHorizontal: 16,
    borderRadius: 8,
    borderWidth: 1,
    gap: 8,
  },
  statusIcon: {
    fontSize: 20,
  },
  statusLabel: {
    fontSize: 16,
    fontWeight: '700',
    letterSpacing: 0.5,
  },
  message: {
    fontSize: 15,
    color: '#374151',
    textAlign: 'center',
    lineHeight: 22,
  },
  infoContainer: {
    backgroundColor: '#f9fafb',
    borderRadius: 8,
    padding: 12,
    borderWidth: 1,
    borderColor: '#e5e7eb',
  },
  infoLabel: {
    fontSize: 12,
    color: '#6b7280',
    marginBottom: 4,
  },
  orderId: {
    fontSize: 14,
    fontWeight: '600',
    color: '#1f2937',
    fontFamily: 'monospace',
  },
  hint: {
    fontSize: 13,
    color: '#6b7280',
    fontStyle: 'italic',
    textAlign: 'center',
    lineHeight: 18,
  },
});
