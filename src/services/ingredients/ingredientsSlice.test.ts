import { ingredientsSlice, ingredientsInitialState } from './ingredientsSlice';
const reducer = ingredientsSlice.reducer;

describe('Ingredients reducer', () => {
  it('returns initial state', () => {
    const state = reducer(ingredientsInitialState, {
      type: 'default',
      payload: null,
    });

    expect(state).toEqual(ingredientsInitialState);
  });
});
