import { useLocation, useNavigate } from 'react-router-dom';
import { Modal } from '../Modal';
import OrderDetails from '../OrderDetails/OrderDetails';

const OrderModal = () => {
  const location = useLocation();
  const navigate = useNavigate();

  const onClose = () => {
    navigate(location.state.background || '/');
  };

  return (
    <Modal onClose={onClose}>
      <OrderDetails />
    </Modal>
  );
};
export default OrderModal;
