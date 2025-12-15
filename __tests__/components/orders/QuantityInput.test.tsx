import React from 'react';
import { render, fireEvent } from '@testing-library/react-native';
import { QuantityInput } from '@/src/components/orders/QuantityInput';

describe('QuantityInput', () => {
  const mockOnQuantityChange = jest.fn();

  beforeEach(() => {
    mockOnQuantityChange.mockClear();
  });

  describe('Rendering', () => {
    it('should render quantity input by default', () => {
      const { getByTestId, getByText } = render(
        <QuantityInput
          quantity={0}
          onQuantityChange={mockOnQuantityChange}
          price={100}
        />
      );

      expect(getByText('Cantidad')).toBeTruthy();
      expect(getByTestId('order-quantity-input')).toBeTruthy();
    });

    it('should render toggle button', () => {
      const { getByTestId, getByText } = render(
        <QuantityInput
          quantity={0}
          onQuantityChange={mockOnQuantityChange}
          price={100}
        />
      );

      expect(getByTestId('order-input-toggle')).toBeTruthy();
      expect(getByText('Ingresar por monto')).toBeTruthy();
    });

    it('should display initial quantity value', () => {
      const { getByDisplayValue } = render(
        <QuantityInput
          quantity={50}
          onQuantityChange={mockOnQuantityChange}
          price={100}
        />
      );

      expect(getByDisplayValue('50')).toBeTruthy();
    });

    it('should display empty input when quantity is 0', () => {
      const { getByTestId } = render(
        <QuantityInput
          quantity={0}
          onQuantityChange={mockOnQuantityChange}
          price={100}
        />
      );

      const input = getByTestId('order-quantity-input');
      expect(input.props.value).toBe('');
    });
  });

  describe('Quantity Input Mode', () => {
    it('should call onQuantityChange when quantity is entered', () => {
      const { getByTestId } = render(
        <QuantityInput
          quantity={0}
          onQuantityChange={mockOnQuantityChange}
          price={100}
        />
      );

      const input = getByTestId('order-quantity-input');
      fireEvent.changeText(input, '25');

      expect(mockOnQuantityChange).toHaveBeenCalledTimes(1);
      expect(mockOnQuantityChange).toHaveBeenCalledWith(25);
    });

    it('should call onQuantityChange with 0 when input is cleared', () => {
      const { getByTestId } = render(
        <QuantityInput
          quantity={50}
          onQuantityChange={mockOnQuantityChange}
          price={100}
        />
      );

      const input = getByTestId('order-quantity-input');
      fireEvent.changeText(input, '');

      expect(mockOnQuantityChange).toHaveBeenCalledWith(0);
    });

    it('should not call onQuantityChange when invalid text is entered', () => {
      const { getByTestId } = render(
        <QuantityInput
          quantity={0}
          onQuantityChange={mockOnQuantityChange}
          price={100}
        />
      );

      const input = getByTestId('order-quantity-input');
      fireEvent.changeText(input, 'abc');

      expect(mockOnQuantityChange).not.toHaveBeenCalled();
    });

    it('should handle multiple quantity changes', () => {
      const { getByTestId } = render(
        <QuantityInput
          quantity={0}
          onQuantityChange={mockOnQuantityChange}
          price={100}
        />
      );

      const input = getByTestId('order-quantity-input');
      fireEvent.changeText(input, '10');
      fireEvent.changeText(input, '20');
      fireEvent.changeText(input, '30');

      expect(mockOnQuantityChange).toHaveBeenCalledTimes(3);
      expect(mockOnQuantityChange).toHaveBeenNthCalledWith(1, 10);
      expect(mockOnQuantityChange).toHaveBeenNthCalledWith(2, 20);
      expect(mockOnQuantityChange).toHaveBeenNthCalledWith(3, 30);
    });
  });

  describe('Amount Input Mode', () => {
    it('should switch to amount mode when toggle is pressed', () => {
      const { getByTestId, getByText } = render(
        <QuantityInput
          quantity={0}
          onQuantityChange={mockOnQuantityChange}
          price={100}
        />
      );

      const toggleButton = getByTestId('order-input-toggle');
      fireEvent.press(toggleButton);

      expect(getByText('Monto total')).toBeTruthy();
      expect(getByText('Ingresar por cantidad')).toBeTruthy();
      expect(getByTestId('order-amount-input')).toBeTruthy();
    });

    it('should calculate quantity from amount', () => {
      const { getByTestId } = render(
        <QuantityInput
          quantity={0}
          onQuantityChange={mockOnQuantityChange}
          price={100}
        />
      );

      const toggleButton = getByTestId('order-input-toggle');
      fireEvent.press(toggleButton);

      mockOnQuantityChange.mockClear();

      const amountInput = getByTestId('order-amount-input');
      fireEvent.changeText(amountInput, '1000');

      expect(mockOnQuantityChange).toHaveBeenCalledWith(10);
    });

    it('should floor the calculated quantity', () => {
      const { getByTestId } = render(
        <QuantityInput
          quantity={0}
          onQuantityChange={mockOnQuantityChange}
          price={100}
        />
      );

      const toggleButton = getByTestId('order-input-toggle');
      fireEvent.press(toggleButton);

      mockOnQuantityChange.mockClear();

      const amountInput = getByTestId('order-amount-input');
      fireEvent.changeText(amountInput, '1550');

      expect(mockOnQuantityChange).toHaveBeenCalledWith(15);
    });

    it('should show calculated quantity information when quantity is greater than 0', () => {
      const { getByTestId, getByText, rerender } = render(
        <QuantityInput
          quantity={0}
          onQuantityChange={mockOnQuantityChange}
          price={100}
        />
      );

      const toggleButton = getByTestId('order-input-toggle');
      fireEvent.press(toggleButton);

      mockOnQuantityChange.mockClear();

      const amountInput = getByTestId('order-amount-input');
      fireEvent.changeText(amountInput, '500');

      rerender(
        <QuantityInput
          quantity={5}
          onQuantityChange={mockOnQuantityChange}
          price={100}
        />
      );

      expect(getByTestId('order-quantity-calculated')).toBeTruthy();
      expect(getByText(/5 acciones/)).toBeTruthy();
    });

    it('should call onQuantityChange with 0 when amount is cleared', () => {
      const { getByTestId } = render(
        <QuantityInput
          quantity={10}
          onQuantityChange={mockOnQuantityChange}
          price={100}
        />
      );

      const toggleButton = getByTestId('order-input-toggle');
      fireEvent.press(toggleButton);

      mockOnQuantityChange.mockClear();

      const amountInput = getByTestId('order-amount-input');
      fireEvent.changeText(amountInput, '');

      expect(mockOnQuantityChange).toHaveBeenCalledWith(0);
    });
  });

  describe('Mode Toggle', () => {
    it('should switch between quantity and amount modes', () => {
      const { getByTestId, getByText } = render(
        <QuantityInput
          quantity={0}
          onQuantityChange={mockOnQuantityChange}
          price={100}
        />
      );

      const toggleButton = getByTestId('order-input-toggle');

      expect(getByText('Cantidad')).toBeTruthy();

      fireEvent.press(toggleButton);
      expect(getByText('Monto total')).toBeTruthy();

      fireEvent.press(toggleButton);
      expect(getByText('Cantidad')).toBeTruthy();
    });

    it('should preserve quantity value when switching modes', () => {
      const { getByTestId } = render(
        <QuantityInput
          quantity={10}
          onQuantityChange={mockOnQuantityChange}
          price={100}
        />
      );

      const toggleButton = getByTestId('order-input-toggle');
      fireEvent.press(toggleButton);

      const amountInput = getByTestId('order-amount-input');
      expect(amountInput.props.value).toBe('1000');

      fireEvent.press(toggleButton);

      const quantityInput = getByTestId('order-quantity-input');
      expect(quantityInput.props.value).toBe('10');
    });
  });

  describe('Component Props', () => {
    it('should accept quantity prop', () => {
      const { getByDisplayValue } = render(
        <QuantityInput
          quantity={100}
          onQuantityChange={mockOnQuantityChange}
          price={50}
        />
      );

      expect(getByDisplayValue('100')).toBeTruthy();
    });

    it('should accept price prop', () => {
      const { getByTestId } = render(
        <QuantityInput
          quantity={10}
          onQuantityChange={mockOnQuantityChange}
          price={250.5}
        />
      );

      const toggleButton = getByTestId('order-input-toggle');
      fireEvent.press(toggleButton);

      mockOnQuantityChange.mockClear();

      const amountInput = getByTestId('order-amount-input');
      fireEvent.changeText(amountInput, '501');

      expect(mockOnQuantityChange).toHaveBeenCalledWith(2);
    });

    it('should accept onQuantityChange prop', () => {
      const customCallback = jest.fn();
      const { getByTestId } = render(
        <QuantityInput
          quantity={0}
          onQuantityChange={customCallback}
          price={100}
        />
      );

      const input = getByTestId('order-quantity-input');
      fireEvent.changeText(input, '15');

      expect(customCallback).toHaveBeenCalledWith(15);
    });
  });
});
