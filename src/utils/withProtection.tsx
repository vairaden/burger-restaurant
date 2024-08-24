import { Navigate } from 'react-router-dom';

function withProtection<P>(Component: any) {
  const isAuth = true;

    return (props: P) => {
      return isAuth ? <Component {...props}/> : <Navigate to="/login" />;
    }
};
export default withProtection;
