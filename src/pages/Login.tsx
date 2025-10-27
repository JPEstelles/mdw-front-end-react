import React, { useEffect } from "react";
import { useAuth } from "../auth/AuthProvider";
import { useNavigate } from "react-router-dom";

const login: React.FC = () => {
    const auth = useAuth();
    const navigate = useNavigate();

    useEffect(() => {
        if (auth.isAuthenticated) {
            // Si ya está autenticado, redirige a /home
            navigate("/home", { replace: true });
        }
    }, [auth.isAuthenticated, navigate]);
    
    const handleUserLogin = () => {
        auth.loginAsUser();
        navigate("/home", { replace: true });
    };  
    const handleAdminLogin = () => {
        auth.loginAsAdmin();
        navigate("/home", { replace: true });
    };
    
    return (
        <div>
            <h2>Login Page</h2>
            <button onClick={handleUserLogin}>Login as User</button>
            <button onClick={handleAdminLogin}>Login as Admin</button>
        </div>
    );
};
export default login;
