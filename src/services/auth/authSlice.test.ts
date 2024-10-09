import { thunk } from 'redux-thunk';
import reduceActionHistory from '../../helpers/reduceActionHistory';
import {
  authInitialState,
  authSlice,
  fetchUser,
  login,
  logout,
  refreshAccessToken,
  register,
  updateUser,
} from './authSlice';
import { AppDispatch, RootState } from '../store';
import fetchMock from 'fetch-mock';
import createMockStore from 'redux-mock-store';

const middlewares = [thunk];

const mockStore = createMockStore<RootState, AppDispatch>(middlewares as any);

const reducer = authSlice.reducer;

const testUser = {
  email: 'test@test.ru',
  name: 'testName',
};

describe('Auth reducer', () => {
  afterEach(() => {
    fetchMock.restore();
  });

  it('returns initial state', () => {
    const state = reducer(authInitialState, { type: 'default', payload: null });

    expect(state).toEqual(authInitialState);
  });

  it('handles register action', async () => {
    const res = {
      success: true,
    };

    fetchMock.post('path:/api/auth/register', {
      body: res,
      headers: { 'content-type': 'application/json' },
    });

    const expectedActions = [
      {
        type: register.pending.type,
      },
      {
        type: register.fulfilled.type,
        payload: res,
      },
    ];

    const store = mockStore();
    await store.dispatch(
      register({
        email: 'kek@test.ru',
        name: 'name',
        password: 'password',
      })
    );

    expect(reduceActionHistory(store.getActions())).toEqual(expectedActions);
  });

  it('returns state without error on register success', () => {
    expect(
      reducer(undefined, {
        type: register.fulfilled.type,
        payload: {
          user: testUser,
          accessToken: 'testAccessToken',
          refreshToken: 'testRefreshToken',
        },
      })
    ).toEqual({
      ...authInitialState,
      user: testUser,
    });
  });

  it('returns state with error on register failure', () => {
    expect(
      reducer(undefined, {
        type: register.rejected.type,
      })
    ).toEqual({
      ...authInitialState,
      error: true,
    });
  });

  it('handles login action', async () => {
    const res = {
      success: true,
    };

    fetchMock.post('path:/api/auth/login', {
      body: res,
      headers: { 'content-type': 'application/json' },
    });

    const expectedActions = [
      {
        type: login.pending.type,
      },
      {
        type: login.fulfilled.type,
        payload: res,
      },
    ];

    const store = mockStore();
    await store.dispatch(
      login({
        email: 'kek@test.ru',
        password: 'password',
      })
    );

    expect(reduceActionHistory(store.getActions())).toEqual(expectedActions);
  });

  it('returns state without error on login success', () => {
    expect(
      reducer(undefined, {
        type: login.fulfilled.type,
        payload: {
          user: testUser,
          accessToken: 'testAccessToken',
          refreshToken: 'testRefreshToken',
        },
      })
    ).toEqual({
      ...authInitialState,
      user: testUser,
    });
  });

  it('returns state with error on login failure', () => {
    expect(
      reducer(undefined, {
        type: login.rejected.type,
      })
    ).toEqual({
      ...authInitialState,
      error: true,
    });
  });

  it('handles logout action', async () => {
    const res = {
      success: true,
    };

    fetchMock.post('path:/api/auth/logout', {
      body: res,
      headers: { 'content-type': 'application/json' },
    });

    localStorage.setItem('refreshToken', 'test');

    const expectedActions = [
      {
        type: logout.pending.type,
      },
      {
        type: logout.fulfilled.type,
        payload: res,
      },
    ];

    const store = mockStore();
    await store.dispatch(logout());

    expect(reduceActionHistory(store.getActions())).toEqual(expectedActions);
  });

  it('returns state without error on logout success', () => {
    expect(
      reducer(
        {
          ...authInitialState,
          user: testUser,
        },
        {
          type: logout.fulfilled.type,
        }
      )
    ).toEqual({
      ...authInitialState,
    });
  });

  it('returns state with error on logout failure', () => {
    expect(
      reducer(
        {
          ...authInitialState,
          user: testUser,
        },
        {
          type: logout.rejected.type,
        }
      )
    ).toEqual({
      ...authInitialState,
      user: testUser,
      error: true,
    });
  });

  it('handles refreshAccessToken action', async () => {
    const res = {
      success: true,
    };

    fetchMock.post('path:/api/auth/token', {
      body: res,
      headers: { 'content-type': 'application/json' },
    });

    localStorage.setItem('refreshToken', 'test');

    const expectedActions = [
      {
        type: refreshAccessToken.pending.type,
      },
      {
        type: refreshAccessToken.fulfilled.type,
        payload: res,
      },
    ];

    const store = mockStore();
    await store.dispatch(refreshAccessToken());

    expect(reduceActionHistory(store.getActions())).toEqual(expectedActions);
  });

  it('returns state without error on refreshAccessToken success', () => {
    expect(
      reducer(undefined, {
        type: refreshAccessToken.fulfilled.type,
        payload: {
          accessToken: 'testAccessToken',
          refreshToken: 'testRefreshToken',
        },
      })
    ).toEqual({
      ...authInitialState,
    });
  });

  it('returns state with error on refreshAccessToken failure', () => {
    expect(
      reducer(undefined, {
        type: refreshAccessToken.rejected.type,
      })
    ).toEqual({
      ...authInitialState,
      error: true,
    });
  });

  it('handles fetchUser action', async () => {
    const res = {
      success: true,
    };

    fetchMock.get('path:/api/auth/user', {
      body: res,
      headers: { 'content-type': 'application/json' },
    });

    const expectedActions = [
      {
        type: fetchUser.pending.type,
      },
      {
        type: fetchUser.fulfilled.type,
        payload: res,
      },
    ];

    const store = mockStore();
    await store.dispatch(fetchUser());

    expect(reduceActionHistory(store.getActions())).toEqual(expectedActions);
  });

  it('returns state without error on fetchUser success', () => {
    expect(
      reducer(undefined, {
        type: fetchUser.fulfilled.type,
        payload: { user: testUser },
      })
    ).toEqual({
      ...authInitialState,
      user: testUser,
    });
  });

  it('returns state with error on fetchUser failure', () => {
    expect(
      reducer(undefined, {
        type: fetchUser.rejected.type,
      })
    ).toEqual({
      ...authInitialState,
      error: true,
    });
  });

  it('handles updateUser action', async () => {
    const res = {
      success: true,
    };

    fetchMock.patch('path:/api/auth/user', {
      body: res,
      headers: { 'content-type': 'application/json' },
    });

    const expectedActions = [
      {
        type: updateUser.pending.type,
      },
      {
        type: updateUser.fulfilled.type,
        payload: res,
      },
    ];

    const store = mockStore();
    await store.dispatch(
      updateUser({
        name: 'newName',
        email: 'newEmail',
        password: 'newPassword',
      })
    );

    expect(reduceActionHistory(store.getActions())).toEqual(expectedActions);
  });

  it('returns state without error on updateUser success', () => {
    const newUser = {
      name: 'newName',
      email: 'newEmail',
    };

    expect(
      reducer(
        {
          ...authInitialState,
          user: testUser,
        },
        {
          type: updateUser.fulfilled.type,
          payload: { user: newUser },
        }
      )
    ).toEqual({
      ...authInitialState,
      user: newUser,
    });
  });

  it('returns state with error on updateUser failure', () => {
    expect(
      reducer(
        {
          ...authInitialState,
          user: testUser,
        },
        {
          type: updateUser.rejected.type,
        }
      )
    ).toEqual({
      ...authInitialState,
      user: testUser,
      error: true,
    });
  });
});
