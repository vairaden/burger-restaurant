import {
  orderHistoryInitialState,
  orderHistorySlice,
} from './orderHistorySlice';

const reducer = orderHistorySlice.reducer;

describe('Order history reducer', () => {
  it('returns initial state', () => {
    const state = reducer(orderHistoryInitialState, {
      type: 'default',
      payload: null,
    });

    expect(state).toEqual(orderHistoryInitialState);
  });
});
