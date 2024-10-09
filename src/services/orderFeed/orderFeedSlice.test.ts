import { orderFeedInitialState, orderFeedSlice } from './orderFeedSlice';
import orderFeedActions from './orderFeedActions';

const reducer = orderFeedSlice.reducer;

describe('Order feed reducer', () => {
  it('returns initial state', () => {
    const state = reducer(orderFeedInitialState, {
      type: 'default',
      payload: null,
    });

    expect(state).toEqual(orderFeedInitialState);
  });

  it('handles wsConnectionStart', () => {
    expect(reducer(undefined, orderFeedActions.wsConnectionStart())).toEqual({
      ...orderFeedInitialState,
      loading: true,
    });
  });

  it('handles wsConnectionSuccess', () => {
    expect(reducer(undefined, orderFeedActions.wsConnectionSuccess())).toEqual({
      ...orderFeedInitialState,
      wsConnected: true,
    });
  });

  it('handles wsConnectionError', () => {
    expect(
      reducer(undefined, orderFeedActions.wsConnectionError('test'))
    ).toEqual({
      ...orderFeedInitialState,
      error: 'test',
    });
  });

  it('handles wsConnectionClosed', () => {
    expect(reducer(undefined, orderFeedActions.wsConnectionClosed())).toEqual({
      ...orderFeedInitialState,
    });
  });

  it('handles wsGetMessage', () => {
    expect(
      reducer(
        undefined,
        orderFeedActions.wsGetMessage({
          success: true,
          orders: [],
          total: 123,
          totalToday: 123,
        })
      )
    ).toEqual({
      ...orderFeedInitialState,
      data: {
        success: true,
        orders: [],
        total: 123,
        totalToday: 123,
      },
    });
  });
});
