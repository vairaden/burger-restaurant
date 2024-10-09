import {
  clearSelectedOrder,
  createOrder,
  ordersInitialState,
  ordersSlice,
} from './ordersSlice';
import { thunk } from 'redux-thunk';
import fetchMock from 'fetch-mock';
import { AppDispatch, RootState } from '../store';
import { clearIngredients } from '../ingredients/ingredientsSlice';
import { clearConstructor } from '../burgerConstructor/burgerConstructorSlice';
import reduceActionHistory from '../../helpers/reduceActionHistory';
import createMockStore from 'redux-mock-store';

const middlewares = [thunk];

const mockStore = createMockStore<RootState, AppDispatch>(middlewares as any);

const reducer = ordersSlice.reducer;

describe('Orders reducer', () => {
  afterEach(() => {
    fetchMock.restore();
  });

  it('returns initial state', () => {
    const state = reducer(ordersInitialState, {
      type: 'default',
      payload: null,
    });

    expect(state).toEqual(ordersInitialState);
  });

  it('handles createOrder', async () => {
    const res = {
      success: true,
      name: 'name',
      order: {
        number: 123,
      },
    };

    fetchMock.post('path:/api/orders', {
      body: res,
      headers: { 'content-type': 'application/json' },
    });

    const expectedActions = [
      {
        type: createOrder.pending.type,
      },
      {
        type: clearIngredients.type,
      },
      {
        type: clearConstructor.type,
      },
      {
        type: createOrder.fulfilled.type,
        payload: res,
      },
    ];

    const store = mockStore();
    await store.dispatch(createOrder({ ingredientIds: ['123'] }));

    expect(reduceActionHistory(store.getActions())).toEqual(expectedActions);
  });

  it('should return state without created order when createOrder succeeds', () => {
    expect(
      reducer(undefined, {
        type: createOrder.fulfilled.type,
        payload: { name: 'test', order: { number: 123 } },
      })
    ).toEqual({
      ...ordersInitialState,
      selectedOrder: { name: 'test', order: { number: 123 } },
    });
  });

  it('should return state with error when createOrder fails', () => {
    expect(reducer(undefined, { type: createOrder.rejected.type })).toEqual({
      ...ordersInitialState,
      error: true,
    });
  });

  it('should clear selected order', () => {
    expect(
      reducer(
        {
          ...ordersInitialState,
          selectedOrder: { name: 'test', order: { number: 123 } },
        },
        clearSelectedOrder()
      )
    ).toEqual(ordersInitialState);
  });
});
