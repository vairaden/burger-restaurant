import { passwordInitialState, passwordSlice } from './passwordSlice';

const reducer = passwordSlice.reducer;

describe('Password reducer', () => {
  it('returns initial state', () => {
    const state = reducer(passwordInitialState, {
      type: 'default',
      payload: null,
    });

    expect(state).toEqual(passwordInitialState);
  });
});
