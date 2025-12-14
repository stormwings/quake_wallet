import { apiClient } from './client';
import { API_ENDPOINTS } from '../../constants';
import { Position } from '../../types';

export const portfolioApi = {
  getAll: async (): Promise<Position[]> => {
    const response = await apiClient.get<Position[]>(API_ENDPOINTS.PORTFOLIO);
    return response.data;
  },
};
