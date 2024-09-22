import { useEffect, useMemo } from 'react';
import { useAppDispatch, useAppSelector } from '../../services/store';
import { wsConnectionStart } from '../../services/store/slices/websocketSlice';
import { WebsocketConfig } from '../../constants';
import OrderCard from '../../components/OrderCard/OrderCard';

import styles from './OrdersPage.module.css';

const OrdersPage = () => {
  const dispatch = useAppDispatch();
  const messages = useAppSelector((store) => store.websocketSlice.messages);
  const loading = useAppSelector((store) => store.websocketSlice.loading);

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
    dispatch(wsConnectionStart({ config: WebsocketConfig.ORDERS_PERSONAL }));
  }, []);

  return (
    <main>
      {data && (
        <ul className={styles.list}>
          {Array.from(data.orders).reverse().map((item) => (
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
