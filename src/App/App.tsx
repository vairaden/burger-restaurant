import { AppHeader } from '../components/AppHeader';
import { Routes, Route, useLocation } from 'react-router-dom';
import ForgotPasswordPage from '../pages/ForgotPasswordPage/ForgotPasswordPage';
import ConstructorPage from '../pages/ConstructorPage/ConstructorPage';
import ResetPasswordPage from '../pages/ResetPasswordPage/ResetPasswordPage';
import RegisterPage from '../pages/RegisterPage/RegisterPage';
import LoginPage from '../pages/LoginPage/LoginPage';
import IngredientPage from '../pages/IngredientPage/IngredientPage';
import ProfilePage from '../pages/ProfilePage/ProfilePage';
import NotFoundPage from '../pages/NotFoundPage/NotFoundPage';
import { useAppDispatch } from '../services/store';
import { fetchIngredientsList } from '../services/store/ingredientsSlice';
import { useEffect } from 'react';
import ProtectedRouteElement from '../components/ProtectedRouteElement/ProtectedRouteElement';
import OrdersPage from '../pages/OrdersPage/OrdersPage';
import IngredientModal from '../components/IngredientModal/IngredientModal';

export const App = () => {
  const dispatch = useAppDispatch();
  const location = useLocation();

  const background = location.state?.background;

  useEffect(() => {
    dispatch(fetchIngredientsList());
  }, []);

  return (
    <div className="App">
      <AppHeader />
      <Routes location={background || location}>
        {/* protected from authorized users*/}
        <Route
          path="/forgot-password"
          element={
            <ProtectedRouteElement protectFromAuthorized>
              <ForgotPasswordPage />
            </ProtectedRouteElement>
          }
        />
        <Route
          path="/reset-password"
          element={
            <ProtectedRouteElement protectFromAuthorized>
              <ResetPasswordPage />
            </ProtectedRouteElement>
          }
        />
        <Route
          path="/login"
          element={
            <ProtectedRouteElement protectFromAuthorized>
              <LoginPage />
            </ProtectedRouteElement>
          }
        />
        <Route
          path="/register"
          element={
            <ProtectedRouteElement protectFromAuthorized>
              <RegisterPage />
            </ProtectedRouteElement>
          }
        />
        {/* protected */}
        <Route
          path="/profile"
          element={
            <ProtectedRouteElement>
              <ProfilePage />
            </ProtectedRouteElement>
          }
        />
        <Route
          path="/profile/orders"
          element={
            <ProtectedRouteElement>
              <OrdersPage />
            </ProtectedRouteElement>
          }
        />
        {/* unprotected */}
        <Route path="/" element={<ConstructorPage />} />
        <Route path="/ingredients/:id" element={<IngredientPage />} />
        <Route path="*" element={<NotFoundPage />} />
      </Routes>

      {background && (
        <Routes>
          <Route path="/ingredients/:id" element={<IngredientModal />} />
        </Routes>
      )}
    </div>
  );
};
