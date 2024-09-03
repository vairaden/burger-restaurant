import {
  createSearchParams,
  useLocation,
  useNavigate,
} from 'react-router-dom';
import { useAppSelector } from '../../services/store';
import { ReactNode, useEffect, useState } from 'react';

interface Props {
  children: ReactNode;
  protectFromAuthorized?: boolean;
}

const ProtectedRouteElement = ({ children, protectFromAuthorized }: Props) => {
  const user = useAppSelector((state) => state.authSlice.user);
  const location = useLocation();
  const navigate = useNavigate();
  const [canDisplay, setCanDisplay] = useState(false);

  useEffect(() => {
    if (!user  && !protectFromAuthorized && location.pathname !== '/login') {
      navigate({
        pathname: '/login',
        search: createSearchParams({
          from_path: location.pathname,
        }).toString(),
      });
    }

    if (user && protectFromAuthorized) {
      navigate('/', { replace: true });
    }

    setCanDisplay(true);
  }, []);

  return canDisplay ? <>{children}</> : null;
};

export default ProtectedRouteElement;
