import OrderDetails from '../../components/OrderDetails/OrderDetails';
import styles from './OrderDetailsPage.module.css';

const OrderDetailsPage = () => {
  return (
    <div className={styles.container}>
      <OrderDetails />
    </div>
  );
};

export default OrderDetailsPage;
