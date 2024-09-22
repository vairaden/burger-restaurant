import { useLocation, useParams } from 'react-router-dom';
import { useAppDispatch, useAppSelector } from '../../services/store';
import { useEffect, useMemo } from 'react';
import { wsConnectionStart } from '../../services/store/slices/websocketSlice';
import { WebsocketConfig } from '../../constants';
import { CurrencyIcon } from '@ya.praktikum/react-developer-burger-ui-components';

import styles from './OrderDetails.module.css';
import parseTime from '../../utils/parseTime';
import clsx from 'clsx';
import { IngredientListItem, OrderStatus } from '../../types';

interface ReducedIngredient extends IngredientListItem {
  count: number;
}

const OrderDetails = () => {
  const { id } = useParams();
  const dispatch = useAppDispatch();
  const location = useLocation();

  const messages = useAppSelector((store) => store.websocketSlice.messages);
  const loading = useAppSelector((store) => store.websocketSlice.loading);
  const ingredients = useAppSelector(
    (store) => store.ingredientsSlice.ingredients
  );

  const order = useMemo(() => {
    if (loading) {
      return null;
    }

    if (!messages[0]) {
      return null;
    }

    return messages[0].orders.find((item) => item._id === id) || null;
  }, [loading, messages, id]);

  const statusText = useMemo(() => {
    let status = '';

    if (!order) {
      return status;
    }

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
  }, [order]);

  const reducedIngredients = useMemo(() => {
    if (!order) {
      return null;
    }

    return order.ingredients.reduce<Record<string, ReducedIngredient>>(
      (acc, cur) => {
        const curIngredient = ingredients[cur];
        if (acc[curIngredient._id]) {
          acc[curIngredient._id].count += 1;
          return acc;
        }

        acc[curIngredient._id] = {
          ...curIngredient,
          count: 1,
        };

        return acc;
      },
      {}
    );
  }, [ingredients, order]);

  useEffect(() => {
    const config = location.pathname.startsWith('/profile/orders')
      ? WebsocketConfig.ORDERS_PERSONAL
      : WebsocketConfig.ORDERS_ALL;
    dispatch(wsConnectionStart({ config }));
  }, []);

  return (
    <div className={styles.wrapper}>
      {order && (
        <>
          <div className={clsx(styles.header, 'text text_type_digits-default')}>
            #{order.number}
          </div>
          <div className="text text_type_main-medium">{order.name}</div>
          <div
            className={clsx('text text_type_main-default mb-15', {
              [styles.readyStatus]: order.status === OrderStatus.DONE,
            })}
          >
            {statusText}
          </div>
          <div className="text text_type_main-medium">Состав:</div>
          <div className={styles.flexContainer}>
            <ul className={styles.ingredientsContainer}>
              {reducedIngredients &&
                Object.values(reducedIngredients).map((item, index) => (
                  <li key={item._id + index} className={styles.ingredient}>
                    <div className={styles.ingredientInfo}>
                      <div className={styles.ingredientAvatar}>
                        <img
                          className={styles.ingredientImage}
                          src={item.image_mobile}
                          alt={item.name}
                        />
                      </div>
                      <div
                        className={clsx(
                          styles.center,
                          'text text_type_main-default',
                          'mr-4'
                        )}
                      >
                        {item.name}
                      </div>
                    </div>
                    <div
                      className={clsx(
                        'text text_type_digits-default',
                        styles.price
                      )}
                    >
                      <div>{`${item.count} x ${item.price}`}</div>
                      <CurrencyIcon type="primary" />
                    </div>
                  </li>
                ))}
            </ul>
          </div>
          <div className={styles.footer}>
            <div className="text text_type_main-default text_color_inactive">
              {parseTime(order.createdAt)}
            </div>
            <div
              className={clsx('text text_type_digits-default', styles.price)}
            >
              <div>
                {order.ingredients.reduce(
                  (acc, id) => acc + ingredients[id].price,
                  0
                )}
              </div>
              <CurrencyIcon type="primary" />
            </div>
          </div>
        </>
      )}
    </div>
  );
};
export default OrderDetails;
