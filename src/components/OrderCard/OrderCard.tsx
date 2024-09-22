import { CurrencyIcon } from '@ya.praktikum/react-developer-burger-ui-components';
import { useAppSelector } from '../../services/store';
import { OrderDetails } from '../../types';
import parseTime from '../../utils/parseTime';

import styles from './OrderCard.module.css';
import { useLocation, useNavigate } from 'react-router-dom';

export interface Props {
  order: OrderDetails;
}

const OrderCard = ({ order }: Props) => {
  const navigate = useNavigate();
  const location = useLocation();
  const ingredients = useAppSelector(
    (store) => store.ingredientsSlice.ingredients
  );

  const openOrderDetails = () => {
    navigate(`${order._id}`, {
      state: {
        background: location.pathname,
      }
    });
  };

  return (
    <div className={styles.card} onClick={openOrderDetails}>
      <div className={styles.flexContainer}>
        <div className="text text_type_digits-default">#{order.number}</div>
        <div className="text text_type_main-default text_color_inactive">
          {parseTime(order.createdAt)}
        </div>
      </div>
      <div className="text text_type_main-medium">{order.name}</div>
      <div className={styles.flexContainer}>
        <div>
          {order.ingredients.map((id, index) => (
            <div key={id + index} className={styles.ingredientImage}>
              <img
                src={ingredients[id].image_mobile}
                alt={ingredients[id].name}
              />
            </div>
          ))}
        </div>
        <div className="text text_type_digits-default">
          {order.ingredients.reduce(
            (acc, id) => acc + ingredients[id].price,
            0
          )}
          <CurrencyIcon type="primary" />
        </div>
      </div>
    </div>
  );
};
export default OrderCard;
