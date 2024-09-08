import {
  Counter,
  CurrencyIcon,
} from '@ya.praktikum/react-developer-burger-ui-components';
import styles from './IngredientCard.module.css';
import { useDrag } from 'react-dnd';
import { IngredientListItem } from '../../types';
import { useNavigate } from 'react-router-dom';

interface Props {
  item: IngredientListItem;
}

export const IngredientCard = ({ item }: Props) => {
  const navigate = useNavigate();

  const [_, dragRef] = useDrag({
    type: 'ingredient',
    item: { item },
  });

  const openIngredientDetails = () => {
    navigate(`/ingredients/${item._id}`, {
      state: {
        background: '/',
      }
    });
  };

  return (
    <li
      ref={dragRef}
      className={styles.ingredientCard}
      onClick={openIngredientDetails}
    >
      {!!item.numberInConstructor && (
        <Counter count={item.numberInConstructor} size="default" />
      )}
      <div>
        <img
          src={item.image_large}
          alt={item.name}
          className={styles.ingredientImage}
        />
        <div className={styles.ingredientPrice}>
          <p className="text text_type_main-small mr-2">{item.price}</p>
          <CurrencyIcon type="primary" />
        </div>
        <p className="text text_type_main-small mb-6">{item.name}</p>
      </div>
    </li>
  );
};
