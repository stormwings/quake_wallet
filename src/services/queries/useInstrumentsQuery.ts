import { useQuery, UseQueryOptions } from '@tanstack/react-query';
import { instrumentsApi } from '../api/instruments.api';
import { Instrument } from '@/src/types';
import { AppError, toAppError } from '@/src/errors';
import { queryKeys } from './queryKeys';

/**
 * Hook to fetch all available instruments
 * Replaces: fetchInstruments thunk from instrumentsSlice
 *
 * @param options - Optional React Query options to override defaults
 * @returns Query result with instruments data, loading state, and error
 *
 * @example
 * const { data: instruments, isLoading, error, refetch } = useInstrumentsQuery();
 */
export function useInstrumentsQuery(
  options?: Omit<UseQueryOptions<Instrument[], AppError>, 'queryKey' | 'queryFn'>
) {
  return useQuery<Instrument[], AppError>({
    queryKey: queryKeys.instruments.list(),
    queryFn: async () => {
      try {
        return await instrumentsApi.getAll();
      } catch (err) {
        throw toAppError(err, {
          layer: 'react-query',
          feature: 'instruments',
          action: 'fetchAll',
        });
      }
    },
    ...options,
  });
}
