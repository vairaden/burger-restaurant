import fetchMock from 'fetch-mock';
import reduceActionHistory from '../../helpers/reduceActionHistory';
import {
  burgerConstructorInitialState,
  burgerConstructorSlice,
} from './burgerConstructorSlice';
import { thunk } from 'redux-thunk';
import createMockStore from 'redux-mock-store';
import { AppDispatch, RootState } from '../store';

const middlewares = [thunk];

const mockStore = createMockStore<RootState, AppDispatch>(middlewares as any);

const reducer = burgerConstructorSlice.reducer;

describe('Burger constructor reducer', () => {
  afterEach(() => {
    fetchMock.restore();
  });

  it('returns initial state', () => {
    const state = reducer(burgerConstructorInitialState, {
      type: 'default',
      payload: null,
    });

    expect(state).toEqual(burgerConstructorInitialState);
  });

  // it('handles addIngredient action', async () => {
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
  //   await store
  //     .dispatch
  //     // resetPassword({
  //     //   password: 'password',
  //     //   token: 'token',
  //     // })
  //     ();

  //   expect(reduceActionHistory(store.getActions())).toEqual(expectedActions);
  // });

  // it('handles deleteIngredient action', async () => {
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
  //   await store
  //     .dispatch
  //     // resetPassword({
  //     //   password: 'password',
  //     //   token: 'token',
  //     // })
  //     ();

  //   expect(reduceActionHistory(store.getActions())).toEqual(expectedActions);
  // });

  // it('handles moveIngredient action', async () => {
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
  //   await store
  //     .dispatch
  //     // resetPassword({
  //     //   password: 'password',
  //     //   token: 'token',
  //     // })
  //     ();

  //   expect(reduceActionHistory(store.getActions())).toEqual(expectedActions);
  // });

  // it('handles clearConstructor action', async () => {
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
  //   await store
  //     .dispatch
  //     // resetPassword({
  //     //   password: 'password',
  //     //   token: 'token',
  //     // })
  //     ();

  //   expect(reduceActionHistory(store.getActions())).toEqual(expectedActions);
  // });

  // it('handles moveIngredientToBottom action', async () => {
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
  //   await store
  //     .dispatch
  //     // resetPassword({
  //     //   password: 'password',
  //     //   token: 'token',
  //     // })
  //     ();

  //   expect(reduceActionHistory(store.getActions())).toEqual(expectedActions);
  // });
});
