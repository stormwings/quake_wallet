import { Ionicons } from "@expo/vector-icons";
import React, { useEffect } from "react";
import {
  KeyboardAvoidingView,
  Modal,
  Platform,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";

import { getUserMessage } from "../../errors";
import { useLocale } from "../../i18n";
import { copy } from "../../i18n/copy";
import { useCreateOrderMutation } from "../../services/mutations/useCreateOrderMutation";
import { Instrument, OrderRequest } from "../../types";
import { OrderForm } from "./OrderForm";
import { OrderResponse } from "./OrderResponse";

interface OrderModalProps {
  visible: boolean;
  onClose: () => void;
  instrument: Instrument | null;
}

export const OrderModal: React.FC<OrderModalProps> = ({
  visible,
  onClose,
  instrument,
}) => {
  useLocale();

  const insets = useSafeAreaInsets();
  const {
    mutate: createOrder,
    isPending: loading,
    error,
    data: response,
    reset: clearOrdersResponse,
  } = useCreateOrderMutation();

  useEffect(() => {
    if (visible && instrument) clearOrdersResponse();
  }, [visible, instrument, clearOrdersResponse]);

  const handleSubmit = (orderData: OrderRequest) => {
    createOrder(orderData);
  };

  const handleClose = () => {
    clearOrdersResponse();
    onClose();
  };

  const handleNewOrder = () => {
    clearOrdersResponse();
  };

  if (!instrument) return null;

  return (
    <Modal
      testID="order-modal"
      visible={visible}
      animationType="slide"
      transparent
      onRequestClose={handleClose}
    >
      <KeyboardAvoidingView
        behavior={Platform.OS === "ios" ? "padding" : "height"}
        style={styles.overlay}
      >
        <TouchableOpacity
          style={styles.backdrop}
          activeOpacity={1}
          onPress={handleClose}
        />

        <View
          style={[styles.sheet, { paddingBottom: Math.max(insets.bottom, 14) }]}
        >
          <View style={styles.handleWrap}>
            <View style={styles.handle} />
          </View>

          <View style={styles.header}>
            <Text testID="order-modal-title" style={styles.headerTitle}>
              {response
                ? copy.orders.modal.titleResult()
                : copy.orders.modal.titleNew()}
            </Text>

            <TouchableOpacity
              testID="order-modal-close"
              onPress={handleClose}
              style={styles.closeBtn}
              activeOpacity={0.7}
              hitSlop={{ top: 10, bottom: 10, left: 10, right: 10 }}
            >
              <Ionicons name="close" size={18} color={TOKENS.text} />
            </TouchableOpacity>
          </View>

          <ScrollView
            style={styles.content}
            contentContainerStyle={styles.contentContainer}
            keyboardShouldPersistTaps="handled"
            showsVerticalScrollIndicator={false}
          >
            {response ? (
              <>
                <OrderResponse orderId={response.id} status={response.status} />

                <TouchableOpacity
                  testID="order-modal-new-order"
                  style={styles.primaryBtn}
                  onPress={handleNewOrder}
                  activeOpacity={0.85}
                >
                  <Text style={styles.primaryBtnText}>
                    {copy.orders.modal.newOrderCta()}
                  </Text>
                </TouchableOpacity>
              </>
            ) : (
              <>
                <OrderForm
                  instrument={instrument}
                  onSubmit={handleSubmit}
                  onCancel={handleClose}
                  loading={loading}
                />

                {error && (
                  <View testID="order-modal-error" style={styles.errorBox}>
                    <Ionicons
                      name="alert-circle-outline"
                      size={16}
                      color={TOKENS.danger}
                    />
                    <Text style={styles.errorText}>{getUserMessage(error)}</Text>
                  </View>
                )}
              </>
            )}
          </ScrollView>
        </View>
      </KeyboardAvoidingView>
    </Modal>
  );
};

const TOKENS = {
  surface: "#FFFFFF",
  fill: "#F3F4F6",
  divider: "#EEF2F7",
  text: "#111827",
  subtext: "#6B7280",
  danger: "#EF4444",
};

const styles = StyleSheet.create({
  overlay: {
    flex: 1,
    justifyContent: "flex-end",
  },
  backdrop: {
    ...StyleSheet.absoluteFillObject,
    backgroundColor: "rgba(17, 24, 39, 0.55)",
  },

  sheet: {
    width: "100%",
    maxHeight: "90%",
    backgroundColor: TOKENS.surface,
    borderTopLeftRadius: 18,
    borderTopRightRadius: 18,
    borderTopWidth: 1,
    borderTopColor: TOKENS.divider,
    overflow: "hidden",
  },

  handleWrap: {
    paddingTop: 10,
    paddingBottom: 6,
    alignItems: "center",
  },
  handle: {
    width: 44,
    height: 5,
    borderRadius: 999,
    backgroundColor: "#D1D5DB",
    opacity: 0.7,
  },

  header: {
    paddingHorizontal: 18,
    paddingVertical: 12,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    borderBottomWidth: 1,
    borderBottomColor: TOKENS.divider,
  },
  headerTitle: {
    fontSize: 16,
    fontWeight: "700",
    color: TOKENS.text,
  },
  closeBtn: {
    width: 34,
    height: 34,
    borderRadius: 999,
    backgroundColor: TOKENS.fill,
    alignItems: "center",
    justifyContent: "center",
  },

  content: {},
  contentContainer: {
    padding: 18,
    paddingBottom: 22,
    gap: 14,
  },

  errorBox: {
    flexDirection: "row",
    alignItems: "center",
    gap: 10,
    backgroundColor: "#FEF2F2",
    borderWidth: 1,
    borderColor: "#FEE2E2",
    padding: 12,
    borderRadius: 12,
  },
  errorText: {
    flex: 1,
    fontSize: 13,
    color: "#991B1B",
    lineHeight: 18,
    fontWeight: "500",
  },

  primaryBtn: {
    marginTop: 6,
    backgroundColor: "#3B82F6",
    borderRadius: 12,
    paddingVertical: 13,
    alignItems: "center",
    justifyContent: "center",
  },
  primaryBtnText: {
    color: "#FFFFFF",
    fontWeight: "700",
    fontSize: 15,
  },
});
