import {
  EmailInput,
  PasswordInput,
  Input,
} from '@ya.praktikum/react-developer-burger-ui-components';
import { ChangeEvent, useState } from 'react';

import pageStyles from '../../styles/PageStyles.module.css';
import styles from './ProfilePage.module.css';

import clsx from 'clsx';

const ProfilePage = () => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const onNameChange = (e: ChangeEvent<HTMLInputElement>) => {
    setName(e.target.value);
  };

  const onEmailChange = (e: ChangeEvent<HTMLInputElement>) => {
    setEmail(e.target.value);
  };

  const onPasswordChange = (e: ChangeEvent<HTMLInputElement>) => {
    setPassword(e.target.value);
  };
  return (
    <main>
      <div className={styles.wrapper}>
        <div>
          <p
            className={clsx('text text_type_main-medium mb-6', {
              text_color_inactive: false,
            })}
          >
            Профиль
          </p>
          <p
            className={clsx(
              'text text_type_main-medium mb-6',
              'text_color_inactive'
            )}
          >
            История заказов
          </p>
          <p
            className={clsx(
              'text text_type_main-medium mb-6',
              'text_color_inactive'
            )}
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
          <form className={pageStyles.centerContent}>
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
          </form>
        </div>
      </div>
    </main>
  );
};

export default ProfilePage;
