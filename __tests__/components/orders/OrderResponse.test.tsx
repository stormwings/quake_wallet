import React from 'react';
import { render } from '@testing-library/react-native';
import { OrderResponse } from '@/src/components/orders/OrderResponse';

describe('OrderResponse', () => {
  describe('Rendering', () => {
    it('should render order response container', () => {
      const { getByTestId } = render(
        <OrderResponse orderId="123456" status="FILLED" />
      );

      expect(getByTestId('order-response-filled')).toBeTruthy();
    });

    it('should render order ID', () => {
      const orderId = 'ORD-123456789';
      const { getByTestId, getByText } = render(
        <OrderResponse orderId={orderId} status="FILLED" />
      );

      expect(getByText('ID de la orden')).toBeTruthy();
      expect(getByTestId('order-response-id')).toBeTruthy();
      expect(getByText(orderId)).toBeTruthy();
    });

    it('should render badge', () => {
      const { getByTestId } = render(
        <OrderResponse orderId="123456" status="FILLED" />
      );

      expect(getByTestId('order-response-badge')).toBeTruthy();
    });
  });

  describe('FILLED Status', () => {
    it('should render FILLED status correctly', () => {
      const { getByText } = render(
        <OrderResponse orderId="123456" status="FILLED" />
      );

      expect(getByText('EJECUTADA')).toBeTruthy();
      expect(getByText('Tu orden fue ejecutada exitosamente')).toBeTruthy();
    });

    it('should not render hint for FILLED status', () => {
      const { queryByText } = render(
        <OrderResponse orderId="123456" status="FILLED" />
      );

      expect(
        queryByText('La orden se ejecutará cuando se alcance el precio límite especificado.')
      ).toBeNull();
      expect(
        queryByText('Verifica que tengas fondos suficientes e intenta nuevamente.')
      ).toBeNull();
    });

    it('should render with correct testID for FILLED', () => {
      const { getByTestId } = render(
        <OrderResponse orderId="123456" status="FILLED" />
      );

      expect(getByTestId('order-response-filled')).toBeTruthy();
    });
  });

  describe('PENDING Status', () => {
    it('should render PENDING status correctly', () => {
      const { getByText } = render(
        <OrderResponse orderId="789012" status="PENDING" />
      );

      expect(getByText('PENDIENTE')).toBeTruthy();
      expect(getByText('Tu orden está esperando ejecución')).toBeTruthy();
    });

    it('should render hint for PENDING status', () => {
      const { getByText } = render(
        <OrderResponse orderId="789012" status="PENDING" />
      );

      expect(
        getByText('La orden se ejecutará cuando se alcance el precio límite especificado.')
      ).toBeTruthy();
    });

    it('should render with correct testID for PENDING', () => {
      const { getByTestId } = render(
        <OrderResponse orderId="789012" status="PENDING" />
      );

      expect(getByTestId('order-response-pending')).toBeTruthy();
    });
  });

  describe('REJECTED Status', () => {
    it('should render REJECTED status correctly', () => {
      const { getByText } = render(
        <OrderResponse orderId="345678" status="REJECTED" />
      );

      expect(getByText('RECHAZADA')).toBeTruthy();
      expect(getByText('Tu orden fue rechazada por el mercado')).toBeTruthy();
    });

    it('should render hint for REJECTED status', () => {
      const { getByText } = render(
        <OrderResponse orderId="345678" status="REJECTED" />
      );

      expect(
        getByText('Verifica que tengas fondos suficientes e intenta nuevamente.')
      ).toBeTruthy();
    });

    it('should render with correct testID for REJECTED', () => {
      const { getByTestId } = render(
        <OrderResponse orderId="345678" status="REJECTED" />
      );

      expect(getByTestId('order-response-rejected')).toBeTruthy();
    });
  });

  describe('Component Props', () => {
    it('should accept orderId prop', () => {
      const orderId = 'CUSTOM-ID-999';
      const { getByText } = render(
        <OrderResponse orderId={orderId} status="FILLED" />
      );

      expect(getByText(orderId)).toBeTruthy();
    });

    it('should accept status prop', () => {
      const { getByText: getByTextFilled } = render(
        <OrderResponse orderId="123" status="FILLED" />
      );
      expect(getByTextFilled('EJECUTADA')).toBeTruthy();

      const { getByText: getByTextPending } = render(
        <OrderResponse orderId="456" status="PENDING" />
      );
      expect(getByTextPending('PENDIENTE')).toBeTruthy();

      const { getByText: getByTextRejected } = render(
        <OrderResponse orderId="789" status="REJECTED" />
      );
      expect(getByTextRejected('RECHAZADA')).toBeTruthy();
    });

    it('should render different order IDs correctly', () => {
      const { getByText, rerender } = render(
        <OrderResponse orderId="FIRST-ID" status="FILLED" />
      );
      expect(getByText('FIRST-ID')).toBeTruthy();

      rerender(<OrderResponse orderId="SECOND-ID" status="FILLED" />);
      expect(getByText('SECOND-ID')).toBeTruthy();
    });
  });
});
