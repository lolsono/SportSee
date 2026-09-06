import { authCookie } from "../cookies.server";

export async function loader({ request }) {

    const url = new URL(request.url);

    const startWeek = url.searchParams.get("startWeek");
    const endWeek = url.searchParams.get("endWeek");

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

    // Appel de TON API avec le token
    const response = await fetch(
        `${process.env.API_URL}/api/user-activity?startWeek=${startWeek}&endWeek=${endWeek}`,
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