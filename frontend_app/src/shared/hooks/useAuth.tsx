import { useEffect, useState } from 'react';
import { isTokenValid, clearToken, getToken } from '../../utils/token.client';
import { useNavigate } from 'react-router-dom';

export const useAuth = () => {
    const [isAuthenticated, setIsAuthenticated] = useState<boolean>(() => isTokenValid());
    const navigate = useNavigate();

    useEffect(() => {
        if (!isTokenValid()) {
            clearToken();
            setIsAuthenticated(false);
            navigate('/login');
        } else {
            setIsAuthenticated(true);
        }
    }, []);

    return { isAuthenticated, token: getToken() };
};