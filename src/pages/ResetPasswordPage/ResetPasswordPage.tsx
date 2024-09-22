import {
  Button,
  Input,
  PasswordInput,
} from '@ya.praktikum/react-developer-burger-ui-components';

import pageStyles from '../../styles/PageStyles.module.css';
import { FormEvent, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import clsx from 'clsx';
import { useAppDispatch, useAppSelector } from '../../services/store';
import { resetPassword } from '../../services/store/slices/passwordSlice';
import { useForm } from '../../hooks/useForm';

const ResetPasswordPage = () => {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();

  const { formValues, handleChange } = useForm({
    token: '',
    password: '',
  });

  const emailCodeSent = useAppSelector(
    (store) => store.passwordSlice.emailCodeSent
  );

  const onSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    try {
      await dispatch(resetPassword(formValues)).unwrap();
      navigate('/profile');
    } catch (err) {
      console.warn(err);
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
            onChange={handleChange}
            value={formValues.password}
            name="password"
            placeholder="Введите новый пароль"
            extraClass="mb-6"
          />
          <Input
            type="text"
            placeholder="Введите код из письма"
            onChange={handleChange}
            value={formValues.token}
            name="token"
            extraClass="mb-6"
            onPointerEnterCapture={undefined}
            onPointerLeaveCapture={undefined}
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
