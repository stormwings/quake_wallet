import { useQuery, UseQueryOptions } from '@tanstack/react-query';
import { newsApi, FetchNewsParams } from '../api/news.api';
import { NewsArticle } from '@/src/types';
import { AppError, toAppError } from '@/src/errors';
import { queryKeys } from './queryKeys';

/**
 * Hook to fetch financial news from Marketaux API
 * Replaces: fetchNews thunk from newsSlice
 *
 * @param params - Optional parameters (symbols, countries, limit, language)
 * @param options - Optional React Query options to override defaults
 * @returns Query result with news articles, loading state, and error
 *
 * @example
 * const { data: articles, isLoading, error, refetch } = useNewsQuery();
 * // or with custom params:
 * const { data: articles } = useNewsQuery({ symbols: 'AAPL,GOOGL', limit: 20 });
 */
export function useNewsQuery(
  params?: FetchNewsParams,
  options?: Omit<UseQueryOptions<NewsArticle[], AppError>, 'queryKey' | 'queryFn'>
) {
  return useQuery<NewsArticle[], AppError>({
    queryKey: queryKeys.news.articles(params),
    queryFn: async () => {
      try {
        const response = await newsApi.fetchNews(params);
        return response.data;
      } catch (err) {
        throw toAppError(err, {
          layer: 'react-query',
          feature: 'news',
          action: 'fetch',
        });
      }
    },
    // News changes frequently but API has rate limits
    staleTime: 1000 * 60 * 10, // 10 minutes
    gcTime: 1000 * 60 * 30, // 30 minutes cache
    ...options,
  });
}
