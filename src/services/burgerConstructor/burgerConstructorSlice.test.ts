import {
  addIngredient,
  burgerConstructorInitialState,
  burgerConstructorSlice,
  clearConstructor,
  deleteIngredient,
  moveIngredient,
  moveIngredientToBottom,
} from './burgerConstructorSlice';
import { v4 as uuid } from 'uuid';

jest.mock('uuid');

const mockUuid = uuid as jest.Mock;

const reducer = burgerConstructorSlice.reducer;

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

describe('Burger constructor reducer', () => {
  afterEach(() => {
    mockUuid.mockReset();
  });

  it('returns initial state', () => {
    const state = reducer(burgerConstructorInitialState, {
      type: 'default',
      payload: null,
    });

    expect(state).toEqual(burgerConstructorInitialState);
  });

  it('handles addIngredient', () => {
    mockUuid.mockReturnValue('123');

    expect(reducer(undefined, addIngredient({ item: testIngredient }))).toEqual(
      {
        ...burgerConstructorInitialState,
        ingredientsInBurger: [{ ...testIngredient, constructorId: '123' }],
      }
    );
  });

  it('add bun', () => {
    const testBun = { ...testIngredient, type: 'bun' };
    mockUuid.mockReturnValue('123');

    expect(reducer(undefined, addIngredient({ item: testBun }))).toEqual({
      ...burgerConstructorInitialState,
      bun: { ...testBun, constructorId: '123' },
    });
  });

  it('handles deleteIngredient', () => {
    expect(
      reducer(
        {
          ...burgerConstructorInitialState,
          ingredientsInBurger: [
            { ...testIngredient, constructorId: '1' },
            { ...testIngredient, constructorId: '2' },
            { ...testIngredient, constructorId: '3' },
          ],
        },
        deleteIngredient({ item: { ...testIngredient, constructorId: '2' } })
      )
    ).toEqual({
      ...burgerConstructorInitialState,
      ingredientsInBurger: [
        { ...testIngredient, constructorId: '1' },
        { ...testIngredient, constructorId: '3' },
      ],
    });
  });

  it('handles moveIngredient', () => {
    expect(
      reducer(
        {
          ...burgerConstructorInitialState,
          ingredientsInBurger: [
            { ...testIngredient, constructorId: '1' },
            { ...testIngredient, constructorId: '2' },
            { ...testIngredient, constructorId: '3' },
          ],
        },

        moveIngredient({ itemId: '1', targetId: '3' })
      )
    ).toEqual({
      ...burgerConstructorInitialState,
      ingredientsInBurger: [
        { ...testIngredient, constructorId: '2' },
        { ...testIngredient, constructorId: '1' },
        { ...testIngredient, constructorId: '3' },
      ],
    });
  });

  it('handles clearConstructor', () => {
    expect(
      reducer(
        {
          ...burgerConstructorInitialState,
          ingredientsInBurger: [
            { ...testIngredient, constructorId: '1' },
            { ...testIngredient, constructorId: '2' },
            { ...testIngredient, constructorId: '3' },
          ],
        },
        clearConstructor()
      )
    ).toEqual({
      ...burgerConstructorInitialState,
    });
  });

  it('handles moveIngredientToBottom', () => {
    expect(
      reducer(
        {
          ...burgerConstructorInitialState,
          ingredientsInBurger: [
            { ...testIngredient, constructorId: '1' },
            { ...testIngredient, constructorId: '2' },
            { ...testIngredient, constructorId: '3' },
          ],
        },
        moveIngredientToBottom({ itemId: '1' })
      )
    ).toEqual({
      ...burgerConstructorInitialState,
      ingredientsInBurger: [
        { ...testIngredient, constructorId: '2' },
        { ...testIngredient, constructorId: '3' },
        { ...testIngredient, constructorId: '1' },
      ],
    });
  });
});
