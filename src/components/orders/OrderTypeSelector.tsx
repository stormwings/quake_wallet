import React from 'react';
import { StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { OrderSide, OrderType } from '../../types';

interface OrderTypeSelectorProps {
  side: OrderSide;
  onSideChange: (side: OrderSide) => void;
  type: OrderType;
  onTypeChange: (type: OrderType) => void;
}

export const OrderTypeSelector: React.FC<OrderTypeSelectorProps> = ({
  side,
  onSideChange,
  type,
  onTypeChange
}) => {
  return (
    <View style={styles.container}>
      {/* BUY/SELL Selector */}
      <View style={styles.section}>
        <Text style={styles.label}>Operación</Text>
        <View style={styles.buttonGroup}>
          <TouchableOpacity
            style={[
              styles.button,
              styles.buttonLeft,
              side === 'BUY' && styles.buttonActiveBuy
            ]}
            onPress={() => onSideChange('BUY')}
            activeOpacity={0.8}
          >
            <Text style={[
              styles.buttonText,
              side === 'BUY' && styles.buttonTextActive
            ]}>
              COMPRAR
            </Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={[
              styles.button,
              styles.buttonRight,
              side === 'SELL' && styles.buttonActiveSell
            ]}
            onPress={() => onSideChange('SELL')}
            activeOpacity={0.8}
          >
            <Text style={[
              styles.buttonText,
              side === 'SELL' && styles.buttonTextActive
            ]}>
              VENDER
            </Text>
          </TouchableOpacity>
        </View>
      </View>

      {/* MARKET/LIMIT Selector */}
      <View style={styles.section}>
        <Text style={styles.label}>Tipo de orden</Text>
        <View style={styles.buttonGroup}>
          <TouchableOpacity
            style={[
              styles.button,
              styles.buttonLeft,
              type === 'MARKET' && styles.buttonActiveType
            ]}
            onPress={() => onTypeChange('MARKET')}
            activeOpacity={0.8}
          >
            <Text style={[
              styles.buttonText,
              type === 'MARKET' && styles.buttonTextActive
            ]}>
              MARKET
            </Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={[
              styles.button,
              styles.buttonRight,
              type === 'LIMIT' && styles.buttonActiveType
            ]}
            onPress={() => onTypeChange('LIMIT')}
            activeOpacity={0.8}
          >
            <Text style={[
              styles.buttonText,
              type === 'LIMIT' && styles.buttonTextActive
            ]}>
              LIMIT
            </Text>
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    gap: 16,
  },
  section: {
    gap: 8,
  },
  label: {
    fontSize: 14,
    fontWeight: '600',
    color: '#374151',
    marginBottom: 4,
  },
  buttonGroup: {
    flexDirection: 'row',
    borderRadius: 8,
    overflow: 'hidden',
    borderWidth: 1,
    borderColor: '#d1d5db',
  },
  button: {
    flex: 1,
    paddingVertical: 12,
    paddingHorizontal: 16,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#ffffff',
  },
  buttonLeft: {
    borderRightWidth: 0.5,
    borderRightColor: '#d1d5db',
  },
  buttonRight: {
    borderLeftWidth: 0.5,
    borderLeftColor: '#d1d5db',
  },
  buttonActiveBuy: {
    backgroundColor: '#10b981',
  },
  buttonActiveSell: {
    backgroundColor: '#ef4444',
  },
  buttonActiveType: {
    backgroundColor: '#3b82f6',
  },
  buttonText: {
    fontSize: 14,
    fontWeight: '600',
    color: '#6b7280',
  },
  buttonTextActive: {
    color: '#ffffff',
  },
});
