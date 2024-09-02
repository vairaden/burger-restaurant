import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import {
  loginRequest,
  LoginRequestOpts,
  LoginRequestRes,
  logoutRequest,
  LogoutRequestOpts,
  LogoutRequestRes,
  refreshTokenRequest,
  RefreshTokenRequestOpts,
  RefreshTokenRequestRes,
  registerRequest,
  RegisterRequestOpts,
  RegisterRequestRes,
} from '../../api/authApi';

export const register = createAsyncThunk<
  RegisterRequestRes,
  RegisterRequestOpts
>('auth/register', async (opts) => {
  return registerRequest(opts);
});

export const login = createAsyncThunk<LoginRequestRes, LoginRequestOpts>(
  'auth/login',
  async (opts) => {
    return loginRequest(opts);
  }
);

export const logout = createAsyncThunk<LogoutRequestRes, LogoutRequestOpts>(
  'auth/logout',
  async (opts) => {
    return logoutRequest(opts);
  }
);

export const refreshAccessToken = createAsyncThunk<
  RefreshTokenRequestRes,
  RefreshTokenRequestOpts
>('auth/refreshAccessToken', async (opts) => {
  return refreshTokenRequest(opts);
});

export interface AuthState {
  accessToken: string;
  user: null | {
    email: string;
    name: string;
  };
  loading: boolean;
  error: boolean;
}

const initialState: AuthState = {
  accessToken: '',
  user: null,
  loading: false,
  error: false,
};

export const authSlice = createSlice({
  name: 'auth',
  initialState,
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
        state.accessToken = action.payload.accessToken;

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
        state.loading = false;

        state.user = action.payload.user;
        state.accessToken = action.payload.accessToken;

        localStorage.setItem('refreshToken', action.payload.refreshToken);
      })
      .addCase(login.rejected, (state) => {
        state.loading = false;
        state.error = true;
      })
      .addCase(logout.pending, (state) => {
        state.error = false;
        state.loading = true;
      })
      .addCase(logout.fulfilled, (state) => {
        state.loading = false;

        state = initialState;
        localStorage.removeItem('refreshToken');
      })
      .addCase(logout.rejected, (state) => {
        state.loading = false;
        state.error = true;
      })
      .addCase(refreshAccessToken.pending, (state) => {
        state.error = false;
        state.loading = true;
      })
      .addCase(refreshAccessToken.fulfilled, (state, action) => {
        state.loading = false;

        state.accessToken = action.payload.accessToken;

        localStorage.setItem('refreshToken', action.payload.refreshToken);
      })
      .addCase(refreshAccessToken.rejected, (state) => {
        state.loading = false;
        state.error = true;
      });
  },
});

export const {} = authSlice.actions;

export default authSlice.reducer;
