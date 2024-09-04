import { createSearchParams, useLocation, useNavigate } from 'react-router-dom';
import { useAppDispatch, useAppSelector } from '../../services/store';
import { ReactNode, useEffect, useState } from 'react';
import { User } from '../../types';
import { fetchUser } from '../../services/store/authSlice';

interface Props {
  children: ReactNode;
  protectFromAuthorized?: boolean;
}

const ProtectedRouteElement = ({ children, protectFromAuthorized }: Props) => {
  const user = useAppSelector((state) => state.authSlice.user);
  const location = useLocation();
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const [canDisplay, setCanDisplay] = useState(false);

  const checkAuth = async (pathname: string, user: User | null) => {
    if (!user && !protectFromAuthorized && pathname !== '/login') {
      const res = await dispatch(fetchUser());

      if (res.meta.requestStatus === 'rejected') {
        navigate({
          pathname: '/login',
          search: createSearchParams({
            from_path: location.pathname,
          }).toString(),
        });
      }
    }

    if (user && protectFromAuthorized) {
      navigate('/', { replace: true });
    }

    setCanDisplay(true);
  };

  useEffect(() => {
    checkAuth(location.pathname, user);
  }, [location.pathname, user]);

  return canDisplay ? <>{children}</> : null;
};

export default ProtectedRouteElement;
