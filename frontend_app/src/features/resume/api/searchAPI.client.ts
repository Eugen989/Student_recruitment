import {apiRequest} from "../../../utils/api/configAPI.client.ts";

export const searchResumeAPI = (searchQuery: string): Promise<string[]> => {
    return apiRequest<string, string[]>('/resume/search', "get", searchQuery);
}