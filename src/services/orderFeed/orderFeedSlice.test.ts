import fetchMock from 'fetch-mock';
import { orderFeedInitialState, orderFeedSlice } from './orderFeedSlice';
import createMockStore from 'redux-mock-store';
import { AppDispatch, RootState } from '../store';
import { thunk } from 'redux-thunk';
import reduceActionHistory from '../../helpers/reduceActionHistory';

const middlewares = [thunk];

const mockStore = createMockStore<RootState, AppDispatch>(
  middlewares as any
);

const reducer = orderFeedSlice.reducer;

describe('Order feed reducer', () => {
  afterEach(() => {
    fetchMock.restore();
  })

  it('returns initial state', () => {
    const state = reducer(orderFeedInitialState, {
      type: 'default',
      payload: null,
    });

    expect(state).toEqual(orderFeedInitialState);
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
