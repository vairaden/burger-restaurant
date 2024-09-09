import {
  Button,
  EmailInput,
  Input,
  PasswordInput,
} from '@ya.praktikum/react-developer-burger-ui-components';

import pageStyles from '../../styles/PageStyles.module.css';
import { FormEvent } from 'react';
import { useNavigate } from 'react-router-dom';
import clsx from 'clsx';
import { useAppDispatch } from '../../services/store';
import { register } from '../../services/store/authSlice';
import { useForm } from '../../hooks/useForm';

const RegisterPage = () => {
  const navigate = useNavigate();
  const dispatch = useAppDispatch();

  const { formValues, handleChange } = useForm({
    name: '',
    email: '',
    password: '',
  });

  const onRegister = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    try {
      await dispatch(register(formValues)).unwrap();
      navigate('/');
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
          Регистрация
        </p>
        <form className={pageStyles.centerContent} onSubmit={onRegister}>
          <Input
            type="text"
            placeholder="Имя"
            onChange={handleChange}
            value={formValues.name}
            name="name"
            extraClass="mb-6"
            onPointerEnterCapture={undefined}
            onPointerLeaveCapture={undefined}
          />
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
