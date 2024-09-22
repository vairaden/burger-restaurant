import {
  Button,
  EmailInput,
  PasswordInput,
} from '@ya.praktikum/react-developer-burger-ui-components';
import { FormEvent, useEffect, useState } from 'react';
import { useNavigate, useSearchParams } from 'react-router-dom';

import pageStyles from '../../styles/PageStyles.module.css';
import clsx from 'clsx';
import { useAppDispatch } from '../../services/store';
import { fetchUser, login } from '../../services/store/slices/authSlice';
import Spinner from '../../components/Spinner/Spinner';
import { useForm } from '../../hooks/useForm';

const LoginPage = () => {
  const [displayLogin, setDisplayLogin] = useState(false);

  const { handleChange, formValues } = useForm({
    email: '',
    password: '',
  });

  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    try {
      await dispatch(login(formValues)).unwrap();

      navigate(searchParams.get('from_path') || '/');
    } catch (err) {
      console.warn(err);
    }
  };

  useEffect(() => {
    (async () => {
      try {
        await dispatch(fetchUser()).unwrap();
        navigate(searchParams.get('from_path') || '/');
      } catch (err) {
        console.warn(err);
        setDisplayLogin(true);
      }
    })();
  }, []);

  return (
    <main>
      <div className={pageStyles.wrapper}>
        {!displayLogin ? (
          <Spinner />
        ) : (
          <>
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
                onChange={handleChange}
                value={formValues.email}
                name="email"
                placeholder="E-mail"
                extraClass="mb-6"
              />
              <PasswordInput
                onChange={handleChange}
                value={formValues.password}
                name="password"
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
          </>
        )}
      </div>
    </main>
  );
};
export default LoginPage;
