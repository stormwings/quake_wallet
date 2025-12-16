import React from 'react';
import { render, fireEvent, waitFor } from '@testing-library/react-native';
import { Provider } from 'react-redux';
import { configureStore } from '@reduxjs/toolkit';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import { LocaleProvider } from '@/src/i18n';
import { OrderModal } from '@/src/components/orders/OrderModal';
import { Instrument, OrderResponse } from '@/src/types';
import ordersReducer from '@/src/store/slices/ordersSlice';

jest.mock('@/src/services', () => {
  const actual = jest.requireActual('@/src/services');
  return {
    ...actual,
    ordersApi: {
      ...actual.ordersApi,
      create: jest.fn(() => new Promise(() => {})),
    },
  };
});

const mockInstrument: Instrument = {
  id: 1,
  ticker: 'AAPL',
  name: 'Apple Inc.',
  type: 'ACCIONES',
  last_price: 150.5,
  close_price: 145.0,
};

const createMockStore = (initialState = {}) => {
  return configureStore({
    reducer: {
      orders: ordersReducer,
    },
    preloadedState: {
      orders: {
        loading: false,
        error: null,
        response: null,
        ...initialState,
      },
    },
  });
};

const renderWithProvider = (component: React.ReactElement, store: any) => {
  return render(
    <LocaleProvider>
      <SafeAreaProvider
        initialMetrics={{
          frame: { x: 0, y: 0, width: 0, height: 0 },
          insets: { top: 0, left: 0, right: 0, bottom: 0 },
        }}
      >
        <Provider store={store}>{component}</Provider>
      </SafeAreaProvider>
    </LocaleProvider>
  );
};

describe('OrderModal', () => {
  const mockOnClose = jest.fn();

  beforeEach(() => {
    mockOnClose.mockClear();
  });

  describe('Basic Rendering', () => {
    it('should render modal when visible is true', () => {
      const store = createMockStore();
      const { getByTestId } = renderWithProvider(
        <OrderModal visible={true} onClose={mockOnClose} instrument={mockInstrument} />,
        store
      );

      expect(getByTestId('order-modal')).toBeTruthy();
    });

    it('should return null when instrument is null', () => {
      const store = createMockStore();
      const { queryByTestId } = renderWithProvider(
        <OrderModal visible={true} onClose={mockOnClose} instrument={null} />,
        store
      );

      expect(queryByTestId('order-modal')).toBeNull();
    });

    it('should render modal with title and close button', () => {
      const store = createMockStore();
      const { getByTestId, getByText } = renderWithProvider(
        <OrderModal visible={true} onClose={mockOnClose} instrument={mockInstrument} />,
        store
      );

      expect(getByText('Nueva orden')).toBeTruthy();
      expect(getByTestId('order-modal-close')).toBeTruthy();
    });
  });

  describe('Form State', () => {
    it('should display OrderForm when no response exists', () => {
      const store = createMockStore();
      const { getByTestId } = renderWithProvider(
        <OrderModal visible={true} onClose={mockOnClose} instrument={mockInstrument} />,
        store
      );

      expect(getByTestId('order-form')).toBeTruthy();
    });

    it('should display instrument information in form', () => {
      const store = createMockStore();
      const { getByText } = renderWithProvider(
        <OrderModal visible={true} onClose={mockOnClose} instrument={mockInstrument} />,
        store
      );

      expect(getByText('AAPL')).toBeTruthy();
      expect(getByText('Apple Inc.')).toBeTruthy();
    });
  });



  describe('User Interactions', () => {
    it('should call onClose when close button is pressed', () => {
      const store = createMockStore();
      const { getByTestId } = renderWithProvider(
        <OrderModal visible={true} onClose={mockOnClose} instrument={mockInstrument} />,
        store
      );

      const closeButton = getByTestId('order-modal-close');
      fireEvent.press(closeButton);

      expect(mockOnClose).toHaveBeenCalledTimes(1);
    });

    it('should call onClose when modal requests close', () => {
      const store = createMockStore();
      const { getByTestId } = renderWithProvider(
        <OrderModal visible={true} onClose={mockOnClose} instrument={mockInstrument} />,
        store
      );

      const modal = getByTestId('order-modal');
      fireEvent(modal, 'requestClose');

      expect(mockOnClose).toHaveBeenCalled();
    });

  });

  describe('Loading State', () => {
    it('should pass loading state to OrderForm', () => {
      const store = createMockStore({ loading: true });
      const { getByTestId } = renderWithProvider(
        <OrderModal visible={true} onClose={mockOnClose} instrument={mockInstrument} />,
        store
      );

      const submitButton = getByTestId('order-form-submit');
      expect(submitButton.props.accessibilityState.disabled).toBe(true);
    });
  });

  describe('Order Submission', () => {
    it('should update store when order is submitted', async () => {
      const store = createMockStore();
      const { getByTestId } = renderWithProvider(
        <OrderModal visible={true} onClose={mockOnClose} instrument={mockInstrument} />,
        store
      );

      const quantityInput = getByTestId('order-quantity-input');
      fireEvent.changeText(quantityInput, '10');

      const submitButton = getByTestId('order-form-submit');
      fireEvent.press(submitButton);

      await waitFor(() => {
        const state = store.getState();
        expect(state.orders.loading).toBe(true);
      });
    });
  });
});
