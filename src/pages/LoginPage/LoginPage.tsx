import {
  Button,
  EmailInput,
  PasswordInput,
} from '@ya.praktikum/react-developer-burger-ui-components';
import { ChangeEvent, FormEvent, useState } from 'react';
import { useNavigate, useSearchParams } from 'react-router-dom';

import pageStyles from '../../styles/PageStyles.module.css';
import clsx from 'clsx';
import { useAppDispatch } from '../../services/store';
import { login } from '../../services/store/authSlice';

const LoginPage = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();

  const onEmailChange = (e: ChangeEvent<HTMLInputElement>) => {
    setEmail(e.target.value);
  };

  const onPasswordChange = (e: ChangeEvent<HTMLInputElement>) => {
    setPassword(e.target.value);
  };

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const res = await dispatch(
      login({
        email,
        password,
      })
    );

    if (res.meta.requestStatus === 'fulfilled') {
      navigate(searchParams.get('from_path') || '/');
    }
  };

  return (
    <main>
      <div className={pageStyles.wrapper}>
        <p
          className={clsx(
            'text text_type_main-medium mb-6',
            pageStyles.centerContent
          )}
        >
          Вход
        </p>
        <form className={pageStyles.centerContent} onSubmit={handleSubmit}>
          <EmailInput
            onChange={onEmailChange}
            value={email}
            name={'email'}
            placeholder="E-mail"
            extraClass="mb-6"
          />
          <PasswordInput
            onChange={onPasswordChange}
            value={password}
            name={'password'}
            placeholder="Пароль"
            extraClass="mb-6"
          />
          <Button
            htmlType="submit"
            type="primary"
            size="medium"
            extraClass="mb-20"
          >
            Войти
          </Button>
        </form>
        <div>
          <p
            className={clsx(
              'text text_type_main-default text_color_inactive mb-4',
              pageStyles.centerContent
            )}
          >
            Вы — новый пользователь?
            <Button
              htmlType="button"
              type="secondary"
              size="medium"
              onClick={() => navigate('/register')}
              extraClass={pageStyles.link}
            >
              Зарегистрироваться
            </Button>
          </p>
          <p
            className={clsx(
              'text text_type_main-default text_color_inactive',
              pageStyles.centerContent
            )}
          >
            Забыли пароль?
            <Button
              htmlType="button"
              type="secondary"
              size="medium"
              onClick={() => navigate('/forgot-password')}
              extraClass={pageStyles.link}
            >
              Восстановить пароль
            </Button>
          </p>
        </div>
      </div>
    </main>
  );
};
export default LoginPage;
