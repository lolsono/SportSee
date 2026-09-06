import {
    createContext,
    useContext,
    useEffect,
    useState
} from "react";

import UserServices from "../services/UserServices";

const AuthContext = createContext(null);

export function AuthProvider({ children }) {

    const [userDetails, setUserDetails] = useState(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {

        async function loadUser() {

            try {
                const details = await UserServices();

                setUserDetails(details || null);

            } catch (error) {

                console.error("Erreur UserServices :", error);

                setUserDetails(null);

            } finally {

                setLoading(false);
            }
        }

        loadUser();

    }, []);

    const logOut = async () => {

        console.log("CONTEXT : logout appelé");

        try {

            const response = await fetch("/logout", {
                method: "POST",
            });

            console.log(
                "CONTEXT : réponse logout",
                response.status
            );

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
