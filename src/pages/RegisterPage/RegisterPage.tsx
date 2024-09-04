import {
  Button,
  EmailInput,
  Input,
  PasswordInput,
} from '@ya.praktikum/react-developer-burger-ui-components';

import pageStyles from '../../styles/PageStyles.module.css';
import { ChangeEvent, FormEvent, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import clsx from 'clsx';
import { useAppDispatch } from '../../services/store';
import { register } from '../../services/store/authSlice';

const RegisterPage = () => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const navigate = useNavigate();
  const dispatch = useAppDispatch();

  const onNameChange = (e: ChangeEvent<HTMLInputElement>) => {
    setName(e.target.value);
  };

  const onEmailChange = (e: ChangeEvent<HTMLInputElement>) => {
    setEmail(e.target.value);
  };

  const onPasswordChange = (e: ChangeEvent<HTMLInputElement>) => {
    setPassword(e.target.value);
  };

  const onRegister = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const res = await dispatch(
      register({
        email,
        name,
        password,
      })
    );

    if (res.meta.requestStatus === 'fulfilled') {
      navigate('/');
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
          Регистрация
        </p>
        <form className={pageStyles.centerContent} onSubmit={onRegister}>
          {/* @ts-expect-error: missing props */}
          <Input
            type={'text'}
            placeholder="Имя"
            onChange={onNameChange}
            value={name}
            name={'name'}
            size={'default'}
            extraClass="mb-6"
          />
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
            Зарегистрироваться
          </Button>
        </form>
        <div>
          <p
            className={clsx(
              'text text_type_main-default text_color_inactive mb-4',
              pageStyles.centerContent
            )}
          >
            Уже зарегистрированы?
            <Button
              htmlType="button"
              type="secondary"
              size="medium"
              onClick={() => navigate('/login')}
              extraClass={pageStyles.link}
            >
              Войти
            </Button>
          </p>
        </div>
      </div>
    </main>
  );
};
export default RegisterPage;
