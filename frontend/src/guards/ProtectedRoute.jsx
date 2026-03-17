import { useAuth } from './../hooks/useAuth';
import {Navigate} from 'react-router-dom'

export const ProtectedRoute = ({ children }) => {
    const { user, authLoading } = useAuth();
    if (authLoading) return null;

    return user ? (
        children
    ) :
        <Navigate
            to="/login"
            replace />
}