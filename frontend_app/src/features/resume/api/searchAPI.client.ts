import {apiRequest} from "../../../utils/api/configAPI.client.ts";
import type {BackendResume, Tags} from "../type/Search.type.ts";

export const searchResumeAPI = (searchQuery: string): Promise<string[]> => {
    return apiRequest<string, string[]>('/resume/search', "get", searchQuery);
}

export const getAllResumeAPI = (): Promise<BackendResume[]> => {
    return apiRequest<undefined, BackendResume[]>('/portfolio/getPortfolioCard', "get");
}

export const getAllTagsAPI = (): Promise<{tegs: Tags[]}> => {
    return apiRequest<undefined, {tegs: Tags[]}>('/portfolio/getAllTegs', "get");
}