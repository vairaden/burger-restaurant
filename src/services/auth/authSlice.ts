import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import {
  fetchUserRequest,
  FetchUserRequestRes,
  loginRequest,
  LoginRequestOpts,
  LoginRequestRes,
  logoutRequest,
  LogoutRequestRes,
  registerRequest,
  RegisterRequestOpts,
  RegisterRequestRes,
  updateUserRequest,
  UpdateUserRequestOpts,
  UpdateUserRequestRes,
} from '../../api/authApi';
import { RootState } from '../store';
import { User } from '../../types';
import {
  refreshTokenRequest,
  RefreshTokenRequestRes,
} from '../../api/authApi/refreshTokenRequest';

export const register = createAsyncThunk<
  RegisterRequestRes,
  RegisterRequestOpts
>('auth/register', registerRequest);

export const login = createAsyncThunk<LoginRequestRes, LoginRequestOpts>(
  'auth/login',
  loginRequest
);

export const logout = createAsyncThunk<
  LogoutRequestRes,
  undefined,
  { state: RootState }
>('auth/logout', async (_, thunkApi) => {
  const token = localStorage.getItem('refreshToken');
  if (!token) {
    return thunkApi.fulfillWithValue({
      success: true,
      message: 'Reset without refresh token',
    });
  }

  return await logoutRequest({ token });
});

export const refreshAccessToken = createAsyncThunk<RefreshTokenRequestRes>(
  'auth/refreshAccessToken',
  async (_, thunkApi) => {
    const token = localStorage.getItem('refreshToken');

    if (!token) {
      return thunkApi.rejectWithValue({ error: 'No refresh token' });
    }

    return await refreshTokenRequest({ token });
  }
);

export type TRefreshAccessToken = typeof refreshAccessToken;

export const fetchUser = createAsyncThunk<FetchUserRequestRes>(
  'auth/fetchUser',
  fetchUserRequest
);

export const updateUser = createAsyncThunk<
  UpdateUserRequestRes,
  UpdateUserRequestOpts
>('auth/updateUser', updateUserRequest);

export interface AuthState {
  user: null | User;
  loading: boolean;
  error: boolean;
}

export const authInitialState: AuthState = {
  user: null,
  loading: false,
  error: false,
};

export const authSlice = createSlice({
  name: 'auth',
  initialState: authInitialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(register.pending, (state) => {
        state.error = false;
        state.loading = true;
      })
      .addCase(register.fulfilled, (state, action) => {
        state.loading = false;

        state.user = action.payload.user;

        localStorage.setItem('accessToken', action.payload.accessToken);
        localStorage.setItem('refreshToken', action.payload.refreshToken);
      })
      .addCase(register.rejected, (state) => {
        state.loading = false;
        state.error = true;
      })
      .addCase(login.pending, (state) => {
        state.error = false;
        state.loading = true;
      })
      .addCase(login.fulfilled, (state, action) => {
        state.user = action.payload.user;

        localStorage.setItem('accessToken', action.payload.accessToken);
        localStorage.setItem('refreshToken', action.payload.refreshToken);

        state.loading = false;
      })
      .addCase(login.rejected, (state) => {
        state.error = true;

        state.loading = false;
      })
      .addCase(logout.pending, (state) => {
        state.error = false;

        state.loading = true;
      })
      .addCase(logout.fulfilled, () => {
        localStorage.removeItem('accessToken');
        localStorage.removeItem('refreshToken');
        return authInitialState;
      })
      .addCase(logout.rejected, (state) => {
        state.error = true;

        state.loading = false;
      })
      .addCase(refreshAccessToken.pending, (state) => {
        state.error = false;

        state.loading = true;
      })
      .addCase(refreshAccessToken.fulfilled, (state, action) => {
        localStorage.setItem('accessToken', action.payload.accessToken);
        localStorage.setItem('refreshToken', action.payload.refreshToken);

        state.loading = false;
      })
      .addCase(refreshAccessToken.rejected, () => {
        localStorage.removeItem('accessToken');
        localStorage.removeItem('refreshToken');
        return authInitialState;
      })
      .addCase(fetchUser.pending, (state) => {
        state.error = false;

        state.loading = true;
      })
      .addCase(fetchUser.fulfilled, (state, action) => {
        state.user = action.payload.user;

        state.loading = false;
      })
      .addCase(fetchUser.rejected, (state) => {
        state.error = true;

        state.loading = false;
      })
      .addCase(updateUser.pending, (state) => {
        state.error = false;

        state.loading = true;
      })
      .addCase(updateUser.fulfilled, (state, action) => {
        state.user = action.payload.user;

        state.loading = false;
      })
      .addCase(updateUser.rejected, (state) => {
        state.error = true;

        state.loading = false;
      });
  },
});
