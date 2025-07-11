import {apiRequest} from "../../../utils/api/configAPI.client.ts";
import type {ResponseProfile} from "../profileTypes.type.ts";

export const getProfileByIdAPI = (id: number): Promise<ResponseProfile> => {
    return apiRequest<void, ResponseProfile>(`/user/getUserProfile/${id}`, "get");
}
