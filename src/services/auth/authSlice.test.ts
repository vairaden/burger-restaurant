import { authInitialState, authSlice } from './authSlice';

const reducer = authSlice.reducer;

describe('Auth reducer', () => {
  it('returns initial state', () => {
    const state = reducer(authInitialState, { type: 'default', payload: null });

    expect(state).toEqual(authInitialState);
  });
});
