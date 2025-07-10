import {apiRequest} from "../../../utils/api/configAPI.client.ts";
import type {
    RequestLoginData,
    RequestRegisterData,
    ResponseLoginData,
    ResponseRegisterData
} from "../type/typeAuth.types.ts";

export const registerUserAPI = (dataRegister: RequestRegisterData): Promise<ResponseRegisterData> => {
    return apiRequest<RequestRegisterData, ResponseRegisterData>('/user/registration', "post", dataRegister);
}

export const loginUserAPI = (dataLogin: RequestLoginData): Promise<ResponseLoginData> => {
    return apiRequest<RequestLoginData, ResponseLoginData>('/user/login', "post", dataLogin);
}