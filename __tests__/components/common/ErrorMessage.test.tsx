import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react-native';
import { ErrorMessage } from '@/src/components/common/ErrorMessage';

describe('ErrorMessage', () => {
  describe('Rendering', () => {
    it('should render error message text correctly', () => {
      const errorText = 'Something went wrong';
      const { getByText } = render(<ErrorMessage message={errorText} />);

      expect(getByText(errorText)).toBeTruthy();
    });

    it('should render different error messages', () => {
      const { getByText, rerender } = render(<ErrorMessage message="First error" />);
      expect(getByText('First error')).toBeTruthy();

      rerender(<ErrorMessage message="Second error" />);
      expect(getByText('Second error')).toBeTruthy();
    });

    it('should render component without errors', () => {
      const { container } = render(<ErrorMessage message="Error occurred" />);
      expect(container).toBeTruthy();
    });
  });

  describe('Retry Button', () => {
    it('should render retry button when onRetry is provided', () => {
      const mockOnRetry = jest.fn();
      const { getByText } = render(<ErrorMessage message="Error" onRetry={mockOnRetry} />);

      expect(getByText('Retry')).toBeTruthy();
    });

    it('should not render retry button when onRetry is not provided', () => {
      const { queryByText } = render(<ErrorMessage message="Error" />);

      expect(queryByText('Retry')).toBeNull();
    });

    it('should call onRetry when retry button is pressed', () => {
      const mockOnRetry = jest.fn();
      const { getByText } = render(<ErrorMessage message="Error" onRetry={mockOnRetry} />);

      const retryButton = getByText('Retry');
      fireEvent.press(retryButton);

      expect(mockOnRetry).toHaveBeenCalledTimes(1);
    });

    it('should call onRetry multiple times when button is pressed multiple times', () => {
      const mockOnRetry = jest.fn();
      const { getByText } = render(<ErrorMessage message="Error" onRetry={mockOnRetry} />);

      const retryButton = getByText('Retry');
      fireEvent.press(retryButton);
      fireEvent.press(retryButton);
      fireEvent.press(retryButton);

      expect(mockOnRetry).toHaveBeenCalledTimes(3);
    });

    it('should not call onRetry when component renders without onRetry prop', () => {
      const { queryByText } = render(<ErrorMessage message="Error" />);

      expect(queryByText('Retry')).toBeNull();
    });
  });

  describe('Edge Cases', () => {
    it('should handle empty error message', () => {
      const { container } = render(<ErrorMessage message="" />);

      expect(container).toBeTruthy();
    });

    it('should handle very long error messages', () => {
      const longMessage = 'This is a very long error message that should still render correctly and be properly displayed to the user without breaking the layout or causing any rendering issues.';
      const { container } = render(<ErrorMessage message={longMessage} />);

      expect(container).toBeTruthy();
      expect(container.findByProps({ children: longMessage })).toBeTruthy();
    });
  });

  describe('Component Props', () => {
    it('should accept message prop', () => {
      const testMessage = 'Test error message';
      const { getByText } = render(<ErrorMessage message={testMessage} />);

      expect(getByText(testMessage)).toBeTruthy();
    });

    it('should accept optional onRetry prop', () => {
      const mockOnRetry = jest.fn();
      const { getByText } = render(
        <ErrorMessage message="Error" onRetry={mockOnRetry} />
      );

      expect(getByText('Retry')).toBeTruthy();
    });

    it('should work without onRetry prop', () => {
      const { getByText, queryByText } = render(<ErrorMessage message="Error" />);

      expect(getByText('Error')).toBeTruthy();
      expect(queryByText('Retry')).toBeNull();
    });
  });
});
