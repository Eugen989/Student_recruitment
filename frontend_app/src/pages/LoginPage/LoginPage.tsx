import logotype from "../../assets/logotype.png";
import {Link} from "react-router-dom";
import {LoginForm} from "../../features/auth/components/LoginForm.tsx";

export const LoginPage = () => {
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
                        Вход в аккаунт
                    </h1>
                    <span className="block text-gray-10 text-center max-w-52 w-full mx-auto leading-5">
                        Для входа, используйте вашу электронную почту и пароль
                    </span>
                </div>
                <LoginForm/>
                <div className="flex justify-between items-center mt-10 font-semibold">
                    <span className="block text-gray-10 text-center">
                        Нет аккаунта?
                        <Link to={'/register'} className="text-blue-10 ml-1 hover:underline">
                            Регистрация
                        </Link>
                    </span>
                    <span className="block text-gray-10 text-center">
                        Забыли пароль?
                        <Link to={'/login'} className="text-blue-10 ml-1 hover:underline">
                            Восстановить
                        </Link>
                    </span>
                </div>
            </div>
        </div>
    );
};