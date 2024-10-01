import { ordersInitialState, ordersSlice } from './ordersSlice';

const reducer = ordersSlice.reducer;

describe('Orders reducer', () => {
  it('returns initial state', () => {
    const state = reducer(ordersInitialState, {
      type: 'default',
      payload: null,
    });

    expect(state).toEqual(ordersInitialState);
  });
});
