import fetchMock from 'fetch-mock';
import reduceActionHistory from '../../helpers/reduceActionHistory';
import { ingredientsSlice, ingredientsInitialState } from './ingredientsSlice';
import { thunk } from 'redux-thunk';
import createMockStore from 'redux-mock-store';
import { AppDispatch, RootState } from '../store';

const middlewares = [thunk];

const mockStore = createMockStore<RootState, AppDispatch>(
  middlewares as any
);

const reducer = ingredientsSlice.reducer;

describe('Ingredients reducer', () => {
  afterEach(() => {
    fetchMock.restore();
  })

  it('returns initial state', () => {
    const state = reducer(ingredientsInitialState, {
      type: 'default',
      payload: null,
    });

    expect(state).toEqual(ingredientsInitialState);
  });

  // it('handles fetchIngredientsList action', async () => {
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

  // it('handles fetchIngredientsList action error', async () => {
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
