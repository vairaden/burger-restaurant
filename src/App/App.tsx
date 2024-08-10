import { useEffect } from 'react';
import { AppHeader } from '../components/AppHeader';
import { BurgerConstructor } from '../components/BurgerConstructor';
import { BurgerIngredients } from '../components/BurgerIngredients';

import styles from './App.module.css';
import { fetchIngredientsList } from '../services/ingredientsSlice';
import { useAppDispatch } from '../services/store';

export const App = () => {
  const dispatch = useAppDispatch();

  useEffect(() => {
    dispatch(fetchIngredientsList());
  }, []);

  return (
    <div className="App">
      <AppHeader />
      <main className={styles.mainGrid}>
        <BurgerIngredients />
        <BurgerConstructor />
      </main>
    </div>
  );
}
