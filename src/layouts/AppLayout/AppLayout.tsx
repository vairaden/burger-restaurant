import { AppHeader } from '../../components/AppHeader';
import { Outlet } from 'react-router-dom';

const AppLayout = () => {
  return (
    <>
      <AppHeader />
      <Outlet/>
    </>
  );
};
export default AppLayout;
