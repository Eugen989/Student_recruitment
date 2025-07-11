import {apiRequest} from "../../../utils/api/configAPI.client.ts";
import type {BackendResume, Tags} from "../type/Search.type.ts";

export const getAllResumeAPI = (): Promise<BackendResume[]> => {
    return apiRequest<undefined, BackendResume[]>('/portfolio/getPortfolioCard', "get");
}

export const getAllTagsAPI = (): Promise<{tegs: Tags[]}> => {
    return apiRequest<undefined, {tegs: Tags[]}>('/portfolio/getAllTegs', "get");
}

export const getResumeByIdAPI = (id: number): Promise<BackendResume> => {
    return apiRequest<number, BackendResume>(`/portfolio/getOnePortfolio`, "get", id);
}