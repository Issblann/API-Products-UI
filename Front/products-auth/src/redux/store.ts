import {
  ThunkDispatch,
  combineReducers,
  configureStore,
} from '@reduxjs/toolkit';
import userReducer from '../redux/userSlice';
import productsSlice from '../redux/productsSlice';
import { persistReducer, persistStore } from 'redux-persist';
import storage from 'redux-persist/lib/storage';

const rootReducer = combineReducers({
  user: userReducer,
  products: productsSlice,
});

const persistConfig = { key: 'root', version: 1, storage };

const persistedReducer = persistReducer(persistConfig, rootReducer);
export const store = configureStore({
  reducer: persistedReducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: false,
    }),
});

export type RootState = ReturnType<typeof store.getState>;

export type Dispatch = typeof store.dispatch;

export const persistor = persistStore(store);

export type AppThunkDispatch = ThunkDispatch<RootState, any, any>;
