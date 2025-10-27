import React, { createContext, useContext, useState } from "react";
import type { ReactNode } from "react";

type User = {
    name: string;
    roles: string[];
} | null;

type AuthContextType = {
    user: User;
    loginAsUser: () => void;
    loginAsAdmin: () => void;
    logout: () => void;
    isAuthenticated: boolean;
    hasRole: (role:string) => boolean;
};
const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const useAuth = (): AuthContextType => {
    const context = useContext(AuthContext);
    if (!context) {
        throw new Error("useAuth must be used within an AuthProvider");
    }
    return context;
};

export const AuthProvider: React.FC<{children: ReactNode}> = ({ children }) => {
    const [user, setUser] = useState<User>(null);
    
    const loginAsUser = () => {
        setUser({ name: "UsuarioHardcodeado", roles: ["USER"] });
    };
    const loginAsAdmin = () => {
        setUser({ name: "AdminHardcodeado", roles: ["USER", "ADMIN"] });
    };
    const logout = () => {
        setUser(null);
    };
    const isAuthenticated = !user;
    const hasRole = (role: string) =>{
        return !!user && user.roles.includes(role);         
    } ;

    return (
        <AuthContext.Provider value={{ user, loginAsUser, loginAsAdmin, logout, isAuthenticated, hasRole }}>
            {children}
        </AuthContext.Provider>
    );
}