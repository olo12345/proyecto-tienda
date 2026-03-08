import { createContext, useEffect, useState } from "react";
import { useLocalStorage } from './../hooks/useLocalStorage';
import { setupInterceptors } from './../services/api';
import { getUsers } from './../services/users';

const AuthContext = createContext();

const AuthProvider = ({ children }) => {

    const [user, setUser, removeUser] = useLocalStorage('user', null, true);
    const [token, setToken, removeToken] = useLocalStorage('token', null, true); // Se incorpora para conversación con el futuro bacj
    const [initialLoading, setInitialLoading] = useState(true);
    const [authLoading, setAuthLoading] = useState(false);

    useEffect(() => {
        setInitialLoading(false);
    }, []);

    useEffect(() => {
        setupInterceptors(logout)
    }, []); // se corrije para configurar los interceptores una vez que el componente se monta

    const login = async (email, password) => {
        setAuthLoading(true);

        try {
            //No será necesario cuando haya backend
            const users = await getUsers();
            const foundUser = users.data.find((user) => user.email === email);
            console.log(email, password, users)
            if (foundUser && password === '123456') {
//                setUser(foundUser);
//                return { success: true };
                const fakeToken = "mock_jwt_token_123456789";

                const contractUser = {
                    id: foundUser.id,
                    email: foundUser.email,
                    name: foundUser.name,
                    age: foundUser.age,
                    rol: foundUser.role || "comprador" // Convertimos 'role' a 'rol' (just in case) y el rol será mientras comprador
                };

                setToken(fakeToken); // 1. Guardamos el token para el api.js
                setUser(contractUser); // 2. Guardamos el usuario
                
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
        removeToken(); //Para que no quede flotando por ahí
    }

    return (
        <AuthContext.Provider value={{ user, token, login, logout, initialLoading, authLoading }}>
            {children}
        </AuthContext.Provider>
    )
}

export default AuthProvider

export { AuthContext }