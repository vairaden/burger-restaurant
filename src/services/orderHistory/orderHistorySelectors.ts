import { createSelector } from '@reduxjs/toolkit';
import { RootState } from '../store';

const orderHistoryState = (store: RootState) => store.orderHistory;

export const orderHistoryData = createSelector(orderHistoryState, (store) => store.data);

export const orderHistoryLoading = createSelector(orderHistoryState, (store) => store.loading);

export const orderHistoryConnected = createSelector(orderHistoryState, (store) => store.wsConnected);
