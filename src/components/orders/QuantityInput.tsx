import { Ionicons } from "@expo/vector-icons";
import React, { useState } from "react";
import {
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";

import { calculateQuantityFromAmount } from "../../utils/calculations";
import { formatCurrency } from "../../utils/formatters";
import { copy } from "../../i18n/copy";
import { useLocale } from "../../i18n";

interface QuantityInputProps {
  quantity: number;
  onQuantityChange: (quantity: number) => void;
  price: number;
}

export const QuantityInput: React.FC<QuantityInputProps> = ({
  quantity,
  onQuantityChange,
  price,
}) => {
  // Subscribe to locale changes to trigger re-render
  useLocale();
  const [inputMode, setInputMode] = useState<"quantity" | "amount">("quantity");
  const [amountText, setAmountText] = useState("");
  const [quantityText, setQuantityText] = useState(
    quantity > 0 ? quantity.toString() : ""
  );

  const handleToggleMode = () => {
    if (inputMode === "quantity") {
      setInputMode("amount");
      const amount = quantity * price;
      setAmountText(amount > 0 ? amount.toString() : "");
    } else {
      setInputMode("quantity");
      setQuantityText(quantity > 0 ? quantity.toString() : "");
    }
  };

  const handleQuantityChange = (text: string) => {
    setQuantityText(text);
    const value = parseInt(text, 10);
    if (!isNaN(value) && value > 0) onQuantityChange(value);
    else if (text === "") onQuantityChange(0);
  };

  const handleAmountChange = (text: string) => {
    setAmountText(text);
    const value = parseFloat(text);
    if (!isNaN(value) && value > 0) {
      const calculatedQuantity = calculateQuantityFromAmount(value, price);
      onQuantityChange(calculatedQuantity);
      setQuantityText(calculatedQuantity.toString());
    } else if (text === "") {
      onQuantityChange(0);
      setQuantityText("");
    }
  };

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.label}>
          {inputMode === "quantity"
            ? copy.orders.quantityInput.labelQuantity()
            : copy.orders.quantityInput.labelAmount()}
        </Text>

        <TouchableOpacity
          testID="order-input-toggle"
          onPress={handleToggleMode}
          activeOpacity={0.85}
          style={styles.toggleBtn}
        >
          <Ionicons name="swap-horizontal" size={14} color={TOKENS.primary} />
          <Text style={styles.toggleText}>
            {inputMode === "quantity"
              ? copy.orders.quantityInput.toggleToAmount()
              : copy.orders.quantityInput.toggleToQuantity()}
          </Text>
        </TouchableOpacity>
      </View>

      {inputMode === "quantity" ? (
        <View style={styles.inputWrap}>
          <TextInput
            testID="order-quantity-input"
            style={styles.input}
            value={quantityText}
            onChangeText={handleQuantityChange}
            placeholder={copy.orders.quantityInput.quantityPlaceholder()}
            placeholderTextColor={TOKENS.subtext}
            keyboardType="numeric"
            returnKeyType="done"
          />
          <Text style={styles.suffix}>
            {copy.orders.quantityInput.quantitySuffix()}
          </Text>
        </View>
      ) : (
        <>
          <View style={styles.inputWrap}>
            <Text style={styles.prefix}>$</Text>
            <TextInput
              testID="order-amount-input"
              style={styles.input}
              value={amountText}
              onChangeText={handleAmountChange}
              placeholder={copy.orders.quantityInput.amountPlaceholder()}
              placeholderTextColor={TOKENS.subtext}
              keyboardType="decimal-pad"
              returnKeyType="done"
            />
          </View>

          {quantity > 0 && (
            <View testID="order-quantity-calculated" style={styles.infoBox}>
              <View
                style={{ flexDirection: "row", alignItems: "center", gap: 8 }}
              >
                <Ionicons
                  name="information-circle-outline"
                  size={16}
                  color={TOKENS.primary}
                />
                <Text style={styles.infoTitle}>
                  {copy.orders.quantityInput.calculatedLabel(quantity)}
                </Text>
              </View>

              <Text style={styles.infoSub}>
                {copy.orders.quantityInput.unitPriceLabel()}:{" "}
                <Text style={styles.infoSubStrong}>{formatCurrency(price)}</Text>
              </Text>
            </View>
          )}
        </>
      )}
    </View>
  );
};

const TOKENS = {
  fill: "#F3F4F6",
  text: "#111827",
  subtext: "#6B7280",
  primary: "#6D28D9",
};

const styles = StyleSheet.create({
  container: {
    gap: 8,
  },
  header: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
  },
  label: {
    fontSize: 12,
    fontWeight: "700",
    color: TOKENS.text,
  },
  toggleBtn: {
    flexDirection: "row",
    alignItems: "center",
    gap: 6,
    paddingVertical: 6,
    paddingHorizontal: 10,
    borderRadius: 999,
    backgroundColor: "#F5F3FF",
  },
  toggleText: {
    fontSize: 12,
    fontWeight: "700",
    color: TOKENS.primary,
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
  suffix: {
    fontSize: 12,
    color: TOKENS.subtext,
    marginLeft: 10,
    fontWeight: "600",
  },

  infoBox: {
    backgroundColor: "#F5F3FF",
    borderRadius: 12,
    padding: 12,
    gap: 6,
  },
  infoTitle: {
    fontSize: 12,
    color: TOKENS.text,
    fontWeight: "600",
  },
  infoValue: {
    fontWeight: "700",
    color: TOKENS.text,
  },
  infoSub: {
    fontSize: 12,
    color: TOKENS.subtext,
    marginLeft: 24,
    fontWeight: "500",
  },
  infoSubStrong: {
    fontWeight: "700",
    color: TOKENS.text,
  },
});
