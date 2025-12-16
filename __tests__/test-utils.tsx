import React, { ReactElement } from 'react';
import { render, RenderOptions } from '@testing-library/react-native';
import { LocaleProvider } from '@/src/i18n';

interface AllTheProvidersProps {
  children: React.ReactNode;
}

const AllTheProviders = ({ children }: AllTheProvidersProps) => {
  return <LocaleProvider>{children}</LocaleProvider>;
};

const customRender = (
  ui: ReactElement,
  options?: Omit<RenderOptions, 'wrapper'>
) => render(ui, { wrapper: AllTheProviders, ...options });

export * from '@testing-library/react-native';
export { customRender as render };
