import { useAuth } from './../hooks/useAuth';
import Navigate from 'react-router-dom'

export const AdminRoute = ({ children }) => {
    const { user, authLoading } = useAuth();
    if (authLoading) return null;

    if (!user || !user.rol.includes('admin')) {
        return (
            <Navigate
                to="/login"
                replace
            />
        );
    }

    return children;
}