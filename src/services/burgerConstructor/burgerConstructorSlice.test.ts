import {
  burgerConstructorInitialState,
  burgerConstructorSlice,
} from './burgerConstructorSlice';

const reducer = burgerConstructorSlice.reducer;

describe('Burger constructor reducer', () => {
  it('returns initial state', () => {
    const state = reducer(burgerConstructorInitialState, {
      type: 'default',
      payload: null,
    });

    expect(state).toEqual(burgerConstructorInitialState);
  });
});
