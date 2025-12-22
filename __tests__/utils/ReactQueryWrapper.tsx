import React from 'react';
import { QueryClientProvider } from '@tanstack/react-query';
import { createTestQueryClient } from './testQueryClient';

interface ReactQueryWrapperProps {
  children: React.ReactNode;
}

/**
 * Test wrapper component that provides React Query context
 * Use this to wrap components in tests that use React Query hooks
 *
 * @example
 * const { getByText } = render(
 *   <ReactQueryWrapper>
 *     <MyComponent />
 *   </ReactQueryWrapper>
 * );
 */
export function ReactQueryWrapper({ children }: ReactQueryWrapperProps): JSX.Element {
  const testQueryClient = createTestQueryClient();

  return (
    <QueryClientProvider client={testQueryClient}>
      {children}
    </QueryClientProvider>
  );
}
