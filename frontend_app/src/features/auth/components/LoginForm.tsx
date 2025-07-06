import {useForm} from "react-hook-form";
import type {RequestLoginData, ResponseLoginData} from "../type/typeAuth.types.ts";
import {loginUserAPI} from "../api/authAPI.client.ts";
import {InputAuth} from "../../../shared/components/InputAuth/InputAuth.tsx";
import {ButtonAuth} from "./ButtonAuth.tsx";

export const LoginForm = () => {
    const {
        register,
        formState: {errors},
        handleSubmit
    } = useForm<RequestLoginData>();

    const onSubmitApi = async (data: RequestLoginData) => {
        try {
            const response: ResponseLoginData = await loginUserAPI(data);
            if (response.token) {
                console.log('Успешная авторизация. Токен:', response.token);
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