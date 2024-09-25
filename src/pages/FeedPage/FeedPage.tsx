import { useEffect, useMemo } from 'react';
import { useAppDispatch, useAppSelector } from '../../services/store';
import { WebsocketUrl } from '../../constants';

import styles from './FeedPage.module.css';
import { OrderStatus } from '../../types';
import OrderCard from '../../components/OrderCard/OrderCard';
import clsx from 'clsx';
import Spinner from '../../components/Spinner/Spinner';
import { orderFeedData, orderFeedLoading } from '../../services/orderFeed/orderFeedSelectors';
import orderFeedActions from '../../services/orderFeed/orderFeedActions';

const FeedPage = () => {
  const dispatch = useAppDispatch();
  const data = useAppSelector(orderFeedData);
  const loading = useAppSelector(orderFeedLoading);

  const { ordersDone, ordersInProgress } = useMemo(() => {
    if (!data) {
      return {
        ordersDone: null,
        ordersInProgress: null,
      };
    }

    return {
      ordersDone: data.orders
        .filter((item) => item.status === OrderStatus.DONE)
        .slice(0, 10),
      ordersInProgress: data.orders
        .filter((item) => item.status !== OrderStatus.DONE)
        .slice(0, 10),
    };
  }, [data]);

  useEffect(() => {
    dispatch(orderFeedActions.wsConnect(WebsocketUrl.ORDERS_ALL));

    return () => {
      dispatch(orderFeedActions.wsDisconnect());
    };
  }, []);

  if (loading) {
    <Spinner />;
  }

  return (
    <main className={styles.pageWrapper}>
      <div className={clsx('text text_type_main-large', styles.header)}>
        Лента заказов
      </div>
      {data && (
        <div className={styles.container}>
          <ul className={styles.orderList}>
            {data.orders.map((item) => (
              <li key={item._id}>
                <OrderCard order={item} />
              </li>
            ))}
          </ul>
          <div>
            <div className={styles.orderStatuses}>
              <div className="text text_type_main-medium">
                <div className="mb-6">Готовы:</div>
                {ordersDone && (
                  <ul
                    className={clsx(
                      styles.list,
                      styles.orders,
                      styles.readyOrders,
                      'text text_type_digits-default'
                    )}
                  >
                    {ordersDone.map((item) => (
                      <li key={item._id}>{item.number}</li>
                    ))}
                  </ul>
                )}
              </div>
              <div className="text text_type_main-medium">
                <div className="mb-6">В работе:</div>
                {ordersInProgress && (
                  <ul
                    className={clsx(
                      styles.list,
                      styles.orders,
                      'text text_type_digits-default'
                    )}
                  >
                    {ordersInProgress.map((item) => (
                      <li key={item._id}>{item.number}</li>
                    ))}
                  </ul>
                )}
              </div>
            </div>
            <div className="text text_type_main-medium mt-15">
              Выполнено за все время:
            </div>
            <div className="text text_type_digits-large">{data.total}</div>
            <div className="text text_type_main-medium mt-15">
              Выполнено за сегодня:
            </div>
            <div className="text text_type_digits-large">{data.totalToday}</div>
          </div>
        </div>
      )}
    </main>
  );
};

export default FeedPage;
