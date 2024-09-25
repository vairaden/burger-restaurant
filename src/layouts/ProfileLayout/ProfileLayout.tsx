import clsx from 'clsx';
import { NavLink, Outlet, useLocation, useNavigate } from 'react-router-dom';
import { logout } from '../../services/auth/authSlice';
import { useAppDispatch } from '../../services/store';

import styles from './ProfileLayout.module.css';
import { useMemo } from 'react';

const ProfileLayout = () => {
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const location = useLocation();

  const handleLogout = async () => {
    try {
      await dispatch(logout()).unwrap();
      navigate('/login');
    } catch (err) {
      console.warn(err);
    }
  };

  const locationDescription = useMemo(() => {
    switch (location.pathname) {
      case '/profile':
        return 'В этом разделе вы можете изменить свои персональные данные';
      default:
        return 'В этом разделе вы можете просмотреть свою историю заказов';
    }
  }, [location.pathname]);

  return (
    <div className={styles.wrapper}>
      <aside>
        <NavLink
          to="/profile"
          end
          className={({ isActive }) =>
            clsx(
              'text text_type_main-medium mb-6 text_color_inactive',
              styles.navButton,
              {
                [styles.navButtonActive]: isActive,
              }
            )
          }
        >
          Профиль
        </NavLink>
        <NavLink
          to="/profile/orders"
          className={({ isActive }) =>
            clsx(
              'text text_type_main-medium mb-6 text_color_inactive',
              styles.navButton,
              {
                [styles.navButtonActive]: isActive,
              }
            )
          }
        >
          История заказов
        </NavLink>
        <p
          className={clsx(
            'text text_type_main-medium mb-6 text_color_inactive',
            styles.navButton
          )}
          onClick={handleLogout}
        >
          Выход
        </p>
        <div>
          <p
            className={clsx(
              'text text_type_main-default text_color_inactive mt-20'
            )}
          >
            {locationDescription}
          </p>
        </div>
      </aside>
      <Outlet />
    </div>
  );
};
export default ProfileLayout;
