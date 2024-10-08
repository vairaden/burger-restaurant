import { thunk } from 'redux-thunk';
import reduceActionHistory from '../../helpers/reduceActionHistory';
import { authInitialState, authSlice } from './authSlice';
import { AppDispatch, RootState } from '../store';
import fetchMock from 'fetch-mock';
import createMockStore from 'redux-mock-store';

const middlewares = [thunk];

const mockStore = createMockStore<RootState, AppDispatch>(middlewares as any);

const reducer = authSlice.reducer;

describe('Auth reducer', () => {
  afterEach(() => {
    fetchMock.restore();
  });

  it('returns initial state', () => {
    const state = reducer(authInitialState, { type: 'default', payload: null });

    expect(state).toEqual(authInitialState);
  });

  // it('handles register action', async () => {
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

  // it('handles register action error', async () => {
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

  // it('handles login action', async () => {
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

  // it('handles login action error', async () => {
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

  // it('handles refreshAccessToken action', async () => {
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

  // it('handles refreshAccessToken action error', async () => {
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

  // it('handles fetchUser action', async () => {
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

  // it('handles fetchUser action error', async () => {
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

  // it('handles updateUser action', async () => {
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

  // it('handles updateUser action error', async () => {
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
