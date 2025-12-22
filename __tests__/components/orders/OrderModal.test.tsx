import React from 'react';
import { render, fireEvent, waitFor } from '@testing-library/react-native';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import { LocaleProvider } from '@/src/i18n';
import { OrderModal } from '@/src/components/orders/OrderModal';
import { Instrument, OrderResponse } from '@/src/types';
import { ReactQueryWrapper } from '@/__tests__/utils';

// Mock the useCreateOrderMutation hook
const mockMutate = jest.fn();
const mockReset = jest.fn();

jest.mock('@/src/services/mutations/useCreateOrderMutation', () => ({
  useCreateOrderMutation: () => ({
    mutate: mockMutate,
    isPending: false,
    error: null,
    data: null,
    reset: mockReset,
  }),
}));

const mockInstrument: Instrument = {
  id: 1,
  ticker: 'AAPL',
  name: 'Apple Inc.',
  type: 'ACCIONES',
  last_price: 150.5,
  close_price: 145.0,
};

const renderWithProvider = (component: React.ReactElement) => {
  return render(
    <LocaleProvider>
      <SafeAreaProvider
        initialMetrics={{
          frame: { x: 0, y: 0, width: 0, height: 0 },
          insets: { top: 0, left: 0, right: 0, bottom: 0 },
        }}
      >
        <ReactQueryWrapper>{component}</ReactQueryWrapper>
      </SafeAreaProvider>
    </LocaleProvider>
  );
};

describe('OrderModal', () => {
  const mockOnClose = jest.fn();

  beforeEach(() => {
    mockOnClose.mockClear();
  });

  beforeEach(() => {
    jest.clearAllMocks();
  });

  describe('Basic Rendering', () => {
    it('should render modal when visible is true', () => {
      const { getByTestId } = renderWithProvider(
        <OrderModal visible={true} onClose={mockOnClose} instrument={mockInstrument} />
      );

      expect(getByTestId('order-modal')).toBeTruthy();
    });

    it('should return null when instrument is null', () => {
      const { queryByTestId } = renderWithProvider(
        <OrderModal visible={true} onClose={mockOnClose} instrument={null} />
      );

      expect(queryByTestId('order-modal')).toBeNull();
    });

    it('should render modal with title and close button', () => {
      const { getByTestId, getByText } = renderWithProvider(
        <OrderModal visible={true} onClose={mockOnClose} instrument={mockInstrument} />
      );

      expect(getByText('Nueva orden')).toBeTruthy();
      expect(getByTestId('order-modal-close')).toBeTruthy();
    });
  });

  describe('Form State', () => {
    it('should display OrderForm when no response exists', () => {
      const { getByTestId } = renderWithProvider(
        <OrderModal visible={true} onClose={mockOnClose} instrument={mockInstrument} />
      );

      expect(getByTestId('order-form')).toBeTruthy();
    });

    it('should display instrument information in form', () => {
      const { getByText } = renderWithProvider(
        <OrderModal visible={true} onClose={mockOnClose} instrument={mockInstrument} />
      );

      expect(getByText('AAPL')).toBeTruthy();
      expect(getByText('Apple Inc.')).toBeTruthy();
    });
  });



  describe('User Interactions', () => {
    it('should call onClose when close button is pressed', () => {
      const { getByTestId } = renderWithProvider(
        <OrderModal visible={true} onClose={mockOnClose} instrument={mockInstrument} />
      );

      const closeButton = getByTestId('order-modal-close');
      fireEvent.press(closeButton);

      expect(mockOnClose).toHaveBeenCalledTimes(1);
    });

    it('should call onClose when modal requests close', () => {
      const { getByTestId } = renderWithProvider(
        <OrderModal visible={true} onClose={mockOnClose} instrument={mockInstrument} />
      );

      const modal = getByTestId('order-modal');
      fireEvent(modal, 'requestClose');

      expect(mockOnClose).toHaveBeenCalled();
    });

  });

  describe('Loading State', () => {
    it('should call reset when modal becomes visible', () => {
      const { rerender } = renderWithProvider(
        <OrderModal visible={false} onClose={mockOnClose} instrument={mockInstrument} />
      );

      // Remount with visible=true
      rerender(
        <LocaleProvider>
          <SafeAreaProvider
            initialMetrics={{
              frame: { x: 0, y: 0, width: 0, height: 0 },
              insets: { top: 0, left: 0, right: 0, bottom: 0 },
            }}
          >
            <ReactQueryWrapper>
              <OrderModal visible={true} onClose={mockOnClose} instrument={mockInstrument} />
            </ReactQueryWrapper>
          </SafeAreaProvider>
        </LocaleProvider>
      );

      // Should call reset when modal opens
      expect(mockReset).toHaveBeenCalled();
    });
  });

  describe('Order Submission', () => {
    it('should call mutate when order is submitted', async () => {
      const { getByTestId } = renderWithProvider(
        <OrderModal visible={true} onClose={mockOnClose} instrument={mockInstrument} />
      );

      const quantityInput = getByTestId('order-quantity-input');
      fireEvent.changeText(quantityInput, '10');

      const submitButton = getByTestId('order-form-submit');
      fireEvent.press(submitButton);

      await waitFor(() => {
        expect(mockMutate).toHaveBeenCalled();
      });
    });
  });
});
