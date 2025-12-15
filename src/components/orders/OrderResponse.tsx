import { Ionicons } from "@expo/vector-icons";
import React from "react";
import { StyleSheet, Text, View } from "react-native";
import { OrderStatus } from "../../types";
import { copy } from "../../i18n/copy";

interface OrderResponseProps {
  orderId: string;
  status: OrderStatus;
}

export const OrderResponse: React.FC<OrderResponseProps> = ({
  orderId,
  status,
}) => {
  const cfg = getStatusConfig(status);

  return (
    <View testID={`order-response-${status.toLowerCase()}`} style={styles.container}>
      <View
        testID="order-response-badge"
        style={[
          styles.badge,
          { backgroundColor: cfg.bg, borderColor: cfg.border },
        ]}
      >
        <Ionicons name={cfg.icon as any} size={16} color={cfg.color} />
        <Text style={[styles.badgeText, { color: cfg.color }]}>
          {cfg.label}
        </Text>
      </View>

      <Text style={styles.message}>{cfg.message}</Text>

      <View style={styles.infoBox}>
        <Text style={styles.infoLabel}>{copy.orders.response.idLabel()}</Text>
        <Text testID="order-response-id" style={styles.infoValue}>
          {orderId}
        </Text>
      </View>

      {status === "PENDING" && (
        <Text style={styles.hint}>
          {copy.orders.response.statusHint(status)}
        </Text>
      )}

      {status === "REJECTED" && (
        <Text style={styles.hint}>
          {copy.orders.response.statusHint(status)}
        </Text>
      )}
    </View>
  );
};

function getStatusConfig(orderStatus: OrderStatus) {
  switch (orderStatus) {
    case "FILLED":
      return {
        color: "#10B981",
        bg: "#ECFDF5",
        border: "#D1FAE5",
        label: copy.orders.response.statusLabel(orderStatus),
        message: copy.orders.response.statusMessage(orderStatus),
        icon: "checkmark",
      };
    case "PENDING":
      return {
        color: "#F59E0B",
        bg: "#FFFBEB",
        border: "#FEF3C7",
        label: copy.orders.response.statusLabel(orderStatus),
        message: copy.orders.response.statusMessage(orderStatus),
        icon: "time-outline",
      };
    case "REJECTED":
    default:
      return {
        color: "#EF4444",
        bg: "#FEF2F2",
        border: "#FEE2E2",
        label: copy.orders.response.statusLabel(orderStatus),
        message: copy.orders.response.statusMessage(orderStatus),
        icon: "close",
      };
  }
}

const TOKENS = {
  fill: "#F3F4F6",
  text: "#111827",
  subtext: "#6B7280",
};

const styles = StyleSheet.create({
  container: {
    gap: 12,
  },
  badge: {
    alignSelf: "center",
    flexDirection: "row",
    alignItems: "center",
    gap: 8,
    paddingVertical: 10,
    paddingHorizontal: 14,
    borderRadius: 12,
    borderWidth: 1,
  },
  badgeText: {
    fontSize: 13,
    fontWeight: "700",
    letterSpacing: 0.2,
  },
  message: {
    fontSize: 14,
    color: "#374151",
    textAlign: "center",
    lineHeight: 20,
    fontWeight: "500",
  },
  infoBox: {
    backgroundColor: TOKENS.fill,
    borderRadius: 12,
    padding: 12,
  },
  infoLabel: {
    fontSize: 12,
    color: TOKENS.subtext,
    marginBottom: 6,
    fontWeight: "500",
  },
  infoValue: {
    fontSize: 14,
    fontWeight: "700",
    color: TOKENS.text,
    fontFamily: "monospace",
  },
  hint: {
    fontSize: 12,
    color: TOKENS.subtext,
    textAlign: "center",
    lineHeight: 18,
    fontWeight: "500",
  },
});
