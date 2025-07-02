import {api} from "../../../utils/api/configAPI.ts";
import type {LoginType, RegisterType} from "../type/authType.ts";

export const registerAPI = async (userData: RegisterType): Promise<unknown> => {
    try {
        const response = await api.post("/api/register", userData);
        if (response.status >= 200 && response.status < 300) {
            return response.data;
        }
        throw new Error(`Request failed with status ${response.status}: ${response.statusText}`);
    } catch (error) {
        const errorMessage = error instanceof Error
            ? error.message
            : 'Unknown registration error';

        return {
            success: false,
            error: errorMessage,
            details: error.response?.data || null
        };
    }
}

export const loginAPI = async (userData: LoginType): Promise<unknown> => {
    try {
        const response = await api.post("/api/login", userData);
        if (response.status >= 200 && response.status < 300) {
            return response.data;
        }
        throw new Error(`Request failed with status ${response.status}: ${response.statusText}`);
    } catch (error) {
        const errorMessage = error instanceof Error
            ? error.message
            : 'Unknown login error';

        return {
            success: false,
            error: errorMessage,
            details: error.response?.data || null
        };
    }
}

