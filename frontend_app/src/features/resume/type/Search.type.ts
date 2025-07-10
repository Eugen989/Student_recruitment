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

export interface BackendResume {
    id: number;
    userId: number;
    salary: number;
    description: string;
    createdAt: string;
    updatedAt: string;
    user: {
        id: number;
        name: string;
        email: string;
        role: string;
        image: string | null;
    };
    tegs: string[];
    projectCount: number;
}

export interface Tags {
    id: number;
    name: string;
}



