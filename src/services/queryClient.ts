import { QueryClient } from '@tanstack/react-query';
import { reportError, toAppError } from '../errors';

/**
 * React Query client configuration
 * Handles caching, retry logic, and refetch behavior for all queries
 */
export const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      // Caching strategy
      staleTime: 1000 * 60 * 5, // 5 minutes - data considered fresh
      gcTime: 1000 * 60 * 30, // 30 minutes - cache garbage collection (was cacheTime in v4)

      // Retry configuration
      retry: (failureCount, error) => {
        const appError = toAppError(error);
        // Don't retry on client errors (4xx)
        if (appError.status && appError.status >= 400 && appError.status < 500) {
          return false;
        }
        // Retry up to 2 times for server errors
        return failureCount < 2;
      },
      retryDelay: (attemptIndex) => Math.min(1000 * 2 ** attemptIndex, 30000),

      // Refetch configuration
      refetchOnWindowFocus: false, // Mobile app - no window focus concept
      refetchOnReconnect: true, // Refetch when network reconnects
      refetchOnMount: true, // Refetch when component mounts
    },
    mutations: {
      // Global mutation error handler
      onError: (error) => {
        const appError = toAppError(error, {
          layer: 'react-query',
          source: 'mutation',
        });
        reportError(appError);
      },
      // Retry once for mutations (for idempotent operations)
      retry: 1,
    },
  },
});
