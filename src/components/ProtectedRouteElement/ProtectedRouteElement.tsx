import { Navigate, useLocation } from 'react-router-dom';
import { useAppSelector } from '../../services/store';
import { ReactNode } from 'react';

interface Props {
  children: ReactNode;
  protectFromAuthorized?: boolean;
}

const ProtectedRouteElement = ({ children, protectFromAuthorized }: Props) => {
  const user = useAppSelector((state) => state.authSlice.user);
  const location = useLocation();

  if (!user) {
    return <Navigate to={`/login?from_url=${location.pathname}`} replace />;
  }

  if (protectFromAuthorized) {
    return <Navigate to="/" replace />;

  }

  return <>{children}</>;
};

export default ProtectedRouteElement;
