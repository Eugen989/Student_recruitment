import {Header} from "./Header.tsx";
import {Outlet, useLocation} from "react-router-dom";
import {Footer} from "./Footer.tsx";
import {useEffect} from "react";

export const Layout = () => {
    const pathname = useLocation().pathname

    useEffect(() => {
        window.scrollTo(0, 0)
    }, [pathname])

    return (
        <>
            <Header links={[]}/>
            <main className="container mx-auto py-25 px-4 bg-white-20 grow">
                <Outlet/>
            </main>
            <Footer/>
        </>
    )
}