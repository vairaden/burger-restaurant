import {
  Button,
  ConstructorElement,
  CurrencyIcon,
  DragIcon,
} from '@ya.praktikum/react-developer-burger-ui-components';
import { useState } from 'react';

import styles from './BurgerConstructor.module.css';
import { Modal } from '../Modal';
import { OrderDetails } from '../OrderDetails';
import { useAppSelector } from '../../services/store';
import { useDrop } from 'react-dnd';
import clsx from 'clsx';

export const BurgerConstructor = () => {
  const [openOrderDetails, setOpenOrderDetails] = useState(false);

  const { ingredientsInBurger, bun } = useAppSelector(
    (state) => state.constructorSlice
  );

  const onDropHandler = (itemId: number) => {
    console.log(itemId);
  };

  const [{ isHover }, dropRef] = useDrop({
    accept: 'ingredient',
    drop(itemId: number) {
      onDropHandler(itemId);
    },
    collect: (monitor) => ({
      isHover: monitor.isOver(),
    }),
  });

  return (
    <>
      <Modal open={openOrderDetails} onClose={() => setOpenOrderDetails(false)}>
        <OrderDetails />
      </Modal>

      <section
        className={clsx('mt-25', {
          [styles.ingredientListHovered]: isHover,
        })}
        ref={dropRef}
      >
        <ul className={styles.ingredientList}>
          {bun && (
            <li className={styles.listItemContent}>
              <ConstructorElement
                extraClass="ml-8"
                key={bun._id}
                type="top"
                isLocked={true}
                text={bun.name + ' (верх)'}
                price={bun.price}
                thumbnail={bun.image}
              />
            </li>
          )}

          {ingredientsInBurger.map((item) => (
            <li className={clsx('mt-4', styles.listItemContent)}>
              <DragIcon type="primary" />
              <ConstructorElement
                extraClass="ml-2"
                key={item._id}
                text={item.name}
                price={item.price}
                thumbnail={item.image}
              />
            </li>
          ))}

          {bun && (
            <li className={clsx('mt-4', styles.listItemContent)}>
              <ConstructorElement
                extraClass="ml-8"
                key={bun._id}
                type="bottom"
                isLocked={true}
                text={bun.name + ' (низ)'}
                price={bun.price}
                thumbnail={bun.image}
              />
            </li>
          )}
        </ul>

        <div className={clsx(styles.checkoutBlockWrapper, 'mr-4 mt-10')}>
          <div className={clsx(styles.checkoutBlockWrapper, 'mr-10')}>
            <p className="text text_type_main-large mr-4">610</p>
            <CurrencyIcon type="primary" />
          </div>
          <Button
            htmlType="button"
            type="primary"
            size="medium"
            onClick={() => setOpenOrderDetails(true)}
          >
            Оформить заказ
          </Button>
        </div>
      </section>
    </>
  );
};
