import {
  Button,
  CurrencyIcon,
} from '@ya.praktikum/react-developer-burger-ui-components';
import { useMemo } from 'react';

import styles from './BurgerConstructor.module.css';
import { Modal } from '../Modal';
import { OrderCreatedInfo } from '../OrderCreatedInfo';
import { useDrop } from 'react-dnd';
import clsx from 'clsx';
import {
  addIngredient,
  deleteIngredient,
} from '../../services/store/slices/burgerConstructorSlice';
import { ConstructorIngredient, Ingredient } from '../../types';
import {
  decreaseIngredientNumber,
  increaseIngredientNumber,
} from '../../services/store/slices/ingredientsSlice';
import {
  clearSelectedOrder,
  createOrder,
} from '../../services/store/slices/ordersSlice';
import ConstructorListItem from '../ConstructorListItem/ConstructorListItem';
import { useAppDispatch, useAppSelector } from '../../services/store';
import { createSearchParams, useLocation, useNavigate } from 'react-router-dom';
import Spinner from '../Spinner/Spinner';

interface DropParams {
  item: Ingredient;
}

export const BurgerConstructor = () => {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const location = useLocation();

  const { ingredientsInBurger, bun } = useAppSelector(
    (state) => state.burgerConstructor
  );
  const user = useAppSelector((state) => state.auth.user);
  const { selectedOrder, loading: orderLoading } = useAppSelector(
    (state) => state.orders
  );

  const onDropHandler = ({ item }: DropParams) => {
    dispatch(addIngredient({ item }));
    dispatch(increaseIngredientNumber({ item }));
  };

  const deleteItem = (item: ConstructorIngredient) => {
    dispatch(deleteIngredient({ item }));
    dispatch(decreaseIngredientNumber({ item }));
  };

  const [{ isHover }, dropRef] = useDrop({
    accept: 'ingredient',
    drop(params: DropParams) {
      onDropHandler(params);
    },
    collect: (monitor) => ({
      isHover: monitor.isOver(),
    }),
  });

  const totalPrice = useMemo(() => {
    return (
      (bun?.price || 0) * 2 +
      ingredientsInBurger.reduce((acc, item) => acc + item.price, 0)
    );
  }, [bun, ingredientsInBurger]);

  const onCreateOrder = () => {
    if (!bun) {
      return;
    }

    if (!user) {
      navigate({
        pathname: '/login',
        search: createSearchParams({
          from_path: location.pathname,
        }).toString(),
      });

      return;
    }

    dispatch(
      createOrder({
        ingredientIds: [
          ...ingredientsInBurger.map((item) => item._id),
          bun._id,
          bun._id,
        ],
      })
    );
  };

  const onCloseOrderModal = () => {
    dispatch(clearSelectedOrder());
  };

  return (
    <>
      {orderLoading && (
        <Modal>
          <div className={styles.loadingContent}>
            <p className={'text text_type_main-large mb-4'}>Создание заказа</p>
            <Spinner />
          </div>
        </Modal>
      )}
      {selectedOrder && (
        <Modal onClose={onCloseOrderModal}>
          <OrderCreatedInfo orderInfo={selectedOrder} />
        </Modal>
      )}

      <section className="mt-25">
        <ul
          className={clsx(styles.ingredientList, {
            [styles.ingredientListHovered]: isHover,
          })}
          ref={dropRef}
        >
          {bun && <ConstructorListItem locked item={bun} type="top" />}

          {ingredientsInBurger.map((item) => (
            <ConstructorListItem
              constructorListId={item.constructorId}
              key={item.constructorId}
              onDelete={() => deleteItem(item)}
              item={item}
            />
          ))}

          {bun && <ConstructorListItem locked item={bun} type="bottom" />}
        </ul>

        <div className={clsx(styles.checkoutBlockWrapper, 'mr-4 mt-10')}>
          <div className={clsx(styles.checkoutBlockWrapper, 'mr-10')}>
            <p className="text text_type_main-large mr-4">{totalPrice}</p>
            <CurrencyIcon type="primary" />
          </div>
          <Button
            htmlType="button"
            type="primary"
            size="medium"
            onClick={onCreateOrder}
          >
            Оформить заказ
          </Button>
        </div>
      </section>
    </>
  );
};
