import {
  Button,
  CurrencyIcon,
} from '@ya.praktikum/react-developer-burger-ui-components';
import { useMemo } from 'react';

import styles from './BurgerConstructor.module.css';
import { Modal } from '../Modal';
import { OrderDetails } from '../OrderDetails';
import { useAppDispatch, useAppSelector } from '../../services/store';
import { useDrop } from 'react-dnd';
import clsx from 'clsx';
import {
  addIngredient,
  deleteIngredient,
} from '../../services/constructorSlice';
import { Ingredient } from '../../types';
import {
  decreaseIngredientNumber,
  increaseIngredientNumber,
} from '../../services/ingredientsSlice';
import { clearSelectedOrder, createOrder } from '../../services/ordersSlice';
import ConstructorListItem from '../ConstructorListItem/ConstructorListItem';

interface DropParams {
  item: Ingredient;
}

export const BurgerConstructor = () => {
  const dispatch = useAppDispatch();
  const { ingredientsInBurger, bun } = useAppSelector(
    (state) => state.constructorSlice
  );

  const { selectedOrder } = useAppSelector((state) => state.ordersSlice);

  const onDropHandler = ({ item }: DropParams) => {
    dispatch(addIngredient({ item }));
    dispatch(increaseIngredientNumber({ item }));
  };

  const deleteItem = (item: Ingredient, index: number) => {
    dispatch(deleteIngredient({ index }));
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
    if (bun) {
      dispatch(
        createOrder({
          ingredientIds: [
            ...ingredientsInBurger.map((item) => item._id),
            bun._id,
            bun._id,
          ],
        })
      );
    }
  };

  const onCloseOrderModal = () => {
    dispatch(clearSelectedOrder());
  };

  return (
    <>
      {selectedOrder && (
        <Modal open={!!selectedOrder} onClose={onCloseOrderModal}>
          <OrderDetails orderInfo={selectedOrder} />
        </Modal>
      )}

      <section className="mt-25">
        <ul
          className={clsx(styles.ingredientList, {
            [styles.ingredientListHovered]: isHover,
          })}
          ref={dropRef}
        >
          {bun && (
            <ConstructorListItem
              constructorListIndex={-1}
              locked
              item={bun}
              type="top"
            />
          )}

          {ingredientsInBurger.map((item, index) => (
            <ConstructorListItem
              constructorListIndex={index}
              key={index}
              onDelete={() => deleteItem(item, index)}
              item={item}
            />
          ))}

          {bun && (
            <ConstructorListItem
              constructorListIndex={ingredientsInBurger.length}
              locked
              item={bun}
              type="bottom"
            />
          )}
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
