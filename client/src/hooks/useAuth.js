// hooks/useAuth.js
import { useState } from 'react';
import useAuthStore from '../store/authStore';
import api from '../utils/api';

const useAuth = () => {
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);
    const { setUser, setAuthenticated, clearAuth } = useAuthStore();

    const register = async(formData) => {
        setLoading(true);
        setError(null);
        try {
            const data = await api.auth.register(formData);
            localStorage.setItem('token', data.token);
            setUser(data.user);
            setAuthenticated(true);
            return data;
        } catch (err) {
            setError(err.message || 'Registration failed');
            throw err;
        } finally {
            setLoading(false);
        }
    };

    const login = async(credentials) => {
        setLoading(true);
        setError(null);
        try {
            const data = await api.auth.login(credentials);
            localStorage.setItem('token', data.token);
            setUser(data.user);
            setAuthenticated(true);
            return data;
        } catch (err) {
            setError(err.message || 'Login failed');
            throw err;
        } finally {
            setLoading(false);
        }
    };

    const logout = () => {
        setLoading(true);
        try {
            localStorage.removeItem('token'); // Remove token
            clearAuth(); // Clear auth state
            setError(null);
        } catch (err) {
            console.error('Logout error:', err);
        } finally {
            setLoading(false);
        }
    };

    const verifyEmail = async(token) => {
        if (!token) return null;

        setLoading(true);
        setError(null);

        try {
            const data = await api.auth.verifyEmail(token);
            return data;
        } catch (err) {
            const errorMessage = err.message || 'Email verification failed';
            setError(errorMessage);
            throw new Error(errorMessage);
        } finally {
            setLoading(false);
        }
    };

    return {
        loading,
        error,
        register,
        login,
        logout,
        verifyEmail
    };
};

export default useAuth;