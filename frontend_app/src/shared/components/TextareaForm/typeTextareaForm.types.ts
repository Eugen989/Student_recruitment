import type {
    ChangeEvent,
    TextareaHTMLAttributes,
    ForwardedRef
} from "react";
import type { UseFormRegister, RegisterOptions } from "react-hook-form";

type ResizeType = 'none' | 'vertical' | 'horizontal' | 'both';

export interface TextareaFormProps
    extends Omit<TextareaHTMLAttributes<HTMLTextAreaElement>, 'onChange'> {
    placeholder: string;
    name: string;
    register?: UseFormRegister<any>;
    registerOptions?: RegisterOptions;
    onChange?: (event: ChangeEvent<HTMLTextAreaElement>) => void;
    value?: string;
    error?: string;
    classNameBox?: string;
    classNameTextarea?: string;
    classNameError?: string;
    rows?: number;
    resize?: ResizeType;
}

export type TextareaAuthRef = ForwardedRef<HTMLTextAreaElement>;