import { createContext, useEffect, useState } from "react";
import { useLocalStorage } from './../hooks/useLocalStorage';
import { setupInterceptors } from './../services/api';
import { getUsers } from './../services/users';

const AuthContext = createContext();

const AuthProvider = ({ children }) => {

    const [user, setUser, removeUser] = useLocalStorage('user', null, true);
    const [initialLoading, setInitialLoading] = useState(true);
    const [authLoading, setAuthLoading] = useState(false);

    useEffect(() => {
        setInitialLoading(false);
    }, []);

    useEffect(() => {
        setupInterceptors(logout)
    },);

    const login = async (email, password) => {
        setAuthLoading(true);

        try {
            //No será necesario cuando haya backend
            const users = await getUsers();
            const foundUser = users.data.find((user) => user.email === email);
            if (foundUser && password === '123456') {
                setUser(foundUser);
                return { success: true };
            }
            return { success: false, error: 'Credenciales inválidas' };
        } catch {
            return {
                success: false,
                error: 'Error de conexión'
            }
        }
        finally {
            setAuthLoading(false);
        }
    }

    const logout = async () => {
        // try {
        //     await api.post('/logout');
        // } catch (error) {
        //     console.error('error', error)
        // }
        removeUser();
    }

    return (
        <AuthContext.Provider value={{ user, login, logout, initialLoading, authLoading }}>
            {children}
        </AuthContext.Provider>
    )
}

export default AuthProvider

export { AuthContext }