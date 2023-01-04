import { useState, createContext, useContext, useMemo } from "react";
import { useNavigate } from "react-router-dom";
import { useLocalStorage } from "./useLocalStorage";

const AuthContext = createContext();

export const AuthProvider = ({children}) => {
    const [user, setUser] = useLocalStorage("username", null);
    const [token, setToken] = useLocalStorage("userToken", null);
    const navigate = useNavigate();

    const login = async(username, token) => {
        setUser(username);
        setToken(token);
        setTimeout(() => 
            navigate("/account/profile")
        , 800);
    };

    const logout = () => {
        setUser(null);
        setToken(null);
    };


    const value = useMemo(() => ({
        user,
        token,
        login,
        logout,
    }), [user]);

    return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};

export const useAuth = () => {
    return useContext(AuthContext);
};