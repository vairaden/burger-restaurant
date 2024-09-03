import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import {
  resetPasswordRequest,
  ResetPasswordRequestOpts,
  ResetPasswordRequestRes,
  sendResetEmailRequest,
  SendResetEmailRequestOpts,
  SendResetEmailRequestRes,
} from '../../api/authApi';

export const resetPassword = createAsyncThunk<
  ResetPasswordRequestRes,
  ResetPasswordRequestOpts
>('password/resetPassword', async (opts) => {
  return await resetPasswordRequest(opts);
});

export const sendResetEmail = createAsyncThunk<
  SendResetEmailRequestRes,
  SendResetEmailRequestOpts
>('password/sendResetEmail', async (opts) => {
  return await sendResetEmailRequest(opts);
});

export interface PasswordState {
  emailCodeSent: boolean;
  loading: boolean;
  error: boolean;
}

const initialState: PasswordState = {
  emailCodeSent: false,
  loading: false,
  error: false,
};

export const passwordSlice = createSlice({
  name: 'password',
  initialState,
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
      });
  },
});

export const {} = passwordSlice.actions;

export default passwordSlice.reducer;
