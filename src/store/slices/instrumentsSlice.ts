import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { Instrument, SliceState } from '../../types';
import { instrumentsApi } from '../../services';

interface InstrumentsState extends SliceState<Instrument[]> {}

const initialState: InstrumentsState = {
  data: null,
  loading: false,
  error: null,
};

// Async thunk for fetching instruments
export const fetchInstruments = createAsyncThunk(
  'instruments/fetchAll',
  async () => {
    const response = await instrumentsApi.getAll();
    return response;
  }
);

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
        state.error = action.error.message || 'Failed to fetch instruments';
      });
  },
});

export const { clearError } = instrumentsSlice.actions;
export default instrumentsSlice.reducer;
