import {
  Counter,
  CurrencyIcon,
} from '@ya.praktikum/react-developer-burger-ui-components';
import styles from './IngredientCard.module.css';
import { useDrag } from 'react-dnd';
import { Ingredient, IngredientListItem } from '../../types';

interface Props {
  item: IngredientListItem;
  setSelectedIngredient: (item: Ingredient) => void;
}

export const IngredientCard = ({ item, setSelectedIngredient }: Props) => {
  const [{}, dragRef] = useDrag({
    type: 'ingredient',
    item: { item },
    collect: (monitor) => ({}),
  });

  return (
    <li
      ref={dragRef}
      className={styles.ingredientCard}
      onClick={() => setSelectedIngredient(item)}
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
