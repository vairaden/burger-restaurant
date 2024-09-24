import { useEffect, useMemo } from 'react';
import { useAppDispatch, useAppSelector } from '../../services/store';
import { WebsocketUrl } from '../../constants';
import OrderCard from '../../components/OrderCard/OrderCard';

import styles from './OrdersPage.module.css';
import { orderHistoryActions } from '../../services/store/slices/orderHistorySlice';

const OrdersPage = () => {
  const dispatch = useAppDispatch();
  const messages = useAppSelector((store) => store.orderHistory.messages);
  const loading = useAppSelector((store) => store.orderHistory.loading);

  const data = useMemo(() => {
    if (loading) {
      return null;
    }

    if (!messages[0]) {
      return null;
    }

    return messages[0];
  }, [messages, loading]);

  useEffect(() => {
    dispatch(orderHistoryActions.wsConnect(WebsocketUrl.ORDERS_PERSONAL));

    return () => {
      dispatch(orderHistoryActions.wsDisconnect());
    };
  }, []);

  return (
    <main>
      {data && (
        <ul className={styles.list}>
          {Array.from(data.orders)
            .reverse()
            .map((item) => (
              <li key={item._id}>
                <OrderCard showStatus order={item} />
              </li>
            ))}
        </ul>
      )}
    </main>
  );
};

export default OrdersPage;
