import { forwardRef, useState, useCallback } from "react";
import type { InputAuthProps } from "./typeInputAuth.types.ts";

export const InputAuth = forwardRef<HTMLInputElement, InputAuthProps>(
    (
        {
            type = "text",
            placeholder,
            name,
            register,
            registerOptions,
            onChange,
            value,
            error,
            classNameBox = '',
            classNameInput = '',
            classNameError = '',
            showPasswordToggle = false,
            onTogglePassword,
            ...rest
        },
        forwardedRef
    ) => {
        const [isPasswordVisible, setIsPasswordVisible] = useState(false);

        const isUsingHookForm = !!register;

        const togglePasswordVisibility = useCallback(() => {
            const newVisibility = !isPasswordVisible;
            setIsPasswordVisible(newVisibility);

            if (onTogglePassword) {
                onTogglePassword(newVisibility);
            }
        }, [isPasswordVisible, onTogglePassword]);

        const finalType = type === "password" && isPasswordVisible ? "text" : type;

        const handleChange = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
            if (onChange) {
                onChange(e);
            }
        }, [onChange]);

        if (isUsingHookForm) {
            const hookFormProps = register!(name, registerOptions);

            return (
                <div className={`flex items-center p-3 pl-7 pr-2.5 border ${
                    error ? "border-red-10" : "border-gray-20"
                } rounded-2xl ${classNameBox}`}>
                    <input
                        {...rest}
                        {...hookFormProps}
                        type={finalType}
                        placeholder={placeholder}
                        name={name}
                        onChange={(e) => {
                            hookFormProps.onChange(e);
                            handleChange(e);
                        }}
                        className={`flex-grow outline-none text-xl ${classNameInput}`}
                    />

                    {error && (
                        <span className={`ml-2 text-red-10 text-sm ${classNameError}`}>
                            {error}
                        </span>
                    )}

                    {(type === "password" && showPasswordToggle) && (
                        <button
                            type="button"
                            onClick={togglePasswordVisibility}
                            className="flex items-center justify-center ml-2 hover:opacity-70 transition-opacity"
                            aria-label={isPasswordVisible ? "Скрыть пароль" : "Показать пароль"}
                        >
                            {isPasswordVisible ? (
                                <svg width="28" height="20" viewBox="0 0 28 20" fill="none" xmlns="http://www.w3.org/2000/svg">
                                    <path d="M14 0C21.7311 0 27.9986 9.99778 28 10C27.9993 10.0012 21.7315 20 14 20C6.26801 20 0 10 0 10C0.000836899 9.99866 6.26853 2.24842e-07 14 0ZM3.19727 10.6025C4.51097 12.4661 8.84946 18.0078 14 18.0078C19.1491 18.0078 23.4857 12.4686 24.8008 10.6035C24.1321 11.049 23.2551 11.6055 22.252 12.1611C20.0297 13.3921 16.9995 14.7444 14.2451 14.7617C11.4924 14.7788 8.31889 13.4295 5.96582 12.1973C4.87779 11.6275 3.92095 11.0558 3.19727 10.6025ZM14 1.99219C9.64681 1.99219 5.87384 5.95105 4.0166 8.30176C4.08989 8.34903 4.16591 8.4006 4.24707 8.45215C4.95118 8.8993 5.93821 9.49503 7.07031 10.0879C9.39192 11.3036 12.1116 12.3941 14.2305 12.3809C16.3476 12.3675 18.928 11.2799 21.0977 10.0781C22.1567 9.4915 23.072 8.90443 23.7217 8.46387C23.8108 8.40341 23.893 8.34257 23.9717 8.28809C22.1105 5.93568 18.3445 1.99219 14 1.99219Z" fill="#CCCCCC"/>
                                    <path d="M3.5238 6.76179L8.28571 3.07131L13.9048 0.976074L20.2619 3.07131L24.7143 6.76179V9.99988L14.2619 13.9046L3.5238 9.99988V6.76179Z" fill="#CCCCCC"/>
                                </svg>
                            ) : (
                                <svg width="28" height="20" viewBox="0 0 28 20" fill="none" xmlns="http://www.w3.org/2000/svg">
                                    <path d="M28 10C28 10 21.732 20 14 20C6.26801 20 0 10 0 10C0 10 6.26801 0 14 0C21.732 0 28 10 28 10ZM2.78896 10C2.78896 10 7.80831 18.0079 14 18.0079C20.1917 18.0079 25.211 10 25.211 10C25.211 10 20.1917 1.99211 14 1.99211C7.80831 1.99211 2.78896 10 2.78896 10Z" fill="#CCCCCC"/>
                                    <path d="M20 10C20 13.3137 17.3137 16 14 16C10.6863 16 8 13.3137 8 10C8 6.68629 10.6863 4 14 4C17.3137 4 20 6.68629 20 10ZM10.0404 10C10.0404 12.1868 11.8132 13.9596 14 13.9596C16.1868 13.9596 17.9596 12.1868 17.9596 10C17.9596 7.8132 16.1868 6.04045 14 6.04045C11.8132 6.04045 10.0404 7.8132 10.0404 10Z" fill="#CCCCCC"/>
                                </svg>
                            )}
                        </button>
                    )}
                </div>
            );
        }

        return (
            <div className={`flex items-center p-3 pl-7 pr-2.5 border ${
                error ? "border-red-10" : "border-gray-20"
            } rounded-2xl ${classNameBox}`}>
                <input
                    {...rest}
                    ref={forwardedRef}
                    type={finalType}
                    placeholder={placeholder}
                    name={name}
                    value={value}
                    onChange={handleChange}
                    className={`flex-grow outline-none text-xl ${classNameInput}`}
                />
                {error && (
                    <span className={`ml-2 text-red-10 text-sm ${classNameError}`}>
                        {error}
                    </span>
                )}

                {(type === "password" && showPasswordToggle) && (
                    <button
                        type="button"
                        onClick={togglePasswordVisibility}
                        className="flex items-center justify-center ml-2 hover:opacity-70 transition-opacity"
                        aria-label={isPasswordVisible ? "Скрыть пароль" : "Показать пароль"}
                    >
                        {isPasswordVisible ? (
                            <svg width="28" height="20" viewBox="0 0 28 20" fill="none" xmlns="http://www.w3.org/2000/svg">
                                <path d="M14 0C21.7311 0 27.9986 9.99778 28 10C27.9993 10.0012 21.7315 20 14 20C6.26801 20 0 10 0 10C0.000836899 9.99866 6.26853 2.24842e-07 14 0ZM3.19727 10.6025C4.51097 12.4661 8.84946 18.0078 14 18.0078C19.1491 18.0078 23.4857 12.4686 24.8008 10.6035C24.1321 11.049 23.2551 11.6055 22.252 12.1611C20.0297 13.3921 16.9995 14.7444 14.2451 14.7617C11.4924 14.7788 8.31889 13.4295 5.96582 12.1973C4.87779 11.6275 3.92095 11.0558 3.19727 10.6025ZM14 1.99219C9.64681 1.99219 5.87384 5.95105 4.0166 8.30176C4.08989 8.34903 4.16591 8.4006 4.24707 8.45215C4.95118 8.8993 5.93821 9.49503 7.07031 10.0879C9.39192 11.3036 12.1116 12.3941 14.2305 12.3809C16.3476 12.3675 18.928 11.2799 21.0977 10.0781C22.1567 9.4915 23.072 8.90443 23.7217 8.46387C23.8108 8.40341 23.893 8.34257 23.9717 8.28809C22.1105 5.93568 18.3445 1.99219 14 1.99219Z" fill="#CCCCCC"/>
                                <path d="M3.5238 6.76179L8.28571 3.07131L13.9048 0.976074L20.2619 3.07131L24.7143 6.76179V9.99988L14.2619 13.9046L3.5238 9.99988V6.76179Z" fill="#CCCCCC"/>
                            </svg>
                        ) : (
                            <svg width="28" height="20" viewBox="0 0 28 20" fill="none" xmlns="http://www.w3.org/2000/svg">
                                <path d="M28 10C28 10 21.732 20 14 20C6.26801 20 0 10 0 10C0 10 6.26801 0 14 0C21.732 0 28 10 28 10ZM2.78896 10C2.78896 10 7.80831 18.0079 14 18.0079C20.1917 18.0079 25.211 10 25.211 10C25.211 10 20.1917 1.99211 14 1.99211C7.80831 1.99211 2.78896 10 2.78896 10Z" fill="#CCCCCC"/>
                                <path d="M20 10C20 13.3137 17.3137 16 14 16C10.6863 16 8 13.3137 8 10C8 6.68629 10.6863 4 14 4C17.3137 4 20 6.68629 20 10ZM10.0404 10C10.0404 12.1868 11.8132 13.9596 14 13.9596C16.1868 13.9596 17.9596 12.1868 17.9596 10C17.9596 7.8132 16.1868 6.04045 14 6.04045C11.8132 6.04045 10.0404 7.8132 10.0404 10Z" fill="#CCCCCC"/>
                            </svg>
                        )}
                    </button>
                )}
            </div>
        );
    }
);

InputAuth.displayName = "InputAuth";