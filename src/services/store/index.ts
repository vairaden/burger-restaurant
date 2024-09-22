import { configureStore } from '@reduxjs/toolkit';
import { useDispatch, useSelector } from 'react-redux';
import ingredientsSlice from './slices/ingredientsSlice';
import constructorSlice from './slices/constructorSlice';
import ordersSlice from './slices/ordersSlice';
import authSlice from './slices/authSlice';
import passwordSlice from './slices/passwordSlice';
import websocketSlice from './slices/websocketSlice';
import { socketMiddleware } from './middleware/websocketMiddleware';

export const store = configureStore({
  reducer: {
    ingredientsSlice,
    constructorSlice,
    ordersSlice,
    authSlice,
    passwordSlice,
    websocketSlice,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(
      socketMiddleware('wss://norma.nomoreparties.space/orders/all')
    ),
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

export const useAppDispatch = useDispatch.withTypes<AppDispatch>();
export const useAppSelector = useSelector.withTypes<RootState>();
