import {
    createContext,
    useContext,
    useEffect,
    useState,
    useCallback
} from "react";

import UserServices from "../services/UserServices";

const AuthContext = createContext(null);

export function AuthProvider({ children }) {

    const [userDetails, setUserDetails] = useState(null);
    const [loading, setLoading] = useState(true);

    const loadUser = useCallback(async () => {

        try {
            setLoading(true);

            const details = await UserServices();

            setUserDetails(details || null);

        } catch (error) {

            console.error("Erreur UserServices :", error);

            setUserDetails(null);

        } finally {

            setLoading(false);
        }

    }, []);

    useEffect(() => {
        loadUser();
    }, [loadUser]);

    const logOut = async () => {

        console.log("CONTEXT : logout appelé");

        try {

            const response = await fetch("/logout", {
                method: "POST",
            });

            if (!response.ok) {
                return false;
            }

            setUserDetails(null);

            return true;

        } catch (error) {

            console.error(
                "CONTEXT : erreur logout",
                error
            );

            return false;
        }
    };

    return (
        <AuthContext.Provider
            value={{
                userDetails,
                loading,
                loadUser,
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
