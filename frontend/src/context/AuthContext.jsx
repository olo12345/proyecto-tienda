import { createContext, useEffect, useState, useCallback } from "react";
import { useLocalStorage } from './../hooks/useLocalStorage';
import { setupInterceptors } from './../services/api';
//import { getUsers } from './../services/users'; se reemplaza por loginUser
import { loginUser } from './../services/users'; // Este es el nuevo servicio para login que se conecta con el backend real

const AuthContext = createContext();

const AuthProvider = ({ children }) => {

    const [user, setUser, removeUser] = useLocalStorage('user', null, true);
    const [token, setToken, removeToken] = useLocalStorage('token', null, false); // Se incorpora para conversación con el futuro bacj
    // aquí ponemos esto falso por un posible doble cifrado
    const [initialLoading, setInitialLoading] = useState(true);
    const [authLoading, setAuthLoading] = useState(false);

    const logout = useCallback(async () => {
        removeUser();
        removeToken(); //Para que no quede flotando por ahí
    }, [removeUser, removeToken]);

    useEffect(() => {
        setInitialLoading(false);
    }, []);

    useEffect(() => {
        setupInterceptors(logout)
    }, [logout]); // se corrije para configurar los interceptores una vez que el componente se monta

    const login = async (email, password) => {
        setAuthLoading(true);

        try {
            //lamada al back
            const response = await loginUser({email, password});

            if (response.token) { //había escrito "roken"!!!!!!!!!!!
                const { token: jwtToken, user: userData } = response;
                userData.role = userData.usuario_rol || userData.rol || "user";
                userData.name = userData.nombre
                setToken(jwtToken);
                setUser(userData);

                return { success: true };
            }

            return { success: false, error: 'Credenciales inválidas' };
        } catch (error) {
            return {
                success: false,
                error: error.response?.data?.message || 'Error de autenticación'
            }
        }
        finally {
            setAuthLoading(false);
        }
    }
    return (<AuthContext.Provider value={{ user, token, login, logout, initialLoading, authLoading }}>
        {children}
    </AuthContext.Provider>
)
}

export default AuthProvider

export { AuthContext }