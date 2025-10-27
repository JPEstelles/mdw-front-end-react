import React, { type JSX } from "react";
import { Navigate, useLocation } from "react-router-dom";
import { useAuth } from "../auth/AuthProvider";

type ProtectedRoutesProps = {
    // El componente hijo a renderizar si pasa las validaciones
    // Nota: JSX.Element implica un único elemento. Si quieres permitir fragmentos o arrays, usa React.ReactNode.
    children: JSX.Element;
    // Rol requerido para acceder a la ruta (opcional)
    requiredRole?: string;
};

const ProtectedRoutes: React.FC<ProtectedRoutesProps> = ({ children, requiredRole }) => {
    // Hook de autenticación propio de la app (debe exponer isAuthenticated y hasRole)    
    const auth = useAuth();
    // Hook para obtener la ubicación actual (se usa para recordar a dónde volver tras login)
    const location = useLocation();
    // Si no está autenticado, redirige a /login y guarda la ubicación previa en el estado
    // 'replace' evita agregar una nueva entrada al historial (mejor UX al volver)
    if (!auth.isAuthenticated) {
        return <Navigate to="/login" state={{ from: location }} replace />;
    }
    // Si se exige un rol y el usuario no lo tiene, redirige a /home
    if (requiredRole && !auth.hasRole(requiredRole)) {
        return <Navigate to="/home" replace />;
    }
    // Si está autenticado (y con rol válido), muestra el contenido protegido
    return children;
};

export default ProtectedRoutes;

//Es un componente de protección de rutas.
//Si el usuario no está autenticado, redirige a /login y guarda la ruta actual en state.from para volver después del login.
//Si se especifica un requiredRole y el usuario no lo tiene, redirige a /home.
//Si pasa las validaciones, renderiza el children (el componente protegido).