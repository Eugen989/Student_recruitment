import { Navigate } from 'react-router-dom';
import { isTokenValid } from '../../utils/token.client';
import type {JSX} from "react";

export const PrivateRoute = ({ children }: { children: JSX.Element }) => {
    if (!isTokenValid()) {
        return <Navigate to="/login" replace />;
    }
    return children;
};