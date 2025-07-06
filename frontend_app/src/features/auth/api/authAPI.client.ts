import {api} from "../../../utils/api/configAPI.client.ts";
import type {
    ApiError,
    RequestLoginData,
    RequestRegisterData,
    ResponseLoginData,
    ResponseRegisterData
} from "../type/typeAuth.types.ts";
import axios from "axios";

export const registerUserAPI = async  (dataRegister: RequestRegisterData): Promise<ResponseRegisterData> => {
    try {
        const response = await api.post<ResponseRegisterData, {data: ResponseRegisterData}, RequestRegisterData>('/user/registration', dataRegister);
        console.log("response", response);
        return response.data
    } catch (error) {
        if (axios.isAxiosError(error) && error.response) {
            throw {
                status: error.response.status,
                message: error.response.data.message
            } satisfies ApiError;
        } else {
            throw {
                status: 500,
                message: "Неизвестная ошибка"
            } satisfies ApiError;
        }
    }
}

export const loginUserAPI = async (dataLogin: RequestLoginData): Promise<ResponseLoginData> => {
    try {
        const response = await api.post<ResponseLoginData, {data: ResponseLoginData}, RequestLoginData>('/user/login', dataLogin);
        console.log("response", response);
        return response.data
    } catch (error) {
        if (axios.isAxiosError(error) && error.response) {
            console.log("error", error);
            throw {
                status: error.response.status,
                message: error.response.data.message
            } satisfies ApiError;
        } else {
            throw {
                status: 500,
                message: "Неизвестная ошибка"
            } satisfies ApiError;
        }
    }
}