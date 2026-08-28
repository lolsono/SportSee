import {
    createContext,
    useContext,
    useEffect,
    useState
} from "react";

import AuthServices from "../services/AuthServices";
import UserServices from "../services/UserServices";
import getCookie from "../services/CookieServices";

const AuthContext = createContext(null);

export function AuthProvider({ children }) {
    const [userDetails, setUserDetails] = useState(null);
    const [loading, setLoading] = useState(true);

    // Vérification au démarrage de l'application
    useEffect(() => {

        async function loadUser() {

            const token = getCookie("token");

            if (!token) {
                setLoading(false);
                return;
            }

            try {
                const details = await UserServices(token);
                setUserDetails(details || null);
            } catch (error) {
                setUserDetails(null);
            } finally {
                setLoading(false);
            }
        }

        loadUser();
    }, []);


    // Connexion
    const login = async (email, password) => {

        const user = await AuthServices(email, password);

        if (!user) {
            return false;
        }

        const token = getCookie("token");

        const details = await UserServices(token);

        if (!details) {
            return false;
        }

        setUserDetails(details);

        return true;
    };

    // Déconnexion
    const logOut = () => {
        document.cookie = "token=; Max-Age=0; path=/";
        setUserDetails(null);
        return true;
    }

    return (
        <AuthContext.Provider
            value={{
                userDetails,
                loading,
                login,
                logOut
            }}
        >
            {children}
        </AuthContext.Provider>
    );
}


export function useAuth() {
    return useContext(AuthContext);
}
