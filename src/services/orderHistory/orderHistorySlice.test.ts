import fetchMock from 'fetch-mock';
import reduceActionHistory from '../../helpers/reduceActionHistory';
import {
  orderHistoryInitialState,
  orderHistorySlice,
} from './orderHistorySlice';
import createMockStore from 'redux-mock-store';
import { AppDispatch, RootState } from '../store';
import { thunk } from 'redux-thunk';

const middlewares = [thunk];

const mockStore = createMockStore<RootState, AppDispatch>(
  middlewares as any
);

const reducer = orderHistorySlice.reducer;

describe('Order history reducer', () => {
  afterEach(() => {
    fetchMock.restore();
  })

  it('returns initial state', () => {
    const state = reducer(orderHistoryInitialState, {
      type: 'default',
      payload: null,
    });

    expect(state).toEqual(orderHistoryInitialState);
  });

  // it('handles resetPassword', async () => {
  //   const res = {
  //     success: true,
  //   };

  //   fetchMock.post('path:/api/password-reset/reset', {
  //     body: res,
  //     headers: { 'content-type': 'application/json' },
  //   });

  //   const expectedActions = [
  //     // {
  //     //   type: resetPassword.pending.type,
  //     // },
  //     // {
  //     //   type: resetPassword.fulfilled.type,
  //     //   payload: res,
  //     // },
  //   ];

  //   const store = mockStore();
  //   await store.dispatch(
  //     // resetPassword({
  //     //   password: 'password',
  //     //   token: 'token',
  //     // })
  //   );

  //   expect(reduceActionHistory(store.getActions())).toEqual(expectedActions);
  // });
});
