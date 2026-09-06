import { authCookie } from "../cookies.server";

const API_URL = "http://localhost:8000";

export async function getUserDetails(request) {
    const cookieHeader = request.headers.get("Cookie");

    const token = await authCookie.parse(cookieHeader);

    if (!token) {
        return null;
    }

    const response = await fetch(
        `${API_URL}/api/user-info`,
        {
            method: "GET",
            headers: {
                "Content-Type": "application/json",
                "Authorization": `Bearer ${token}`,
            },
        }
    );

    if (!response.ok) {
        return null;
    }

    return await response.json();
}
