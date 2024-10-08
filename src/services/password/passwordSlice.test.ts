import { thunk } from 'redux-thunk';
import {
  passwordInitialState,
  passwordSlice,
  resetPassword,
} from './passwordSlice';
import { AppDispatch, RootState } from '../store';
import fetchMock from 'fetch-mock';
import reduceActionHistory from '../../helpers/reduceActionHistory';
import createMockStore from 'redux-mock-store';

const middlewares = [thunk];

const mockStore = createMockStore<RootState, AppDispatch>(
  middlewares as any
);

const reducer = passwordSlice.reducer;

describe('Password reducer', () => {
  afterEach(() => {
    fetchMock.restore();
  })

  it('returns initial state', () => {
    const state = reducer(passwordInitialState, {
      type: 'default',
      payload: null,
    });

    expect(state).toEqual(passwordInitialState);
  });

  it('handles resetPassword', async () => {
    const res = {
      success: true,
    };

    fetchMock.post('path:/api/password-reset/reset', {
      body: res,
      headers: { 'content-type': 'application/json' },
    });

    const expectedActions = [
      {
        type: resetPassword.pending.type,
      },
      {
        type: resetPassword.fulfilled.type,
        payload: res,
      },
    ];

    const store = mockStore();
    await store.dispatch(
      resetPassword({
        password: 'password',
        token: 'token',
      })
    );

    expect(reduceActionHistory(store.getActions())).toEqual(expectedActions);
  });
});
