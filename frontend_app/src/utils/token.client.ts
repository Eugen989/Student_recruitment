const TOKEN_KEY = 'auth_token';
const TOKEN_EXPIRE_KEY = 'auth_token_expire';
export const TOKEN_CHANGE_EVENT = 'token-change';

export const dispatchTokenChange = () => {
    window.dispatchEvent(new Event(TOKEN_CHANGE_EVENT));
};

export const setToken = (token: string, expiresInSeconds: number) => {
    const expireAt = Date.now() + expiresInSeconds * 1000;
    localStorage.setItem(TOKEN_KEY, token);
    localStorage.setItem(TOKEN_EXPIRE_KEY, expireAt.toString());
    dispatchTokenChange(); // Уведомляем об изменении
};

export const getToken = () => localStorage.getItem(TOKEN_KEY);

export const isTokenValid = () => {
    const expireAt = localStorage.getItem(TOKEN_EXPIRE_KEY);
    if (!expireAt) return false;
    return Date.now() < Number(expireAt);
};

export const clearToken = () => {
    localStorage.removeItem(TOKEN_KEY);
    localStorage.removeItem(TOKEN_EXPIRE_KEY);
    dispatchTokenChange();
};

export const getUserFromToken = (): { login: string } | null => {
    const token = getToken();
    if (!token) return null;

    const [, payload] = token.split('.');
    if (!payload) return null;

    try {
        const decoded = JSON.parse(atob(payload));
        console.log(decoded);
        return { login: decoded.email };
    } catch (e) {
        return null;
    }
};