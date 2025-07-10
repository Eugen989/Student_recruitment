import {useForm} from "react-hook-form";
import {registerUserAPI} from "../api/authAPI.client.ts";
import {InputAuth} from "../../../shared/components/InputAuth/InputAuth.tsx";
import {useState} from "react";
import type {ApiError, RequestRegisterData, ResponseRegisterData} from "../type/typeAuth.types.ts";
import {ToggleRadioInput} from "../../../shared/components/ToggleRadioInput/ToggleRadioInput.tsx";
import type {Role} from "../../../shared/types/typeApp.types.ts";
import {ButtonAuth} from "./ButtonAuth.tsx";
import {useNavigate} from "react-router-dom";
import {setToken} from "../../../utils/token.client.ts";

export const RegisterForm = () => {
    const navigate = useNavigate();
    const {
        register,
        formState: {errors},
        handleSubmit,
        watch
    } = useForm<RequestRegisterData>({
        defaultValues: {
            login: '',
            email: '',
            password: '',
            confirmPassword: '',
            fullName: '',
            role: 'student'
        }
    });
    const [Error, setError] = useState({
        isError: false,
        message: '',
        status: 0
    });

    const [role, setRole] = useState<Role>('student');

    const handleRoleChange = (newRole: Role) => {
        setRole(newRole);
    };

    const onSubmitApi = async (data: RequestRegisterData) => {
        try {
            const response: ResponseRegisterData = await registerUserAPI(data);
            if (response.token) {
                setToken(response.token, 3600 * 24);
                navigate('/profile');
            } else if (response.error) {
                console.log('Ошибка регистрации:', response.error.message);
            } else {
                console.log('Неизвестный ответ от сервера');
            }


        } catch (error) {
            const apiError = error as ApiError;
            console.error(`Ошибка запроса: ${apiError.message} (status ${apiError.status})`);
            setError({
                isError: true,
                message: apiError.message,
                status: apiError.status || 0
            })
        }

        if (Error.isError) {
            alert(`Ошибка запроса: ${Error.message} (status ${Error.status})`);
        }


    }

    return (
        <form onSubmit={handleSubmit(onSubmitApi)} className="flex max-w-[500px] w-full flex-col">
            <div className="flex flex-col gap-5">
                <InputAuth
                    type="email"
                    register={register}
                    error={errors.email?.message}
                    name="email"
                    placeholder="E-mail"
                    registerOptions={{
                        required: 'Email обязателен',
                        pattern: {
                            value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                            message: 'Неверный формат email'
                        }
                    }}
                />

                <InputAuth
                    register={register}
                    error={errors.login?.message}
                    name="login"
                    placeholder="Логин"
                    registerOptions={{
                        required: 'Логин обязателен',
                        minLength: {
                            value: 3,
                            message: 'Логин должен содержать минимум 3 символа'
                        }
                    }}
                />

                <InputAuth
                    type="password"
                    register={register}
                    error={errors.password?.message}
                    name="password"
                    placeholder="Пароль"
                    showPasswordToggle={true}
                    registerOptions={{
                        required: 'Пароль обязателен',
                        minLength: {
                            value: 8,
                            message: 'Не менее 8 символов'
                        }
                    }}
                />

                <InputAuth
                    type="password"
                    register={register}
                    error={errors.confirmPassword?.message}
                    name="confirmPassword"
                    placeholder="Повторите пароль"
                    showPasswordToggle={true}
                    registerOptions={{
                        required: 'Повторите пароль',
                        validate: (value) => value === watch('password') || 'Пароли не совпадают',
                    }}
                />
            </div>

            <div className="flex flex-col gap-6 mt-6">
                <span className="text-2xl font-semibold">Личные данные</span>
                <InputAuth
                    register={register}
                    error={errors.fullName?.message}
                    name="name"
                    placeholder="Ваше ФИО"
                    registerOptions={{
                        required: 'ФИО обязательно',
                    }}
                />
            </div>

            <ToggleRadioInput
                firstHtmlFor="student"
                secondHtmlFor="employer"
                firstLabel="Студент"
                secondLabel="Работодатель"
                firstValue="student"
                secondValue="employer"
                checkedValue={role}
                handleCheckedValue={handleRoleChange}
                register={register}
                registerOptions={{}}
            />

            <ButtonAuth className="mt-7.5 self-center">
                Регистрация
            </ButtonAuth>
        </form>
    );
}