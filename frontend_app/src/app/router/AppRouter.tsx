import {Route, Routes} from "react-router-dom";
import {HomePage} from "../../pages/HomePage/HomePage.tsx";
import {LoginPage} from "../../pages/LoginPage/LoginPage.tsx";
import {RegisterPage} from "../../pages/RegisterPage/RegisterPage.tsx";
import {Layout} from "../../layouts/Layout.tsx";
import {ResumePage} from "../../pages/ResumePage/ResumePage.tsx";
import {LandingPage} from "../../pages/LandingPage/LandingPage.tsx";
import {ProfilePage} from "../../pages/ProfilePage/ProfilePage.tsx";
import {PrivateRoute} from "./PrivateRoute.tsx";
import ChatPage from "../../pages/ChatPage/ChatPage.tsx";
import {PageNotFound} from "../../pages/PageNotFound/PageNotFound.tsx";

export const AppRouter = () => {
    return (
        <Routes>
            <Route path="/" element={<Layout/>}>
                <Route path="*" element={<PageNotFound/>}/>
                <Route path="/" element={<HomePage/>}/>
                <Route path="/about" element={<LandingPage/>}/>
                <Route path="/login" element={<LoginPage/>}/>
                <Route path="/register" element={<RegisterPage/>}/>
                <Route path="/resume" element={<ResumePage/>}/>
                <Route path="/profile" element={
                    <PrivateRoute>
                        <ProfilePage/>
                    </PrivateRoute>
                }/>
                <Route path="/chat" element={
                    <PrivateRoute>
                        <ChatPage/>
                    </PrivateRoute>
                }/>
            </Route>
        </Routes>
    );
}