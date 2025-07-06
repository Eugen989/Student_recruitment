import {RegisterForm} from "../../features/auth/components/RegisterForm.tsx";
import logotype from "../../assets/logotype.png";
import {Link} from "react-router-dom";

export const RegisterPage = () => {
    return (
        <div className="flex justify-center items-center min-h-screen bg-white-20">
            <div className="
                max-w-[700px] w-full
                mx-auto
                py-5 px-[100px]
                shadow-auth
                rounded-2xl
                bg-white-10
            ">
                <div className="mb-2.5">
                    <img src={logotype} alt="Логотип" className="mx-auto"/>
                </div>
                <div className="mb-6 max-w-96 w-full mx-auto text-black-20">
                    <h1 className="text-4xl font-semibold text-center">
                        Регистрация аккаунта
                    </h1>
                    <span className="block text-gray-10 text-center max-w-52 w-full mx-auto leading-5">
                        Введите ваши данные для регистрации в системе
                    </span>
                </div>
                <RegisterForm/>
                <span className="block text-gray-10 text-center mt-10 font-semibold">
                    Уже есть аккаунт?
                    <Link to={'/login'} className="text-blue-10 ml-1 hover:underline">
                        Войти
                    </Link>
                </span>
            </div>
        </div>
    );
};