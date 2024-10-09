import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import {
  ResetPasswordRequestRes,
  ResetPasswordRequestOpts,
  resetPasswordRequest,
  SendResetEmailRequestRes,
  SendResetEmailRequestOpts,
  sendResetEmailRequest,
} from '../../api/authApi';

export const resetPassword = createAsyncThunk<
  ResetPasswordRequestRes,
  ResetPasswordRequestOpts
>('password/resetPassword', resetPasswordRequest);

export const sendResetEmail = createAsyncThunk<
  SendResetEmailRequestRes,
  SendResetEmailRequestOpts
>('password/sendResetEmail', sendResetEmailRequest);

export interface PasswordState {
  emailCodeSent: boolean;
  loading: boolean;
  error: boolean;
}

export const passwordInitialState: PasswordState = {
  emailCodeSent: false,
  loading: false,
  error: false,
};

export const passwordSlice = createSlice({
  name: 'password',
  initialState: passwordInitialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(resetPassword.pending, (state) => {
        state.error = false;
        state.loading = true;
      })
      .addCase(resetPassword.fulfilled, (state) => {
        state.loading = false;
      })
      .addCase(resetPassword.rejected, (state) => {
        state.loading = false;
        state.error = true;
      })
      .addCase(sendResetEmail.pending, (state) => {
        state.error = false;
        state.emailCodeSent = true;
        state.loading = true;
      })
      .addCase(sendResetEmail.fulfilled, (state) => {
        state.loading = false;
      })
      .addCase(sendResetEmail.rejected, (state) => {
        state.loading = false;
        state.error = true;
      });
  },
});
