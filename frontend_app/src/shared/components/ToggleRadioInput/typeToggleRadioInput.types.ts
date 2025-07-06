import type {InputHTMLAttributes} from "react";
import type {RegisterOptions, UseFormRegister} from "react-hook-form";
import type {Role} from "../../types/typeApp.types.ts";

export interface ToggleRadioInputProps extends InputHTMLAttributes<HTMLInputElement> {
    firstHtmlFor: string;
    secondHtmlFor: string;
    firstLabel: string;
    secondLabel: string;
    checkedValue: string;
    handleCheckedValue: (value: Role) => void;
    firstValue: string;
    secondValue: string;
    register?: UseFormRegister<any>;
    registerOptions?: RegisterOptions;
    classNameBox?: string;
    classNameInput?: string;
    classNameLabel?: string;
    classNameText?: string;
}