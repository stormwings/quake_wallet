import React from 'react';
import { render, fireEvent, waitFor } from '../../test-utils';
import { OrderForm } from '@/src/components/orders/OrderForm';
import { Instrument } from '@/src/types';

const mockInstrument: Instrument = {
  id: 1,
  ticker: 'AAPL',
  name: 'Apple Inc.',
  type: 'ACCIONES',
  last_price: 150.5,
  close_price: 145.0,
};

describe('OrderForm', () => {
  const mockOnSubmit = jest.fn();
  const mockOnCancel = jest.fn();

  beforeEach(() => {
    mockOnSubmit.mockClear();
    mockOnCancel.mockClear();
  });

  describe('Rendering', () => {
    it('should render order form', () => {
      const { getByTestId } = render(
        <OrderForm
          instrument={mockInstrument}
          onSubmit={mockOnSubmit}
          onCancel={mockOnCancel}
        />
      );

      expect(getByTestId('order-form')).toBeTruthy();
    });

    it('should display instrument information', () => {
      const { getByTestId } = render(
        <OrderForm
          instrument={mockInstrument}
          onSubmit={mockOnSubmit}
          onCancel={mockOnCancel}
        />
      );

      expect(getByTestId('order-form-ticker')).toBeTruthy();
      expect(getByTestId('order-form-name')).toBeTruthy();
      expect(getByTestId('order-form-current-price')).toBeTruthy();
    });

    it('should display correct instrument ticker', () => {
      const { getByText } = render(
        <OrderForm
          instrument={mockInstrument}
          onSubmit={mockOnSubmit}
          onCancel={mockOnCancel}
        />
      );

      expect(getByText('AAPL')).toBeTruthy();
    });

    it('should display correct instrument name', () => {
      const { getByText } = render(
        <OrderForm
          instrument={mockInstrument}
          onSubmit={mockOnSubmit}
          onCancel={mockOnCancel}
        />
      );

      expect(getByText('Apple Inc.')).toBeTruthy();
    });

    it('should display formatted current price', () => {
      const { getByText } = render(
        <OrderForm
          instrument={mockInstrument}
          onSubmit={mockOnSubmit}
          onCancel={mockOnCancel}
        />
      );

      expect(getByText(/150/)).toBeTruthy();
    });

    it('should render cancel and submit buttons', () => {
      const { getByTestId } = render(
        <OrderForm
          instrument={mockInstrument}
          onSubmit={mockOnSubmit}
          onCancel={mockOnCancel}
        />
      );

      expect(getByTestId('order-form-cancel')).toBeTruthy();
      expect(getByTestId('order-form-submit')).toBeTruthy();
    });
  });

  describe('Form Controls', () => {
    it('should render OrderTypeSelector', () => {
      const { getByTestId } = render(
        <OrderForm
          instrument={mockInstrument}
          onSubmit={mockOnSubmit}
          onCancel={mockOnCancel}
        />
      );

      expect(getByTestId('order-type-buy')).toBeTruthy();
      expect(getByTestId('order-type-sell')).toBeTruthy();
      expect(getByTestId('order-type-market')).toBeTruthy();
      expect(getByTestId('order-type-limit')).toBeTruthy();
    });

    it('should render QuantityInput', () => {
      const { getByTestId } = render(
        <OrderForm
          instrument={mockInstrument}
          onSubmit={mockOnSubmit}
          onCancel={mockOnCancel}
        />
      );

      expect(getByTestId('order-quantity-input')).toBeTruthy();
    });

    it('should not show price input for MARKET orders', () => {
      const { queryByTestId } = render(
        <OrderForm
          instrument={mockInstrument}
          onSubmit={mockOnSubmit}
          onCancel={mockOnCancel}
        />
      );

      expect(queryByTestId('order-form-price-input')).toBeNull();
    });

    it('should show price input when LIMIT order type is selected', () => {
      const { getByTestId } = render(
        <OrderForm
          instrument={mockInstrument}
          onSubmit={mockOnSubmit}
          onCancel={mockOnCancel}
        />
      );

      const limitButton = getByTestId('order-type-limit');
      fireEvent.press(limitButton);

      expect(getByTestId('order-form-price-input')).toBeTruthy();
    });
  });

  describe('Submit Button', () => {
    it('should display "Comprar" for BUY side', () => {
      const { getByText } = render(
        <OrderForm
          instrument={mockInstrument}
          onSubmit={mockOnSubmit}
          onCancel={mockOnCancel}
        />
      );

      expect(getByText('Comprar')).toBeTruthy();
    });

    it('should display "Vender" for SELL side', () => {
      const { getByTestId, getByText } = render(
        <OrderForm
          instrument={mockInstrument}
          onSubmit={mockOnSubmit}
          onCancel={mockOnCancel}
        />
      );

      const sellButton = getByTestId('order-type-sell');
      fireEvent.press(sellButton);

      expect(getByText('Vender')).toBeTruthy();
    });
  });

  describe('Total Calculation', () => {
    it('should show total when quantity is entered for MARKET order', async () => {
      const { getByTestId, queryByTestId } = render(
        <OrderForm
          instrument={mockInstrument}
          onSubmit={mockOnSubmit}
          onCancel={mockOnCancel}
        />
      );

      const quantityInput = getByTestId('order-quantity-input');
      fireEvent.changeText(quantityInput, '10');

      await waitFor(() => {
        expect(queryByTestId('order-form-total')).toBeTruthy();
      });
    });

    it('should not show total when quantity is 0', () => {
      const { queryByTestId } = render(
        <OrderForm
          instrument={mockInstrument}
          onSubmit={mockOnSubmit}
          onCancel={mockOnCancel}
        />
      );

      expect(queryByTestId('order-form-total')).toBeNull();
    });
  });

  describe('Cancel Button', () => {
    it('should call onCancel when cancel button is pressed', () => {
      const { getByTestId } = render(
        <OrderForm
          instrument={mockInstrument}
          onSubmit={mockOnSubmit}
          onCancel={mockOnCancel}
        />
      );

      const cancelButton = getByTestId('order-form-cancel');
      fireEvent.press(cancelButton);

      expect(mockOnCancel).toHaveBeenCalledTimes(1);
    });

    it('should disable cancel button when loading', () => {
      const { getByTestId } = render(
        <OrderForm
          instrument={mockInstrument}
          onSubmit={mockOnSubmit}
          onCancel={mockOnCancel}
          loading={true}
        />
      );

      const cancelButton = getByTestId('order-form-cancel');
      expect(cancelButton.props.accessibilityState.disabled).toBe(true);
    });
  });

  describe('Form Submission', () => {
    it('should submit MARKET order with correct data', async () => {
      const { getByTestId } = render(
        <OrderForm
          instrument={mockInstrument}
          onSubmit={mockOnSubmit}
          onCancel={mockOnCancel}
        />
      );

      const quantityInput = getByTestId('order-quantity-input');
      fireEvent.changeText(quantityInput, '10');

      const submitButton = getByTestId('order-form-submit');
      fireEvent.press(submitButton);

      await waitFor(() => {
        expect(mockOnSubmit).toHaveBeenCalledWith({
          instrument_id: 1,
          side: 'BUY',
          type: 'MARKET',
          quantity: 10,
        });
      });
    });

    it('should submit LIMIT order with price', async () => {
      const { getByTestId } = render(
        <OrderForm
          instrument={mockInstrument}
          onSubmit={mockOnSubmit}
          onCancel={mockOnCancel}
        />
      );

      const limitButton = getByTestId('order-type-limit');
      fireEvent.press(limitButton);

      const quantityInput = getByTestId('order-quantity-input');
      fireEvent.changeText(quantityInput, '5');

      const priceInput = getByTestId('order-form-price-input');
      fireEvent.changeText(priceInput, '140.50');

      const submitButton = getByTestId('order-form-submit');
      fireEvent.press(submitButton);

      await waitFor(() => {
        expect(mockOnSubmit).toHaveBeenCalledWith({
          instrument_id: 1,
          side: 'BUY',
          type: 'LIMIT',
          quantity: 5,
          price: 140.5,
        });
      });
    });

    it('should submit SELL order with correct side', async () => {
      const { getByTestId } = render(
        <OrderForm
          instrument={mockInstrument}
          onSubmit={mockOnSubmit}
          onCancel={mockOnCancel}
        />
      );

      const sellButton = getByTestId('order-type-sell');
      fireEvent.press(sellButton);

      const quantityInput = getByTestId('order-quantity-input');
      fireEvent.changeText(quantityInput, '15');

      const submitButton = getByTestId('order-form-submit');
      fireEvent.press(submitButton);

      await waitFor(() => {
        expect(mockOnSubmit).toHaveBeenCalledWith({
          instrument_id: 1,
          side: 'SELL',
          type: 'MARKET',
          quantity: 15,
        });
      });
    });

    it('should disable submit button when loading', () => {
      const { getByTestId } = render(
        <OrderForm
          instrument={mockInstrument}
          onSubmit={mockOnSubmit}
          onCancel={mockOnCancel}
          loading={true}
        />
      );

      const submitButton = getByTestId('order-form-submit');
      expect(submitButton.props.accessibilityState.disabled).toBe(true);
    });

    it('should show loading indicator when loading', () => {
      const { getByTestId, queryByText } = render(
        <OrderForm
          instrument={mockInstrument}
          onSubmit={mockOnSubmit}
          onCancel={mockOnCancel}
          loading={true}
        />
      );

      const submitButton = getByTestId('order-form-submit');
      expect(submitButton.props.accessibilityState.disabled).toBe(true);
      expect(queryByText('Comprar')).toBeNull();
    });
  });

  describe('Component Props', () => {
    it('should accept instrument prop', () => {
      const customInstrument: Instrument = {
        id: 2,
        ticker: 'GOOGL',
        name: 'Alphabet Inc.',
        type: 'ACCIONES',
        last_price: 2800.0,
        close_price: 2750.0,
      };

      const { getByText } = render(
        <OrderForm
          instrument={customInstrument}
          onSubmit={mockOnSubmit}
          onCancel={mockOnCancel}
        />
      );

      expect(getByText('GOOGL')).toBeTruthy();
      expect(getByText('Alphabet Inc.')).toBeTruthy();
    });

    it('should accept onSubmit prop', async () => {
      const customOnSubmit = jest.fn();
      const { getByTestId } = render(
        <OrderForm
          instrument={mockInstrument}
          onSubmit={customOnSubmit}
          onCancel={mockOnCancel}
        />
      );

      const quantityInput = getByTestId('order-quantity-input');
      fireEvent.changeText(quantityInput, '1');

      const submitButton = getByTestId('order-form-submit');
      fireEvent.press(submitButton);

      await waitFor(() => {
        expect(customOnSubmit).toHaveBeenCalled();
      });
    });

    it('should accept onCancel prop', () => {
      const customOnCancel = jest.fn();
      const { getByTestId } = render(
        <OrderForm
          instrument={mockInstrument}
          onSubmit={mockOnSubmit}
          onCancel={customOnCancel}
        />
      );

      const cancelButton = getByTestId('order-form-cancel');
      fireEvent.press(cancelButton);

      expect(customOnCancel).toHaveBeenCalled();
    });

    it('should accept loading prop', () => {
      const { getByTestId } = render(
        <OrderForm
          instrument={mockInstrument}
          onSubmit={mockOnSubmit}
          onCancel={mockOnCancel}
          loading={false}
        />
      );

      const submitButton = getByTestId('order-form-submit');
      expect(submitButton.props.accessibilityState.disabled).toBe(false);
    });
  });
});
