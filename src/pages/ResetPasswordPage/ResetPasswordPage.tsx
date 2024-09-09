import {
  Button,
  Input,
  PasswordInput,
} from '@ya.praktikum/react-developer-burger-ui-components';

import pageStyles from '../../styles/PageStyles.module.css';
import { ChangeEvent, FormEvent, useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import clsx from 'clsx';
import { useAppDispatch, useAppSelector } from '../../services/store';
import { resetPassword } from '../../services/store/passwordSlice';

const ResetPasswordPage = () => {
  const [code, setCode] = useState('');
  const [password, setPassword] = useState('');

  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const emailCodeSent = useAppSelector(
    (store) => store.passwordSlice.emailCodeSent
  );

  const onCodeChange = (e: ChangeEvent<HTMLInputElement>) => {
    setCode(e.target.value);
  };

  const onPasswordChange = (e: ChangeEvent<HTMLInputElement>) => {
    setPassword(e.target.value);
  };

  const onSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const res = await dispatch(
      resetPassword({
        token: code,
        password,
      })
    );

    if (res.meta.requestStatus === 'fulfilled') {
      navigate('/profile');
    }
  };

  useEffect(() => {
    if (!emailCodeSent) {
      navigate('/forgot-password');
    }
  }, [emailCodeSent, navigate]);

  if (!emailCodeSent) {
    return null;
  }

  return (
    <main>
      <div className={pageStyles.wrapper}>
        <p
          className={clsx(
            'text text_type_main-medium mb-6',
            pageStyles.centerContent
          )}
        >
          Восстановление пароля
        </p>
        <form className={pageStyles.centerContent} onSubmit={onSubmit}>
          <PasswordInput
            onChange={onPasswordChange}
            value={password}
            name={'password'}
            placeholder="Введите новый пароль"
            extraClass="mb-6"
          />
          {/* @ts-expect-error: missing props */}
          <Input
            type={'text'}
            placeholder="Введите код из письма"
            onChange={onCodeChange}
            value={code}
            name={'code'}
            size={'default'}
            extraClass="mb-6"
          />

          <Button
            htmlType="submit"
            type="primary"
            size="medium"
            extraClass="mb-20"
          >
            Сохранить
          </Button>
        </form>
        <div>
          <p
            className={clsx(
              'text text_type_main-default text_color_inactive mb-4',
              pageStyles.centerContent
            )}
          >
            Вспомнили пароль?
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
export default ResetPasswordPage;
