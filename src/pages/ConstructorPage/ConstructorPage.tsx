import { BurgerConstructor } from '../../components/BurgerConstructor';
import { BurgerIngredients } from '../../components/BurgerIngredients';

import styles from './ConstructorPage.module.css';

const ConstructorPage = () => {
  return (
    <main className={styles.mainGrid}>
      <BurgerIngredients />
      <BurgerConstructor />
    </main>
  );
};

export default ConstructorPage;
