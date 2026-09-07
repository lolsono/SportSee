import data from "../mocks/data.json";
import { authCookie } from "../cookies.server";

const USE_MOCK = process.env.USE_MOCK === "true";

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

    if (USE_MOCK) {

        const user = data.userInfos.find(
            user => user.token === token
        );

        if (!user) {
            return new Response(
                JSON.stringify({
                    error: "Utilisateur introuvable",
                }),
                {
                    status: 404,
                    headers: {
                        "Content-Type": "application/json",
                    },
                }
            );
        }

        return new Response(
            JSON.stringify(user),
            {
                status: 200,
                headers: {
                    "Content-Type": "application/json",
                },
            }
        );
    }

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

    const responseData = await response.json();

    return new Response(
        JSON.stringify(responseData),
        {
            status: response.status,
            headers: {
                "Content-Type": "application/json",
            },
        }
    );
}
