import {
  EmailInput,
  PasswordInput,
  Input,
  Button,
} from '@ya.praktikum/react-developer-burger-ui-components';
import { ChangeEvent, FormEvent, useEffect, useMemo, useState } from 'react';

import pageStyles from '../../styles/PageStyles.module.css';
import styles from './ProfilePage.module.css';

import clsx from 'clsx';
import { NavLink, useNavigate } from 'react-router-dom';
import { store, useAppDispatch, useAppSelector } from '../../services/store';
import { fetchUser, logout, updateUser } from '../../services/store/authSlice';

const ProfilePage = () => {
  const [name, setName] = useState(() => {
    return store.getState().authSlice.user?.name || '';
  });
  const [email, setEmail] = useState(() => {
    return store.getState().authSlice.user?.email || '';
  });
  const [password, setPassword] = useState('');

  const dispatch = useAppDispatch();
  const navigate = useNavigate();

  const user = useAppSelector((state) => state.authSlice.user);

  const onNameChange = (e: ChangeEvent<HTMLInputElement>) => {
    setName(e.target.value);
  };

  const onEmailChange = (e: ChangeEvent<HTMLInputElement>) => {
    setEmail(e.target.value);
  };

  const onPasswordChange = (e: ChangeEvent<HTMLInputElement>) => {
    setPassword(e.target.value);
  };

  const handleLogout = async () => {
    await dispatch(logout());

    navigate('/login');
  };

  const fetchUserData = async () => {
    await dispatch(fetchUser());
  };

  const displayControls = useMemo(() => {
    return name !== user?.name || email !== user?.email || password !== '';
  }, [email, name, password, user?.email, user?.name]);

  const resetForm = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    setName(user?.name || '');
    setEmail(user?.email || '');
    setPassword('');
  };

  const onProfileUpdate = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    await dispatch(
      updateUser({
        email,
        name,
        password,
      })
    );

    setName(user?.name || '');
    setEmail(user?.email || '');
    setPassword('');
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
            {/* @ts-expect-error: missing props */}
            <Input
              type={'text'}
              placeholder="Имя"
              onChange={onNameChange}
              value={name}
              name={'name'}
              size={'default'}
              extraClass="mb-6"
              icon="EditIcon"
            />
            <EmailInput
              onChange={onEmailChange}
              value={email}
              name={'email'}
              placeholder="E-mail"
              extraClass="mb-6"
              isIcon
            />
            <PasswordInput
              onChange={onPasswordChange}
              value={password}
              name={'password'}
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
