import { QueryClient } from '@tanstack/react-query';

/**
 * Creates a QueryClient optimized for testing
 * - Disables retries to make tests faster and more predictable
 * - Sets infinite cache time to prevent garbage collection during tests
 * - Suppresses error logs to keep test output clean
 */
export function createTestQueryClient(): QueryClient {
  return new QueryClient({
    defaultOptions: {
      queries: {
        retry: false, // Don't retry failed queries in tests
        gcTime: Infinity, // Don't garbage collect cache
      },
      mutations: {
        retry: false, // Don't retry failed mutations in tests
      },
    },
    logger: {
      log: console.log,
      warn: console.warn,
      error: () => {}, // Suppress error logs in tests
    },
  });
}
