import { AppHeader } from '../components/AppHeader';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
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

export const App = () => {
  const dispatch = useAppDispatch();

  useEffect(() => {
    dispatch(fetchIngredientsList());
  }, []);

  return (
    <div className="App">
      <BrowserRouter>
        <AppHeader />
        <Routes>
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
          {/* unprotected */}
          <Route path="/" element={<ConstructorPage />} />
          <Route path="/ingredients/:id" element={<IngredientPage />} />
          <Route path="*" element={<NotFoundPage />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
};
