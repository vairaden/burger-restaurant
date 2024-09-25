import { useLocation, useParams } from 'react-router-dom';
import { useAppDispatch, useAppSelector } from '../../services/store';
import { useEffect, useMemo } from 'react';
import { CurrencyIcon } from '@ya.praktikum/react-developer-burger-ui-components';

import styles from './OrderDetails.module.css';
import parseTime from '../../utils/parseTime';
import clsx from 'clsx';
import { OrderStatus, ReducedIngredient } from '../../types';
import { WebsocketUrl } from '../../constants';
import {
  orderFeedConnected,
  orderFeedData,
  orderFeedLoading,
} from '../../services/orderFeed/orderFeedSelectors';
import {
  orderHistoryConnected,
  orderHistoryData,
  orderHistoryLoading,
} from '../../services/orderHistory/orderHistorySelectors';
import orderFeedActions from '../../services/orderFeed/orderFeedActions';
import orderHistoryActions from '../../services/orderHistory/orderHistoryActions';
import Spinner from '../Spinner/Spinner';

import pageStyles from '../../styles/PageStyles.module.css';

const OrderDetails = () => {
  const { id } = useParams();
  const dispatch = useAppDispatch();
  const location = useLocation();

  const isFeed = location.pathname.startsWith('/feed');

  const message = useAppSelector(isFeed ? orderFeedData : orderHistoryData);

  const loading = useAppSelector(
    isFeed ? orderFeedLoading : orderHistoryLoading
  );

  const socketConnected = useAppSelector(
    isFeed ? orderFeedConnected : orderHistoryConnected
  );

  const ingredients = useAppSelector((store) => store.ingredients.ingredients);

  const order = useMemo(() => {
    if (loading) {
      return null;
    }

    if (!message) {
      return null;
    }

    return message.orders.find((item) => item._id === id) || null;
  }, [loading, message, id]);

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
    if (socketConnected) {
      return;
    }

    if (isFeed) {
      dispatch(orderFeedActions.wsConnect(WebsocketUrl.ORDERS_ALL));
    } else {
      dispatch(orderHistoryActions.wsConnect(WebsocketUrl.ORDERS_PERSONAL));
    }

    return isFeed
      ? () => {
          dispatch(orderFeedActions.wsDisconnect());
        }
      : () => {
          dispatch(orderHistoryActions.wsDisconnect());
        };
  }, []);

  if (loading && !order) {
    return (
      <div className={pageStyles.wrapper}>
        <Spinner />
      </div>
    );
  }

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
