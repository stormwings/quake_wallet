import { FetchNewsParams } from '../api/news.api';

/**
 * Centralized query key factory
 * Pattern: [resource, action, ...params]
 *
 * Benefits:
 * - Type-safe query keys
 * - Consistent naming across the app
 * - Easy to invalidate related queries
 * - Single source of truth for cache keys
 */

export const queryKeys = {
  // Instruments
  instruments: {
    all: ['instruments'] as const,
    lists: () => [...queryKeys.instruments.all, 'list'] as const,
    list: () => [...queryKeys.instruments.lists()] as const,
    search: (query: string) => [...queryKeys.instruments.all, 'search', query] as const,
  },

  // Portfolio
  portfolio: {
    all: ['portfolio'] as const,
    positions: () => [...queryKeys.portfolio.all, 'positions'] as const,
  },

  // News
  news: {
    all: ['news'] as const,
    articles: (params?: FetchNewsParams) =>
      params
        ? ([...queryKeys.news.all, 'articles', params] as const)
        : ([...queryKeys.news.all, 'articles'] as const),
  },

  // Orders - no query keys needed (mutations only, no data list to cache)
} as const;
