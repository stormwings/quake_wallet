import { useQuery, UseQueryOptions } from '@tanstack/react-query';
import { portfolioApi } from '../api/portfolio.api';
import { Position } from '@/src/types';
import { AppError, toAppError } from '@/src/errors';
import { queryKeys } from './queryKeys';

/**
 * Hook to fetch user's portfolio positions
 * Replaces: fetchPortfolio thunk from portfolioSlice
 *
 * @param options - Optional React Query options to override defaults
 * @returns Query result with portfolio positions, loading state, and error
 *
 * @example
 * const { data: positions, isLoading, error, refetch } = usePortfolioQuery();
 *
 * Note: This query is automatically invalidated after successful order creation
 * via useCreateOrderMutation's onSuccess callback
 */
export function usePortfolioQuery(
  options?: Omit<UseQueryOptions<Position[], AppError>, 'queryKey' | 'queryFn'>
) {
  return useQuery<Position[], AppError>({
    queryKey: queryKeys.portfolio.positions(),
    queryFn: async () => {
      try {
        return await portfolioApi.getAll();
      } catch (err) {
        throw toAppError(err, {
          layer: 'react-query',
          feature: 'portfolio',
          action: 'fetchAll',
        });
      }
    },
    // Portfolio data is critical - keep it relatively fresh
    staleTime: 1000 * 60 * 2, // 2 minutes
    ...options,
  });
}
