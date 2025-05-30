import React, { createContext, useContext, useState, useEffect } from 'react';
import axios from 'axios';

const API_URL = process.env.REACT_APP_API_URL || 'https://ai-support-render.onrender.com';
const TOKEN_KEY = 'adminToken';

// Remove trailing slash if present
const baseURL = API_URL.endsWith('/') ? API_URL.slice(0, -1) : API_URL;

// Debug function to check token
const checkToken = () => {
    const token = localStorage.getItem(TOKEN_KEY);
    console.log('Current token:', token);
    return token;
};

const AuthContext = createContext(null);

export const useAuth = () => {
    const context = useContext(AuthContext);
    if (!context) {
        throw new Error('useAuth must be used within an AuthProvider');
    }
    return context;
};

export const AuthProvider = ({ children }) => {
    const [user, setUser] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        checkAuthStatus();
    }, []);

    const checkAuthStatus = async () => {
        try {
            const token = localStorage.getItem(TOKEN_KEY);
            console.log('Checking auth status with token:', token);
            if (!token) {
                setLoading(false);
                return;
            }

            const response = await axios.get(`${baseURL}/api/auth/check`, {
                headers: { Authorization: `Bearer ${token}` }
            });

            setUser(response.data);
            setError(null);
        } catch (err) {
            console.error('Auth check failed:', err);
            localStorage.removeItem(TOKEN_KEY);
            setUser(null);
            setError('Session expired. Please login again.');
        } finally {
            setLoading(false);
        }
    };

    const login = async (email, password) => {
        try {
            setLoading(true);
            setError(null);
            
            const response = await axios.post(`${baseURL}/api/auth/login`, {
                email,
                password
            });

            const { token, admin } = response.data;
            console.log('Login successful, setting token:', token);
            localStorage.setItem(TOKEN_KEY, token);
            setUser(admin);
            return true;
        } catch (err) {
            console.error('Login failed:', err);
            setError(err.response?.data?.message || 'Login failed. Please try again.');
            return false;
        } finally {
            setLoading(false);
        }
    };

    const logout = () => {
        console.log('Logging out, removing token'); // Debug log
        localStorage.removeItem(TOKEN_KEY);
        setUser(null);
    };

    const value = {
        user,
        loading,
        error,
        isAuthenticated: !!user,
        login,
        logout,
        checkAuthStatus,
        checkToken // Expose the debug function
    };

    return (
        <AuthContext.Provider value={value}>
            {children}
        </AuthContext.Provider>
    );
}; 