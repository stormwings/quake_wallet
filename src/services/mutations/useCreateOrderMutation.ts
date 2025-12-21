import { useMutation, UseMutationOptions, useQueryClient } from '@tanstack/react-query';
import { ordersApi } from '../api/orders.api';
import { OrderRequest, OrderResponse } from '@/src/types';
import { AppError, toAppError } from '@/src/errors';
import { queryKeys } from '../queries/queryKeys';

/**
 * Hook to create buy/sell orders
 * Replaces: createOrder thunk from ordersSlice
 *
 * @param options - Optional React Query mutation options
 * @returns Mutation result with mutate function, loading state, response, and error
 *
 * @example
 * const { mutate: createOrder, isPending, error, data: response, reset } = useCreateOrderMutation();
 *
 * // Submit order
 * createOrder({ instrument_id: 1, side: 'BUY', type: 'MARKET', quantity: 10 });
 *
 * // Clear mutation state (e.g., when closing modal)
 * reset();
 *
 * Features:
 * - Automatically invalidates portfolio query on success
 * - Error handling via AppError system
 * - Transient state (no persistent order list)
 */
export function useCreateOrderMutation(
  options?: Omit<
    UseMutationOptions<OrderResponse, AppError, OrderRequest>,
    'mutationFn'
  >
) {
  const queryClient = useQueryClient();

  return useMutation<OrderResponse, AppError, OrderRequest>({
    mutationFn: async (orderData: OrderRequest) => {
      try {
        return await ordersApi.create(orderData);
      } catch (err) {
        throw toAppError(err, {
          layer: 'react-query',
          feature: 'orders',
          action: 'create',
        });
      }
    },
    onSuccess: (data, variables, context) => {
      // Invalidate portfolio to refetch updated positions
      queryClient.invalidateQueries({
        queryKey: queryKeys.portfolio.positions(),
      });

      // Call user-provided onSuccess if exists
      options?.onSuccess?.(data, variables, context);
    },
    ...options,
  });
}
