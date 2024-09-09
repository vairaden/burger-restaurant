import {
  BurgerIcon,
  ListIcon,
  Logo,
  ProfileIcon,
} from '@ya.praktikum/react-developer-burger-ui-components';

import styles from './AppHeader.module.css';
import { NavLink, useNavigate } from 'react-router-dom';
import clsx from 'clsx';

export const AppHeader = () => {
  const navigate = useNavigate();

  return (
    <header className={styles.header}>
      <nav className={styles.nav}>
        <div className={styles.buttonGroupStart}>
          <NavLink to="/" className={styles.navButton}>
            {({ isActive }) => (
              <>
                <BurgerIcon type={isActive ? 'primary' : 'secondary'} />
                <p
                  className={clsx('text text_type_main-default ml-2', {
                    text_color_inactive: !isActive,
                  })}
                >
                  Конструктор
                </p>
              </>
            )}
          </NavLink>
          <NavLink to="/orders" className={styles.navButton}>
            {({ isActive }) => (
              <>
                <ListIcon type={isActive ? 'primary' : 'secondary'} />
                <p
                  className={clsx('text text_type_main-default ml-2', {
                    text_color_inactive: !isActive,
                  })}
                >
                  Лента заказов
                </p>
              </>
            )}
          </NavLink>
        </div>
        <div className={styles.logoContainer} onClick={() => navigate('/')}>
          <Logo />
        </div>
        <div className={styles.buttonGroupEnd}>
          <NavLink to="/profile" className={styles.navButton}>
            {({ isActive }) => (
              <>
                <ProfileIcon type={isActive ? 'primary' : 'secondary'} />
                <p
                  className={clsx('text text_type_main-default ml-2', {
                    text_color_inactive: !isActive,
                  })}
                >
                  Личный кабинет
                </p>
              </>
            )}
          </NavLink>
        </div>
      </nav>
    </header>
  );
};
