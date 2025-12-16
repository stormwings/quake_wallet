import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { NewsArticle } from '../../types';
import { newsApi, FetchNewsParams } from '../../services';
import { toAppError, AppError } from '../../errors';

interface NewsState {
  data: NewsArticle[] | null;
  loading: boolean;
  error: AppError | null;
}

const initialState: NewsState = {
  data: null,
  loading: false,
  error: null,
};

export const fetchNews = createAsyncThunk(
  'news/fetchNews',
  async (params: FetchNewsParams | undefined, { rejectWithValue }) => {
    try {
      const response = await newsApi.fetchNews(params);
      return response.data;
    } catch (err) {
      const appErr = toAppError(err, {
        layer: 'api',
        source: 'newsApi.fetchNews',
        action: 'fetch',
      });
      return rejectWithValue(appErr);
    }
  }
);

const newsSlice = createSlice({
  name: 'news',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchNews.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchNews.fulfilled, (state, action) => {
        state.loading = false;
        state.data = action.payload;
        state.error = null;
      })
      .addCase(fetchNews.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as AppError;
      });
  },
});

export default newsSlice.reducer;
