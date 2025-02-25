import React, { createContext, useState } from 'react';
import { useNavigate } from 'react-router-dom';

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
    const [user, setUser] = useState(null);
    const navigate = useNavigate();

    const login = (email, password) => {
        const userData = { email }; 
        setUser(userData);
        navigate('/dashboard'); 
    };

    const register = (email, password) => {
        const newUser = { email };
        setUser(newUser);
        navigate('/dashboard'); 
    };

    const logout = () => {
        setUser(null);
        navigate('/login'); 
    };

    return (
        <AuthContext.Provider value={{ user, login, register, logout }}>
            {children}
        </AuthContext.Provider>
    );
};
