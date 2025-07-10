import type {Role} from "../../../shared/types/typeApp.types.ts";
import type {ReactNode} from "react";

export interface ApiError {
    status?: number;
    message: string;
}

export interface RequestRegisterData {
    login: string;
    email: string;
    password: string;
    confirmPassword: string;
    fullName: string;
    role: Role;
}

export interface ResponseRegisterData {
    token?: string;
    error?: ApiError;
}

export interface RequestLoginData {
    email: string;
    login: string;
    password: string;
}

export interface ResponseLoginData {
    token?: string;
    error?: ApiError;
}

export interface ButtonAuthProps {
    children: ReactNode | string;
    className?: string;
    disabled?: boolean;
}
