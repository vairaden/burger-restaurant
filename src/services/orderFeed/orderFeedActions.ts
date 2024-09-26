import { createAction } from '@reduxjs/toolkit';
import orderFeedSlice from './orderFeedSlice';

const wsConnect = createAction<string>('orderFeed/connect');
const wsDisconnect = createAction('orderFeed/disconnect');

const orderFeedActions = {
  ...orderFeedSlice.actions,
  wsConnect,
  wsDisconnect,
};

export default orderFeedActions;
