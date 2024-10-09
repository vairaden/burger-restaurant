import {
  orderHistoryInitialState,
  orderHistorySlice,
} from './orderHistorySlice';
import orderHistoryActions from './orderHistoryActions';

const reducer = orderHistorySlice.reducer;

describe('Order history reducer', () => {
  it('returns initial state', () => {
    const state = reducer(orderHistoryInitialState, {
      type: 'default',
      payload: null,
    });

    expect(state).toEqual(orderHistoryInitialState);
  });

  it('handles wsConnectionStart', () => {
    expect(reducer(undefined, orderHistoryActions.wsConnectionStart())).toEqual(
      {
        ...orderHistoryInitialState,
        loading: true,
      }
    );
  });

  it('handles wsConnectionSuccess', () => {
    expect(
      reducer(undefined, orderHistoryActions.wsConnectionSuccess())
    ).toEqual({
      ...orderHistoryInitialState,
      wsConnected: true,
    });
  });

  it('handles wsConnectionError', () => {
    expect(
      reducer(undefined, orderHistoryActions.wsConnectionError('test'))
    ).toEqual({
      ...orderHistoryInitialState,
      error: 'test',
    });
  });

  it('handles wsConnectionClosed', () => {
    expect(
      reducer(undefined, orderHistoryActions.wsConnectionClosed())
    ).toEqual({
      ...orderHistoryInitialState,
    });
  });

  it('handles wsGetMessage', () => {
    expect(
      reducer(
        undefined,
        orderHistoryActions.wsGetMessage({
          success: true,
          orders: [],
          total: 123,
          totalToday: 123,
        })
      )
    ).toEqual({
      ...orderHistoryInitialState,
      data: {
        success: true,
        orders: [],
        total: 123,
        totalToday: 123,
      },
    });
  });
});
