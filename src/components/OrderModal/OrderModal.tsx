import { useLocation, useNavigate, useParams } from 'react-router-dom';
import { useAppSelector } from '../../services/store';
import { Modal } from '../Modal';

const OrderModal = () => {
  const { id } = useParams();
  const location = useLocation();
  const navigate = useNavigate();

  const onClose = () => {
    navigate(location.state.background || '/');
  };
  return <Modal onClose={onClose}>{id}</Modal>;
};
export default OrderModal;
