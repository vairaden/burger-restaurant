import { CheckMarkIcon } from '@ya.praktikum/react-developer-burger-ui-components';

import styles from './OrderCreatedInfo.module.css';
import { OrderInfo } from '../../types';

interface Props {
  orderInfo: OrderInfo;
}

export const OrderCreatedInfo = ({ orderInfo }: Props) => {
  return (
    <div className={styles.wrapper}>
      <p className="text text_type_digits-large pt-25">
        {orderInfo.order.number}
      </p>
      <p className="text text_type_main-medium mt-8">идентификатор заказа</p>

      <div className="mt-15">
        <CheckMarkIcon type="primary" />
      </div>

      <p className="text text_type_main-small mt-15">
        Ваш заказ начали готовить
      </p>
      <p className="text text_type_main-default text_color_inactive mt-2 mb-30">
        Дождитесь готовности на орбитальной станции
      </p>
    </div>
  );
};
