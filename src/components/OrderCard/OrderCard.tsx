import { CurrencyIcon } from '@ya.praktikum/react-developer-burger-ui-components';
import { useAppSelector } from '../../services/store';
import { OrderDetails, OrderStatus } from '../../types';
import parseTime from '../../utils/parseTime';

import styles from './OrderCard.module.css';
import { useLocation, useNavigate } from 'react-router-dom';
import clsx from 'clsx';
import { useMemo } from 'react';

export interface Props {
  order: OrderDetails;
  showStatus?: boolean;
}

const OrderCard = ({ order, showStatus = false }: Props) => {
  const navigate = useNavigate();
  const location = useLocation();
  const ingredients = useAppSelector(
    (store) => store.ingredientsSlice.ingredients
  );

  const openOrderDetails = () => {
    navigate(`${order._id}`, {
      state: {
        background: location.pathname,
      },
    });
  };

  const statusText = useMemo(() => {
    let status = '';

    switch (order.status) {
      case OrderStatus.CREATED:
        status = 'Создан';
        break;
      case OrderStatus.PENDING:
        status = 'Готовится';
        break;
      case OrderStatus.DONE:
        status = 'Выполнен';
        break;
      case OrderStatus.CANCELED:
        status = 'Отменен';
        break;
    }
    return status;
  }, [order.status]);

  const wrapIngredients = order.ingredients.length > 6;

  return (
    <div className={styles.card} onClick={openOrderDetails}>
      <div className={styles.flexContainer}>
        <div className="text text_type_digits-default">#{order.number}</div>
        <div className="text text_type_main-default text_color_inactive">
          {parseTime(order.createdAt)}
        </div>
      </div>
      <div className="text text_type_main-medium">{order.name}</div>
      <div
        className={clsx('text text_type_main-default', {
          [styles.readyStatus]: order.status === OrderStatus.DONE,
        })}
      >
        {statusText}
      </div>
      <div className={styles.flexContainer}>
        <ul className={styles.ingredientsContainer}>
          {order.ingredients.slice(0, 6).map((id, index) => (
            <li
              key={id + index}
              className={styles.ingredient}
              style={{ zIndex: 500 - index }}
            >
              <img
                className={styles.ingredientImage}
                src={ingredients[id].image_mobile}
                alt={ingredients[id].name}
              />
              {wrapIngredients && index === 5 && (
                <div className={styles.ingredientWrapCounter}>
                  <div className="text text_type_digits-default">
                    +{order.ingredients.length - 6}
                  </div>
                </div>
              )}
            </li>
          ))}
        </ul>
        <div className={clsx('text text_type_digits-default', styles.price)}>
          <div>
            {order.ingredients.reduce(
              (acc, id) => acc + ingredients[id].price,
              0
            )}
          </div>
          <CurrencyIcon type="primary" />
        </div>
      </div>
    </div>
  );
};
export default OrderCard;
