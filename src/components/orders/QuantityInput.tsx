import React, { useState } from 'react';
import { StyleSheet, Text, TextInput, TouchableOpacity, View } from 'react-native';
import { calculateQuantityFromAmount } from '../../utils/calculations';
import { formatCurrency } from '../../utils/formatters';

interface QuantityInputProps {
  quantity: number;
  onQuantityChange: (quantity: number) => void;
  price: number;
}

export const QuantityInput: React.FC<QuantityInputProps> = ({
  quantity,
  onQuantityChange,
  price
}) => {
  const [inputMode, setInputMode] = useState<'quantity' | 'amount'>('quantity');
  const [amountText, setAmountText] = useState('');
  const [quantityText, setQuantityText] = useState(quantity > 0 ? quantity.toString() : '');

  const handleToggleMode = () => {
    if (inputMode === 'quantity') {
      // Switch to amount mode
      setInputMode('amount');
      const amount = quantity * price;
      setAmountText(amount > 0 ? amount.toString() : '');
    } else {
      // Switch to quantity mode
      setInputMode('quantity');
      setQuantityText(quantity > 0 ? quantity.toString() : '');
    }
  };

  const handleQuantityChange = (text: string) => {
    setQuantityText(text);
    const value = parseInt(text, 10);
    if (!isNaN(value) && value > 0) {
      onQuantityChange(value);
    } else if (text === '') {
      onQuantityChange(0);
    }
  };

  const handleAmountChange = (text: string) => {
    setAmountText(text);
    const value = parseFloat(text);
    if (!isNaN(value) && value > 0) {
      const calculatedQuantity = calculateQuantityFromAmount(value, price);
      onQuantityChange(calculatedQuantity);
      setQuantityText(calculatedQuantity.toString());
    } else if (text === '') {
      onQuantityChange(0);
      setQuantityText('');
    }
  };

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.label}>
          {inputMode === 'quantity' ? 'Cantidad' : 'Monto total'}
        </Text>
        <TouchableOpacity onPress={handleToggleMode} activeOpacity={0.7}>
          <Text style={styles.toggleText}>
            {inputMode === 'quantity' ? 'Ingresar por monto' : 'Ingresar por cantidad'}
          </Text>
        </TouchableOpacity>
      </View>

      {inputMode === 'quantity' ? (
        <View style={styles.inputContainer}>
          <TextInput
            style={styles.input}
            value={quantityText}
            onChangeText={handleQuantityChange}
            placeholder="0"
            placeholderTextColor="#9ca3af"
            keyboardType="numeric"
            returnKeyType="done"
          />
          <Text style={styles.unit}>acciones</Text>
        </View>
      ) : (
        <>
          <View style={styles.inputContainer}>
            <Text style={styles.currency}>$</Text>
            <TextInput
              style={styles.input}
              value={amountText}
              onChangeText={handleAmountChange}
              placeholder="0.00"
              placeholderTextColor="#9ca3af"
              keyboardType="decimal-pad"
              returnKeyType="done"
            />
          </View>
          {quantity > 0 && (
            <View style={styles.infoBox}>
              <Text style={styles.infoText}>
                Cantidad calculada: <Text style={styles.infoValue}>{quantity} acciones</Text>
              </Text>
              <Text style={styles.infoSubtext}>
                Precio unitario: {formatCurrency(price)}
              </Text>
            </View>
          )}
        </>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    gap: 8,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  label: {
    fontSize: 14,
    fontWeight: '600',
    color: '#374151',
  },
  toggleText: {
    fontSize: 13,
    color: '#3b82f6',
    fontWeight: '500',
  },
  inputContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#f9fafb',
    borderWidth: 1,
    borderColor: '#d1d5db',
    borderRadius: 8,
    paddingHorizontal: 12,
  },
  currency: {
    fontSize: 18,
    color: '#6b7280',
    marginRight: 4,
  },
  input: {
    flex: 1,
    fontSize: 16,
    color: '#1f2937',
    paddingVertical: 12,
  },
  unit: {
    fontSize: 14,
    color: '#6b7280',
    marginLeft: 8,
  },
  infoBox: {
    backgroundColor: '#eff6ff',
    borderRadius: 6,
    padding: 12,
    borderWidth: 1,
    borderColor: '#bfdbfe',
  },
  infoText: {
    fontSize: 14,
    color: '#1e40af',
    marginBottom: 4,
  },
  infoValue: {
    fontWeight: '600',
  },
  infoSubtext: {
    fontSize: 12,
    color: '#3b82f6',
  },
});
