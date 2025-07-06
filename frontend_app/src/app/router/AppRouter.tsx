import {Route, Routes} from "react-router-dom";
import {HomePage} from "../../pages/HomePage/HomePage.tsx";
import {LoginPage} from "../../pages/LoginPage/LoginPage.tsx";
import {RegisterPage} from "../../pages/RegisterPage/RegisterPage.tsx";

export const AppRouter = () => {
    return (
        <Routes>
            <Route path="/*"/>
            <Route path="/" element={<HomePage/>}/>
            <Route path="/register" element={<RegisterPage/>}/>
            <Route path="/login" element={<LoginPage/>}/>
        </Routes>
    );
}