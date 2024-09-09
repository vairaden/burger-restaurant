import {
  EmailInput,
  PasswordInput,
  Input,
  Button,
} from '@ya.praktikum/react-developer-burger-ui-components';
import { FormEvent, useEffect, useMemo } from 'react';

import pageStyles from '../../styles/PageStyles.module.css';
import styles from './ProfilePage.module.css';

import clsx from 'clsx';
import { NavLink, useNavigate } from 'react-router-dom';
import { store, useAppDispatch, useAppSelector } from '../../services/store';
import { fetchUser, logout, updateUser } from '../../services/store/authSlice';
import { useForm } from '../../hooks/useForm';

const ProfilePage = () => {
  const { formValues, setFormValues, handleChange } = useForm(() => ({
    name: store.getState().authSlice.user?.name || '',
    email: store.getState().authSlice.user?.email || '',
    password: '',
  }));

  const dispatch = useAppDispatch();
  const navigate = useNavigate();

  const user = useAppSelector((state) => state.authSlice.user);

  const handleLogout = async () => {
    try {
      await dispatch(logout()).unwrap();
      navigate('/login');
    } catch (err) {
      console.warn(err);
    }
  };

  const fetchUserData = async () => {
    await dispatch(fetchUser());
  };

  const displayControls = useMemo(() => {
    return (
      formValues.name !== user?.name ||
      formValues.email !== user?.email ||
      formValues.password !== ''
    );
  }, [
    formValues.email,
    formValues.name,
    formValues.password,
    user?.email,
    user?.name,
  ]);

  const resetForm = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    setFormValues({
      name: user?.name || '',
      email: user?.email || '',
      password: '',
    });
  };

  const onProfileUpdate = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    try {
      const { user: newUserData } = await dispatch(
        updateUser(formValues)
      ).unwrap();

      setFormValues({
        name: newUserData.name,
        email: newUserData.email,
        password: '',
      });
    } catch (err) {
      console.warn(err);
    }
  };

  useEffect(() => {
    fetchUserData();
  }, []);

  return (
    <main>
      <div className={styles.wrapper}>
        <div>
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
              В этом разделе вы можете изменить свои персональные данные
            </p>
          </div>
        </div>
        <div>
          <form
            className={pageStyles.centerContent}
            onSubmit={onProfileUpdate}
            onReset={resetForm}
          >
            <Input
              type="text"
              placeholder="Имя"
              onChange={handleChange}
              value={formValues.name}
              name="name"
              extraClass="mb-6"
              icon="EditIcon"
              onPointerEnterCapture={undefined}
              onPointerLeaveCapture={undefined}
            />
            <EmailInput
              onChange={handleChange}
              value={formValues.email}
              name="email"
              placeholder="E-mail"
              extraClass="mb-6"
              isIcon
            />
            <PasswordInput
              onChange={handleChange}
              value={formValues.password}
              name="password"
              placeholder="Пароль"
              extraClass="mb-6"
              icon="EditIcon"
            />
            {displayControls && (
              <>
                <Button
                  htmlType="submit"
                  type="primary"
                  size="medium"
                  extraClass="mb-20"
                >
                  Сохранить
                </Button>
                <Button
                  htmlType="reset"
                  type="secondary"
                  size="medium"
                  extraClass="mb-20"
                >
                  Отмена
                </Button>
              </>
            )}
          </form>
        </div>
      </div>
    </main>
  );
};

export default ProfilePage;
