import { createSearchParams, Outlet, useLocation, useNavigate } from 'react-router-dom';
import { useAppSelector } from '../../services/store';
import { useEffect, useState } from 'react';

interface Props {
  protectFromAuthorized?: boolean;
}

const ProtectedRouteElement = ({ protectFromAuthorized }: Props) => {
  const user = useAppSelector((state) => state.authSlice.user);
  const location = useLocation();
  const navigate = useNavigate();
  const [canDisplay, setCanDisplay] = useState(false);

  useEffect(() => {
    if (user && protectFromAuthorized) {
      navigate('/', { replace: true });

      return;
    }

    if (!user && !protectFromAuthorized && location.pathname !== '/login') {
      navigate({
        pathname: '/login',
        search: createSearchParams({
          from_path: location.pathname,
        }).toString(),
      });

      return;
    }

    setCanDisplay(true);
  }, [location.pathname, user]);

  return canDisplay ? <Outlet/> : null;
};

export default ProtectedRouteElement;
