import { configureStore } from '@reduxjs/toolkit';
import userReducer from '../redux/userSlice';

export const store = configureStore({
  reducer: {
    user: userReducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: false,
    }),
});

export type RootState = ReturnType<typeof store.getState>;

export type Dispatch = typeof store.dispatch;
