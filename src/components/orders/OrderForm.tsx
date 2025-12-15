import { Ionicons } from "@expo/vector-icons";
import { zodResolver } from "@hookform/resolvers/zod";
import React, { useState } from "react";
import { Controller, useForm } from "react-hook-form";
import {
  ActivityIndicator,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";

import { OrderFormData, orderSchema } from "../../schemas";
import { Instrument, OrderRequest } from "../../types";
import { formatCurrency } from "../../utils/formatters";
import { OrderTypeSelector } from "./OrderTypeSelector";
import { QuantityInput } from "./QuantityInput";

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
  loading = false,
}) => {
  const {
    control,
    handleSubmit,
    watch,
    setValue,
    formState: { errors },
  } = useForm<OrderFormData>({
    resolver: zodResolver(orderSchema),
    defaultValues: {
      side: "BUY",
      type: "MARKET",
      quantity: 0,
      price: undefined,
    },
  });

  const watchedType = watch("type");
  const watchedSide = watch("side");
  const watchedQuantity = watch("quantity");

  const [priceText, setPriceText] = useState("");

  const handleFormSubmit = (data: OrderFormData) => {
    const orderData: OrderRequest = {
      instrument_id: instrument.id,
      side: data.side,
      type: data.type,
      quantity: data.quantity,
      ...(data.type === "LIMIT" && { price: data.price }),
    };
    onSubmit(orderData);
  };

  const handlePriceChange = (text: string) => {
    setPriceText(text);
    const value = parseFloat(text);
    if (!isNaN(value) && value > 0)
      setValue("price", value, { shouldValidate: true });
    else setValue("price", undefined, { shouldValidate: true });
  };

  const totalEstimated =
    watchedType === "MARKET"
      ? watchedQuantity * instrument.last_price
      : watchedType === "LIMIT" && priceText
      ? watchedQuantity * parseFloat(priceText)
      : 0;

  const submitLabel = watchedSide === "BUY" ? "Comprar" : "Vender";

  return (
    <View testID="order-form" style={styles.container}>
      <View style={styles.instrumentRow}>
        <View style={{ flex: 1 }}>
          <Text testID="order-form-ticker" style={styles.ticker}>
            {instrument.ticker}
          </Text>
          <Text testID="order-form-name" style={styles.name} numberOfLines={1}>
            {instrument.name}
          </Text>
        </View>

        <View style={styles.priceBox}>
          <Text style={styles.priceLabel}>Precio actual</Text>
          <Text testID="order-form-current-price" style={styles.priceValue}>
            {formatCurrency(instrument.last_price)}
          </Text>
        </View>
      </View>

      <View style={styles.divider} />

      <Controller
        control={control}
        name="side"
        render={({ field: { value, onChange } }) => (
          <Controller
            control={control}
            name="type"
            render={({
              field: { value: typeValue, onChange: onTypeChange },
            }) => (
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

      <Controller
        control={control}
        name="quantity"
        render={({ field: { value, onChange } }) => (
          <QuantityInput
            quantity={value}
            onQuantityChange={onChange}
            price={
              watchedType === "LIMIT" && priceText
                ? parseFloat(priceText)
                : instrument.last_price
            }
          />
        )}
      />
      {errors.quantity?.message ? (
        // TODO: centralize errors
        <Text style={styles.errorText}>{errors.quantity.message}</Text>
      ) : null}

      {watchedType === "LIMIT" && (
        <View style={styles.field}>
          <Text style={styles.fieldLabel}>Precio límite</Text>

          <View style={styles.inputWrap}>
            <Text style={styles.prefix}>$</Text>
            <TextInput
              testID="order-form-price-input"
              style={styles.input}
              value={priceText}
              onChangeText={handlePriceChange}
              placeholder="0.00"
              placeholderTextColor={TOKENS.subtext}
              keyboardType="decimal-pad"
              returnKeyType="done"
            />
          </View>

          {errors.price?.message ? (
            // TODO: centralize errors
            <Text style={styles.errorText}>{errors.price.message}</Text>
          ) : null}
        </View>
      )}

      {watchedQuantity > 0 && (
        <View testID="order-form-total" style={styles.totalBox}>
          <View style={{ flexDirection: "row", alignItems: "center", gap: 8 }}>
            <Ionicons
              name="calculator-outline"
              size={16}
              color={TOKENS.subtext}
            />
            <Text style={styles.totalLabel}>Total estimado</Text>
          </View>
          <Text style={styles.totalValue}>
            {formatCurrency(totalEstimated)}
          </Text>
        </View>
      )}

      <View style={styles.actions}>
        <TouchableOpacity
          testID="order-form-cancel"
          style={[styles.btn, styles.btnSecondary]}
          onPress={onCancel}
          disabled={loading}
          activeOpacity={0.85}
        >
          <Text style={styles.btnSecondaryText}>Cancelar</Text>
        </TouchableOpacity>

        <TouchableOpacity
          testID="order-form-submit"
          style={[
            styles.btn,
            watchedSide === "BUY" ? styles.btnBuy : styles.btnSell,
            loading && styles.btnDisabled,
          ]}
          onPress={handleSubmit(handleFormSubmit)}
          disabled={loading}
          activeOpacity={0.85}
        >
          {loading ? (
            <ActivityIndicator color="#fff" />
          ) : (
            <Text style={styles.btnPrimaryText}>{submitLabel}</Text>
          )}
        </TouchableOpacity>
      </View>
    </View>
  );
};

const TOKENS = {
  fill: "#F3F4F6",
  text: "#111827",
  subtext: "#6B7280",
  divider: "#EEF2F7",
  buy: "#10B981",
  sell: "#EF4444",
};

const styles = StyleSheet.create({
  container: {
    gap: 14,
  },

  instrumentRow: {
    flexDirection: "row",
    alignItems: "flex-start",
    gap: 12,
  },
  ticker: {
    fontSize: 18,
    fontWeight: "800",
    color: TOKENS.text,
  },
  name: {
    fontSize: 12,
    color: TOKENS.subtext,
    marginTop: 2,
    fontWeight: "500",
  },
  priceBox: {
    alignItems: "flex-end",
  },
  priceLabel: {
    fontSize: 11,
    color: TOKENS.subtext,
    marginBottom: 2,
    fontWeight: "500",
  },
  priceValue: {
    fontSize: 16,
    fontWeight: "800",
    color: TOKENS.text,
  },

  divider: {
    height: 1,
    backgroundColor: TOKENS.divider,
  },

  field: {
    gap: 8,
  },
  fieldLabel: {
    fontSize: 12,
    fontWeight: "700",
    color: TOKENS.text,
  },

  inputWrap: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: TOKENS.fill,
    borderRadius: 12,
    paddingHorizontal: 12,
    height: 46,
  },
  prefix: {
    fontSize: 16,
    color: TOKENS.subtext,
    marginRight: 6,
    fontWeight: "600",
  },
  input: {
    flex: 1,
    fontSize: 15,
    color: TOKENS.text,
    fontWeight: "500",
  },

  errorText: {
    fontSize: 12,
    color: TOKENS.sell,
    marginTop: -2,
    fontWeight: "500",
  },

  totalBox: {
    backgroundColor: TOKENS.fill,
    borderRadius: 12,
    padding: 14,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  totalLabel: {
    fontSize: 13,
    fontWeight: "700",
    color: TOKENS.text,
  },
  totalValue: {
    fontSize: 16,
    fontWeight: "800",
    color: TOKENS.text,
  },

  actions: {
    flexDirection: "row",
    gap: 10,
    marginTop: 2,
  },
  btn: {
    flex: 1,
    height: 46,
    borderRadius: 12,
    alignItems: "center",
    justifyContent: "center",
  },
  btnSecondary: {
    backgroundColor: TOKENS.fill,
  },
  btnSecondaryText: {
    fontSize: 14,
    fontWeight: "700",
    color: TOKENS.text,
  },

  btnBuy: {
    backgroundColor: TOKENS.buy,
  },
  btnSell: {
    backgroundColor: TOKENS.sell,
  },
  btnPrimaryText: {
    fontSize: 14,
    fontWeight: "700",
    color: "#fff",
  },

  btnDisabled: {
    opacity: 0.65,
  },
});
