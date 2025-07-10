import axios from 'axios';
import type {ApiError} from "../../features/auth/type/typeAuth.types.ts";

export const api = axios.create({
    baseURL: `${import.meta.env.VITE_API_URL || 'http://localhost:5000/api'}`,
    timeout: 5000,
})

export const apiRequest = async <RequestData = any, ResponseData = any>(
    url: string,
    method: 'get' | 'post' | 'put' | 'patch' | 'delete',
    data?: RequestData
): Promise<ResponseData> => {
    try {
        let response;

        switch (method) {
            case 'get':
                response = await api.get<ResponseData>(url);
                break;
            case 'post':
                response = await api.post<ResponseData, { data: ResponseData }, RequestData>(url, data);
                break;
            case 'put':
                response = await api.put<ResponseData, { data: ResponseData }, RequestData>(url, data);
                break;
            case 'patch':
                response = await api.patch<ResponseData, { data: ResponseData }, RequestData>(url, data);
                break;
            case 'delete':
                response = await api.delete<ResponseData>(url);
                break;
            default:
                throw new Error(`Неподдерживаемый HTTP метод: ${method}`);
        }

        return response.data;
    } catch (error) {
        if (axios.isAxiosError(error) && error.response) {
            throw {
                status: error.response.status,
                message: error.response.data.message,
            } satisfies ApiError;
        }
        throw {
            status: 500,
            message: "Неизвестная ошибка",
        } satisfies ApiError;
    }
};