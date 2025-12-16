import React from "react";
import { StyleSheet, Text, TouchableOpacity, View } from "react-native";
import { useLocale } from "../../i18n";
import { copy } from "../../i18n/copy";
import { Instrument } from "../../types";
import { calculateReturn } from "../../utils/calculations";
import { formatCurrency, formatPercentage } from "../../utils/formatters";

interface InstrumentCardProps {
  instrument: Instrument;
  onPress?: () => void;
}

export function InstrumentCard({ instrument, onPress }: InstrumentCardProps) {
  useLocale();

  const returnValue = calculateReturn(
    instrument.last_price,
    instrument.close_price
  );
  const isPositive = returnValue >= 0;

  return (
    <TouchableOpacity
      testID={`instrument-card-${instrument.ticker}`}
      accessible={true}
      accessibilityLabel={copy.instruments.accessibilityLabel(
        instrument.ticker
      )}
      style={styles.row}
      onPress={onPress}
      activeOpacity={0.85}
    >
      <View style={styles.left}>
        <View style={styles.iconCircle} testID="instrument-card-icon">
          <Text style={styles.iconText}>{instrument.ticker?.slice(0, 2)}</Text>
        </View>
      </View>

      <View style={styles.center}>
        <Text testID="instrument-card-ticker" style={styles.ticker} numberOfLines={1}>
          {instrument.ticker}
        </Text>
        <Text testID="instrument-card-name" style={styles.name} numberOfLines={1}>
          {instrument.name}
        </Text>
      </View>

      <View style={styles.right}>
        <Text
          testID="instrument-card-return"
          style={[
            styles.change,
            isPositive ? styles.positive : styles.negative,
          ]}
        >
          {formatPercentage(returnValue)}
        </Text>
        <Text testID="instrument-card-price" style={styles.price} numberOfLines={1}>
          {formatCurrency(instrument.last_price)}
        </Text>
      </View>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  row: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#FFFFFF",
    paddingVertical: 12,
    paddingHorizontal: 16,
    borderBottomWidth: 1,
    borderBottomColor: "#F1F5F9",
  },

  left: {
    marginRight: 12,
  },
  iconCircle: {
    width: 38,
    height: 38,
    borderRadius: 19,
    backgroundColor: "#F3E8FF",
    alignItems: "center",
    justifyContent: "center",
  },
  iconText: {
    fontSize: 13,
    fontWeight: "800",
    color: "#6D28D9",
    letterSpacing: 0.2,
  },

  center: {
    flex: 1,
    gap: 2,
    paddingRight: 12,
    flexShrink: 1,
  },
  ticker: {
    fontSize: 14,
    fontWeight: "800",
    color: "#111827",
    lineHeight: 18,
  },
  name: {
    fontSize: 12,
    color: '#6B7280',
    lineHeight: 16,
    flexShrink: 1,
  },

  right: {
    alignItems: "flex-end",
    gap: 2,
    minWidth: 104,
  },
  change: {
    fontSize: 12.5,
    fontWeight: "700",
    lineHeight: 16,
    fontVariant: ["tabular-nums"],
  },
  price: {
    fontSize: 12.5,
    fontWeight: "600",
    color: "#111827",
    lineHeight: 16,
    fontVariant: ["tabular-nums"],
  },

  positive: {
    color: "#059669",
  },
  negative: {
    color: "#DC2626",
  },
});
