import React from 'react';
import { render, fireEvent } from '../../test-utils';
import { OrderTypeSelector } from '@/src/components/orders/OrderTypeSelector';

describe('OrderTypeSelector', () => {
  describe('Rendering', () => {
    it('should render buy and sell buttons', () => {
      const mockOnSideChange = jest.fn();
      const mockOnTypeChange = jest.fn();

      const { getByText } = render(
        <OrderTypeSelector
          side="BUY"
          onSideChange={mockOnSideChange}
          type="MARKET"
          onTypeChange={mockOnTypeChange}
        />
      );

      expect(getByText('COMPRAR')).toBeTruthy();
      expect(getByText('VENDER')).toBeTruthy();
    });

    it('should render market and limit buttons', () => {
      const mockOnSideChange = jest.fn();
      const mockOnTypeChange = jest.fn();

      const { getByText } = render(
        <OrderTypeSelector
          side="BUY"
          onSideChange={mockOnSideChange}
          type="MARKET"
          onTypeChange={mockOnTypeChange}
        />
      );

      expect(getByText('MARKET')).toBeTruthy();
      expect(getByText('LIMIT')).toBeTruthy();
    });

    it('should render section labels', () => {
      const mockOnSideChange = jest.fn();
      const mockOnTypeChange = jest.fn();

      const { getByText } = render(
        <OrderTypeSelector
          side="BUY"
          onSideChange={mockOnSideChange}
          type="MARKET"
          onTypeChange={mockOnTypeChange}
        />
      );

      expect(getByText('Operación')).toBeTruthy();
      expect(getByText('Tipo de orden')).toBeTruthy();
    });
  });

  describe('Side Selection', () => {
    it('should call onSideChange with BUY when buy button is pressed', () => {
      const mockOnSideChange = jest.fn();
      const mockOnTypeChange = jest.fn();

      const { getByTestId } = render(
        <OrderTypeSelector
          side="SELL"
          onSideChange={mockOnSideChange}
          type="MARKET"
          onTypeChange={mockOnTypeChange}
        />
      );

      const buyButton = getByTestId('order-type-buy');
      fireEvent.press(buyButton);

      expect(mockOnSideChange).toHaveBeenCalledTimes(1);
      expect(mockOnSideChange).toHaveBeenCalledWith('BUY');
    });

    it('should call onSideChange with SELL when sell button is pressed', () => {
      const mockOnSideChange = jest.fn();
      const mockOnTypeChange = jest.fn();

      const { getByTestId } = render(
        <OrderTypeSelector
          side="BUY"
          onSideChange={mockOnSideChange}
          type="MARKET"
          onTypeChange={mockOnTypeChange}
        />
      );

      const sellButton = getByTestId('order-type-sell');
      fireEvent.press(sellButton);

      expect(mockOnSideChange).toHaveBeenCalledTimes(1);
      expect(mockOnSideChange).toHaveBeenCalledWith('SELL');
    });

    it('should allow multiple side changes', () => {
      const mockOnSideChange = jest.fn();
      const mockOnTypeChange = jest.fn();

      const { getByTestId } = render(
        <OrderTypeSelector
          side="BUY"
          onSideChange={mockOnSideChange}
          type="MARKET"
          onTypeChange={mockOnTypeChange}
        />
      );

      const buyButton = getByTestId('order-type-buy');
      const sellButton = getByTestId('order-type-sell');

      fireEvent.press(sellButton);
      fireEvent.press(buyButton);
      fireEvent.press(sellButton);

      expect(mockOnSideChange).toHaveBeenCalledTimes(3);
    });
  });

  describe('Type Selection', () => {
    it('should call onTypeChange with MARKET when market button is pressed', () => {
      const mockOnSideChange = jest.fn();
      const mockOnTypeChange = jest.fn();

      const { getByTestId } = render(
        <OrderTypeSelector
          side="BUY"
          onSideChange={mockOnSideChange}
          type="LIMIT"
          onTypeChange={mockOnTypeChange}
        />
      );

      const marketButton = getByTestId('order-type-market');
      fireEvent.press(marketButton);

      expect(mockOnTypeChange).toHaveBeenCalledTimes(1);
      expect(mockOnTypeChange).toHaveBeenCalledWith('MARKET');
    });

    it('should call onTypeChange with LIMIT when limit button is pressed', () => {
      const mockOnSideChange = jest.fn();
      const mockOnTypeChange = jest.fn();

      const { getByTestId } = render(
        <OrderTypeSelector
          side="BUY"
          onSideChange={mockOnSideChange}
          type="MARKET"
          onTypeChange={mockOnTypeChange}
        />
      );

      const limitButton = getByTestId('order-type-limit');
      fireEvent.press(limitButton);

      expect(mockOnTypeChange).toHaveBeenCalledTimes(1);
      expect(mockOnTypeChange).toHaveBeenCalledWith('LIMIT');
    });

    it('should allow multiple type changes', () => {
      const mockOnSideChange = jest.fn();
      const mockOnTypeChange = jest.fn();

      const { getByTestId } = render(
        <OrderTypeSelector
          side="BUY"
          onSideChange={mockOnSideChange}
          type="MARKET"
          onTypeChange={mockOnTypeChange}
        />
      );

      const marketButton = getByTestId('order-type-market');
      const limitButton = getByTestId('order-type-limit');

      fireEvent.press(limitButton);
      fireEvent.press(marketButton);
      fireEvent.press(limitButton);

      expect(mockOnTypeChange).toHaveBeenCalledTimes(3);
    });
  });

  describe('Component Props', () => {
    it('should render with BUY side selected', () => {
      const mockOnSideChange = jest.fn();
      const mockOnTypeChange = jest.fn();

      const { getByTestId } = render(
        <OrderTypeSelector
          side="BUY"
          onSideChange={mockOnSideChange}
          type="MARKET"
          onTypeChange={mockOnTypeChange}
        />
      );

      expect(getByTestId('order-type-buy')).toBeTruthy();
    });

    it('should render with SELL side selected', () => {
      const mockOnSideChange = jest.fn();
      const mockOnTypeChange = jest.fn();

      const { getByTestId } = render(
        <OrderTypeSelector
          side="SELL"
          onSideChange={mockOnSideChange}
          type="MARKET"
          onTypeChange={mockOnTypeChange}
        />
      );

      expect(getByTestId('order-type-sell')).toBeTruthy();
    });

    it('should render with MARKET type selected', () => {
      const mockOnSideChange = jest.fn();
      const mockOnTypeChange = jest.fn();

      const { getByTestId } = render(
        <OrderTypeSelector
          side="BUY"
          onSideChange={mockOnSideChange}
          type="MARKET"
          onTypeChange={mockOnTypeChange}
        />
      );

      expect(getByTestId('order-type-market')).toBeTruthy();
    });

    it('should render with LIMIT type selected', () => {
      const mockOnSideChange = jest.fn();
      const mockOnTypeChange = jest.fn();

      const { getByTestId } = render(
        <OrderTypeSelector
          side="BUY"
          onSideChange={mockOnSideChange}
          type="LIMIT"
          onTypeChange={mockOnTypeChange}
        />
      );

      expect(getByTestId('order-type-limit')).toBeTruthy();
    });
  });
});
