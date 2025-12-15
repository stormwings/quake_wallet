import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { Instrument } from '../../types';
import { instrumentsApi } from '../../services';
import { AppError, reportError, toAppError } from '../../errors';

interface InstrumentsState {
  data: Instrument[] | null;
  loading: boolean;
  error: AppError | null;
}

const initialState: InstrumentsState = {
  data: null,
  loading: false,
  error: null,
};

// Async thunk for fetching instruments
export const fetchInstruments = createAsyncThunk<
  Instrument[],
  void,
  { rejectValue: AppError }
>('instruments/fetchAll', async (_, { rejectWithValue }) => {
  try {
    const response = await instrumentsApi.getAll();
    return response;
  } catch (err) {
    const appErr = toAppError(err, {
      layer: 'redux',
      feature: 'instruments',
      action: 'fetchInstruments',
    });
    reportError(appErr);
    return rejectWithValue(appErr);
  }
});

const instrumentsSlice = createSlice({
  name: 'instruments',
  initialState,
  reducers: {
    clearError: (state) => {
      state.error = null;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchInstruments.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchInstruments.fulfilled, (state, action) => {
        state.loading = false;
        state.data = action.payload;
      })
      .addCase(fetchInstruments.rejected, (state, action) => {
        state.loading = false;
        state.error =
          action.payload ??
          toAppError(action.error, { layer: 'redux', feature: 'instruments' });
      });
  },
});

export const { clearError } = instrumentsSlice.actions;
export default instrumentsSlice.reducer;
