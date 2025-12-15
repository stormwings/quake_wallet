import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { Position } from '../../types';
import { portfolioApi } from '../../services';
import { AppError, reportError, toAppError } from '../../errors';

interface PortfolioState {
  data: Position[] | null;
  loading: boolean;
  error: AppError | null;
}

const initialState: PortfolioState = {
  data: null,
  loading: false,
  error: null,
};

// Async thunk for fetching portfolio
export const fetchPortfolio = createAsyncThunk<
  Position[],
  void,
  { rejectValue: AppError }
>('portfolio/fetchAll', async (_, { rejectWithValue }) => {
  try {
    const response = await portfolioApi.getAll();
    return response;
  } catch (err) {
    const appErr = toAppError(err, {
      layer: 'redux',
      feature: 'portfolio',
      action: 'fetchPortfolio',
    });
    reportError(appErr);
    return rejectWithValue(appErr);
  }
});

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
        state.error =
          action.payload ??
          toAppError(action.error, { layer: 'redux', feature: 'portfolio' });
      });
  },
});

export const { clearError } = portfolioSlice.actions;
export default portfolioSlice.reducer;
