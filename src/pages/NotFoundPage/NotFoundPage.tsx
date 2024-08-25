import { Button } from '@ya.praktikum/react-developer-burger-ui-components';
import { useNavigate } from 'react-router-dom';

import pageStyles from '../../styles/PageStyles.module.css';
import clsx from 'clsx';

const NotFoundPage = () => {
  const navigate = useNavigate();

  return (
    <main>
      <div className={pageStyles.wrapper}>
        <p
          className={clsx(
            'text text_type_digits-large',
            pageStyles.centerContent
          )}
        >
          404
        </p>
        <p
          className={clsx(
            'text text_type_main-medium mb-6',
            pageStyles.centerContent
          )}
        >
          Тут ничего нет
        </p>
        <Button
          onClick={() => navigate('/')}
          htmlType="button"
          type="primary"
          size="medium"
          extraClass="mb-20"
        >
          Вернуться
        </Button>
      </div>
    </main>
  );
};
export default NotFoundPage;
