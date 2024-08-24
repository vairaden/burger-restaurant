import { BurgerConstructor } from '../../components/BurgerConstructor';
import { BurgerIngredients } from '../../components/BurgerIngredients';
import withProtection from '../../utils/withProtection';

import styles from './ConstructorPage.module.css';

const ConstructorPage = () => {
  return (
    <main className={styles.mainGrid}>
      <BurgerIngredients />
      <BurgerConstructor />
    </main>
  );
};

export default withProtection(ConstructorPage);
