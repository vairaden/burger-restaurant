import { configureStore } from '@reduxjs/toolkit';
import { useDispatch, useSelector } from 'react-redux';
import ingredientsSlice from './ingredientsSlice';
import constructorSlice from './constructorSlice';
import ordersSlice from './ordersSlice';

export const store = configureStore({
  reducer: {
    ingredientsSlice,
    constructorSlice,
    ordersSlice,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

export const useAppDispatch = useDispatch.withTypes<AppDispatch>();
export const useAppSelector = useSelector.withTypes<RootState>();
