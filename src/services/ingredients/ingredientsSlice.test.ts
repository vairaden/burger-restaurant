import fetchMock from 'fetch-mock';
import reduceActionHistory from '../../helpers/reduceActionHistory';
import {
  ingredientsSlice,
  ingredientsInitialState,
  fetchIngredientsList,
  increaseIngredientNumber,
  decreaseIngredientNumber,
  setSelectedIngredient,
  clearIngredients,
} from './ingredientsSlice';
import { thunk } from 'redux-thunk';
import createMockStore from 'redux-mock-store';
import { AppDispatch, RootState } from '../store';

const middlewares = [thunk];

const mockStore = createMockStore<RootState, AppDispatch>(middlewares as any);

const reducer = ingredientsSlice.reducer;

const testIngredient = {
  _id: 'testId',
  name: 'testName',
  type: 'testType',
  proteins: 1,
  fat: 2,
  carbohydrates: 3,
  calories: 4,
  price: 5,
  image: 'testImage',
  image_mobile: 'testImageMobile',
  image_large: 'testImageLarge',
  __v: 6,
};

describe('Ingredients reducer', () => {
  afterEach(() => {
    fetchMock.restore();
  });

  it('returns initial state', () => {
    const state = reducer(ingredientsInitialState, {
      type: 'default',
      payload: null,
    });

    expect(state).toEqual(ingredientsInitialState);
  });

  it('handles fetchIngredientsList action', async () => {
    const res = {
      success: true,
      data: [testIngredient],
    };

    fetchMock.get('path:/api/ingredients', {
      body: res,
      headers: { 'content-type': 'application/json' },
    });

    const expectedActions = [
      {
        type: fetchIngredientsList.pending.type,
      },
      {
        type: fetchIngredientsList.fulfilled.type,
        payload: [testIngredient],
      },
    ];

    const store = mockStore();
    await store.dispatch(fetchIngredientsList());

    expect(reduceActionHistory(store.getActions())).toEqual(expectedActions);
  });

  it('handles increaseIngredientNumber', () => {
    expect(
      reducer(
        {
          ...ingredientsInitialState,
          ingredients: {
            [testIngredient._id]: {
              ...testIngredient,
              numberInConstructor: 0,
            },
          },
        },
        increaseIngredientNumber({ item: testIngredient })
      )
    ).toEqual({
      ...ingredientsInitialState,
      ingredients: {
        [testIngredient._id]: {
          ...testIngredient,
          numberInConstructor: 1,
        },
      },
    });
  });

  it('sets selected bun', () => {
    const testBun = { ...testIngredient, type: 'bun' };

    expect(
      reducer(
        {
          ...ingredientsInitialState,
          ingredients: {
            [testBun._id]: {
              ...testBun,
              numberInConstructor: 0,
            },
          },
        },
        increaseIngredientNumber({ item: testBun })
      )
    ).toEqual({
      ...ingredientsInitialState,
      ingredients: {
        [testBun._id]: {
          ...testBun,
          numberInConstructor: 2,
        },
      },
      selectedBunId: testBun._id,
    });
  });

  it('handles decreaseIngredientNumber', () => {
    expect(
      reducer(
        {
          ...ingredientsInitialState,
          ingredients: {
            [testIngredient._id]: {
              ...testIngredient,
              numberInConstructor: 1,
            },
          },
        },
        decreaseIngredientNumber({ item: testIngredient })
      )
    ).toEqual({
      ...ingredientsInitialState,
      ingredients: {
        [testIngredient._id]: {
          ...testIngredient,
          numberInConstructor: 0,
        },
      },
    });
  });

  it('handles setSelectedIngredient', () => {
    expect(
      reducer(undefined, setSelectedIngredient({ item: testIngredient }))
    ).toEqual({
      ...ingredientsInitialState,
      selectedIngredient: testIngredient,
    });
  });

  it('handles clearIngredients', () => {
    expect(
      reducer(
        {
          ...ingredientsInitialState,
          ingredients: {
            [testIngredient._id]: {
              ...testIngredient,
              numberInConstructor: 3,
            },
          },
        },
        clearIngredients()
      )
    ).toEqual({
      ...ingredientsInitialState,
      ingredients: {
        [testIngredient._id]: {
          ...testIngredient,
          numberInConstructor: 0,
        },
      },
    });
  });
});
