import {
  Button,
  EmailInput,
} from '@ya.praktikum/react-developer-burger-ui-components';

import pageStyles from '../../styles/PageStyles.module.css';
import { ChangeEvent, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import clsx from 'clsx';
import { useAppDispatch } from '../../services/store';
import { sendResetEmail } from '../../services/store/passwordSlice';

const ForgotPasswordPage = () => {
  const [email, setEmail] = useState('');

  const navigate = useNavigate();
  const dispatch = useAppDispatch();

  const onEmailChange = (e: ChangeEvent<HTMLInputElement>) => {
    setEmail(e.target.value);
  };

  const onSubmit = async () => {
    try {
      await dispatch(
        sendResetEmail({
          email,
        })
      ).unwrap();

      navigate('/reset-password');
    } catch (err) {
      console.warn(err);
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
          Восстановление пароля
        </p>
        <form className={pageStyles.centerContent} onSubmit={onSubmit}>
          <EmailInput
            onChange={onEmailChange}
            value={email}
            name={'email'}
            placeholder="Укажите e-mail"
            extraClass="mb-6"
          />
          <Button
            htmlType="submit"
            type="primary"
            size="medium"
            extraClass="mb-20"
          >
            Восстановить
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
export default ForgotPasswordPage;
