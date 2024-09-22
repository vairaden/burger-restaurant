import { useParams } from 'react-router-dom';
import { IngredientDetails } from '../../components/IngredientDetails';
import { useAppSelector } from '../../services/store';
import { useMemo } from 'react';

import pageStyles from '../../styles/PageStyles.module.css';

const IngredientPage = () => {
  const { id } = useParams();

  const { ingredients } = useAppSelector((state) => state.ingredientsSlice);

  const selectedIngredient = useMemo(() => {
    if (!id) {
      return undefined;
    }

    return ingredients[id];
  }, [id, ingredients]);

  return (
    <main>
      <div className={pageStyles.wrapper}>
        {selectedIngredient && (
          <IngredientDetails ingredient={selectedIngredient} />
        )}
      </div>
    </main>
  );
};

export default IngredientPage;
