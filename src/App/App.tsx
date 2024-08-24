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

export const App = () => {
  return (
    <div className="App">
      <BrowserRouter>
        <AppHeader />
        <Routes>
          <Route path="/forgot-password" element={<ForgotPasswordPage />} />
          <Route path="/" element={<ConstructorPage />} />
          <Route path="/reset-password" element={<ResetPasswordPage />} />
          <Route path="/login" element={<LoginPage />} />
          <Route path="/register" element={<RegisterPage />} />
          <Route path="/profile" element={<ProfilePage />} />
          <Route path="/ingredients/:id" element={<IngredientPage />} />
          <Route path="*" element={<NotFoundPage />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
};
