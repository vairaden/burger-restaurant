import { AppHeader } from '../components/AppHeader';
import { BurgerConstructor } from '../components/BurgerConstructor';
import { BurgerIngredients } from '../components/BurgerIngredients';

import styles from './App.module.css';

export const App = () => {
  return (
    <div className="App">
      <AppHeader />
      <main className={styles.mainGrid}>
        <BurgerIngredients />
        <BurgerConstructor />
      </main>
    </div>
  );
};
