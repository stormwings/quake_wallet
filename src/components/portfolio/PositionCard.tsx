import React from "react";
import { StyleSheet, Text, View } from "react-native";
import { Position } from "../../types";
import {
  calculateMarketValue,
  calculateProfit,
  calculateProfitPercentage,
} from "../../utils/calculations";
import { formatCurrency, formatPercentage } from "../../utils/formatters";
import { copy } from "../../i18n/copy";

interface PositionCardProps {
  position: Position;
}

export const PositionCard: React.FC<PositionCardProps> = ({ position }) => {
  const { ticker, quantity, last_price, avg_cost_price } = position;

  const marketValue = calculateMarketValue(quantity, last_price);
  const profit = calculateProfit(quantity, last_price, avg_cost_price);
  const profitPercentage = calculateProfitPercentage(
    last_price,
    avg_cost_price
  );

  const isProfitable = profit >= 0;

  const profitColor = isProfitable ? "#10B981" : "#EF4444";
  const pillBg = isProfitable ? "#ECFDF5" : "#FEF2F2";
  const pillBorder = isProfitable ? "#A7F3D0" : "#FECACA";

  return (
    <View testID={`position-card-${ticker}`} style={styles.card}>
      <View style={styles.topRow}>
        <View style={styles.left}>
          <Text testID="position-card-ticker" style={styles.ticker}>
            {ticker}
          </Text>
          <Text testID="position-card-quantity" style={styles.quantity}>
            {copy.portfolio.quantity(quantity)}
          </Text>
        </View>

        <View style={styles.right}>
          <Text testID="position-card-market-value" style={styles.marketValue}>
            {formatCurrency(marketValue)}
          </Text>

          <View
            testID="position-card-profit-percentage"
            style={[
              styles.pill,
              { backgroundColor: pillBg, borderColor: pillBorder },
            ]}
          >
            <Text style={[styles.pillText, { color: profitColor }]}>
              {formatPercentage(profitPercentage)}
            </Text>
          </View>
        </View>
      </View>

      <View style={styles.divider} />

      <View style={styles.kvRow}>
        <Text style={styles.kLabel}>{copy.portfolio.profitLabel()}</Text>
        <Text
          testID="position-card-profit"
          style={[styles.kValueStrong, { color: profitColor }]}
        >
          {formatCurrency(profit)}
        </Text>
      </View>

      <View style={styles.kvRow}>
        <Text style={styles.kLabel}>{copy.portfolio.avgCostLabel()}</Text>
        <Text testID="position-card-avg-cost" style={styles.kValue}>
          {formatCurrency(avg_cost_price)}
        </Text>
      </View>

      <View style={styles.kvRow}>
        <Text style={styles.kLabel}>{copy.portfolio.lastPriceLabel()}</Text>
        <Text testID="position-card-last-price" style={styles.kValue}>
          {formatCurrency(last_price)}
        </Text>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  card: {
    backgroundColor: "#FFFFFF",
    borderWidth: 1,
    borderColor: "#E6EAF2",
    borderRadius: 6,
    paddingVertical: 14,
    paddingHorizontal: 14,
    marginBottom: 12,

    elevation: 0,
    shadowColor: "transparent",
    shadowOpacity: 0,
    shadowRadius: 0,
    shadowOffset: { width: 0, height: 0 },
  },

  topRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "flex-start",
  },

  left: {
    flex: 1,
    paddingRight: 12,
  },

  right: {
    alignItems: "flex-end",
  },

  ticker: {
    fontSize: 15,
    fontWeight: "800",
    color: "#111827",
  },

  quantity: {
    fontSize: 12,
    color: "#6B7280",
    marginTop: 3,
    fontWeight: "600",
  },

  marketValue: {
    fontSize: 14,
    fontWeight: "800",
    color: "#111827",
  },

  pill: {
    marginTop: 8,
    paddingHorizontal: 9,
    paddingVertical: 4,
    borderRadius: 999,
    borderWidth: 1,
  },
  pillText: {
    fontSize: 10.5,
    fontWeight: "700",
  },

  divider: {
    height: 1,
    backgroundColor: "#EEF2F7",
    marginVertical: 12,
  },

  kvRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingVertical: 6,
  },

  kLabel: {
    fontSize: 12,
    color: "#6B7280",
    fontWeight: "600",
    width: 140,
  },
  kValue: {
    fontSize: 12,
    color: "#111827",
    fontWeight: "800",
  },

  kValueStrong: {
    fontSize: 12,
    fontWeight: "800",
  },
});
