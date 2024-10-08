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

const mockStore = createMockStore<RootState, AppDispatch>(
  middlewares as any
);

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

  it('handles createOrder error', async () => {
    fetchMock.post('path:/api/orders', {
      body: {
        success: false,
      },
      headers: { 'content-type': 'application/json' },
    });

    const expectedActions = [
      {
        type: createOrder.pending.type,
      },
      {
        type: createOrder.rejected.type,
      },
    ];

    const store = mockStore();
    await store.dispatch(createOrder({ ingredientIds: ['123'] }));

    expect(reduceActionHistory(store.getActions())).toEqual(expectedActions);
  });

  it('handles clearSelectedOrder', async () => {
    const expectedActions = [
      {
        type: clearSelectedOrder.type,
      },
    ];

    const store = mockStore();
    await store.dispatch(clearSelectedOrder());

    expect(reduceActionHistory(store.getActions())).toEqual(expectedActions);
  });
});
