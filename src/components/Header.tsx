import React from "react";
import { Link } from "react-router-dom";
import { useAuth } from "../auth/AuthProvider";

const Header: React.FC = () => {
    const auth = useAuth();
    
    return (    
        <header style={{ padding: '1rem', borderBottom: '1px solid #ccc' }}>
            <nav>
                <Link to="/home" style={{ marginRight: '1rem' }}>Home</Link>
                <Link to="/products" style={{ marginRight: '1rem' }}>Products</Link>
                <Link to="/admin" style={{ marginRight: '1rem' }}>Admin</Link>

                <div style={{ float: 'right' }}>
                    {auth.isAuthenticated ? (
                        <button onClick={auth.logout}>Logout</button>
                    ) : (
                        <Link to="/login">Login</Link>
                    )}
                    <button onClick={auth.loginAsUser} style={{ marginLeft: '1rem' }}>Login as User</button>
                    <button onClick={auth.loginAsAdmin} style={{ marginLeft: '1rem' }}>Login as Admin</button>
                </div>

            </nav>
        </header>
    );
};

export default Header;