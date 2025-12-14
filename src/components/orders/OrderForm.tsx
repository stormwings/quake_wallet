import { zodResolver } from '@hookform/resolvers/zod';
import React, { useState } from 'react';
import { Controller, useForm } from 'react-hook-form';
import { ActivityIndicator, StyleSheet, Text, TextInput, TouchableOpacity, View } from 'react-native';
import { OrderFormData, orderSchema } from '../../schemas';
import { Instrument, OrderRequest } from '../../types';
import { formatCurrency } from '../../utils/formatters';
import { OrderTypeSelector } from './OrderTypeSelector';
import { QuantityInput } from './QuantityInput';

interface OrderFormProps {
  instrument: Instrument;
  onSubmit: (orderData: OrderRequest) => void;
  onCancel: () => void;
  loading?: boolean;
}

export const OrderForm: React.FC<OrderFormProps> = ({
  instrument,
  onSubmit,
  onCancel,
  loading = false
}) => {
  const {
    control,
    handleSubmit,
    watch,
    setValue,
    formState: { errors }
  } = useForm<OrderFormData>({
    resolver: zodResolver(orderSchema),
    defaultValues: {
      side: 'BUY',
      type: 'MARKET',
      quantity: 0,
      price: undefined
    }
  });

  const watchedType = watch('type');
  const watchedSide = watch('side');
  const watchedQuantity = watch('quantity');

  const [priceText, setPriceText] = useState('');

  const handleFormSubmit = (data: OrderFormData) => {
    const orderData: OrderRequest = {
      instrument_id: instrument.id,
      side: data.side,
      type: data.type,
      quantity: data.quantity,
      ...(data.type === 'LIMIT' && { price: data.price })
    };
    onSubmit(orderData);
  };

  const handlePriceChange = (text: string) => {
    setPriceText(text);
    const value = parseFloat(text);
    if (!isNaN(value) && value > 0) {
      setValue('price', value, { shouldValidate: true });
    } else {
      setValue('price', undefined, { shouldValidate: true });
    }
  };

  const totalEstimated = watchedType === 'MARKET'
    ? watchedQuantity * instrument.last_price
    : watchedType === 'LIMIT' && priceText
    ? watchedQuantity * parseFloat(priceText)
    : 0;

  return (
    <View style={styles.container}>
      {/* Instrument Info */}
      <View style={styles.instrumentInfo}>
        <View>
          <Text style={styles.ticker}>{instrument.ticker}</Text>
          <Text style={styles.instrumentName}>{instrument.name}</Text>
        </View>
        <View style={styles.priceContainer}>
          <Text style={styles.priceLabel}>Precio actual</Text>
          <Text style={styles.price}>{formatCurrency(instrument.last_price)}</Text>
        </View>
      </View>

      {/* Order Type Selector */}
      <Controller
        control={control}
        name="side"
        render={({ field: { value, onChange } }) => (
          <Controller
            control={control}
            name="type"
            render={({ field: { value: typeValue, onChange: onTypeChange } }) => (
              <OrderTypeSelector
                side={value}
                onSideChange={onChange}
                type={typeValue}
                onTypeChange={onTypeChange}
              />
            )}
          />
        )}
      />

      {/* Quantity Input */}
      <Controller
        control={control}
        name="quantity"
        render={({ field: { value, onChange } }) => (
          <QuantityInput
            quantity={value}
            onQuantityChange={onChange}
            price={watchedType === 'LIMIT' && priceText ? parseFloat(priceText) : instrument.last_price}
          />
        )}
      />
      {errors.quantity && (
        <Text style={styles.errorText}>{errors.quantity.message}</Text>
      )}

      {/* Price Input (only for LIMIT orders) */}
      {watchedType === 'LIMIT' && (
        <View style={styles.inputGroup}>
          <Text style={styles.label}>Precio límite</Text>
          <View style={styles.inputContainer}>
            <Text style={styles.currency}>$</Text>
            <TextInput
              style={styles.input}
              value={priceText}
              onChangeText={handlePriceChange}
              placeholder="0.00"
              placeholderTextColor="#9ca3af"
              keyboardType="decimal-pad"
              returnKeyType="done"
            />
          </View>
          {errors.price && (
            <Text style={styles.errorText}>{errors.price.message}</Text>
          )}
        </View>
      )}

      {/* Total Estimated */}
      {watchedQuantity > 0 && (
        <View style={styles.totalContainer}>
          <Text style={styles.totalLabel}>Total estimado</Text>
          <Text style={styles.totalValue}>{formatCurrency(totalEstimated)}</Text>
        </View>
      )}

      {/* Action Buttons */}
      <View style={styles.buttonContainer}>
        <TouchableOpacity
          style={[styles.button, styles.buttonCancel]}
          onPress={onCancel}
          disabled={loading}
          activeOpacity={0.8}
        >
          <Text style={styles.buttonTextCancel}>Cancelar</Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={[
            styles.button,
            styles.buttonSubmit,
            watchedSide === 'BUY' ? styles.buttonBuy : styles.buttonSell,
            loading && styles.buttonDisabled
          ]}
          onPress={handleSubmit(handleFormSubmit)}
          disabled={loading}
          activeOpacity={0.8}
        >
          {loading ? (
            <ActivityIndicator color="#ffffff" />
          ) : (
            <Text style={styles.buttonTextSubmit}>
              {watchedSide === 'BUY' ? 'Comprar' : 'Vender'}
            </Text>
          )}
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    gap: 20,
  },
  instrumentInfo: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
    paddingBottom: 16,
    borderBottomWidth: 1,
    borderBottomColor: '#e5e7eb',
  },
  ticker: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#1f2937',
    marginBottom: 4,
  },
  instrumentName: {
    fontSize: 14,
    color: '#6b7280',
  },
  priceContainer: {
    alignItems: 'flex-end',
  },
  priceLabel: {
    fontSize: 12,
    color: '#6b7280',
    marginBottom: 2,
  },
  price: {
    fontSize: 18,
    fontWeight: '600',
    color: '#1f2937',
  },
  inputGroup: {
    gap: 8,
  },
  label: {
    fontSize: 14,
    fontWeight: '600',
    color: '#374151',
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
  errorText: {
    fontSize: 13,
    color: '#ef4444',
    marginTop: -4,
  },
  totalContainer: {
    backgroundColor: '#f9fafb',
    borderRadius: 8,
    padding: 16,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    borderWidth: 1,
    borderColor: '#e5e7eb',
  },
  totalLabel: {
    fontSize: 15,
    fontWeight: '600',
    color: '#374151',
  },
  totalValue: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#1f2937',
  },
  buttonContainer: {
    flexDirection: 'row',
    gap: 12,
    marginTop: 8,
  },
  button: {
    flex: 1,
    paddingVertical: 14,
    borderRadius: 8,
    alignItems: 'center',
    justifyContent: 'center',
  },
  buttonCancel: {
    backgroundColor: '#f3f4f6',
    borderWidth: 1,
    borderColor: '#d1d5db',
  },
  buttonSubmit: {
    minHeight: 48,
  },
  buttonBuy: {
    backgroundColor: '#10b981',
  },
  buttonSell: {
    backgroundColor: '#ef4444',
  },
  buttonDisabled: {
    opacity: 0.6,
  },
  buttonTextCancel: {
    fontSize: 16,
    fontWeight: '600',
    color: '#6b7280',
  },
  buttonTextSubmit: {
    fontSize: 16,
    fontWeight: '600',
    color: '#ffffff',
  },
});
