import { useEffect, useState } from 'react';
import {isTokenValid, getUserFromToken, TOKEN_CHANGE_EVENT} from '../../utils/token.client';

export const useUser = () => {
    const [user, setUser] = useState<{ login: string } | null>(() => {
        if (isTokenValid()) {
            return getUserFromToken();
        }
        return null;
    });

    useEffect(() => {
        const updateUser = () => {
            if (isTokenValid()) {
                const userData = getUserFromToken();
                setUser(userData);
            } else {
                setUser(null);
            }
        };

        // Обновляем при монтировании
        updateUser();

        // Подписываемся на события изменения токена
        window.addEventListener(TOKEN_CHANGE_EVENT, updateUser);

        return () => {
            window.removeEventListener(TOKEN_CHANGE_EVENT, updateUser);
        };
    }, []);

    return user;
};