import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { Position, SliceState } from '../../types';
import { portfolioApi } from '../../services';

const initialState: SliceState<Position[]> = {
  data: null,
  loading: false,
  error: null,
};

// Async thunk for fetching portfolio
export const fetchPortfolio = createAsyncThunk(
  'portfolio/fetchAll',
  async () => {
    const response = await portfolioApi.getAll();
    return response;
  }
);

const portfolioSlice = createSlice({
  name: 'portfolio',
  initialState,
  reducers: {
    clearError: (state) => {
      state.error = null;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchPortfolio.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchPortfolio.fulfilled, (state, action) => {
        state.loading = false;
        state.data = action.payload;
      })
      .addCase(fetchPortfolio.rejected, (state, action) => {
        state.loading = false;
        // TODO: centralize errors
        state.error = action.error.message || 'Failed to fetch portfolio';
      });
  },
});

export const { clearError } = portfolioSlice.actions;
export default portfolioSlice.reducer;
