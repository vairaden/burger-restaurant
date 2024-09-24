import { useMemo } from 'react';
import { IngredientDetails } from '../IngredientDetails';
import { Modal } from '../Modal';
import { useAppSelector } from '../../services/store';
import { useLocation, useNavigate, useParams } from 'react-router-dom';

const IngredientModal = () => {
  const { id } = useParams();
  const location = useLocation();
  const navigate = useNavigate();

  const { ingredients } = useAppSelector((state) => state.ingredients);

  const selectedIngredient = useMemo(() => {
    if (!id) {
      return undefined;
    }

    return ingredients[id];
  }, [id, ingredients]);

  if (!selectedIngredient) {
    return null;
  }

  const onClose = () => {
    navigate(location.state.background || '/');
  };

  return (
    <Modal onClose={onClose}>
      <IngredientDetails ingredient={selectedIngredient} />
    </Modal>
  );
};
export default IngredientModal;
