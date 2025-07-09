import {Route, Routes} from "react-router-dom";
import {HomePage} from "../../pages/HomePage/HomePage.tsx";
import {LoginPage} from "../../pages/LoginPage/LoginPage.tsx";
import {RegisterPage} from "../../pages/RegisterPage/RegisterPage.tsx";
import {Layout} from "../../layouts/Layout.tsx";
import {ResumePage} from "../../pages/ResumePage/ResumePage.tsx";
import {LandingPage} from "../../pages/LandingPage/LandingPage.tsx";

export const AppRouter = () => {
    return (
        <Routes>
            <Route path="/" element={<Layout/>}>
                <Route path="/" element={<LandingPage/>}/>
                <Route path="/search" element={<HomePage/>}/>
                <Route path="/login" element={<LoginPage/>}/>
                <Route path="/register" element={<RegisterPage/>}/>
                <Route path="/resume" element={<ResumePage/>}/>
            </Route>
        </Routes>
    );
}