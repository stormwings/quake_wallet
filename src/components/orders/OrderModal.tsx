import React, { useEffect } from 'react';
import {
  KeyboardAvoidingView,
  Modal,
  Platform,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View
} from 'react-native';
import { useAppDispatch, useAppSelector } from '../../store';
import { clearResponse, createOrder } from '../../store/slices';
import { Instrument, OrderRequest } from '../../types';
import { OrderForm } from './OrderForm';
import { OrderResponse } from './OrderResponse';

interface OrderModalProps {
  visible: boolean;
  onClose: () => void;
  instrument: Instrument | null;
}

export const OrderModal: React.FC<OrderModalProps> = ({
  visible,
  onClose,
  instrument
}) => {
  const dispatch = useAppDispatch();
  const { loading, error, response } = useAppSelector((state) => state.orders);

  useEffect(() => {
    // Clear response when modal opens with new instrument
    if (visible && instrument) {
      dispatch(clearResponse());
    }
  }, [visible, instrument, dispatch]);

  const handleSubmit = (orderData: OrderRequest) => {
    dispatch(createOrder(orderData));
  };

  const handleClose = () => {
    dispatch(clearResponse());
    onClose();
  };

  const handleNewOrder = () => {
    dispatch(clearResponse());
  };

  if (!instrument) return null;

  return (
    <Modal
      visible={visible}
      animationType="slide"
      transparent={true}
      onRequestClose={handleClose}
    >
      <KeyboardAvoidingView
        behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
        style={styles.overlay}
      >
        <TouchableOpacity
          style={styles.backdrop}
          activeOpacity={1}
          onPress={handleClose}
        />
        <View style={styles.modalContainer}>
          {/* Header */}
          <View style={styles.header}>
            <Text style={styles.headerTitle}>
              {response ? 'Resultado de la orden' : 'Nueva orden'}
            </Text>
            <TouchableOpacity
              onPress={handleClose}
              style={styles.closeButton}
              activeOpacity={0.7}
            >
              <Text style={styles.closeButtonText}>✕</Text>
            </TouchableOpacity>
          </View>

          {/* Content */}
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
                  style={styles.newOrderButton}
                  onPress={handleNewOrder}
                  activeOpacity={0.8}
                >
                  <Text style={styles.newOrderButtonText}>Nueva orden</Text>
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
                  <View style={styles.errorContainer}>
                    <Text style={styles.errorText}>{error}</Text>
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

const styles = StyleSheet.create({
  overlay: {
    flex: 1,
    justifyContent: 'flex-end',
  },
  backdrop: {
    ...StyleSheet.absoluteFillObject,
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
  },
  modalContainer: {
    width: '100%',
    minHeight: 260,
    backgroundColor: '#ffffff',
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
    maxHeight: '90%',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: -2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 10,
    elevation: 10,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 20,
    paddingVertical: 16,
    borderBottomWidth: 1,
    borderBottomColor: '#e5e7eb',
  },
  headerTitle: {
    fontSize: 18,
    fontWeight: '700',
    color: '#1f2937',
  },
  closeButton: {
    width: 32,
    height: 32,
    borderRadius: 16,
    backgroundColor: '#f3f4f6',
    alignItems: 'center',
    justifyContent: 'center',
  },
  closeButtonText: {
    fontSize: 20,
    color: '#6b7280',
    fontWeight: '600',
  },
  content: {},
  contentContainer: {
    padding: 20,
    paddingBottom: 40,
  },
  errorContainer: {
    backgroundColor: '#fee2e2',
    borderRadius: 8,
    padding: 12,
    marginTop: 12,
    borderWidth: 1,
    borderColor: '#fca5a5',
  },
  errorText: {
    fontSize: 14,
    color: '#dc2626',
    textAlign: 'center',
  },
  newOrderButton: {
    backgroundColor: '#3b82f6',
    paddingVertical: 14,
    borderRadius: 8,
    alignItems: 'center',
    marginTop: 16,
  },
  newOrderButtonText: {
    fontSize: 16,
    fontWeight: '600',
    color: '#ffffff',
  },
});
