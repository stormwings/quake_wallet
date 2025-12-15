import axios from 'axios';
import { API_BASE_URL } from '../../constants';
import { reportError, toAppError } from '../../errors';

export const apiClient = axios.create({
  baseURL: API_BASE_URL,
  timeout: 10000,
  headers: {
    'Content-Type': 'application/json',
  },
});

// Response interceptor for error handling
apiClient.interceptors.response.use(
  (response) => response,
  (error) => {
    const appErr = toAppError(error, {
      layer: 'api',
      source: 'axiosInterceptor',
    });
    reportError(appErr);
    return Promise.reject(appErr);
  }
);
