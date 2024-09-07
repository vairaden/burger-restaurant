import {
  BurgerIcon,
  ListIcon,
  Logo,
  ProfileIcon,
} from '@ya.praktikum/react-developer-burger-ui-components';

import styles from './AppHeader.module.css';
import { Link, useLocation } from 'react-router-dom';
import clsx from 'clsx';

const enum headerPaths {
  HOME = '/',
  ORDERS = '/orders',
  PROFILE = '/profile',
}

export const AppHeader = () => {
  const location = useLocation();

  return (
    <header className={styles.header}>
      <nav className={styles.nav}>
        <div className={styles.buttonGroupStart}>
          <Link to="/" className={styles.navButton}>
            <BurgerIcon
              type={
                location.pathname === headerPaths.HOME ? 'primary' : 'secondary'
              }
            />
            <p
              className={clsx('text text_type_main-default ml-2', {
                text_color_inactive: location.pathname !== headerPaths.HOME,
              })}
            >
              Конструктор
            </p>
          </Link>
          <Link to="/orders" className={styles.navButton}>
            <ListIcon
              type={
                location.pathname.startsWith(headerPaths.ORDERS)
                  ? 'primary'
                  : 'secondary'
              }
            />
            <p
              className={clsx('text text_type_main-default ml-2', {
                text_color_inactive: !location.pathname.startsWith(headerPaths.ORDERS),
              })}
            >
              Лента заказов
            </p>
          </Link>
        </div>
        <div className={styles.logoContainer}>
          <Logo />
        </div>
        <div className={styles.buttonGroupEnd}>
          <Link to="/profile" className={styles.navButton}>
            <ProfileIcon
              type={
                location.pathname.startsWith(headerPaths.PROFILE)
                  ? 'primary'
                  : 'secondary'
              }
            />
            <p
              className={clsx('text text_type_main-default ml-2', {
                text_color_inactive: !location.pathname.startsWith(headerPaths.PROFILE),
              })}
            >
              Личный кабинет
            </p>
          </Link>
        </div>
      </nav>
    </header>
  );
};
