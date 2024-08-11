import { Tab } from '@ya.praktikum/react-developer-burger-ui-components';
import { useEffect, useState } from 'react';

import styles from './BurgerIngredients.module.css';
import { IngredientDetails } from '../IngredientDetails';
import { Modal } from '../Modal';
import { useAppDispatch, useAppSelector } from '../../services/store';
import { IngredientCard } from '../IngredientCard';
import { fetchIngredientsList } from '../../services/ingredientsSlice';
import { Ingredient } from '../../types';

export const BurgerIngredients = () => {
  const [activeTab, setActiveTab] = useState('bun');
  const [selectedIngredient, setSelectedIngredient] =
    useState<Ingredient | null>(null);

  const { ingredients } = useAppSelector((state) => state.ingredientsSlice);

  const dispatch = useAppDispatch();

  useEffect(() => {
    dispatch(fetchIngredientsList());
  }, []);

  return (
    <>
      <Modal
        open={!!selectedIngredient}
        onClose={() => setSelectedIngredient(null)}
      >
        {selectedIngredient && (
          <IngredientDetails ingredient={selectedIngredient} />
        )}
      </Modal>

      <section>
        <p className="text text_type_main-large mt-10">Cоберите бургер</p>
        <div className="mt-5" style={{ display: 'flex' }}>
          <Tab value="bun" active={activeTab === 'bun'} onClick={setActiveTab}>
            <p className="text text_type_main-small">Булки</p>
          </Tab>
          <Tab
            value="sauce"
            active={activeTab === 'sauce'}
            onClick={setActiveTab}
          >
            <p className="text text_type_main-small">Соусы</p>
          </Tab>
          <Tab
            value="main"
            active={activeTab === 'main'}
            onClick={setActiveTab}
          >
            <p className="text text_type_main-small">Начинки</p>
          </Tab>
        </div>

        <div className={styles.ingredientsSection}>
          <p className="text text_type_main-medium mt-10">Булки</p>
          <ul className={styles.ingredientsList}>
            {ingredients
              .filter((item) => item.type === 'bun')
              .map((item) => (
                <IngredientCard
                  item={item}
                  setSelectedIngredient={setSelectedIngredient}
                  key={item._id}
                />
              ))}
          </ul>

          <p className="text text_type_main-medium mt-10">Соусы</p>
          <ul className={styles.ingredientsList}>
            {ingredients
              .filter((item) => item.type === 'sauce')
              .map((item) => (
                <IngredientCard
                  item={item}
                  setSelectedIngredient={setSelectedIngredient}
                  key={item._id}
                />
              ))}
          </ul>

          <p className="text text_type_main-medium mt-10">Начинки</p>
          <ul className={styles.ingredientsList}>
            {ingredients
              .filter((item) => item.type === 'main')
              .map((item, index) => (
                <IngredientCard
                  item={item}
                  setSelectedIngredient={setSelectedIngredient}
                  key={item._id}
                />
              ))}
          </ul>
        </div>
      </section>
    </>
  );
};
