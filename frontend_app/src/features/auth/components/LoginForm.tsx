import {useForm} from "react-hook-form";
import type {RequestLoginData, ResponseLoginData} from "../type/typeAuth.types.ts";
import {loginUserAPI} from "../api/authAPI.client.ts";
import {InputAuth} from "../../../shared/components/InputAuth/InputAuth.tsx";
import {ButtonAuth} from "./ButtonAuth.tsx";
import {useNavigate} from "react-router-dom";
import {setToken} from "../../../utils/token.client.ts";

export const LoginForm = () => {
    const navigate = useNavigate();
    const {
        register,
        formState: {errors},
        handleSubmit
    } = useForm<RequestLoginData>();

    const onSubmitApi = async (data: RequestLoginData) => {
        try {
            const response: ResponseLoginData = await loginUserAPI(data);
            if (response.token) {
                setToken(response.token, 3600 * 24);
                navigate('/profile');
            } else if (response.error) {
                console.error('Ошибка авторизации:', response.error.message);
            }
        } catch (error) {
            console.error('Произошла ошибка при авторизации:', error);
        }
    };

    return (
        <form onSubmit={handleSubmit(onSubmitApi)} className="flex flex-col gap-4 max-w-[500px] w-full">
            <InputAuth
                type="email"
                placeholder="E-mail"
                name="email"
                register={register}
                registerOptions={{required: {value: true, message: 'Поле обязательно для заполнения'}}}
                error={errors.email?.message}
            />
            <InputAuth
                placeholder="Логин"
                name="login"
                register={register}
                registerOptions={{required: {value: true, message: 'Поле обязательно для заполнения'}}}
                error={errors.login?.message}
            />
            <InputAuth
                placeholder="Пароль"
                type="password"
                name="password"
                register={register}
                registerOptions={{required: {value: true, message: 'Поле обязательно для заполнения'}}}
                error={errors.password?.message}
                showPasswordToggle
            />

            <ButtonAuth className="self-center">
                Войти
            </ButtonAuth>
        </form>
    );
}