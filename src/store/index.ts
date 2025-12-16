import { configureStore } from '@reduxjs/toolkit';
import { instrumentsReducer, portfolioReducer, ordersReducer, newsReducer } from './slices';

export const store = configureStore({
  reducer: {
    instruments: instrumentsReducer,
    portfolio: portfolioReducer,
    orders: ordersReducer,
    news: newsReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

export * from './hooks';
