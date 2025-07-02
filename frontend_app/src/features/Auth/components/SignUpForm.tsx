import { useForm } from "react-hook-form";
import {registerAPI} from "../api/authAPI.ts";
import type {RegisterType} from "../type/authType.ts";

export const SignUpForm = () => {
    const {
        register,
        handleSubmit,
        watch,
        formState: { errors }
    } = useForm<RegisterType>();

    const handleSubmitRegister = async (data: RegisterType) => {
        const response = await registerAPI(data);
        console.log(response);
        /*
        * Дальнейшие действия невозможны
        * Нужна документация по api
        * И обсуждения дальнейшего сценарий действия после регистрации
        * */

    }

    const password = watch("password");

    return (
        <form onSubmit={handleSubmit(handleSubmitRegister)}>
            {/* Поле логина */}
            <input
                type="text"
                placeholder="Логин"
                {...register("login", {
                    required: "Логин обязателен"
                })}
            />
            {errors.login && <span style={{color: 'red'}}>{errors.login.message}</span>}

            {/* Поле email */}
            <input
                type="email"
                placeholder="Email"
                {...register("email", {
                    required: "Email обязателен",
                    pattern: {
                        value: /^\S+@\S+\.\S+$/,
                        message: "Некорректный email"
                    }
                })}
            />
            {errors.email && <span style={{color: 'red'}}>{errors.email.message}</span>}

            {/* Поле пароля */}
            <input
                type="password"
                placeholder="Пароль"
                {...register("password", {
                    required: "Пароль обязателен",
                    minLength: {
                        value: 8,
                        message: "Минимум 8 символов"
                    },
                    validate: value =>
                        /[A-Z]/.test(value) &&
                        /[0-9]/.test(value) ||
                        "Пароль должен содержать цифру и заглавную букву"
                })}
            />
            {errors.password && <span style={{color: 'red'}}>{errors.password.message}</span>}

            {/* Подтверждение пароля с проверкой */}
            <input
                type="password"
                placeholder="Подтвердите пароль"
                {...register("passwordConfirm", {
                    required: "Подтвердите пароль",
                    validate: value =>
                        value === password || "Пароли не совпадают"
                })}
            />
            {errors.passwordConfirm && (
                <span style={{color: 'red'}}>{errors.passwordConfirm.message}</span>
            )}

            <button type="submit">Отправить</button>
        </form>
    );
};