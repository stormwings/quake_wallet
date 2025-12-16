import React from "react";
import { StyleSheet, Text, TouchableOpacity, View } from "react-native";
import { OrderSide, OrderType } from "../../types";
import { copy } from "../../i18n/copy";
import { useLocale } from "../../i18n";

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
  onTypeChange,
}) => {
  // Subscribe to locale changes to trigger re-render
  useLocale();

  return (
    <View style={styles.container}>
      <View style={styles.section}>
        <Text style={styles.label}>{copy.orders.typeSelector.sideLabel()}</Text>

        <View style={styles.pillWrap}>
          <TouchableOpacity
            testID="order-type-buy"
            style={[styles.pillBtn, side === "BUY" && styles.pillActiveBuy]}
            onPress={() => onSideChange("BUY")}
            activeOpacity={0.85}
          >
            <Text style={[styles.pillText, side === "BUY" && styles.pillTextActive]}>
              {copy.orders.typeSelector.buy()}
            </Text>
          </TouchableOpacity>

          <TouchableOpacity
            testID="order-type-sell"
            style={[styles.pillBtn, side === "SELL" && styles.pillActiveSell]}
            onPress={() => onSideChange("SELL")}
            activeOpacity={0.85}
          >
            <Text style={[styles.pillText, side === "SELL" && styles.pillTextActive]}>
              {copy.orders.typeSelector.sell()}
            </Text>
          </TouchableOpacity>
        </View>
      </View>

      <View style={styles.section}>
        <Text style={styles.label}>{copy.orders.typeSelector.typeLabel()}</Text>

        <View style={styles.miniSegWrap}>
          <TouchableOpacity
            testID="order-type-market"
            style={[styles.miniSegBtn, type === "MARKET" && styles.miniSegActive]}
            onPress={() => onTypeChange("MARKET")}
            activeOpacity={0.85}
          >
            <Text style={[styles.miniSegText, type === "MARKET" && styles.miniSegTextActive]}>
              {copy.orders.typeSelector.market()}
            </Text>
          </TouchableOpacity>

          <TouchableOpacity
            testID="order-type-limit"
            style={[styles.miniSegBtn, type === "LIMIT" && styles.miniSegActive]}
            onPress={() => onTypeChange("LIMIT")}
            activeOpacity={0.85}
          >
            <Text style={[
                styles.miniSegText,
                type === "LIMIT" && styles.miniSegTextActive,
              ]}
            >
              {copy.orders.typeSelector.limit()}
            </Text>
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );
};

const TOKENS = {
  fill: "#F3F4F6",
  text: "#111827",
  subtext: "#6B7280",
  buy: "#10B981",
  sell: "#EF4444",
  divider: "#EEF2F7",
};

const styles = StyleSheet.create({
  container: {
    gap: 14,
  },
  section: {
    gap: 8,
  },
  label: {
    fontSize: 12,
    fontWeight: "700",
    color: TOKENS.text,
  },

  pillWrap: {
    backgroundColor: TOKENS.fill,
    borderRadius: 12,
    padding: 3,
    flexDirection: "row",
    gap: 6,
  },
  pillBtn: {
    flex: 1,
    height: 38,
    borderRadius: 10,
    alignItems: "center",
    justifyContent: "center",
  },
  pillActiveBuy: {
    backgroundColor: TOKENS.buy,
  },
  pillActiveSell: {
    backgroundColor: TOKENS.sell,
  },
  pillText: {
    fontSize: 12,
    fontWeight: "700",
    color: TOKENS.subtext,
  },
  pillTextActive: {
    color: "#fff",
  },

  miniSegWrap: {
    backgroundColor: TOKENS.fill,
    borderRadius: 12,
    padding: 3,
    flexDirection: "row",
    gap: 6,
  },
  miniSegBtn: {
    flex: 1,
    height: 36,
    borderRadius: 10,
    alignItems: "center",
    justifyContent: "center",
  },
  miniSegActive: {
    backgroundColor: "#FFFFFF",
    borderWidth: 1,
    borderColor: TOKENS.divider,
  },
  miniSegText: {
    fontSize: 12,
    fontWeight: "600",
    color: TOKENS.subtext,
  },
  miniSegTextActive: {
    color: TOKENS.text,
    fontWeight: "700",
  },
});
