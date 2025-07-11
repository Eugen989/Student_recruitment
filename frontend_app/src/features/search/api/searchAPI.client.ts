import {apiRequest} from "../../../utils/api/configAPI.client.ts";
import type {RequestSearchResume} from "../type/searchType.types.ts";

export const searchResumeAPI = (params: RequestSearchResume): Promise<any[]> => {
    return apiRequest<RequestSearchResume, any[]>(
        '/portfolio/getAllPortfolio',
        "get",
        params
    )
};