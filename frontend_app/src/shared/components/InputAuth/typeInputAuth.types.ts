import type {
    ChangeEvent,
    InputHTMLAttributes,
    ForwardedRef
} from "react";
import type { UseFormRegister, RegisterOptions } from "react-hook-form";

type InputTypeAttributes = "text" | "password" | "email" | "number";

interface BaseInputAuthProps
    extends Omit<InputHTMLAttributes<HTMLInputElement>, "type"> {
    type?: InputTypeAttributes;
    placeholder: string;
    name: string;
    register?: UseFormRegister<any>;
    registerOptions?: RegisterOptions;
    onChange?: (event: ChangeEvent<HTMLInputElement>) => void;
    value?: string;
    error?: string;
    classNameBox?: string;
    classNameInput?: string;
    classNameError?: string;
    isVisiblePassword?: boolean;
    isTypePassword?: boolean;
    showPasswordToggle?: boolean;
    onTogglePassword?: (isVisible: boolean) => void;
}

interface PasswordInputAuthProps extends BaseInputAuthProps {
    type: "password";
    isVisiblePassword?: boolean;
    isTypePassword?: boolean;
    showPasswordToggle?: boolean;
    onTogglePassword?: (isVisible: boolean) => void;
}

interface TextInputAuthProps extends BaseInputAuthProps {
    type?: Exclude<InputTypeAttributes, "password">;
    isVisiblePassword?: never;
    isTypePassword?: never;
}

export type InputAuthProps = PasswordInputAuthProps | TextInputAuthProps;
export type InputAuthRef = ForwardedRef<HTMLInputElement>;