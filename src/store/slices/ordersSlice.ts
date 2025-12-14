import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { OrderRequest, OrderResponse } from '../../types';
import { ordersApi } from '../../services';

interface OrdersState {
  loading: boolean;
  error: string | null;
  response: OrderResponse | null;
}

const initialState: OrdersState = {
  loading: false,
  error: null,
  response: null,
};

// Async thunk for creating an order
export const createOrder = createAsyncThunk(
  'orders/create',
  async (orderData: OrderRequest) => {
    const response = await ordersApi.create(orderData);
    return response;
  }
);

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
        state.error = action.error.message || 'Failed to create order';
      });
  },
});

export const { clearError, clearResponse } = ordersSlice.actions;
export default ordersSlice.reducer;
