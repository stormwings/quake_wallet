import { apiClient } from './client';
import { API_ENDPOINTS } from '../../constants';
import { OrderRequest, OrderResponse } from '../../types';

export const ordersApi = {
  create: async (order: OrderRequest): Promise<OrderResponse> => {
    const response = await apiClient.post<OrderResponse>(API_ENDPOINTS.ORDERS, order);
    return response.data;
  },
};
