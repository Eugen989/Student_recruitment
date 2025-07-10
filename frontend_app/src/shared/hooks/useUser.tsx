import { useEffect, useState } from 'react';
import {isTokenValid, getUserFromToken, TOKEN_CHANGE_EVENT} from '../../utils/token.client';

type User = {
    login: string;
    role: string;
} | null;

export const useUser = () => {
    const [user, setUser] = useState<User>(() => {
        if (isTokenValid()) {
            return getUserFromToken();
        }
        return null;
    });

    useEffect(() => {
        const updateUser = () => {
            if (isTokenValid()) {
                setUser(getUserFromToken());
            } else {
                setUser(null);
            }
        };

        updateUser();
        window.addEventListener(TOKEN_CHANGE_EVENT, updateUser);

        return () => {
            window.removeEventListener(TOKEN_CHANGE_EVENT, updateUser);
        };
    }, []);

    return user;
};