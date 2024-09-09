import { BurgerIcon } from '@ya.praktikum/react-developer-burger-ui-components';
import styles from './Spinner.module.css';

const Spinner = () => {
  return (
    <div className={styles.spin}>
      <BurgerIcon type="primary" />
    </div>
  );
};
export default Spinner;
