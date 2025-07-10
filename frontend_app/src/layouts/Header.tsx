import logo from "../assets/logotype.png";
import {Link} from "react-router-dom";
import {Nav} from "./Nav.tsx";
import {AuthOnlyNav} from "../shared/components/AuthOnlyNav/AuthOnlyNav.tsx";
import { useUser } from '../shared/hooks/useUser.tsx';

export const Header = () => {
    const user = useUser();

    return (
        <header className="px-3 py-4 bg-white-10">
            <div className="container mx-auto flex flex-col md:flex-row items-center justify-between gap-4">
                <div className="flex items-center gap-6">
                    <Link to="/" className="flex items-center gap-4">
                        <div className="logo">
                            <img src={logo} alt="Логотип" className="h-16"/>
                        </div>
                        <div className="header-title text-center md:text-left">
                            <div className="text-lg">Сервис онлайн-рекрутмента</div>
                            <div className="text-lg">студентов it.bgitu</div>
                        </div>
                    </Link>

                    <Nav orientation="horizontal"/>
                </div>

                {user ? (
                    <AuthOnlyNav login={user.login} />
                ) : (
                    <Link
                        to="/login"
                        className="
                            px-16 py-2 bg-blue-10
                            text-white-10 font-bold text-2xl
                            rounded-2xl
                            hover:bg-purple-20
                            active:bg-blue-10 active:scale-95
                            transition-all duration-300 ease-in-out"
                    >
                        Войти
                    </Link>
                )}
            </div>
        </header>
    );
}