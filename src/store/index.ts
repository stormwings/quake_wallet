import { configureStore } from '@reduxjs/toolkit';
import { instrumentsReducer } from './slices';

export const store = configureStore({
  reducer: {
    instruments: instrumentsReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

export * from './hooks';
