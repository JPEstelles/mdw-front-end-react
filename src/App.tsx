import  React from 'react';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import {AuthProvider, useAuth} from "./auth/AuthProvider.tsx";
import Header from "./components/Header.tsx";
import Login from "./pages/Login.tsx";
import Home from "./pages/Home.tsx";
import Products from "./pages/Products.tsx";
import Admin from "./pages/Admin.tsx";
import ProtectedRoutes from './routes/ProtectedRoutes.tsx';


function RootRedirect() {
  const { user} = useAuth();
  return <Navigate to={user ? "/home" : "/login"} replace />;
}

const AppRoutes: React.FC = () => {
  return (
    <Routes>
      <Route path="/" element={<RootRedirect />} />
      <Route path="/login" element={<Login />} />
      <Route path="/home" element={
        <ProtectedRoutes>
          <Home />
        </ProtectedRoutes>
      } />  
      <Route path="/products" element={
        <ProtectedRoutes>
          <Products />
        </ProtectedRoutes>
      } />
      <Route path="/admin" element={
        <ProtectedRoutes requiredRole="admin">
          <Admin />
        </ProtectedRoutes>
      } />
      <Route path="*" element={<Navigate to="/" replace />} />
    </Routes>
  );
}
const App: React.FC = () => {
  return (
    <AuthProvider>
      <BrowserRouter>
        <Header />
        <AppRoutes />
      </BrowserRouter>
    </AuthProvider>
  );
}

export default App;