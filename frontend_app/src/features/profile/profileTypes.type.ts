export interface AddProject {
    name: string;
    description: string;
    link: string;
    image: File[];
}

export interface EditProject extends AddProject {
    id: number;
}

export interface AddResume {
    salary: number;
    tegsId: number[];
    projectsId: number[];
    description: string;
}

export interface EditResume extends AddResume {
    id: number;
}

export interface EditProfile {
    name: string;
    email: string;
    login: string;
    password: string;
}

export interface ResponseProfile {
    user: {
        id: number;
        name: string;
        email: string;
        login: string;
        role: string;
        image: string | null;
    },
    resumes: {
        id: number;
        salary: number;
        tegs: string[];
        projects: {
            id: number;
            title: string;
            description: string;
            link: string;
        }[];
        description: string;
        countProjects?: number
    }[]
}
