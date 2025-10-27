import  React from 'react';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import {AuthProvider, useAuth} from "./auth/AuthProvider.tsx";
import Header from "./components/Header.tsx";
import Login from "./pages/Login.tsx";
import Home from "./pages/Home.tsx";
import Products from "./pages/Products.tsx";
import Admin from "./pages/Admin.tsx";
/* import PrivateRoute from "./routes/PrivateRoute.tsx";
import AdminRoute from "./routes/AdminRoute.tsx"; */

function RootRedirect() {
  const { user} = useAuth();
  return <Navigate to={user ? "/home" : "/login"} replace />;
}

export default function App() {
return(
  <BrowserRouter>
    <AuthProvider>
      <Header />
      <main style={{ padding: '1rem' }}>
        <Routes>
          <Route path="/" element={<RootRedirect />} />
          <Route path="/login" element={<Login />} />
          <Route path="/home" element={
            <PrivateRoute>
              <Home />
            </PrivateRoute>
          } />
          <Route path="/products" element={
            <PrivateRoute>
              <Products />
            </PrivateRoute>
          } />
          <Route path="/admin" element={
            <AdminRoute>
              <Admin />
            </AdminRoute>
          } />
          <Route path="*" element={<RootRedirect />} />
        </Routes>
      </main>
    </AuthProvider>
  </BrowserRouter>    
)
}