import { useEffect } from 'react';
import { useAppDispatch, useAppSelector } from '../../services/store';
import { WebsocketUrl } from '../../constants';
import OrderCard from '../../components/OrderCard/OrderCard';

import styles from './OrdersPage.module.css';
import Spinner from '../../components/Spinner/Spinner';
import { orderHistoryData, orderHistoryLoading } from '../../services/orderHistory/orderHistorySelectors';
import orderHistoryActions from '../../services/orderHistory/orderHistoryActions';

const OrdersPage = () => {
  const dispatch = useAppDispatch();
  const data = useAppSelector(orderHistoryData);
  const loading = useAppSelector(orderHistoryLoading);

  useEffect(() => {
    dispatch(orderHistoryActions.wsConnect(WebsocketUrl.ORDERS_PERSONAL));

    return () => {
      dispatch(orderHistoryActions.wsDisconnect());
    };
  }, []);

  if (loading) {
    return <Spinner />;
  }

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
