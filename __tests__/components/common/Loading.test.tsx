import React from 'react';
import { render, screen } from '@testing-library/react-native';
import { ActivityIndicator } from 'react-native';
import { Loading } from '@/src/components/common/Loading';

describe('Loading', () => {
  describe('Rendering', () => {
    it('should render loading indicator', () => {
      render(<Loading />);

      expect(screen.getByTestId('loading-indicator')).toBeTruthy();
    });

    it('should render ActivityIndicator component', () => {
      render(<Loading />);

      const container = screen.getByTestId('loading-indicator');
      const activityIndicator = container.findByType(ActivityIndicator);

      expect(activityIndicator).toBeTruthy();
    });

    it('should render with testID for accessibility', () => {
      render(<Loading />);

      expect(screen.getByTestId('loading-indicator')).toBeTruthy();
    });
  });

  describe('Default Props', () => {
    it('should use large size by default', () => {
      const { UNSAFE_getByType } = render(<Loading />);

      const activityIndicator = UNSAFE_getByType(ActivityIndicator);
      expect(activityIndicator.props.size).toBe('large');
    });

    it('should use purple color (#6D28D9) by default', () => {
      const { UNSAFE_getByType } = render(<Loading />);

      const activityIndicator = UNSAFE_getByType(ActivityIndicator);
      expect(activityIndicator.props.color).toBe('#6D28D9');
    });
  });

  describe('Custom Size Prop', () => {
    it('should render with small size when specified', () => {
      const { UNSAFE_getByType } = render(<Loading size="small" />);

      const activityIndicator = UNSAFE_getByType(ActivityIndicator);
      expect(activityIndicator.props.size).toBe('small');
    });

    it('should render with large size when specified', () => {
      const { UNSAFE_getByType } = render(<Loading size="large" />);

      const activityIndicator = UNSAFE_getByType(ActivityIndicator);
      expect(activityIndicator.props.size).toBe('large');
    });
  });

  describe('Custom Color Prop', () => {
    it('should render with custom color when specified', () => {
      const customColor = '#FF0000';
      const { UNSAFE_getByType } = render(<Loading color={customColor} />);

      const activityIndicator = UNSAFE_getByType(ActivityIndicator);
      expect(activityIndicator.props.color).toBe(customColor);
    });

    it('should render with different custom colors', () => {
      const colors = ['#000000', '#FFFFFF', '#00FF00', '#0000FF'];

      colors.forEach((color) => {
        const { UNSAFE_getByType } = render(<Loading color={color} />);
        const activityIndicator = UNSAFE_getByType(ActivityIndicator);
        expect(activityIndicator.props.color).toBe(color);
      });
    });
  });

  describe('Combined Props', () => {
    it('should render with custom size and color together', () => {
      const { UNSAFE_getByType } = render(
        <Loading size="small" color="#FF5733" />
      );

      const activityIndicator = UNSAFE_getByType(ActivityIndicator);
      expect(activityIndicator.props.size).toBe('small');
      expect(activityIndicator.props.color).toBe('#FF5733');
    });

    it('should override default values when both props are provided', () => {
      const { UNSAFE_getByType } = render(
        <Loading size="small" color="#000000" />
      );

      const activityIndicator = UNSAFE_getByType(ActivityIndicator);
      expect(activityIndicator.props.size).toBe('small');
      expect(activityIndicator.props.color).toBe('#000000');
      expect(activityIndicator.props.size).not.toBe('large');
      expect(activityIndicator.props.color).not.toBe('#6D28D9');
    });
  });

  describe('Component Re-rendering', () => {
    it('should update when size prop changes', () => {
      const { UNSAFE_getByType, rerender } = render(<Loading size="small" />);

      let activityIndicator = UNSAFE_getByType(ActivityIndicator);
      expect(activityIndicator.props.size).toBe('small');

      rerender(<Loading size="large" />);
      activityIndicator = UNSAFE_getByType(ActivityIndicator);
      expect(activityIndicator.props.size).toBe('large');
    });

    it('should update when color prop changes', () => {
      const { UNSAFE_getByType, rerender } = render(
        <Loading color="#FF0000" />
      );

      let activityIndicator = UNSAFE_getByType(ActivityIndicator);
      expect(activityIndicator.props.color).toBe('#FF0000');

      rerender(<Loading color="#00FF00" />);
      activityIndicator = UNSAFE_getByType(ActivityIndicator);
      expect(activityIndicator.props.color).toBe('#00FF00');
    });
  });

  describe('Component Structure', () => {
    it('should render container view with ActivityIndicator inside', () => {
      const { UNSAFE_getByType } = render(<Loading />);

      const container = screen.getByTestId('loading-indicator');
      const activityIndicator = UNSAFE_getByType(ActivityIndicator);

      expect(container).toBeTruthy();
      expect(activityIndicator).toBeTruthy();
    });
  });
});
