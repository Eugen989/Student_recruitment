export interface Resume {
    id: number;
    userId: number;
    salary: number;
    tegsId: number[];
    projectsId: number[];
    description: string;
}

export interface RequestResumeSearch {
    minSalary: number | null;
    maxSalary: number | null;
    tags: string[] | null;
    name: string | null;
}

export interface ResponseResumeSearch {
    resumes: Resume[];
}

