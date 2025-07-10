import {type ChangeEvent, forwardRef, useCallback} from "react";
import type { TextareaFormProps } from "./typeTextareaForm.types.ts";

export const TextareaForm = forwardRef<HTMLTextAreaElement, TextareaFormProps>(
    (
        {
            placeholder,
            name,
            register,
            registerOptions,
            onChange,
            value,
            error,
            classNameBox = '',
            classNameTextarea = '',
            classNameError = '',
            rows = 4,
            resize = 'vertical',
            ...rest
        },
        forwardedRef
    ) => {
        const isUsingHookForm = !!register;

        const handleChange = useCallback((e: ChangeEvent<HTMLTextAreaElement>) => {
            if (onChange) {
                onChange(e);
            }
        }, [onChange]);

        const resizeClass = {
            'none': 'resize-none',
            'vertical': 'resize-y',
            'horizontal': 'resize-x',
            'both': 'resize'
        };

        if (isUsingHookForm) {
            const hookFormProps = register!(name, registerOptions);

            return (
                <div className={`flex flex-col p-3 pl-7 pr-2.5 border ${
                    error ? "border-red-10" : "border-gray-20"
                } rounded-2xl ${classNameBox}`}>
                    <textarea
                        {...rest}
                        {...hookFormProps}
                        placeholder={placeholder}
                        name={name}
                        rows={rows}
                        onChange={(e) => {
                            hookFormProps.onChange(e);
                            handleChange(e);
                        }}
                        className={`outline-none text-xl ${resizeClass[resize]} ${classNameTextarea}`}
                    />

                    {error && (
                        <span className={`mt-2 text-red-10 text-sm ${classNameError}`}>
                            {error}
                        </span>
                    )}
                </div>
            );
        }

        return (
            <div className={`flex flex-col p-3 pl-7 pr-2.5 border ${
                error ? "border-red-10" : "border-gray-20"
            } rounded-2xl ${classNameBox}`}>
                <textarea
                    {...rest}
                    ref={forwardedRef}
                    placeholder={placeholder}
                    name={name}
                    value={value}
                    rows={rows}
                    onChange={handleChange}
                    className={`outline-none text-xl ${resizeClass[resize]} ${classNameTextarea}`}
                />

                {error && (
                    <span className={`mt-2 text-red-10 text-sm ${classNameError}`}>
                        {error}
                    </span>
                )}
            </div>
        );
    }
);

TextareaForm.displayName = "TextareaForm";