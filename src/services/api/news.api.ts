import axios from 'axios';
import { NewsResponse } from '../../types';

const MARKETAUX_BASE_URL = 'https://api.marketaux.com/v1';
const API_TOKEN = 'hTeQdWh7JGLSihMW9wJc6USKTpVn4E70x76g7an3';

export interface FetchNewsParams {
  symbols?: string;
  countries?: string;
  limit?: number;
  language?: string;
}

export const newsApi = {
  /**
   * Fetch financial news from Marketaux API
   */
  fetchNews: async (params: FetchNewsParams = {}): Promise<NewsResponse> => {
    const {
      symbols = 'SPY,QQQ,AAPL,MSFT,NVDA',
      countries = 'us',
      limit = 10,
      language = 'en',
    } = params;

    const queryParams = new URLSearchParams({
      api_token: API_TOKEN,
      symbols,
      countries,
      filter_entities: 'true',
      limit: limit.toString(),
      language,
    });

    const response = await axios.get<NewsResponse>(
      `${MARKETAUX_BASE_URL}/news/all?${queryParams.toString()}`
    );

    return response.data;
  },
};
