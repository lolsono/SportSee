import { authCookie } from "../cookies.server";

export async function loader({ request }) {
    // Récupération du cookie HttpOnly
    const cookieHeader = request.headers.get("Cookie");

    // Récupération du token
    const token = await authCookie.parse(cookieHeader);

    if (!token) {
        return new Response(
            JSON.stringify({
                error: "Non authentifié",
            }),
            {
                status: 401,
                headers: {
                    "Content-Type": "application/json",
                },
            }
        );
    }

    // Appel de l'API backend pour récupérer les informations utilisateur
    const response = await fetch(
        `${process.env.API_URL}/api/user-info`,
        {
            method: "GET",
            headers: {
                "Content-Type": "application/json",
                "Authorization": `Bearer ${token}`,
            },
        }
    );

    const data = await response.json();

    return new Response(
        JSON.stringify(data),
        {
            status: response.status,
            headers: {
                "Content-Type": "application/json",
            },
        }
    );
}