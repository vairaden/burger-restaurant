import {
  Counter,
  CurrencyIcon,
} from '@ya.praktikum/react-developer-burger-ui-components';
import { Ingredient } from '../../api/getIngredients';
import styles from './IngredientCard.module.css';
import { useDrag } from 'react-dnd';

interface Props {
  item: Ingredient;
  setSelectedIngredient: (item: Ingredient) => void;
}

export const IngredientCard = ({ item, setSelectedIngredient }: Props) => {
  const [{}, dragRef] = useDrag({
    type: 'ingredient',
    item: { id: item._id },
    collect: (monitor) => ({}),
  });

  return (
    <li
      ref={dragRef}
      className={styles.ingredientCard}
      onClick={() => setSelectedIngredient(item)}
    >
      <Counter count={233} size="default" />
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
