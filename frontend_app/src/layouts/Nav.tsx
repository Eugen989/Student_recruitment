import type {NavProps} from "../shared/types/layoutType.types.ts";
import {Link} from "react-router-dom";


export const Nav = ({orientation, links}: NavProps) => {

    const linksMenu = [
        {
            name: "О проекте",
            path: "/",
        },
        {
            name: "Контакты",
            path: "/contacts",
        },
        {
            name: "Карта сайта",
            path: "/map",
        },
        {
            name: "Резюме",
            path: "/search",
        }

    ];

    return (
        <nav className={`${orientation === "horizontal" ? "flex items-center gap-4" : "flex flex-col gap-2.5"}`}>
            {linksMenu.map((link, index) => (
                <Link
                    to={link.path}
                    key={index}
                    className="
                    text-xl font-medium
                    hover:underline hover:text-blue-10
                    transition duration-200
                    active:scale-95 active:text-gray-10"
                >
                    {link.name}
                </Link>
            ))}
        </nav>
    );
};