import data from "../mocks/data.json";
import { authCookie } from "../cookies.server";

const USE_MOCK = process.env.USE_MOCK === "true";

export async function loader({ request }) {

    const url = new URL(request.url);

    const startWeek = url.searchParams.get("startWeek");
    const endWeek = url.searchParams.get("endWeek");

    const cookieHeader = request.headers.get("Cookie");

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
                    status: 401,
                    headers: {
                        "Content-Type": "application/json",
                    },
                }
            );
        }


        // Transformation des dates
        const formatDate = (date) => {

            if (date instanceof Date) {
                return date.toISOString().split("T")[0];
            }

            return String(date).split("T")[0];
        };


        // Filtrage des activités
        const stats = user.runningData.filter((activity) => {

            const activityDate = formatDate(activity.date);

            return (
                activityDate >= startWeek &&
                activityDate <= endWeek
            );
        });


        return new Response(
            JSON.stringify(stats),
            {
                status: 200,
                headers: {
                    "Content-Type": "application/json",
                },
            }
        );
    }

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