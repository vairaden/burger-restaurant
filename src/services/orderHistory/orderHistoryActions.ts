import { createAction } from '@reduxjs/toolkit';
import { orderHistorySlice } from './orderHistorySlice';

const wsConnect = createAction<string>('orderHistory/connect');
const wsDisconnect = createAction('orderHistory/disconnect');

const orderHistoryActions = {
  ...orderHistorySlice.actions,
  wsConnect,
  wsDisconnect,
};

export default orderHistoryActions;
