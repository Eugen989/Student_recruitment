import {useForm} from "react-hook-form";
import type {LoginType} from "../type/authType.ts";
import {loginAPI} from "../api/authAPI.ts";

export const LoginForm = () => {
    const {
        register,
        handleSubmit,
        formState: { errors }
    } = useForm<LoginType>();

    const handlerSubmitLogin = async (data: LoginType) => {
        const response = await loginAPI(data);
        console.log(response);

        /*
        * Дальнейшие действия невозможны
        * Нужна документация по api
        * И обсуждения дальнейшего сценарий действия после авторизации
        * */
    }

    return (
        <form action="" onSubmit={handleSubmit(handlerSubmitLogin)}>
            <input
                type="text"
                placeholder="login"
                {...register(
                    "login",
                    {
                        required: true
                    }
                )}
            />
            {errors.login && <span style={{color: 'red'}}>{errors.login.message}</span>}
            <input
                type="password"
                placeholder="password"
                {...register(
                    "password",
                    {
                        required: true
                    }
                )}
            />
            {errors.password && <span style={{color: 'red'}}>{errors.password.message}</span>}
            <button>
                Отправить
            </button>
        </form>
    )
}