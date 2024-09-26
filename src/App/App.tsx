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
import { fetchIngredientsList } from '../services/ingredients/ingredientsSlice';
import { useEffect } from 'react';
import ProtectedRouteElement from '../components/ProtectedRouteElement/ProtectedRouteElement';
import OrdersPage from '../pages/OrdersPage/OrdersPage';
import IngredientModal from '../components/IngredientModal/IngredientModal';
import AppLayout from '../layouts/AppLayout/AppLayout';
import ProfileLayout from '../layouts/ProfileLayout/ProfileLayout';
import FeedPage from '../pages/FeedPage/FeedPage';
import OrderModal from '../components/OrderModal/OrderModal';
import OrderDetailsPage from '../pages/OrderDetailsPage/OrderDetailsPage';

export const App = () => {
  const dispatch = useAppDispatch();
  const location = useLocation();

  const background = location.state?.background;

  useEffect(() => {
    dispatch(fetchIngredientsList());
  }, []);

  return (
    <div id="app">
      <Routes location={background || location}>
        <Route path="/" element={<AppLayout />}>
          {/* unprotected */}
          <Route index element={<ConstructorPage />} />
          <Route path="/ingredients/:id" element={<IngredientPage />} />
          <Route path="/feed" element={<FeedPage />} />
          <Route path="/feed/:id" element={<OrderDetailsPage />} />

          {/* protected from authorized users*/}
          <Route
            path="/"
            element={<ProtectedRouteElement protectFromAuthorized />}
          >
            <Route path="/forgot-password" element={<ForgotPasswordPage />} />
            <Route path="/reset-password" element={<ResetPasswordPage />} />
            <Route path="/login" element={<LoginPage />} />
            <Route path="/register" element={<RegisterPage />} />
          </Route>

          {/* protected */}
          <Route path="/" element={<ProtectedRouteElement />}>
            <Route path="/profile" element={<ProfileLayout />}>
              <Route path="/profile" element={<ProfilePage />} />
              <Route path="/profile/orders" element={<OrdersPage />} />
            </Route>
            <Route path="/profile/orders/:id" element={<OrderDetailsPage />} />
          </Route>

          {/* 404 */}
          <Route path="*" element={<NotFoundPage />} />
        </Route>
      </Routes>

      {background && (
        <Routes>
          <Route path="/ingredients/:id" element={<IngredientModal />} />
          <Route path="/feed/:id" element={<OrderModal />} />
          <Route path="/" element={<ProtectedRouteElement />}>
            <Route path="/profile/orders/:id" element={<OrderModal />} />
          </Route>
        </Routes>
      )}
    </div>
  );
};
