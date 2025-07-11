export interface ResponseSearchData {
    resumes: any
}

export interface RequestSearchResume {
    id?: number
    minSalary?: number
    maxSalary?: number
    tags?: string;
    name?: string
    limit?: number
    page?: number
}