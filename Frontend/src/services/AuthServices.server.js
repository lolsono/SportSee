import { GetUser } from "./RepositoryServices";
import { authCookie } from "../cookies.server";
import { redirect } from "react-router";

async function AuthServices(email, password) {

    const user = await GetUser(email, password);

    if (!user || !user.token) {
        return {
            authenticated: false,
        };
    }

    const cookie = await authCookie.serialize(user.token);

    return {
        authenticated: true,
        cookie,
    };

}

/** Vérifie que l'utilisateur possède un token valide. **/
export async function requireAuth({ request }) {

    const cookieHeader = request.headers.get("Cookie");

    const token = await authCookie.parse(cookieHeader);

    if (!token) {
        throw redirect("/");
    }

    return token;
}

export default AuthServices;