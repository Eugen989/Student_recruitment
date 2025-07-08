import logo from "../assets/logotype.png";
import {Link} from "react-router-dom";
import {Nav} from "./Nav.tsx";
import type {LinkItem} from "../shared/types/layoutType.types.ts";
import {AuthOnlyNav} from "../shared/components/AuthOnlyNav/AuthOnlyNav.tsx";

export const Header = ({links}: {links: LinkItem[]}) => {
    return (
        <header className="px-3 py-4">
            <div className="flex flex-col md:flex-row items-center justify-between gap-4">
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

                    <Nav orientation="horizontal" links={links}/>
                </div>

                {/*<Link*/}
                {/*    to="/login"*/}
                {/*    className="*/}
                {/*    px-16 py-2 bg-blue-10*/}
                {/*    text-white-10 font-bold text-2xl*/}
                {/*    rounded-2xl*/}
                {/*    hover:bg-purple-20*/}
                {/*    active:bg-blue-10 active:scale-95*/}
                {/*    transition-all duration-300 ease-in-out"*/}
                {/*>*/}
                {/*    Войти*/}
                {/*</Link>*/}

                <AuthOnlyNav/>
            </div>
        </header>
    );
};