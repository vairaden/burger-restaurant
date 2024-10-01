import { orderFeedInitialState, orderFeedSlice } from './orderFeedSlice';

const reducer = orderFeedSlice.reducer;

describe('Order feed reducer', () => {
  it('returns initial state', () => {
    const state = reducer(orderFeedInitialState, {
      type: 'default',
      payload: null,
    });

    expect(state).toEqual(orderFeedInitialState);
  });
});
