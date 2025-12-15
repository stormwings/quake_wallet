import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { OrderRequest, OrderResponse } from '../../types';
import { ordersApi } from '../../services';
import { AppError, reportError, toAppError } from '../../errors';

interface OrdersState {
  loading: boolean;
  error: AppError | null;
  response: OrderResponse | null;
}

const initialState: OrdersState = {
  loading: false,
  error: null,
  response: null,
};

// Async thunk for creating an order
export const createOrder = createAsyncThunk<
  OrderResponse,
  OrderRequest,
  { rejectValue: AppError }
>('orders/create', async (orderData, { rejectWithValue }) => {
  try {
    const response = await ordersApi.create(orderData);
    return response;
  } catch (err) {
    const appErr = toAppError(err, {
      layer: 'redux',
      feature: 'orders',
      action: 'createOrder',
    });
    reportError(appErr);
    return rejectWithValue(appErr);
  }
});

const ordersSlice = createSlice({
  name: 'orders',
  initialState,
  reducers: {
    clearError: (state) => {
      state.error = null;
    },
    clearResponse: (state) => {
      state.response = null;
      state.error = null;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(createOrder.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(createOrder.fulfilled, (state, action) => {
        state.loading = false;
        state.response = action.payload;
      })
      .addCase(createOrder.rejected, (state, action) => {
        state.loading = false;
        state.error =
          action.payload ??
          toAppError(action.error, { layer: 'redux', feature: 'orders' });
      });
  },
});

export const { clearError, clearResponse } = ordersSlice.actions;
export default ordersSlice.reducer;
