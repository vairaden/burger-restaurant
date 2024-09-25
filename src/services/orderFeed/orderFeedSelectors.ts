import { createSelector } from '@reduxjs/toolkit';
import { RootState } from '../store';

const orderFeedState = (store: RootState) => store.orderFeed;

export const orderFeedData = createSelector(orderFeedState, (store) => store.data);

export const orderFeedLoading = createSelector(orderFeedState, (store) => store.loading);

export const orderFeedConnected = createSelector(orderFeedState, (store) => store.wsConnected);
