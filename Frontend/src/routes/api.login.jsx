import { redirect } from "react-router";
import { authCookie } from "../cookies.server";

export async function action({ request }) {
    const formData = await request.formData();

    const username = formData.get("email");
    const password = formData.get("password");

    // Appel du backend
    const response = await fetch(
        `${process.env.API_URL}/api/login`,
        {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({
                username: username,
                password,
            }),
        }
    );

    // Identifiants incorrects
    if (!response.ok) {
        return {
            error: "Identifiant incorrect !",
        };
    }

    const user = await response.json();

    // Vérification du token
    if (!user?.token) {
        return {
            error: "Identifiant incorrect !",
        };
    }

    // Création du cookie HttpOnly
    const cookie = await authCookie.serialize(user.token);

    // Redirection après connexion
    return redirect("/homePage", {
        headers: {
            "Set-Cookie": cookie,
        },
    });
}
