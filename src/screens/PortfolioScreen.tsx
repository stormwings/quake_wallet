import React, { useEffect } from "react";
import { StyleSheet, Text, View } from "react-native";
import { ErrorMessage, Loading, PositionList } from "../components";
import { getUserMessage } from "../errors";
import { useLocale } from "../i18n";
import { copy } from "../i18n/copy";
import { useAppDispatch, useAppSelector } from "../store";
import { fetchPortfolio } from "../store/slices";
import { calculateMarketValue } from "../utils/calculations";
import { formatCurrency } from "../utils/formatters";

export default function PortfolioScreen() {
  useLocale();

  const dispatch = useAppDispatch();
  const {
    data: positions,
    loading,
    error,
  } = useAppSelector((state) => state.portfolio);

  useEffect(() => {
    dispatch(fetchPortfolio());
  }, [dispatch]);

  const handleRefresh = () => {
    dispatch(fetchPortfolio());
  };

  const handleRetry = () => {
    dispatch(fetchPortfolio());
  };

  const totalValue =
    positions?.reduce((sum, position) => {
      return sum + calculateMarketValue(position.quantity, position.last_price);
    }, 0) || 0;

  if (loading && !positions) {
    return <Loading />;
  }

  if (error && !positions) {
    return <ErrorMessage error={error} onRetry={handleRetry} />;
  }

  return (
    <View testID="portfolio-screen" style={styles.container}>
      {positions && positions.length > 0 && (
        <View key="portfolio-summary" testID="portfolio-summary" style={styles.summaryCard}>
          <Text style={styles.headerLabel}>{copy.portfolio.totalLabel()}</Text>
          <Text testID="portfolio-total-value" style={styles.headerValue}>
            {formatCurrency(totalValue)}
          </Text>
        </View>
      )}

      {positions && positions.length > 0 ? (
        <PositionList
          key="portfolio-list"
          positions={positions}
          refreshing={loading}
          onRefresh={handleRefresh}
        />
      ) : (
        <View key="portfolio-empty" testID="portfolio-empty-state" style={styles.emptyContainer}>
          <Text style={styles.emptyText}>{copy.portfolio.emptyMessage()}</Text>
        </View>
      )}

      {error && positions && (
        <View key="portfolio-error" testID="portfolio-error-banner" style={styles.errorBanner}>
          <Text style={styles.errorBannerText}>{getUserMessage(error)}</Text>
        </View>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#FFFFFF",
  },

  summaryCard: {
    marginHorizontal: 16,
    marginTop: 10,
    marginBottom: 10,
    paddingVertical: 16,
    paddingHorizontal: 14,
    backgroundColor: "#FFFFFF",
    borderWidth: 1,
    borderColor: "#E6EAF2",
    borderRadius: 6,
    elevation: 0,
    shadowColor: "transparent",
  },

  headerLabel: {
    fontSize: 11,
    color: "#6B7280",
    marginBottom: 6,
    fontWeight: "500",
  },

  headerValue: {
    fontSize: 23,
    lineHeight: 28,
    fontWeight: "500",
    color: "#111827",
  },

  emptyContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    padding: 20,
  },

  emptyText: {
    fontSize: 14,
    color: "#9CA3AF",
    textAlign: "center",
    fontWeight: "600",
  },

  errorBanner: {
    backgroundColor: "#FEF2F2",
    padding: 12,
    borderTopWidth: 1,
    borderTopColor: "#FECACA",
  },

  errorBannerText: {
    color: "#DC2626",
    fontSize: 13,
    textAlign: "center",
    fontWeight: "600",
  },
});
