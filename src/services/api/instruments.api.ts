import { apiClient } from './client';
import { API_ENDPOINTS } from '../../constants';
import { Instrument } from '../../types';

export const instrumentsApi = {
  getAll: async (): Promise<Instrument[]> => {
    const response = await apiClient.get<Instrument[]>(API_ENDPOINTS.INSTRUMENTS);
    return response.data;
  },

  search: async (query: string): Promise<Instrument[]> => {
    const response = await apiClient.get<Instrument[]>(API_ENDPOINTS.SEARCH, {
      params: { query },
    });
    return response.data;
  },
};
