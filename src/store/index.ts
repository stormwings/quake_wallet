import { configureStore } from '@reduxjs/toolkit';
import { instrumentsReducer, portfolioReducer, ordersReducer } from './slices';

export const store = configureStore({
  reducer: {
    instruments: instrumentsReducer,
    portfolio: portfolioReducer,
    orders: ordersReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

export * from './hooks';
