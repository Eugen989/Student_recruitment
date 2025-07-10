import {apiRequest} from "../../../utils/api/configAPI.client.ts";

export const getProfileByIdAPI = (id: number): Promise<ResponseGetUserData> => {
    return apiRequest<number, ResponseGetUserData>(`/user/getProfileById/${id}`, "get");
}