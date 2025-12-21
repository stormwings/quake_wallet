import { useQuery } from '@tanstack/react-query';
import { instrumentsApi } from '../api/instruments.api';
import { Instrument } from '@/src/types';
import { AppError, toAppError } from '@/src/errors';
import { queryKeys } from './queryKeys';

/**
 * Hook to search instruments by ticker
 * Replaces: SearchScreen's manual API call pattern
 *
 * @param query - Search query (ticker symbol)
 * @returns Query result with search results, loading state, and error
 *
 * @example
 * const [query, setQuery] = useState('');
 * const debouncedQuery = useDebounce(query, 300);
 * const { data: results = [], isLoading } = useInstrumentSearch(debouncedQuery);
 *
 * Note: Query is automatically disabled when search query is empty
 */
export function useInstrumentSearch(query: string) {
  return useQuery<Instrument[], AppError>({
    queryKey: queryKeys.instruments.search(query),
    queryFn: async () => {
      try {
        return await instrumentsApi.search(query);
      } catch (err) {
        throw toAppError(err, {
          layer: 'react-query',
          feature: 'instruments',
          action: 'search',
        });
      }
    },
    // Only fetch if query has content
    enabled: query.trim().length > 0,
    // Search results can be cached briefly
    staleTime: 1000 * 60 * 2, // 2 minutes
  });
}
